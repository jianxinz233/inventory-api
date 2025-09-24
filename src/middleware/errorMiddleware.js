// 404 handler
export const notFound = (req, res, _next) => {
  res.status(404).json({ error: "404 Not found" });
};

// Centralized error handler
export const errorHandler = (err, _req, res, _next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || "Internal Server Error",
  });
};
