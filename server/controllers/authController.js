const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const UserModel = require("../models/userModel.js");
const generateUserTokens = require("../middleware/generateToken.js");

const signin = async (req, res) => {
  const { email, password, cart } = req.body;
  // console.log(typeof req.body.email);
  // console.log(typeof req.body.password);
  // console.log(typeof req.body.cart);

  try {
    const foundUser = await UserModel.findOne({ email });

    if (!foundUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await foundUser.isPasswordMatch(password);

    if (!isPasswordCorrect)
      return res.status(401).json({ message: "Invalid credentials" });

      if (cart && cart.length > 0) {
        foundUser.cart = cart;
        await foundUser.save();
      }

    const { accessToken, refreshToken } = generateUserTokens(foundUser);

    res.status(200).json({ foundUser, accessToken, refreshToken });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const signup = async (req, res) => {
  const { email, password, confirmPassword, username, cart } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const foundUser = await UserModel.findOne({ email });

    if (foundUser)
      return res.status(400).json({ message: "User already exists" });

    const newUser = await UserModel.create({
      email,
      password: password,
      username,
      cart
    });


    const { accessToken, refreshToken } = generateUserTokens(newUser);
    
    res.status(201).json({ newUser, accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};

module.exports = { signin, signup };
