const jwt = require("jsonwebtoken");

const secret = "test";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(403).send({ message: "No token provided." })
  }

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
