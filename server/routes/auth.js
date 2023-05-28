const router = require("express").Router();
const passport = require("passport");
const {signin, signup } = require("../controllers/authController.js");
const CLIENT_URL = "http://localhost:3000/";

router.post("/signin", signin);
router.post("/signup", signup);


//////////////////////  SOCIAL LOGIN ROUTES //////////////////////

router.get("/login/success", (req, res) => {

  if (req.user) {
    // console.log("Access Token:", accessToken);
    console.log(req)
    res.status(200).json({
      success: true,
      message: "successful",
      // user: req.user,
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

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/github", passport.authenticate("github", { scope: ["profile", "email"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

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
