function sanitizeKeys(input) {
  if (!input || typeof input !== "object") {
    return input;
  }

  if (Array.isArray(input)) {
    return input.map(sanitizeKeys);
  }

  const output = {};
  Object.keys(input).forEach((key) => {
    if (key.startsWith("$") || key.includes(".")) {
      return;
    }

    output[key] = sanitizeKeys(input[key]);
  });

  return output;
}

function requestSanitizer(req, res, next) {
  req.body = sanitizeKeys(req.body);
  req.query = sanitizeKeys(req.query);
  req.params = sanitizeKeys(req.params);
  return next();
}

function sanitizeString(input) {
  if (typeof input !== "string") {
    return input;
  }

  return input
    .replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "");
}

function sanitizeValues(input) {
  if (Array.isArray(input)) {
    return input.map(sanitizeValues);
  }

  if (!input || typeof input !== "object") {
    return sanitizeString(input);
  }

  const output = {};
  Object.keys(input).forEach((key) => {
    output[key] = sanitizeValues(input[key]);
  });

  return output;
}

function xssSanitizer(req, res, next) {
  req.body = sanitizeValues(req.body);
  req.query = sanitizeValues(req.query);
  req.params = sanitizeValues(req.params);
  return next();
}

function basicSecurityHeaders(req, res, next) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  return next();
}

function configureSecurityMiddleware(app) {
  app.use(basicSecurityHeaders);
  app.use(requestSanitizer);
  app.use(xssSanitizer);
}

module.exports = configureSecurityMiddleware;
