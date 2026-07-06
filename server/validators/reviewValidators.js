const { createValidator, isMongoId } = require("./_helpers");

const productIdValidation = [
  createValidator({
    source: "params",
    path: "productId",
    validate: (v) => isMongoId(v),
    msg: "Invalid productId",
  }),
];

const reviewIdValidation = [
  createValidator({
    source: "params",
    path: "reviewId",
    validate: (v) => isMongoId(v),
    msg: "Invalid reviewId",
  }),
];

const createReviewValidation = [
  ...productIdValidation,
  createValidator({
    path: "reviewTitle",
    validate: (v) =>
      typeof v === "string" && v.trim().length >= 1 && v.trim().length <= 120,
    msg: "reviewTitle is required",
  }),
  createValidator({
    path: "comment",
    validate: (v) =>
      typeof v === "string" && v.trim().length >= 1 && v.trim().length <= 2000,
    msg: "comment is required",
  }),
  createValidator({
    path: "rating",
    validate: (v) =>
      Number.isFinite(Number(v)) && Number(v) >= 0 && Number(v) <= 5,
    msg: "rating must be between 0 and 5",
  }),
];

const editReviewValidation = [
  ...reviewIdValidation,
  createValidator({
    path: "reviewTitle",
    validate: (v) =>
      typeof v === "string" && v.trim().length >= 1 && v.trim().length <= 120,
    msg: "reviewTitle is required",
  }),
  createValidator({
    path: "comment",
    validate: (v) =>
      typeof v === "string" && v.trim().length >= 1 && v.trim().length <= 2000,
    msg: "comment is required",
  }),
  createValidator({
    path: "rating",
    validate: (v) =>
      Number.isFinite(Number(v)) && Number(v) >= 0 && Number(v) <= 5,
    msg: "rating must be between 0 and 5",
  }),
];

const moderateReviewValidation = [
  ...reviewIdValidation,
  createValidator({
    path: "awaitingModeration",
    validate: (v) => typeof v === "boolean",
    msg: "awaitingModeration must be boolean",
  }),
  createValidator({
    path: "approvedByAdmin",
    validate: (v) => typeof v === "boolean",
    msg: "approvedByAdmin must be boolean",
  }),
];

module.exports = {
  productIdValidation,
  reviewIdValidation,
  createReviewValidation,
  editReviewValidation,
  moderateReviewValidation,
};
