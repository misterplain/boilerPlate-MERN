const router = require("express").Router();
const {
  newProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  deleteImage,
  getFilteredProducts,
} = require("../controllers/productController.js");
const { verifyToken } = require("../middleware/verifyToken.js");
const requireAdmin = require("../middleware/requireAdmin");
const validate = require("../middleware/validate");
const {
  createProductValidation,
  updateProductValidation,
  deleteProductValidation,
  deleteImageValidation,
  filterProductValidation,
} = require("../validators/productValidators");

router.get("/get", getAllProducts);
router.post(
  "/get/filter",
  filterProductValidation,
  validate,
  getFilteredProducts,
);

router.post(
  "/new",
  verifyToken,
  requireAdmin,
  createProductValidation,
  validate,
  newProduct,
);
router.delete(
  "/delete/:productId",
  verifyToken,
  requireAdmin,
  deleteProductValidation,
  validate,
  deleteProduct,
);
router.put(
  "/deleteImage/:productId",
  verifyToken,
  requireAdmin,
  deleteImageValidation,
  validate,
  deleteImage,
);
router.put(
  "/edit/:productId",
  verifyToken,
  requireAdmin,
  updateProductValidation,
  validate,
  updateProduct,
);

module.exports = router;
