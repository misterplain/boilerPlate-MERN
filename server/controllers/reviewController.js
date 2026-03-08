const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Review = require("../models/reviewModel.js");
const Product = require("../models/productModel.js");
const generateUserTokens = require("../middleware/generateToken.js");
const logger = require("../utils/logger");

//get top ten reviews
const getTopTenReviews = asyncHandler(async (req, res) => {
  try {
    const topTenReviews = await Review.find({
      approvedByAdmin: true,
      awaitingModeration: false,
      isDeleted: false,
    })
      .sort({ rating: -1 })
      .limit(10);

    const productIds = topTenReviews.map((review) => review.productId);

    const products = await Product.find({ _id: { $in: productIds } });

    const reviewsWithProducts = topTenReviews.map((review) => {
      const product = products.find((product) =>
        product._id.equals(review.productId),
      );
      return {
        ...review.toObject(),
        productInfo: product || {},
      };
    });

    const reply = {
      message: "Top ten reviews",
      topTenReviews: reviewsWithProducts,
    };

    logger.info("Top ten reviews received", {
      count: reviewsWithProducts.length,
      ip: req.ip,
    });

    res.status(200).json(reply);
  } catch (error) {
    logger.error("getTopTenReviews failed", {
      error: error.message,
      stack: error.stack,
      ip: req.ip,
    });
    res.status(500).json({ message: "getTopTenReviews failed" });
  }
});

const createReview = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const userId = req.userId;
  const username = req.username;
  const userAvatar = req.userAvatar;

  const { reviewTitle, rating, comment } = req.body;
  try {
    if (!productId) {
      return res.status(400).json({ message: "No product id provided" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const productName = product.name;

    const newReview = await Review.create({
      reviewTitle,
      rating,
      comment,
      userId: userId,
      username: username,
      userAvatar: {
        url: userAvatar,
      },
      productId: productId,
      productName: productName,
    });

    const reply = {
      message: "Review created",
      newReview,
    };

    logger.info("Review created", {
      reviewId: newReview._id,
      productId: newReview.productId,
      userId: newReview.userId,
      rating: newReview.rating,
    });

    res.status(201).json(reply);
  } catch (error) {
    logger.error("createReview failed", {
      error: error.message,
      stack: error.stack,
      productId: req.params.productId,
      userId: req.userId,
      ip: req.ip,
    });
    res.status(500).json({ message: "createReview failed" });
  }
});

const getUnmoderatedReviews = asyncHandler(async (req, res) => {
  try {
    const unmoderatedReviews = await Review.find({
      awaitingModeration: true,
      isDeleted: false,
    });
    const reply = {
      message: "Unmoderated reviews",
      unmoderatedReviews,
    };

    logger.info("Unmoderated reviews received", {
      count: unmoderatedReviews.length,
      adminId: req.userId,
      ip: req.ip,
    });

    res.status(200).json(reply);
  } catch (error) {
    logger.error("getUnmoderatedReviews failed", {
      error: error.message,
      stack: error.stack,
      adminId: req.userId,
      ip: req.ip,
    });
    res.status(500).json({ message: "getUnmoderatedReviews failed" });
  }
});

const moderateReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const { awaitingModeration, approvedByAdmin } = req.body;

  try {
    if (!reviewId) {
      return res.status(400).json({ message: "No review id provided" });
    }

    const reviewToModerate = await Review.findById(reviewId);
    if (!reviewToModerate) {
      return res.status(404).json({ message: "Review not found" });
    }

    reviewToModerate.awaitingModeration = awaitingModeration;
    reviewToModerate.approvedByAdmin = approvedByAdmin;
    await reviewToModerate.save();

    const reply = {
      message: "Review moderated",
      reviewToModerate,
    };

    if (approvedByAdmin && !awaitingModeration) {
      const productToUpdate = await Product.findById(
        reviewToModerate.productId,
      );
      productToUpdate.reviews.push(reviewId);

      //update the averageRating of the product
      const oldAverage = productToUpdate.averageRating || 0;
      const numberOfReviews = productToUpdate.reviews.length;
      const newAverage =
        (oldAverage * (numberOfReviews - 1) + reviewToModerate.rating) /
        numberOfReviews;
      productToUpdate.averageRating = newAverage;

      await productToUpdate.save();
    }

    logger.info("Review moderated", {
      reviewId: reviewToModerate._id,
      approved: approvedByAdmin,
      productId: reviewToModerate.productId,
      adminId: req.userId,
    });

    res.status(200).json(reply);
  } catch (error) {
    logger.error("moderateReview failed", {
      error: error.message,
      stack: error.stack,
      reviewId: req.params.reviewId,
      adminId: req.userId,
      ip: req.ip,
    });
    res.status(500).json({ message: "moderateReview failed" });
  }
});

