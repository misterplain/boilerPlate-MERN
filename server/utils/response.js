function successResponse(res, message, data = null, statusCode = 200) {
  const payload = {
    success: true,
    message,
    requestId: res?.req?.id,
  };

  if (data !== null) {
    payload.data = data;
  }

  return res.status(statusCode).json(payload);
}

function errorResponse(
  res,
  message,
  statusCode = 500,
  error = "INTERNAL_ERROR",
) {
  return res.status(statusCode).json({
    success: false,
    error,
    message,
    requestId: res?.req?.id,
  });
}

module.exports = {
  successResponse,
  errorResponse,
};
