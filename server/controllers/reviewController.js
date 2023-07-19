const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");
const Review = require("../models/reviewModel.js");
const Product = require("../models/productModel.js");
const generateUserTokens = require("../middleware/generateToken.js");

const createReview = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const userId = req.userId;
  const { reviewTitle, rating, comment } = req.body;
  try {
    if (!productId) {
      return res.status(400).json({ message: "No product id provided" });
    }

    const newReview = await Review.create({
      reviewTitle,
      rating,
      comment,
      userId: userId,
      productId: productId,
    });

    console.log(newReview);

    // const productToPopulate = await Product.findById(productId);
    // productToPopulate.reviews?.push(newReview);
    // await productToPopulate.save();

    const reply = {
      message: "Review created",
      newReview,
    };

    res.status(201).json(reply);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
});

const getUnmoderatedReviews = asyncHandler(async (req, res) => {
  try {
    const unmoderatedReviews = await Review.find({ awaitingModeration: true });
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

//admin moderation
const moderateReview = asyncHandler(async (req, res) => {
  console.log("moderateReview");
  const { reviewId } = req.params;
  const { awaitingModeration, approvedByAdmin } = req.body;

  console.log(reviewId, awaitingModeration, approvedByAdmin);
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

    console.log(reply)

    //if approvedByAdmin is true and awaitingModeration is false, push reviewId to product reviews array
    if (approvedByAdmin && !awaitingModeration) {
      const productToUpdate = await Product.findById(
        reviewToModerate.productId
      );
      productToUpdate.reviews.push(reviewId);
      await productToUpdate.save();
    }

    res.status(200).json(reply);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// const getProductReviews = asyncHandler(async (req, res) => {
//   const { productId } = req.params;
//   try {
//     if (!productId) {
//       return res.status(400).json({ message: "No product id provided" });
//     }

//     const productToPopulate = await Product.findById(productId).populate(
//       "reviews"
//     );

//     const reply = {
//       message: "Product reviews",
//       productReviews: productToPopulate.reviews,
//     };

//     console.log(reply)

//     res.status(200).json(reply);
//   } catch (error) {
//     res.status(500).json({ message: "Something went wrong" });

//     console.log(error);
//   }
// });

const getProductReviews = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const userId = req.userId; // could be undefined if user is not logged in
console.log(productId, userId)
  try {
    if (!productId) {
      return res.status(400).json({ message: "No product id provided" });
    }

    let userReviews = [];
    if (userId) {
      // If user is logged in, get all reviews made by the user for this product
      userReviews = await Review.find({ userId: mongoose.Types.ObjectId(userId), productId: mongoose.Types.ObjectId(productId) });
    }
    
    // Get the product to find approved reviews
    const productToPopulate = await Product.findById(productId).populate("reviews");

    const reply = {
      message: "Product reviews",
      userReviews,
      productReviews: productToPopulate.reviews,
    };

    console.log(reply)

    res.status(200).json(reply);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
});

const editReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const userId = req.userId;
  const  reviewData  = req.body;
  console.log(reviewData)
  console.log()
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
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
});

const deleteReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const userId = req.userId;
  try {
    if (!reviewId) {
      return res.status(400).json({ message: "No review id provided" });
    }

    const reviewToDelete = await Review.findById(reviewId);
    if (reviewToDelete.userId.toString() !== userId) {
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
    await productToUpdate.save();

    console.log(updatedReview);

    const reply = {
      message: "Review deleted",
      updatedReview,
    };

    res.status(200).json(reply);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
});

module.exports = {
  createReview,
  getUnmoderatedReviews,
  moderateReview,
  editReview,
  getProductReviews,
  deleteReview,
};
