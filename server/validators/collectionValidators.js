const { createValidator, isMongoId } = require("./_helpers");

const collectionIdValidation = [
  createValidator({
    source: "params",
    path: "collectionId",
    validate: (v) => isMongoId(v),
    msg: "Invalid collectionId",
  }),
];

const createCollectionValidation = [
  createValidator({
    path: "collectionData",
    validate: (v) => !!v && typeof v === "object" && !Array.isArray(v),
    msg: "collectionData is required",
  }),
  createValidator({
    path: "collectionData.name",
    validate: (v) =>
      typeof v === "string" && v.trim().length >= 1 && v.trim().length <= 100,
    msg: "Collection name is required",
  }),
  createValidator({
    path: "collectionData.image",
    validate: (v) => typeof v === "string" && v.trim().length > 0,
    msg: "Collection image is required",
  }),
];

const updateCollectionValidation = [
  ...collectionIdValidation,
  createValidator({
    path: "collectionData",
    validate: (v) => !!v && typeof v === "object" && !Array.isArray(v),
    msg: "collectionData is required",
  }),
  createValidator({
    path: "collectionData.name",
    validate: (v) =>
      typeof v === "string" && v.trim().length >= 1 && v.trim().length <= 100,
    msg: "Collection name is required",
  }),
  createValidator({
    path: "collectionData.image",
    validate: (v) => typeof v === "string" && v.trim().length > 0,
    msg: "Collection image is required",
  }),
];

const getPexelValidation = [
  createValidator({
    source: "query",
    path: "name",
    validate: (v) =>
      typeof v === "string" && v.trim().length >= 1 && v.trim().length <= 100,
    msg: "name query is required",
  }),
];

module.exports = {
  collectionIdValidation,
  createCollectionValidation,
  updateCollectionValidation,
  getPexelValidation,
};
