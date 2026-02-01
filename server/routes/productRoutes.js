const router = require("express").Router();
const {
  newProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  deleteImage,
  getFilteredProducts
} = require("../controllers/productController.js");
const { verifyToken } = require("../middleware/verifyToken.js");


router.get("/get", getAllProducts);
router.post("/get/filter", getFilteredProducts)

router.post("/new", verifyToken, newProduct);
router.delete("/delete/:productId", verifyToken, deleteProduct);
router.put("/deleteImage/:productId", verifyToken, deleteImage);
router.put("/edit/:productId", verifyToken, updateProduct);

module.exports = router
