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

  console.log("Access Token Secret:", process.env.ACCESS_TOKEN_SECRET);
  console.log("Refresh Token Secret:", process.env.REFRESH_TOKEN_SECRET);

  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });

  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });

  console.log("Generated Access Token:", accessToken);
  console.log("Generated Refresh Token:", refreshToken);

  return { accessToken, refreshToken };
};

module.exports = generateUserTokens;
