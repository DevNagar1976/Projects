export const notFound = (req, res) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` });
};

export const errorHandler = (error, _req, res, _next) => {
  console.error(error);
  if (error.name === 'CastError') {
    return res.status(400).json({ success: false, message: 'Invalid resource id' });
  }
  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Internal server error'
  });
};
