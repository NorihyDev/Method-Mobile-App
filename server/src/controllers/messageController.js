const messageService = require('../services/messageService');
const { validateMessage } = require('../validators/messageValidator');
const logger = require('../utils/logger');

const getMessages = async (req, res, next) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 50, 100);
    const offset = parseInt(req.query.offset) || 0;

    const messages = await messageService.getRecentMessages(limit, offset);
    res.status(200).json({
      status: 200,
      data: messages
    });
  } catch (err) {
    next(err);
  }
};

const createMessage = async (req, res, next) => {
  try {
    const { message } = req.body;

    const validation = validateMessage(message);
    if (!validation.isValid) {
      return res.status(400).json({
        status: 400,
        message: 'Validation échouée',
        errors: validation.errors
      });
    }

    const messageId = await messageService.saveMessage(req.userId, message);
    
    logger.info('Message created via REST', { userId: req.userId, messageId });

    res.status(201).json({
      status: 201,
      message: 'Message créé avec succès',
      data: { id: messageId }
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMessages,
  createMessage
};
