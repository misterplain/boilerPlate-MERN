const logger = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
  err.requestId = req.id;
  err.path = req.path;
  err.method = req.method;
  err.userId = req.userId || "anonymous";

  // log based on error type
  if (err.isOperational) {
    // Expected errors - log at info level
    logger.info("Operational error", {
      error: err.message,
      code: err.errorCode,
      statusCode: err.statusCode,
      requestId: err.requestId,
      userId: err.userId,
      path: err.path,
      method: err.method,
    });
  } else {
    // Unexpected errors - log at error level with full stack
    logger.error("Unexpected error", {
      error: err.message,
      stack: err.stack,
      requestId: err.requestId,
      userId: err.userId,
      path: err.path,
      method: err.method,
    });
  }

  // Handle Mongoose validation errors
  if (err.name === "ValidationError" && err.errors) {
    return res.status(400).json({
      error: "VALIDATION_ERROR",
      message: "Invalid input data",
      details: Object.values(err.errors).map((e) => ({
        field: e.path,
        message: e.message,
      })),
      requestId: err.requestId,
    });
  }

  // Handle Mongoose duplicate key errors
  if (err.name === "MongoServerError" && err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(409).json({
      error: "DUPLICATE_ENTRY",
      message: `A record with this ${field} already exists`,
      field: field,
      requestId: err.requestId,
    });
  }

  // Handle Mongoose cast errors (invalid ObjectId)
  if (err.name === "CastError") {
    return res.status(400).json({
      error: "INVALID_ID",
      message: `Invalid ${err.path}: ${err.value}`,
      requestId: err.requestId,
    });
  }

  // Handle JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      error: "INVALID_TOKEN",
      message: "Invalid authentication token",
      requestId: err.requestId,
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      error: "TOKEN_EXPIRED",
      message: "Authentication token has expired",
      requestId: err.requestId,
    });
  }

  // Handle operational errors (our custom errors)
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      error: err.errorCode,
      message: err.message,
      ...(err.fields && { fields: err.fields }),
      requestId: err.requestId,
    });
  }

  // Unexpected errors
  const message =
    process.env.NODE_ENV === "production"
      ? "An unexpected error occurred"
      : err.message;

  res.status(err.statusCode || 500).json({
    error: "INTERNAL_ERROR",
    message,
    requestId: err.requestId,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
};

module.exports = errorHandler;
