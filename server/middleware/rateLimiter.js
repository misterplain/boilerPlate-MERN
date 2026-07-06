const rateLimit = require("express-rate-limit");

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === "production" ? 8 : 30,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  keyGenerator: (req) => {
    const email = (req.body?.email || "unknown").toLowerCase();
    return `${req.ip}:${email}`;
  },
  handler: (req, res) => {
    const retryAfterMs = req.rateLimit?.resetTime
      ? new Date(req.rateLimit.resetTime).getTime() - Date.now()
      : 15 * 60 * 1000;

    const retryAfter = Math.max(1, Math.ceil(retryAfterMs / 1000));
    res.status(429).json({
      error: "TOO_MANY_REQUESTS",
      message: "Too many authentication attempts. Please try again later.",
      retryAfter,
      requestId: req.id,
    });
  },
});

module.exports = {
  authLimiter,
};
