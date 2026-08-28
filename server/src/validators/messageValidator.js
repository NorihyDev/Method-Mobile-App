const { VALIDATION } = require('../config/constants');

const validateMessage = (message) => {
  const errors = [];

  if (!message || message.trim().length === 0) {
    errors.push('Le message ne peut pas être vide');
  }

  if (message.length > VALIDATION.MESSAGE_MAX) {
    errors.push(`Le message ne doit pas dépasser ${VALIDATION.MESSAGE_MAX} caractères`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

module.exports = {
  validateMessage
};
