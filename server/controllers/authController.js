const UserModel = require("../models/userModel.js");
const generateUserTokens = require("../middleware/generateToken.js");
const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");

const signin = async (req, res) => {
  const { email, password, cart } = req.body;

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

    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    logger.info("User signed in", {
      userId: foundUser._id,
      email: foundUser.email,
      ip: req.ip,
    });

    res.status(200).json({ foundUser, accessToken, refreshToken });
  } catch (error) {
    logger.error("Signin failed", {
      error: error.message,
      stack: error.stack,
      email: req.body.email,
      ip: req.ip,
    });
    res.status(500).json({ message: "Signin failed" });
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
    logger.error("Signup failed", {
      error: error.message,
      stack: error.stack,
      email: req.body.email,
      ip: req.ip,
    });
    res.status(500).json({ message: "Signup failed" });
  }
};

const refresh = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).send({ error: "Refresh token required" });
  }

  try {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) {
          return res.status(403).send({ error: "Invalid refresh token" });
        }

        const foundUser = await UserModel.findById(decoded.id);
        if (!foundUser) {
          return res.status(403).send({ error: "User not found" });
        }

        const { accessToken, refreshToken } = generateUserTokens(foundUser);

        foundUser.refreshToken = refreshToken;
        await foundUser.save();

        logger.info("Token refreshed", {
          userId: foundUser._id,
          email: foundUser.email,
          ip: req.ip,
        });

        return res.status(200).send({
          foundUser,
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
      },
    );
  } catch (error) {
    logger.error("Refresh token failed", {
      error: error.message,
      stack: error.stack,
      email: req.body.email,
      ip: req.ip,
    });
    res.status(500).json({ message: "Refresh token failed" });
  }
};

module.exports = { signin, signup, refresh };
