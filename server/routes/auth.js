const router = require("express").Router();
const passport = require("passport");
const { signin, signup } = require("../controllers/authController.js");
const CLIENT_URL = "http://localhost:3000/";
const generateUserTokens = require("../middleware/generateToken.js");

//form signup
router.post("/signin", signin);
router.post("/signup", signup);

//////////////////////  SOCIAL LOGIN ROUTES //////////////////////

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

router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect(CLIENT_URL);
  });
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/github",
  passport.authenticate("github", { scope: ["profile", "email"] })
);

router.get("/google/callback", function (req, res, next) {
  passport.authenticate("google", function (err, user, info) {
    console.log({
      message: "from google callback",
      err: err,
      user: user,
    })
    if (err) {
      return res.status(500).json({ message: "Error while authenticating" });
    }
    if (!user) {
      return res.status(400).json({ message: "No user found" });
    }
    const tokens = generateUserTokens(user);
    const { accessToken, refreshToken } = tokens;

    // console.log(`Sending tokens: ${accessToken}, ${refreshToken}`);
    // res.json({ accessToken, refreshToken, user });
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

// router.get(
//   "/github/callback",
//   passport.authenticate("github", {
//     successRedirect: CLIENT_URL,
//     failureRedirect: "/login/failed",
//   })
// );

//facbeook is only possible with an https connection so it will have to be on the deployed version
// router.get("/facebook", passport.authenticate("facebook", { scope: ["profile", "email"] }));

// router.get(
//   "/facebook/callback",
//   passport.authenticate("facebook", {
//     successRedirect: CLIENT_URL,
//     failureRedirect: "/login/failed",
//   })
// );

module.exports = router;
