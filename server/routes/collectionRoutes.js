const router = require("express").Router();
const {
  newCollection,
  getAllCollections,
  getCollection,
  deleteCollection,
  updateCollection,
} = require("../controllers/collectionController.js");
const { verifyToken } = require("../middleware/verifyToken.js");

//public routes
router.get("/get", getAllCollections);
router.get("/get/:collectionId", getCollection);

//admin only - protected routes 
router.post("/new", verifyToken, newCollection);
router.delete("/delete/:collectionId", verifyToken, deleteCollection);
router.put("/edit/:collectionId", verifyToken, updateCollection);

module.exports = router;
