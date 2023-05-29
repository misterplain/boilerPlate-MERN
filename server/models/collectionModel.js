const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const collectionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    products: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
      ],
      default: [],
    },
  },
  {
    collection: "boilerPlateCollections",
  }
);
module.exports = mongoose.model("Collection", collectionSchema);
