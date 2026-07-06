const router = require("express").Router();
const {
  createReview,
  getProductReviews,
  getUnmoderatedReviews,
  deleteReview,
  moderateReview,
  editReview,
  getTopTenReviews,
} = require("../controllers/reviewController.js");
const { verifyToken } = require("../middleware/verifyToken.js");
const requireAdmin = require("../middleware/requireAdmin");
const validate = require("../middleware/validate");
const {
  productIdValidation,
  reviewIdValidation,
  createReviewValidation,
  editReviewValidation,
  moderateReviewValidation,
} = require("../validators/reviewValidators");

router.get("/top", getTopTenReviews);
router.get(
  "/get/:productId",
  verifyToken,
  productIdValidation,
  validate,
  getProductReviews,
);
router.post(
  "/new/:productId",
  verifyToken,
  createReviewValidation,
  validate,
  createReview,
);
router.delete(
  "/delete/:reviewId",
  verifyToken,
  reviewIdValidation,
  validate,
  deleteReview,
);
router.get("/unmoderated", verifyToken, requireAdmin, getUnmoderatedReviews);
router.put(
  "/moderate/:reviewId",
  verifyToken,
  requireAdmin,
  moderateReviewValidation,
  validate,
  moderateReview,
);
router.put(
  "/edit/:reviewId",
  verifyToken,
  editReviewValidation,
  validate,
  editReview,
);

module.exports = router;
