const { createValidator, isMongoId, isEmail } = require("./_helpers");

const orderItemRules = [
  createValidator({
    path: "cartItems",
    validate: (value) =>
      Array.isArray(value) &&
      value.length > 0 &&
      value.every(
        (item) =>
          item &&
          isMongoId(item.product) &&
          Number.isInteger(Number(item.quantity)) &&
          Number(item.quantity) > 0 &&
          Number.isFinite(Number(item.pricePerUnit)) &&
          Number(item.pricePerUnit) >= 0 &&
          typeof item.name === "string" &&
          item.name.trim().length > 0,
      ),
    msg: "cartItems must contain valid items",
  }),
];

const addressRules = [
  createValidator({
    path: "shippingAddress.street",
    validate: (v) => typeof v === "string" && v.trim().length >= 2,
    msg: "Street is required",
  }),
  createValidator({
    path: "shippingAddress.city",
    validate: (v) => typeof v === "string" && v.trim().length >= 2,
    msg: "City is required",
  }),
  createValidator({
    path: "shippingAddress.postalCode",
    validate: (v) => typeof v === "string" && v.trim().length >= 2,
    msg: "Postal code is required",
  }),
  createValidator({
    path: "shippingAddress.country",
    validate: (v) => typeof v === "string" && v.trim().length >= 2,
    msg: "Country is required",
  }),
];

const placeOrderValidation = [
  ...orderItemRules,
  ...addressRules,
  createValidator({
    path: "emailAddress",
    validate: (v) => isEmail(v),
    msg: "Valid email required",
  }),
  createValidator({
    path: "totalPrice",
    validate: (v) => Number.isFinite(Number(v)) && Number(v) > 0,
    msg: "totalPrice must be greater than 0",
  }),
  createValidator({
    path: "isGuest",
    validate: (v) => typeof v === "boolean",
    msg: "isGuest must be boolean",
    optional: true,
  }),
  createValidator({
    path: "isPaid",
    validate: (v) => typeof v === "boolean",
    msg: "isPaid must be boolean",
    optional: true,
  }),
];

const placeGuestOrderValidation = [...placeOrderValidation];

const cancelOrderValidation = [
  createValidator({
    source: "params",
    path: "orderId",
    validate: (v) => isMongoId(v),
    msg: "Invalid orderId",
  }),
];

const editOrderValidation = [
  createValidator({
    source: "params",
    path: "orderId",
    validate: (v) => isMongoId(v),
    msg: "Invalid orderId",
  }),
  createValidator({
    path: "editRequest.type",
    validate: (v) => ["shippedToCourier", "isDelivered"].includes(v),
    msg: "Invalid editRequest.type",
  }),
];

const searchOrderValidation = [
  (req, res, next) => {
    if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
      if (!req._validationErrors) req._validationErrors = [];
      req._validationErrors.push({
        path: "body",
        msg: "Search filter object is required",
      });
    }
    return next();
  },
  createValidator({
    path: "emailAddress",
    validate: (v) => typeof v === "string",
    msg: "emailAddress must be a string",
    optional: true,
  }),
  createValidator({
    path: "postCode",
    validate: (v) => typeof v === "string",
    msg: "postCode must be a string",
    optional: true,
  }),
  createValidator({
    path: "shortId",
    validate: (v) => typeof v === "string",
    msg: "shortId must be a string",
    optional: true,
  }),
  createValidator({
    path: "courierTrackingNumber",
    validate: (v) => typeof v === "string",
    msg: "courierTrackingNumber must be a string",
    optional: true,
  }),
  createValidator({
    path: "orderStatus",
    validate: (v) =>
      [
        "All",
        "Cancelled",
        "In Production",
        "Delivered",
        "Shipped To Courier",
      ].includes(v),
    msg: "orderStatus is invalid",
    optional: true,
  }),
];

const quickViewValidation = [
  createValidator({
    source: "query",
    path: "days",
    validate: (v) =>
      Number.isInteger(Number(v)) && Number(v) >= 1 && Number(v) <= 3650,
    msg: "days must be an integer between 1 and 3650",
  }),
];

module.exports = {
  placeOrderValidation,
  placeGuestOrderValidation,
  cancelOrderValidation,
  editOrderValidation,
  searchOrderValidation,
  quickViewValidation,
};
