const router = require("express").Router();
const {
  createReview,
  getProductReviews,
  getUnmoderatedReviews,
  deleteReview,
  moderateReview,
  editReview
} = require("../controllers/reviewController.js");
const { verifyToken } = require("../middleware/verifyToken.js");


router.get("/get/:productId", verifyToken, getProductReviews)

router.post("/new/:productId", verifyToken, createReview);
router.delete("/delete/:reviewId", verifyToken, deleteReview);
router.get("/unmoderated", verifyToken, getUnmoderatedReviews)
router.put("/moderate/:reviewId", verifyToken, moderateReview);
router.put("/edit/:reviewId", verifyToken, editReview)

module.exports = router;
