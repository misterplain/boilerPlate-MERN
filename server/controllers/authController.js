const UserModel = require("../models/userModel.js");
const generateUserTokens = require("../middleware/generateToken.js");
const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");
const {
  BadRequestError,
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} = require("../utils/errors");

const signin = async (req, res, next) => {
  const { email, password, cart } = req.body;

  try {
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

    res.status(200).json({ foundUser, accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};

const signup = async (req, res, next) => {
  const { email, password, confirmPassword, username, cart } = req.body;

  if (!username || !password || !email) {
    return next(new BadRequestError("Please fill in all fields"));
  }

  if (password !== confirmPassword) {
    return next(new BadRequestError("Passwords do not match"));
  }

  try {
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

    res.status(201).json({ newUser, accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
};

const refresh = async (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return next(new BadRequestError("Refresh token required"));
  }

  try {
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

    return res.status(200).send({
      foundUser,
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { signin, signup, refresh };
