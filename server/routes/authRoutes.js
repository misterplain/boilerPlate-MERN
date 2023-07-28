const router = require("express").Router();
const passport = require("passport");
const { signin, signup } = require("../controllers/authController.js");
const generateUserTokens = require("../middleware/generateToken.js");
//url
const SERVER_URL =
  process.env.NODE_ENV === "production"
    ? "https://e-commerce-mern-api.onrender.com"
    : "http://localhost:5000";
const CLIENT_URL =
  process.env.NODE_ENV === "production"
    ? "https://e-commerce-mern-eryu.onrender.com"
    : "http://localhost:3000";

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
  passport.authenticate("github", { scope: ["profile", "user:email"] })
);
//leaving Facebook login for later as it requires a business account/privacy policy URL in order to access the users email address
// router.get(
//   "/facebook",
//   passport.authenticate("facebook", { scope: ["email", "public_profile"] })
// );

router.get("/google/callback", function (req, res, next) {
  passport.authenticate("google", function (err, user, info) {
    if (err) {
      return res.status(500).json({ message: "Error while authenticating" });
    }
    if (!user) {
      return res.status(400).json({ message: "No user found" });
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
      return res.status(500).json({ message: "Error while authenticating" });
    }
    if (!user) {
      return res.status(400).json({ message: "No user found" });
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



//leaving Facebook login for later as it requires a business account/privacy policy URL in order to access the users email address
// router.get("/facebook/callback", function (req, res, next) {
//   passport.authenticate("facebook", function (err, user, info) {
//     if (err) {
//       return res.status(500).json({ message: "Error while authenticating" });
//     }
//     if (!user) {
//       return res.status(400).json({ message: "No user found" });
//     }
//     const tokens = generateUserTokens(user);
//     const { accessToken, refreshToken } = tokens;

//     res.send(`
//     <script>
//       window.opener.postMessage(
//         {
//           accessToken: "${accessToken}",
//           refreshToken: "${refreshToken}",
//           user: ${JSON.stringify(user)} // stringify the user object
//         },
//         "${CLIENT_URL}"
//       );
//       window.close();
//     </script>
//   `);
//   })(req, res, next);
// });


module.exports = router;
