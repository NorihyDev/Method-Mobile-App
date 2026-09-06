const logger = require('../utils/logger');

// Middleware pour logger les requêtes
const requestLogger = (req, res, next) => {
  const startTime = Date.now();

  // Override res.json pour capturer la réponse
  const originalJson = res.json.bind(res);
  res.json = function(data) {
    const duration = Date.now() - startTime;
    const method = req.method;
    const url = req.originalUrl;
    const statusCode = res.statusCode;

    const logLevel = statusCode >= 400 ? 'ERROR' : statusCode >= 300 ? 'WARN' : 'INFO';
    const logMessage = `${method} ${url} - ${statusCode} (${duration}ms)`;
    
    const logData = {
      method,
      url,
      statusCode,
      duration,
      userId: req.userId || 'anonymous'
    };

    if (statusCode >= 400) {
      logger.error(logMessage, logData);
    } else if (statusCode >= 300) {
      logger.warn(logMessage, logData);
    } else {
      logger.info(logMessage, logData);
    }

    return originalJson(data);
  };

  next();
};

module.exports = requestLogger;
