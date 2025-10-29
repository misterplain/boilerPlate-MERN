const dotenv = require("dotenv");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const UserModel = require("../models/userModel.js");
const { default: axios } = require("axios");
const crypto = require("crypto");
const generateUserTokens = require("../middleware/generateToken.js");
const { Octokit } = require("@octokit/core");
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET;
const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID;
const SERVER_URL =
  process.env.NODE_ENV === "production"
    ? "https://e-commerce-mern-api.onrender.com"
    : "http://localhost:5000/mern-ecommerce";
const CLIENT_URL =
  process.env.NODE_ENV === "production"
    ? "https://e-commerce-mern-eryu.onrender.com"
    : "http://localhost:3000";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${SERVER_URL}/auth/google/callback`,
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
      callbackURL: `${SERVER_URL}/auth/github/callback`,
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const octokit = new Octokit({ auth: accessToken });

        const response = await octokit.request("GET /user/emails", {
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        });

        const emails = response.data;
        const primaryEmail = emails.find(
          (email) => email.primary === true && email.verified === true
        ).email;

        let user = await UserModel.findOne({ email: primaryEmail });
        if (!user) {
          user = new UserModel({
            email: primaryEmail,
            username: profile.username,
            password: crypto.randomBytes(16).toString("hex"),
          });
          await user.save();
        }
        done(null, user);
      } catch (error) {
        console.error("Error occurred:", error);
        done(error);
      }
    }
  )
);

//leaving Facebook login for later as it requires a business account/privacy policy URL in order to access the users email address
// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: FACEBOOK_CLIENT_ID,
//       clientSecret: FACEBOOK_CLIENT_SECRET,
//       callbackURL: `${SERVER_URL}/auth/facebook/callback`,
//       profileFields: ["id", "emails", "name"],
//     },
//     async function (accessToken, refreshToken, profile, done) {
//       console.log({
//         message: "email",
//         email: email,
//       })
//       console.log({
//         message: "profile",
//         profile: profile,
//       })

//       done()

//     }
//   )
// );

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async function (id, done) {
  const user = await UserModel.findById(id);
  done(null, user);
});

module.exports = passport;
