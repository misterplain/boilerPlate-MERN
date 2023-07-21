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
    images: [
      {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
      }
    ],

    reviews: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Review",
        },
      ],
      default: [],
    },
    averageRating: {
      type: Number,
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
    isDisplayed: {
      type: Boolean,
      default: false,
    },
    likes: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "User", 
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
