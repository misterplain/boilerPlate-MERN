const router = require("express").Router();
const {
getCartItems, 
addCartItem,
deleteCartItem,
updateCart
} = require("../controllers/cartController.js");
const { verifyToken } = require("../middleware/verifyToken.js");

// public routes - none

// user only - protected route
router.get("/get", verifyToken, getCartItems);
router.post("/add/:productId", verifyToken, addCartItem);

router.post("/update", verifyToken, updateCart);
router.delete("/delete/:productId", verifyToken, deleteCartItem);

module.exports = router;