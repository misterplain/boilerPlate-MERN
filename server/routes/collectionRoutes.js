const router = require("express").Router()
const  {newCollection, getCollection}  = require("../controllers/collectionController.js");

//create new collection
router.get("/", getCollection)
router.post("/new", newCollection);

module.exports = router;