const jwt = require("jsonwebtoken");

const secret = "test";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.split(" ")[1] !== "null") {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userDecoded) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .send({ message: "Failed to authenticate token." });
      }

      req.userId = userDecoded.id;
      req.isAdmin = userDecoded.isAdmin;
    });
  } else {
    req.userId = null;
  }

  next();
};

module.exports = { verifyToken };
