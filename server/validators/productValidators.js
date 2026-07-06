const {
  createValidator,
  isBoolean,
  isMongoId,
  isObject,
} = require("./_helpers");

const createProductValidation = [
  createValidator({
    path: "collectionId",
    validate: (v) => isMongoId(v),
    msg: "Valid collectionId required",
  }),
  createValidator({
    path: "name",
    validate: (v) =>
      typeof v === "string" && v.trim().length > 0 && v.trim().length <= 200,
    msg: "Name is required",
  }),
  createValidator({
    path: "price",
    validate: (v) => Number.isFinite(Number(v)) && Number(v) >= 0,
    msg: "Price must be a non-negative number",
  }),
  createValidator({
    path: "description",
    validate: (v) => typeof v === "string" && v.trim().length > 0,
    msg: "Description is required",
  }),
  createValidator({
    path: "stock",
    validate: (v) => Number.isInteger(Number(v)) && Number(v) >= 0,
    msg: "Stock must be a non-negative integer",
  }),
  createValidator({
    path: "images",
    validate: (v) => v !== undefined && v !== null && String(v).length > 0,
    msg: "At least one image is required",
  }),
  createValidator({
    path: "isDisplayed",
    validate: (v) => isBoolean(v),
    msg: "isDisplayed must be boolean",
    optional: true,
  }),
  createValidator({
    path: "isFeatured",
    validate: (v) => isBoolean(v),
    msg: "isFeatured must be boolean",
    optional: true,
  }),
  createValidator({
    path: "onSale",
    validate: (v) => isBoolean(v),
    msg: "onSale must be boolean",
    optional: true,
  }),
  createValidator({
    path: "salePrice",
    validate: (v) => Number.isFinite(Number(v)) && Number(v) >= 0,
    msg: "salePrice must be non-negative",
    optional: true,
  }),
];

const updateProductValidation = [
  createValidator({
    source: "params",
    path: "productId",
    validate: (v) => isMongoId(v),
    msg: "Invalid productId",
  }),
  createValidator({
    path: "name",
    validate: (v) =>
      typeof v === "string" && v.trim().length > 0 && v.trim().length <= 200,
    msg: "Invalid name",
    optional: true,
  }),
  createValidator({
    path: "price",
    validate: (v) => Number.isFinite(Number(v)) && Number(v) >= 0,
    msg: "Price must be non-negative",
    optional: true,
  }),
  createValidator({
    path: "stock",
    validate: (v) => Number.isInteger(Number(v)) && Number(v) >= 0,
    msg: "Stock must be non-negative",
    optional: true,
  }),
  createValidator({
    path: "collectionId",
    validate: (v) => isMongoId(v),
    msg: "Invalid collectionId",
    optional: true,
  }),
];

const deleteProductValidation = [
  createValidator({
    source: "params",
    path: "productId",
    validate: (v) => isMongoId(v),
    msg: "Invalid productId",
  }),
];

const deleteImageValidation = [
  createValidator({
    source: "params",
    path: "productId",
    validate: (v) => isMongoId(v),
    msg: "Invalid productId",
  }),
  createValidator({
    path: "_id",
    validate: (v) => typeof v === "string" && v.trim().length > 0,
    msg: "Image id is required",
  }),
  createValidator({
    path: "public_id",
    validate: (v) => typeof v === "string" && v.trim().length > 0,
    msg: "Image public_id is required",
  }),
];

const filterProductValidation = [
  createValidator({
    path: "filterObject",
    validate: (v) => isObject(v),
    msg: "filterObject must be provided",
  }),
  createValidator({
    path: "filterObject.searchQuery",
    validate: (v) => typeof v === "string" && v.length <= 100,
    msg: "searchQuery is invalid",
    optional: true,
  }),
  createValidator({
    path: "filterObject.priceRange",
    validate: (v) => Array.isArray(v) && v.length === 2,
    msg: "priceRange must have 2 values",
    optional: true,
  }),
  createValidator({
    path: "filterObject.sortBy",
    validate: (v) => typeof v === "string",
    msg: "sortBy is invalid",
    optional: true,
  }),
];

module.exports = {
  createProductValidation,
  updateProductValidation,
  deleteProductValidation,
  deleteImageValidation,
  filterProductValidation,
};
