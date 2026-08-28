const { VALIDATION, AVATAR } = require('../config/constants');

const validateProfileUpdate = (data) => {
  const errors = {};

  if (data.username && !validateUsername(data.username)) {
    errors.username = 'Le pseudo doit contenir 3-20 caractères alphanumériques, - ou _';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

const validateUsername = (username) => {
  return username.length >= VALIDATION.USERNAME_MIN && 
         username.length <= VALIDATION.USERNAME_MAX &&
         /^[a-zA-Z0-9_-]+$/.test(username);
};

const validateAvatar = (file) => {
  const errors = [];

  if (!file) {
    errors.push('Fichier requis');
  } else {
    if (file.size > AVATAR.MAX_SIZE) {
      errors.push(`La taille doit être inférieure à ${AVATAR.MAX_SIZE / 1024 / 1024}MB`);
    }

    if (!AVATAR.ALLOWED_TYPES.includes(file.mimetype)) {
      errors.push('Format autorisé: JPEG, PNG, WEBP');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

module.exports = {
  validateProfileUpdate,
  validateAvatar
};
