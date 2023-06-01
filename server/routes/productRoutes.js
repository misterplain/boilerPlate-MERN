const router = require("express").Router();
const {
  newProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController.js");
const { verifyToken } = require("../middleware/verifyToken.js");

//public routes
router.get("/get", getAllProducts);

//protected routes
router.post("/new",verifyToken, newProduct)
router.delete("/delete/:productId", verifyToken, deleteProduct);
router.put("/edit/:productId", verifyToken, updateProduct);

module.exports = router;
