const router = require("express").Router();
const {
  newProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController.js");

//create new collection
router.post("/new", newProduct)
router.get("/get", getAllProducts);
router.delete("/delete/:productId", deleteProduct);
router.put("/edit/:productId", updateProduct);

module.exports = router;
