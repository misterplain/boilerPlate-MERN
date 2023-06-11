const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");
const Review = require("../models/reviewModel.js");
const Product = require("../models/productModel.js");
const generateUserTokens = require("../middleware/generateToken.js");

//new review after userToken is validated, req.userId is available
const createReview = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const userId = req.userId;
  const { rating, comment } = req.body;
  try {
    if (!productId) {
      return res.status(400).json({ message: "No product id provided" });
    }

    const newReview = await Review.create({
      rating,
      comment,
      userId: userId,
      productId: productId,
    });

    const productToPopulate = await Product.findById(productId);
    productToPopulate.reviews?.push(newReview);
    await productToPopulate.save();

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

module.exports = { createReview };
