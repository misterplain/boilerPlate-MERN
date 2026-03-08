const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.split(" ")[1] !== "null") {
    const token = authHeader.split(" ")[1];

    try {
      const userDecoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      req.userId = userDecoded.id;
      req.isAdmin = userDecoded.isAdmin;
      req.username = userDecoded.username;
      req.userAvatar = userDecoded.userAvatar;
    } catch (error) {
      logger.error("Token failed", {
        error: error.message,
        stack: error.stack,
        ip: req.ip,
      });

      if (
        (error.message && error.message.includes("jwt malformed")) ||
        error.message.includes("jwt expired")
      ) {
        return res.status(400).send({
          message:
            "Your session has expired or is invalid. Please refresh the page.",
        });
      } else {
        return res
          .status(500)
          .send({ message: "Failed to authenticate token." });
      }
    }
  } else {
    req.userId = null;
  }

  next();
};

module.exports = { verifyToken };
