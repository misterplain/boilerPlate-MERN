const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    //   favorites: {
    //     type: [
    //       {
    //         type: Schema.Types.ObjectId,
    //         ref: "Product", // ref allows populate function to work properly, the function replaces id with its corresponding blog object
    //       },
    //     ],
    //     default: [],
    //   },
    //   cart: {
    //     type: [
    //       {
    //         type: Schema.Types.ObjectId,
    //         ref: "Product", // ref allows populate function to work properly, the function replaces id with its corresponding blog object
    //       },
    //     ],
    //   },
  },
  {
    collection: "boilerPlateUsers",
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.isPasswordMatch = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};



module.exports = mongoose.model("User", userSchema);
