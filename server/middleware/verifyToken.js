const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../utils/errors");

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
      if (
        (error.message && error.message.includes("jwt malformed")) ||
        error.message.includes("jwt expired")
      ) {
        return next(
          new UnauthorizedError(
            "Your session has expired or is invalid. Please refresh the page.",
          ),
        );
      }

      return next(new UnauthorizedError("Failed to authenticate token."));
    }
  } else {
    req.userId = null;
  }

  next();
};

module.exports = { verifyToken };
