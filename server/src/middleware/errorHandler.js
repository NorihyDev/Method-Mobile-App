const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const isDevelopment = process.env.NODE_ENV === 'development';

  console.error(`[${new Date().toISOString()}] Error:`, {
    statusCode,
    message: err.message,
    stack: err.stack
  });

  const response = {
    status: statusCode,
    message: isDevelopment ? err.message : 'Une erreur est survenue.'
  };

  if (isDevelopment && err.details) {
    response.details = err.details;
  }

  res.status(statusCode).json(response);
};

module.exports = errorHandler;
