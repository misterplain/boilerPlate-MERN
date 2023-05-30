const jwt = require("jsonwebtoken");

const verifyAdminToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  console.log(token);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }
console.log(user);
    // Here, I'm assuming that your user object has an isAdmin property that's true for admins
    if (!user.isAdmin) {
      return res.status(403).json("User is not an admin");
    }

    console.log(req.user);
    next();
  });
};

module.exports = { verifyAdminToken };
