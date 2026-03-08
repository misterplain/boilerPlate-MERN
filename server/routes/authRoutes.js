const router = require("express").Router();
const passport = require("passport");
const { signin, signup, refresh } = require("../controllers/authController.js");
const generateUserTokens = require("../middleware/generateToken.js");
const { NotFoundError } = require("../utils/errors");
const SERVER_URL =
  process.env.NODE_ENV === "production"
    ? // ? "https://e-commerce-mern-api.onrender.com"
      "https://server-muddy-river-1999.fly.dev"
    : "http://localhost:5000";
const CLIENT_URL =
  process.env.NODE_ENV === "production"
    ? "https://e-commerce-mern-eryu.onrender.com"
    : "http://localhost:3000";

//form signup
router.post("/signin", signin);
router.post("/signup", signup);

//refresh
router.post("/refresh", refresh);

//social login routes
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successful",
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect(CLIENT_URL);
  });
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);
router.get(
  "/github",
  passport.authenticate("github", { scope: ["profile", "user:email"] }),
);

router.get("/google/callback", function (req, res, next) {
  passport.authenticate("google", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(new NotFoundError("User"));
    }
    const tokens = generateUserTokens(user);
    const { accessToken, refreshToken } = tokens;

    res.send(`
    <script>
      window.opener.postMessage(
        {
          accessToken: "${accessToken}",
          refreshToken: "${refreshToken}",
          user: ${JSON.stringify(user)} // stringify the user object
        },
        "${CLIENT_URL}"
      );
      window.close();
    </script>
  `);
  })(req, res, next);
});

router.get("/github/callback", function (req, res, next) {
  passport.authenticate("github", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(new NotFoundError("User"));
    }
    const tokens = generateUserTokens(user);
    const { accessToken, refreshToken } = tokens;

    res.send(`
    <script>
      window.opener.postMessage(
        {
          accessToken: "${accessToken}",
          refreshToken: "${refreshToken}",
          user: ${JSON.stringify(user)} // stringify the user object
        },
        "${CLIENT_URL}"
      );
      window.close();
    </script>
  `);
  })(req, res, next);
});

module.exports = router;
