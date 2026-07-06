const { createValidator, isMongoId } = require("./_helpers");

const productIdParamValidation = [
  createValidator({
    source: "params",
    path: "productId",
    validate: (v) => isMongoId(v),
    msg: "Invalid productId",
  }),
];

const addCartItemValidation = [
  ...productIdParamValidation,
  createValidator({
    path: "quantity",
    validate: (v) => Number.isInteger(Number(v)) && Number(v) >= 1,
    msg: "quantity must be at least 1",
  }),
  createValidator({
    path: "price",
    validate: (v) => Number.isFinite(Number(v)) && Number(v) >= 0,
    msg: "price must be non-negative",
  }),
  createValidator({
    path: "name",
    validate: (v) => typeof v === "string" && v.trim().length > 0,
    msg: "name is required",
  }),
];

const deleteCartItemValidation = [
  ...productIdParamValidation,
  createValidator({
    path: "quantity",
    validate: (v) => Number.isInteger(Number(v)) && Number(v) >= 1,
    msg: "quantity must be at least 1",
  }),
  createValidator({
    path: "price",
    validate: (v) => Number.isFinite(Number(v)) && Number(v) >= 0,
    msg: "price must be non-negative",
  }),
  createValidator({
    path: "name",
    validate: (v) => typeof v === "string" && v.trim().length > 0,
    msg: "name is required",
  }),
];

const updateCartValidation = [
  createValidator({
    path: "cartItems",
    validate: (value) =>
      Array.isArray(value) &&
      value.every(
        (item) =>
          item &&
          isMongoId(item.product) &&
          Number.isInteger(Number(item.quantity)) &&
          Number(item.quantity) >= 1 &&
          Number.isFinite(Number(item.pricePerUnit)) &&
          Number(item.pricePerUnit) >= 0 &&
          typeof item.name === "string" &&
          item.name.trim().length > 0,
      ),
    msg: "cartItems must be a valid array of cart items",
  }),
];

module.exports = {
  addCartItemValidation,
  deleteCartItemValidation,
  updateCartValidation,
};
