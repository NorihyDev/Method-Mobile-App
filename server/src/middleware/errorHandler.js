const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Une erreur est survenue.';
  const isDevelopment = process.env.NODE_ENV === 'development';

  // Handle Multer errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    statusCode = 413;
    message = 'Le fichier est trop volumineux. Maximum 2MB.';
  } else if (err.code === 'LIMIT_FILE_COUNT') {
    statusCode = 400;
    message = 'Un seul fichier est autorisé.';
  } else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    statusCode = 400;
    message = 'Fichier non autorisé.';
  }

  console.error(`[${new Date().toISOString()}] Error:`, {
    statusCode,
    message: err.message,
    stack: err.stack
  });

  const response = {
    status: statusCode,
    message: isDevelopment ? message : 'Une erreur est survenue.'
  };

  if (isDevelopment && err.details) {
    response.details = err.details;
  }

  res.status(statusCode).json(response);
};

module.exports = errorHandler;
