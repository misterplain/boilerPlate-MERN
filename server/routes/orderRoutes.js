const router = require("express").Router();
const {
  getAllOrders,
  getUserOrder,
  getOrdersTimePeriod,
  placeOrder,
  cancelOrder,
  editOrder,
  placeGuestOrder,
  searchOrders,
} = require("../controllers/orderController.js");
const { verifyToken } = require("../middleware/verifyToken.js");
const requireAdmin = require("../middleware/requireAdmin");
const validate = require("../middleware/validate");
const {
  placeOrderValidation,
  placeGuestOrderValidation,
  cancelOrderValidation,
  editOrderValidation,
  searchOrderValidation,
  quickViewValidation,
} = require("../validators/orderValidators");

router.get("/get", verifyToken, requireAdmin, getAllOrders);
router.get("/getuser", verifyToken, getUserOrder);

router.post("/new", verifyToken, placeOrderValidation, validate, placeOrder);
router.post("/newguest", placeGuestOrderValidation, validate, placeGuestOrder);
router.put(
  "/cancel/:orderId",
  verifyToken,
  cancelOrderValidation,
  validate,
  cancelOrder,
);
router.put(
  "/edit/:orderId",
  verifyToken,
  requireAdmin,
  editOrderValidation,
  validate,
  editOrder,
);

router.get(
  "/quick-view",
  verifyToken,
  requireAdmin,
  quickViewValidation,
  validate,
  getOrdersTimePeriod,
);
router.post(
  "/search",
  verifyToken,
  requireAdmin,
  searchOrderValidation,
  validate,
  searchOrders,
);

module.exports = router;
