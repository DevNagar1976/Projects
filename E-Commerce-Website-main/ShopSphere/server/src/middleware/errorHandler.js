export function notFound(req, res) {
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` });
}

export function errorHandler(error, req, res, next) {
  if (res.headersSent) return next(error);

  let status = res.statusCode >= 400 ? res.statusCode : 500;
  let message = error.message || "Internal server error";

  if (error.name === "CastError") {
    status = 400;
    message = "Invalid resource id";
  }
  if (error.code === 11000) {
    status = 409;
    message = `${Object.keys(error.keyPattern || {})[0] || "Value"} already exists`;
  }
  if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
    status = 401;
    message = "Your session is invalid or expired";
  }

  res.status(status).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}),
  });
}
