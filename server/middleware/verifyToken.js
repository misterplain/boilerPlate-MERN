const jwt = require("jsonwebtoken");

const secret = "test";

const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: "No token provided." })
  }

  const authParts = req.headers.authorization.split(" ");

  if (authParts.length < 2) {
    return res.status(403).send({ message: "Malformed token." })
  }

  const token = authParts[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userDecoded) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ message: "Failed to authenticate token." });
    }
    req.userId = userDecoded.id;
    req.isAdmin = userDecoded.isAdmin;

    next(); // proceed to the next middleware or the route handler
  });
};

module.exports = { verifyToken };
