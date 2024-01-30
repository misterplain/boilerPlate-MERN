const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Review = require("../models/reviewModel.js");
const Product = require("../models/productModel.js");
const generateUserTokens = require("../middleware/generateToken.js");

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
      const product = products.find((product) => product._id.equals(review.productId));
      return {
        ...review.toObject(),
        productInfo: product || {}, 
      };
    });

    const reply = {
      message: "Top ten reviews",
      topTenReviews: reviewsWithProducts,
    };

    res.status(200).json(reply);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
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

    res.status(201).json(reply);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
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
    res.status(200).json(reply);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
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
        reviewToModerate.productId
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

    res.status(200).json(reply);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
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

    const productToPopulate = await Product.findById(productId).populate(
      "reviews"
    );

    const reply = {
      message: "Product reviews",
      userReviews,
      productReviews: productToPopulate.reviews,
    };

    res.status(200).json(reply);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
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

    res.status(200).json(reply);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
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
      { new: true }
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

    res.status(200).json(reply);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
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
