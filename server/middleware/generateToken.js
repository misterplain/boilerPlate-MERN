const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const UserModel = require("../models/userModel.js");

const generateUserTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user._id, email: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );

  const refreshToken = jwt.sign(
    { email: user.email, id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "30d" }
  );
  // console.log({
  //   message: "from generateUserTokens",
  //   accessToken: accessToken,
  //   refreshToken: refreshToken,
  // });
  return { accessToken, refreshToken };
};

module.exports = generateUserTokens;
