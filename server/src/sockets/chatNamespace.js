const { authenticateSocket, handleConnection } = require('./connectionHandler');
const { saveMessage } = require('../services/messageService');
const { validateMessage } = require('../validators/messageValidator');
const logger = require('../utils/logger');

const setupChatNamespace = (io) => {
  const chat = io.of('/chat');

  chat.use(authenticateSocket);

  chat.on('connection', (socket) => {
    handleConnection(socket);

    socket.on('send_message', async (payload) => {
      try {
        const { message } = payload;

        const validation = validateMessage(message);
        if (!validation.isValid) {
          socket.emit('error', { message: validation.errors[0] });
          return;
        }

        await saveMessage(socket.userId, message);

        chat.emit('new_message', {
          userId: socket.userId,
          message: message,
          timestamp: new Date()
        });

        logger.info('Message sent', { userId: socket.userId, messageLength: message.length });
      } catch (err) {
        socket.emit('error', { message: 'Une erreur est survenue' });
        logger.error('Error sending message', { userId: socket.userId, error: err.message });
      }
    });
  });
};

module.exports = {
  setupChatNamespace
};
