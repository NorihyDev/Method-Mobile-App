const { VALIDATION } = require('../config/constants');

const validateEmail = (email) => {
  return VALIDATION.EMAIL_REGEX.test(email);
};

const validateUsername = (username) => {
  return username.length >= VALIDATION.USERNAME_MIN && 
         username.length <= VALIDATION.USERNAME_MAX &&
         /^[a-zA-Z0-9_-]+$/.test(username);
};

const validatePassword = (password) => {
  return password.length >= VALIDATION.PASSWORD_MIN &&
         VALIDATION.PASSWORD_REGEX.test(password);
};

const validateRegister = (data) => {
  const errors = {};

  if (!data.username || !validateUsername(data.username)) {
    errors.username = 'Le pseudo doit contenir 3-20 caractères alphanumériques, - ou _';
  }

  if (!data.email || !validateEmail(data.email)) {
    errors.email = 'Adresse e-mail invalide';
  }

  if (!data.password || !validatePassword(data.password)) {
    errors.password = 'Le mot de passe doit contenir min 10 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial';
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Les mots de passe ne correspondent pas';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

const validateLogin = (data) => {
  const errors = {};

  if (!data.username) {
    errors.username = 'Pseudo requis';
  }

  if (!data.password) {
    errors.password = 'Mot de passe requis';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

module.exports = {
  validateEmail,
  validateUsername,
  validatePassword,
  validateRegister,
  validateLogin
};
