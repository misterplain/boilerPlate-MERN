const router = require("express").Router()
const  {newCollection, getAllCollections, getCollection, deleteCollection, updateCollection}  = require("../controllers/collectionController.js");
const {verifyAdminToken} = require("../middleware/verifyAdminToken.js");

//create new collection
router.post("/new", verifyAdminToken, newCollection);
router.get("/get", getAllCollections);
router.get("/get/:collectionId", getCollection)
router.delete("/delete/:collectionId", verifyAdminToken, deleteCollection);
router.put("/edit/:collectionId",verifyAdminToken, updateCollection);


module.exports = router;