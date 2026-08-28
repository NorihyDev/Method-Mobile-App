const VALIDATION = {
  USERNAME_MIN: 3,
  USERNAME_MAX: 20,
  PASSWORD_MIN: 10,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_REGEX: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])/,
  MESSAGE_MAX: 500
};

const RATE_LIMIT = {
  LOGIN_ATTEMPTS: 5,
  LOGIN_WINDOW_MS: 15 * 60 * 1000,
  MESSAGE_LIMIT: 5,
  MESSAGE_WINDOW_MS: 10 * 1000
};

const AVATAR = {
  MAX_SIZE: 2097152,
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.webp'],
  RESIZE_WIDTH: 512,
  RESIZE_HEIGHT: 512
};

const ROLES = {
  USER: 'user',
  ADMIN: 'admin'
};

module.exports = {
  VALIDATION,
  RATE_LIMIT,
  AVATAR,
  ROLES
};
