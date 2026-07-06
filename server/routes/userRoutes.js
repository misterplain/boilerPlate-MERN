const router = require("express").Router();
const {
  addAddress,
  deleteAddress,
  updateFavorites,
  editProfile,
} = require("../controllers/userController.js");
const { verifyToken } = require("../middleware/verifyToken.js");
const validate = require("../middleware/validate");
const {
  addAddressValidation,
  deleteAddressValidation,
  updateFavoritesValidation,
  editProfileValidation,
} = require("../validators/userValidators");

router.post(
  "/addaddress",
  verifyToken,
  addAddressValidation,
  validate,
  addAddress,
);
router.delete(
  "/deleteaddress/:addressId",
  verifyToken,
  deleteAddressValidation,
  validate,
  deleteAddress,
);
router.post(
  "/updateFavorites",
  verifyToken,
  updateFavoritesValidation,
  validate,
  updateFavorites,
);
router.put(
  "/editprofile",
  verifyToken,
  editProfileValidation,
  validate,
  editProfile,
);

module.exports = router;
