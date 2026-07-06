const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const UserModel = require("../models/userModel.js");
const crypto = require("crypto");
const { Octokit } = require("@octokit/core");
const logger = require("../utils/logger");
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const SERVER_URL = process.env.SERVER_URL;

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
    },
  ),
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
          (email) => email.primary === true && email.verified === true,
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
        logger.error("GitHub OAuth callback failed", {
          error: error.message,
          stack: error.stack,
          username: profile?.username,
        });
        done(error);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async function (id, done) {
  const user = await UserModel.findById(id);
  done(null, user);
});

module.exports = passport;
