const router = require("express").Router();
const {
  addAddress,
  deleteAddress,
} = require("../controllers/userController.js");
const { verifyToken } = require("../middleware/verifyToken.js");

router.post("/addaddress", verifyToken, addAddress);
router.delete("/deleteaddress/:addressId", verifyToken, deleteAddress);

module.exports = router;
