const UserModel = require("../models/userModel.js");
const generateUserTokens = require("../middleware/generateToken.js");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const logger = require("../utils/logger");
const { successResponse } = require("../utils/response");
const {
  BadRequestError,
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} = require("../utils/errors");

const signin = asyncHandler(async (req, res) => {
  const { email, password, cart } = req.body;

  const foundUser = await UserModel.findOne({ email });

  if (!foundUser) {
    throw new NotFoundError("User");
  }

  const isPasswordCorrect = await foundUser.isPasswordMatch(password);

  if (!isPasswordCorrect) {
    throw new UnauthorizedError("Invalid credentials");
  }

  if (cart && cart.length > 0) {
    foundUser.cart = cart;
    await foundUser.save();
  }

  const { accessToken, refreshToken } = generateUserTokens(foundUser);

  foundUser.refreshToken = refreshToken;
  await foundUser.save();

  logger.info("User signed in", {
    userId: foundUser._id,
    email: foundUser.email,
    ip: req.ip,
  });

  return successResponse(
    res,
    "User signed in",
    { foundUser, accessToken, refreshToken },
    200,
  );
});

const signup = asyncHandler(async (req, res) => {
  const { email, password, confirmPassword, username, cart } = req.body;

  if (!username || !password || !email) {
    throw new BadRequestError("Please fill in all fields");
  }

  if (password !== confirmPassword) {
    throw new BadRequestError("Passwords do not match");
  }

  const foundUser = await UserModel.findOne({ email });

  if (foundUser) {
    throw new ConflictError("User already exists");
  }

  const newUser = await UserModel.create({
    email,
    password: password,
    username,
    cart,
  });

  const { accessToken, refreshToken } = generateUserTokens(newUser);

  newUser.refreshToken = refreshToken;
  await newUser.save();

  logger.info("User signed up", {
    userId: newUser._id,
    email: newUser.email,
    username: newUser.username,
    ip: req.ip,
  });

  return successResponse(
    res,
    "User signed up",
    { newUser, accessToken, refreshToken },
    201,
  );
});

const refresh = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw new BadRequestError("Refresh token required");
  }

  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

  const foundUser = await UserModel.findById(decoded.id);
  if (!foundUser) {
    throw new NotFoundError("User", decoded.id);
  }

  const { accessToken, refreshToken: newRefreshToken } =
    generateUserTokens(foundUser);

  foundUser.refreshToken = newRefreshToken;
  await foundUser.save();

  logger.info("Token refreshed", {
    userId: foundUser._id,
    email: foundUser.email,
    ip: req.ip,
  });

  return successResponse(res, "Token refreshed", {
    foundUser,
    accessToken,
    refreshToken: newRefreshToken,
  });
});

module.exports = { signin, signup, refresh };
