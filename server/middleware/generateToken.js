const jwt = require("jsonwebtoken");

const generateUserTokens = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    isAdmin: user.isAdmin,
    username: user.username,
  };

  if (user.userAvatar && user.userAvatar.url) {
    payload.userAvatar = user.userAvatar.url;
  }

  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });

  return { accessToken, refreshToken };
};

module.exports = generateUserTokens;
