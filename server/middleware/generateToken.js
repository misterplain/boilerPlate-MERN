
const jwt = require("jsonwebtoken");

const generateUserTokens = (user) => {
  const accessToken = jwt.sign(
    {
      id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
      username: user.username,
      avatar: user.avatar,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );

  const refreshToken = jwt.sign(
    {
      id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
      username: user.username,
      avatar: user.avatar,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "30d" }
  );

  return { accessToken, refreshToken };
};

module.exports = generateUserTokens;
