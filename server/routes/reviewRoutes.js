const router = require("express").Router();
const {
  createReview,
//   getReviewsforProduct,
//   deleteReview,
//   updateReview,
} = require("../controllers/reviewController.js");
const { verifyToken } = require("../middleware/verifyToken.js");

router.post("/new/:productId", verifyToken, createReview);
// router.get("/:productId", getReviewsForProduct);
// router.delete("/delete/:reviewId", deleteReview);
// router.put("/edit/:reviewId", updateReview);

module.exports = router;
