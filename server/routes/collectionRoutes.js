const router = require("express").Router()
const  {newCollection, getCollection, deleteCollection, updateCollection}  = require("../controllers/collectionController.js");

//create new collection
router.post("/new", newCollection);
router.get("/get/:collectionId", getCollection)
router.delete("/delete/:collectionId", deleteCollection);
router.put("/edit/:collectionId", updateCollection);


module.exports = router;