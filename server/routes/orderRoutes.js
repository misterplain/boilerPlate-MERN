const router = require("express").Router();
const {
getAllOrders, getUserOrder, placeOrder, cancelOrder, editOrder, placeGuestOrder
} = require("../controllers/orderController.js");
const { verifyToken } = require("../middleware/verifyToken.js");

//public routes
router.get("/get", getAllOrders);
router.get("/getuser", verifyToken, getUserOrder);

//admin only - protected routes 
router.post("/new", verifyToken, placeOrder);
router.post("/newguest", placeGuestOrder);
router.put("/cancel/:orderId", verifyToken, cancelOrder);
router.put("/edit/:orderId", verifyToken, editOrder)

module.exports = router;
