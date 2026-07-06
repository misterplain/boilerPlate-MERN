function getByPath(source, path) {
  return path.split(".").reduce((acc, key) => {
    if (acc == null) return undefined;
    return acc[key];
  }, source);
}

function addError(req, path, msg) {
  if (!req._validationErrors) {
    req._validationErrors = [];
  }

  req._validationErrors.push({ path, msg });
}

function createValidator({
  source = "body",
  path,
  validate,
  msg,
  optional = false,
}) {
  return (req, res, next) => {
    const container = req[source] || {};
    const value = getByPath(container, path);

    if (optional && (value === undefined || value === null || value === "")) {
      return next();
    }

    const valid = validate(value, req);
    if (!valid) {
      addError(req, path, msg);
    }

    return next();
  };
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isBoolean(value) {
  return typeof value === "boolean";
}

function isObject(value) {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function isArray(value) {
  return Array.isArray(value);
}

function isMongoId(value) {
  return typeof value === "string" && /^[a-f\d]{24}$/i.test(value);
}

function isEmail(value) {
  return (
    typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
  );
}

module.exports = {
  createValidator,
  isNonEmptyString,
  isBoolean,
  isObject,
  isArray,
  isMongoId,
  isEmail,
};
