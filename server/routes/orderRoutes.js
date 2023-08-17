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

router.get("/get", getAllOrders);
router.get("/getuser", verifyToken, getUserOrder);

router.post("/new", verifyToken, placeOrder);
router.post("/newguest", placeGuestOrder);
router.put("/cancel/:orderId", verifyToken, cancelOrder);
router.put("/edit/:orderId", verifyToken, editOrder);

//adminOrders (quick view and advanced search)
router.get("/quick-view", verifyToken, getOrdersTimePeriod);
router.post("/search", verifyToken, searchOrders);

module.exports = router;
