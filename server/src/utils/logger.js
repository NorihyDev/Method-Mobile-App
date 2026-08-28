const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '../../logs', 'app.log');

const ensureLogDir = () => {
  const logDir = path.dirname(logFile);
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
};

const log = (level, message, data = {}) => {
  ensureLogDir();
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level}] ${message} ${JSON.stringify(data)}\n`;
  
  fs.appendFileSync(logFile, logMessage);
  console.log(logMessage);
};

const info = (message, data) => log('INFO', message, data);
const error = (message, data) => log('ERROR', message, data);
const warn = (message, data) => log('WARN', message, data);

module.exports = {
  info,
  error,
  warn
};