const getProductReviews = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const userId = req.userId;

  try {
    if (!productId) {
      return res.status(400).json({ message: "No product id provided" });
    }

    let userReviews = [];
    if (userId) {
      userReviews = await Review.find({
        userId: mongoose.Types.ObjectId(userId),
        productId: mongoose.Types.ObjectId(productId),
        isDeleted: false,
      });
    }

    const productToPopulate =
      await Product.findById(productId).populate("reviews");

    const reply = {
      message: "Product reviews",
      userReviews,
      productReviews: productToPopulate.reviews,
    };

    logger.info("Product reviews received", {
      productId,
      userId: userId || null,
      reviewCount: productToPopulate.reviews.length,
      ip: req.ip,
    });

    res.status(200).json(reply);
  } catch (error) {
    logger.error("getProductReviews failed", {
      error: error.message,
      stack: error.stack,
      productId: req.params.productId,
      userId: req.userId,
      ip: req.ip,
    });
    res.status(500).json({ message: "getProductReviews failed" });
  }
});

const editReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const userId = req.userId;
  const reviewData = req.body;

  try {
    if (!reviewId) {
      return res.status(400).json({ message: "No review id provided" });
    }

    const reviewToEdit = await Review.findById(reviewId);
    if (reviewToEdit.userId.toString() !== userId) {
      return res
        .status(401)
        .json({ message: "You are not authorized to edit this review" });
    }

    if (reviewToEdit.approvedByAdmin && !reviewToEdit.awaitingModeration) {
      const productToUpdate = await Product.findById(reviewToEdit.productId);
      if (productToUpdate.reviews.includes(reviewId)) {
        productToUpdate.reviews.pull(reviewId);
        // Updating average rating
        const oldAverage = productToUpdate.averageRating;
        const numberOfReviews = productToUpdate.reviews.length;
        const newAverage =
          numberOfReviews > 1
            ? (oldAverage * numberOfReviews - reviewToEdit.rating) /
              (numberOfReviews - 1)
            : 0;
        productToUpdate.averageRating = newAverage;
        await productToUpdate.save();
      }
    }

    reviewToEdit.reviewTitle = reviewData.reviewTitle;
    reviewToEdit.rating = reviewData.rating;
    reviewToEdit.comment = reviewData.comment;
    reviewToEdit.approvedByAdmin = false;
    reviewToEdit.awaitingModeration = true;
    reviewToEdit.isDeleted = false;
    await reviewToEdit.save();

    const reply = {
      message: "Review edited",
      reviewToEdit,
    };

    logger.info("Review edited", {
      reviewId: reviewToEdit._id,
      productId: reviewToEdit.productId,
      userId: reviewToEdit.userId,
      rating: reviewToEdit.rating,
    });

    res.status(200).json(reply);
  } catch (error) {
    logger.error("editReview failed", {
      error: error.message,
      stack: error.stack,
      reviewId: req.params.reviewId,
      userId: req.userId,
      ip: req.ip,
    });
    res.status(500).json({ message: "editReview failed" });
  }
});

const deleteReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const userId = req.userId;
  const { isAdmin } = req;
  try {
    if (!reviewId) {
      return res.status(400).json({ message: "No review id provided" });
    }

    const reviewToDelete = await Review.findById(reviewId);
    if (reviewToDelete.userId.toString() !== userId && !isAdmin) {
      return res
        .status(401)
        .json({ message: "You are not authorized to delete this review" });
    }

    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { isDeleted: true },
      { new: true },
    );

    //pull reviewId from product reviews array
    const productToUpdate = await Product.findById(updatedReview.productId);
    productToUpdate.reviews.pull(reviewId);
    // Updating average rating
    const oldAverage = productToUpdate.averageRating;
    const numberOfReviews = productToUpdate.reviews.length;
    const newAverage =
      numberOfReviews > 1
        ? (oldAverage * numberOfReviews - reviewToDelete.rating) /
          (numberOfReviews - 1)
        : 0;
    productToUpdate.averageRating = newAverage;
    await productToUpdate.save();

    const reply = {
      message: "Review deleted",
      updatedReview,
    };

    logger.info("Review deleted", {
      reviewId: updatedReview._id,
      productId: updatedReview.productId,
      userId: updatedReview.userId,
      deletedBy: req.isAdmin ? "admin" : "user",
    });

    res.status(200).json(reply);
  } catch (error) {
    logger.error("deleteReview failed", {
      error: error.message,
      stack: error.stack,
      reviewId: req.params.reviewId,
      userId: req.userId,
      ip: req.ip,
    });
    res.status(500).json({ message: "deleteReview failed" });
  }
});

module.exports = {
  getTopTenReviews,
  createReview,
  getUnmoderatedReviews,
  moderateReview,
  editReview,
  getProductReviews,
  deleteReview,
};
