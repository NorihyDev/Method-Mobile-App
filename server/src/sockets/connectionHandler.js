const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

const authenticateSocket = (socket, next) => {
  const token = socket.handshake.auth.token;

  if (!token) {
    return next(new Error('Authentication required'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decoded.userId;
    socket.authenticated = true;
    next();
  } catch (err) {
    next(new Error('Invalid token'));
  }
};

const handleConnection = (socket) => {
  if (!socket.authenticated) {
    socket.disconnect();
    return;
  }

  logger.info('Socket connected', { userId: socket.userId, socketId: socket.id });

  socket.on('disconnect', () => {
    logger.info('Socket disconnected', { userId: socket.userId, socketId: socket.id });
  });
};

module.exports = {
  authenticateSocket,
  handleConnection
};
