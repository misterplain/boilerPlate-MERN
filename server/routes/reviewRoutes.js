const router = require("express").Router();
const {
  createReview,
//   getReviewsforProduct,
//   deleteReview,
//   updateReview,
} = require("../controllers/reviewController.js");
const { verifyUserToken } = require("../middleware/verifyUserToken.js");

router.post("/new/:productId", verifyUserToken, createReview);
// router.get("/:productId", getReviewsForProduct);
// router.delete("/delete/:reviewId", deleteReview);
// router.put("/edit/:reviewId", updateReview);

module.exports = router;
