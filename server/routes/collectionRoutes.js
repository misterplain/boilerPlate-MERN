const router = require("express").Router();
const {
  newCollection,
  getAllCollections,
  getCollection,
  deleteCollection,
  updateCollection,
  getPexel,
} = require("../controllers/collectionController.js");
const { verifyToken } = require("../middleware/verifyToken.js");
const requireAdmin = require("../middleware/requireAdmin");
const validate = require("../middleware/validate");
const {
  collectionIdValidation,
  createCollectionValidation,
  updateCollectionValidation,
  getPexelValidation,
} = require("../validators/collectionValidators");

router.get("/get", getAllCollections);
router.get(
  "/get/:collectionId",
  collectionIdValidation,
  validate,
  getCollection,
);
router.get("/pexel", getPexelValidation, validate, getPexel);

router.post(
  "/new",
  verifyToken,
  requireAdmin,
  createCollectionValidation,
  validate,
  newCollection,
);
router.delete(
  "/delete/:collectionId",
  verifyToken,
  requireAdmin,
  collectionIdValidation,
  validate,
  deleteCollection,
);
router.put(
  "/edit/:collectionId",
  verifyToken,
  requireAdmin,
  updateCollectionValidation,
  validate,
  updateCollection,
);

module.exports = router;
