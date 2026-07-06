const { ValidationError } = require("../utils/errors");

const validate = (req, res, next) => {
  const errors = req._validationErrors || [];

  if (errors.length > 0) {
    const fields = {};
    errors.forEach((err) => {
      fields[err.path] = err.msg;
    });

    return next(new ValidationError("Invalid request data", fields));
  }

  return next();
};

module.exports = validate;
