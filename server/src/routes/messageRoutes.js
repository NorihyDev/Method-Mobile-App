const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const messageController = require('../controllers/messageController');

// Rate limiter for message retrieval
const getMessagesLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30, // 30 requests per minute
  message: 'Trop de requêtes. Réessayez plus tard.',
  standardHeaders: false,
  legacyHeaders: false,
});

// Rate limiter for creating messages
const createMessageLimiter = rateLimit({
  windowMs: 10 * 1000, // 10 seconds
  max: 5, // 5 messages per 10 seconds
  message: 'Trop de messages. Ralentissez!',
  standardHeaders: false,
  legacyHeaders: false,
});

router.get('/', authMiddleware, getMessagesLimiter, messageController.getMessages);
router.post('/', authMiddleware, createMessageLimiter, messageController.createMessage);

module.exports = router;
