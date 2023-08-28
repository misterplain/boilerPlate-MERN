const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    username: {
      type: String,
    },
    userAvatar: {
      url:{
        type: String,
      }

    },
    rating: {
      type: Number,
      required: true,
    },
    reviewTitle: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    approvedByAdmin: {
      type: Boolean,
      default: false,
    },
    awaitingModeration: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    productName: {
      type: String,
    },
  },
  {
    collection: "boilerPlateReviews",
  }
);

module.exports = mongoose.model("Review", reviewSchema);
