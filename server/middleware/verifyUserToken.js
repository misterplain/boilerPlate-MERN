const jwt = require("jsonwebtoken");

const secret = "test";

const verifyUserToken = (req, res, next) => {
  // Fetch the token from headers
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    // If no token is provided
    return res.status(403).send({ message: "No token provided." });
  }

  // Verify the token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      // If the token is invalid
      console.log(err);
      return res.status(500).send({ message: "Failed to authenticate token." });
    }

    // If everything is good, save to request for use in other routes
    req.userId = decoded.id;
    console.log("User token verified, userId: ", req.userId);
    next(); // proceed to the next middleware or the route handler
  });
};

module.exports = { verifyUserToken };
