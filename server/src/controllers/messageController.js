const messageService = require('../services/messageService');

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

module.exports = {
  getMessages
};
