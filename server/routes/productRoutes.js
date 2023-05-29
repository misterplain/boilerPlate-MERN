const router = require("express").Router()
const  {newProduct, deleteProduct}  = require("../controllers/productController.js");

//create new collection
router.post("/new", newProduct);
router.delete("/delete", deleteProduct);

module.exports = router;