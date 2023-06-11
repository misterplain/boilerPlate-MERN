const router = require("express").Router();
const { createReview } = require("../controllers/reviewController.js");
const { verifyToken } = require("../middleware/verifyToken.js");

router.post("/new/:productId", verifyToken, createReview);

module.exports = router;
