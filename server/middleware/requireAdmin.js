const { ForbiddenError } = require("../utils/errors");

const requireAdmin = (req, res, next) => {
  if (!req.isAdmin) {
    return next(new ForbiddenError("Admin access required"));
  }

  return next();
};

module.exports = requireAdmin;
