const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const UserModel = require("../models/userModel.js");

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const foundUser = await UserModel.findOne({ email });

    if (!foundUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await foundUser.isPasswordMatch(password);

    if (!isPasswordCorrect)
      return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = jwt.sign(
      {
        id: foundUser._id,
        email: foundUser.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { email: foundUser.email, id: foundUser._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "30d" }
    );

    res.status(200).json({ result: foundUser, accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const signup = async (req, res) => {
  const { email, password, confirmPassword, username } = req.body;

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
    });


    const accessToken = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "30d" }
    );
    res.status(201).json({ newUser, accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};

module.exports = { signin, signup };
