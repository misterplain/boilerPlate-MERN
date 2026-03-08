// Base application error
class AppError extends Error {
  constructor(message, statusCode, errorCode) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Specific error types
class ValidationError extends AppError {
  constructor(message, fields = {}) {
    super(message, 400, "VALIDATION_ERROR");
    this.fields = fields;
  }
}

class BadRequestError extends AppError {
  constructor(message = "Bad request") {
    super(message, 400, "BAD_REQUEST");
  }
}

class NotFoundError extends AppError {
  constructor(resource, id = null) {
    const message = id
      ? `${resource} with id ${id} not found`
      : `${resource} not found`;
    super(message, 404, "NOT_FOUND");
    this.resource = resource;
    this.resourceId = id;
  }
}

class UnauthorizedError extends AppError {
  constructor(message = "Authentication required") {
    super(message, 401, "UNAUTHORIZED");
  }
}

class ForbiddenError extends AppError {
  constructor(message = "Insufficient permissions") {
    super(message, 403, "FORBIDDEN");
  }
}

class ConflictError extends AppError {
  constructor(message) {
    super(message, 409, "CONFLICT");
  }
}

class InsufficientStockError extends AppError {
  constructor(productName, available, requested) {
    super(
      `Insufficient stock for ${productName}. Available: ${available}, Requested: ${requested}`,
      400,
      "INSUFFICIENT_STOCK",
    );
    this.productName = productName;
    this.available = available;
    this.requested = requested;
  }
}

module.exports = {
  AppError,
  BadRequestError,
  ValidationError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
  InsufficientStockError,
};
