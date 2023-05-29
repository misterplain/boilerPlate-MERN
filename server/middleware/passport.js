const dotenv = require("dotenv");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const UserModel = require("../models/userModel.js");
const { default: axios } = require("axios");
const crypto = require("crypto");
const generateUserTokens = require("../middleware/generateToken.js");
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      profileFields: ["email"],
    },

    async function (accessToken, refreshToken, profile, email, done) {
      const foundEmail = email.emails[0].value;
      const username = email._json.given_name;

      try {
        let user = await UserModel.findOne({ email: foundEmail });
        if (!user) {
          user = new UserModel({
            email: foundEmail,
            username: username,
            password: crypto.randomBytes(16).toString("hex"),
          });
          await user.save();
        }
        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
      profileFields: ["email"],
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

// passport.use(
//     new FacebookStrategy(
//       {
//         clientID: FACEBOOK_APP_ID,
//         clientSecret: FACEBOOK_APP_SECRET,
//         callbackURL: "/auth/facebook/callback",
//       },
//       function (accessToken, refreshToken, profile, done) {
//         done(null, profile);
//       }
//     )
//   );

//to pass the user data to the session you need to serialize and deserialize the user
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async function(id, done) {
  const user = await UserModel.findById(id);
  // const tokens = generateUserTokens(user);

  // user.accessToken = tokens.accessToken;
  // user.refreshToken = tokens.refreshToken;

  done(null, user);
});

module.exports = passport;
