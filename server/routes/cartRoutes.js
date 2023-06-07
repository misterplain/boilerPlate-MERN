const router = require("express").Router();
const {
getCartItems, 
addCartItem,
deleteCartItem,
} = require("../controllers/cartController.js");
const { verifyToken } = require("../middleware/verifyToken.js");

// public routes - none

// user only - protected routes
router.get("/get", verifyToken, getCartItems);
router.post("/add/:productId", verifyToken, addCartItem);
router.delete("/delete/:productId", verifyToken, deleteCartItem);

module.exports = router;