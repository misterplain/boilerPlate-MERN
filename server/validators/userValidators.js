const { createValidator, isMongoId } = require("./_helpers");

const addAddressValidation = [
  createValidator({
    path: "street",
    validate: (v) =>
      typeof v === "string" && v.trim().length >= 2 && v.trim().length <= 200,
    msg: "street is required",
  }),
  createValidator({
    path: "city",
    validate: (v) =>
      typeof v === "string" && v.trim().length >= 2 && v.trim().length <= 100,
    msg: "city is required",
  }),
  createValidator({
    path: "postalCode",
    validate: (v) =>
      typeof v === "string" && v.trim().length >= 2 && v.trim().length <= 20,
    msg: "postalCode is required",
  }),
  createValidator({
    path: "country",
    validate: (v) =>
      typeof v === "string" && v.trim().length >= 2 && v.trim().length <= 100,
    msg: "country is required",
  }),
  createValidator({
    path: "isDefault",
    validate: (v) => typeof v === "boolean",
    msg: "isDefault must be boolean",
    optional: true,
  }),
];

const deleteAddressValidation = [
  createValidator({
    source: "params",
    path: "addressId",
    validate: (v) => isMongoId(v),
    msg: "Invalid addressId",
  }),
];

const updateFavoritesValidation = [
  createValidator({
    path: "productId",
    validate: (v) => isMongoId(v),
    msg: "Invalid productId",
  }),
  createValidator({
    path: "method",
    validate: (v) => ["ADD", "REMOVE"].includes(v),
    msg: "method must be ADD or REMOVE",
  }),
];

const editProfileValidation = [
  createValidator({
    path: "profileData",
    validate: (v) => !!v && typeof v === "object" && !Array.isArray(v),
    msg: "profileData is required",
  }),
  createValidator({
    path: "profileData.username",
    validate: (v) =>
      typeof v === "string" && v.trim().length >= 3 && v.trim().length <= 30,
    msg: "username must be 3-30 characters",
  }),
  createValidator({
    path: "profileData.image",
    validate: (v) => typeof v === "string",
    msg: "profileData.image must be a string",
    optional: true,
  }),
];

module.exports = {
  addAddressValidation,
  deleteAddressValidation,
  updateFavoritesValidation,
  editProfileValidation,
};
