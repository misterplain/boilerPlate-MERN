const { createValidator, isEmail, isNonEmptyString } = require("./_helpers");

const signinValidation = [
  createValidator({
    path: "email",
    validate: (value) => isEmail(value),
    msg: "Valid email required",
  }),
  createValidator({
    path: "password",
    validate: (value) => isNonEmptyString(value),
    msg: "Password required",
  }),
];

const signupValidation = [
  createValidator({
    path: "email",
    validate: (value) => isEmail(value),
    msg: "Valid email required",
  }),
  createValidator({
    path: "username",
    validate: (value) =>
      typeof value === "string" &&
      value.trim().length >= 3 &&
      value.trim().length <= 30,
    msg: "Username must be 3-30 characters",
  }),
  createValidator({
    path: "password",
    validate: (value) => typeof value === "string" && value.length >= 8,
    msg: "Password must be at least 8 characters",
  }),
  createValidator({
    path: "confirmPassword",
    validate: (value, req) => value === req.body.password,
    msg: "Passwords do not match",
  }),
];

const refreshValidation = [
  createValidator({
    path: "refreshToken",
    validate: (value) => isNonEmptyString(value),
    msg: "Refresh token required",
  }),
];

module.exports = {
  signinValidation,
  signupValidation,
  refreshValidation,
};
