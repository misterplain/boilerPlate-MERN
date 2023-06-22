const router = require("express").Router();
const {
getAllOrders, placeOrder, deleteOrder, updateOrder, placeGuestOrder
} = require("../controllers/orderController.js");
const { verifyToken } = require("../middleware/verifyToken.js");

//public routes
router.get("/get", getAllOrders);

//admin only - protected routes 
router.post("/new", verifyToken, placeOrder);
router.post("/newguest", placeGuestOrder);
router.delete("/delete/:orderId", verifyToken, deleteOrder);
router.put("/update/:orderId", verifyToken, updateOrder)

module.exports = router;
