const router = require("express").Router();
const {
  getCartItems,
  addCartItem,
  deleteCartItem,
  updateCart,
} = require("../controllers/cartController.js");
const { verifyToken } = require("../middleware/verifyToken.js");
const validate = require("../middleware/validate");
const {
  addCartItemValidation,
  deleteCartItemValidation,
  updateCartValidation,
} = require("../validators/cartValidators");

router.get("/get", verifyToken, getCartItems);
router.post(
  "/add/:productId",
  verifyToken,
  addCartItemValidation,
  validate,
  addCartItem,
);

router.post("/update", verifyToken, updateCartValidation, validate, updateCart);
router.delete(
  "/delete/:productId",
  verifyToken,
  deleteCartItemValidation,
  validate,
  deleteCartItem,
);

module.exports = router;
