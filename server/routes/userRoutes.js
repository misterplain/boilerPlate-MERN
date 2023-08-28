const router = require("express").Router();
const {
  addAddress,
  deleteAddress,
  updateFavorites,
  editProfile,
} = require("../controllers/userController.js");
const { verifyToken } = require("../middleware/verifyToken.js");

router.post("/addaddress", verifyToken, addAddress);
router.delete("/deleteaddress/:addressId", verifyToken, deleteAddress);
router.post("/updateFavorites", verifyToken, updateFavorites)
router.put("/editprofile", verifyToken, editProfile);

module.exports = router
