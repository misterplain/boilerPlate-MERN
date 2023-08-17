const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.split(" ")[1] !== "null") {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, userDecoded) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .send({ message: "Failed to authenticate token." });
      }
      // console.log(userDecoded);
      req.userId = userDecoded.id;
      req.isAdmin = userDecoded.isAdmin;
      req.username = userDecoded.username;
      req.avatar = userDecoded.avatar;
    });
  } else {
    req.userId = null;
  }

  next();
};

module.exports = { verifyToken };
