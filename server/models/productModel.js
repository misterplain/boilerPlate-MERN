const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    collectionId: {
      type: Schema.Types.ObjectId,
      ref: "Collection",
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    photos: {
      type: [String],
      default: [],
      required: false,
    },
    reviews: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Review",
        },
      ],
      default: [],
    },
    description: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    likes: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "User", // ref allows populate function to work properly, the function replaces id with its corresponding blog object
        },
      ],
      default: [],
    },
  },
  {
    collection: "boilerPlateProducts",
  }
);

module.exports = mongoose.model("Product", productSchema);
