const { query, queryOne } = require('../config/database');
const { hashPassword, verifyPassword } = require('../utils/passwordHash');
const { generateToken } = require('../utils/tokenGenerator');
const logger = require('../utils/logger');

const registerUser = async (username, email, password) => {
  const existingUser = await queryOne('SELECT id FROM users WHERE username = ? OR email = ?', [username, email]);
  if (existingUser) {
    const err = new Error('Utilisateur existe déjà');
    err.statusCode = 409;
    throw err;
  }

  const passwordHash = await hashPassword(password);

  const result = await query(
    'INSERT INTO users (username, email, password_hash, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
    [username, email, passwordHash]
  );

  logger.info('User registered', { userId: result.insertId, username });

  return {
    id: result.insertId,
    username,
    email
  };
};

const loginUser = async (username, password, ipAddress) => {
  const user = await queryOne('SELECT id, username, email, password_hash, avatar_url FROM users WHERE username = ? AND is_active = 1', [username]);

  if (!user) {
    logger.warn('Failed login attempt', { username, ip: ipAddress });
    const err = new Error('Identifiants incorrects');
    err.statusCode = 401;
    throw err;
  }

  const isPasswordValid = await verifyPassword(password, user.password_hash);
  if (!isPasswordValid) {
    logger.warn('Failed login attempt', { userId: user.id, ip: ipAddress });
    const err = new Error('Identifiants incorrects');
    err.statusCode = 401;
    throw err;
  }

  const token = generateToken(user.id);

  await query('UPDATE users SET last_login = NOW() WHERE id = ?', [user.id]);
  logger.info('User logged in', { userId: user.id, ip: ipAddress });

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: user.avatar_url
    }
  };
};

const getUserById = async (userId) => {
  const user = await queryOne('SELECT id, username, email, avatar_url, created_at, last_login FROM users WHERE id = ?', [userId]);
  
  if (!user) {
    const err = new Error('Utilisateur non trouvé');
    err.statusCode = 404;
    throw err;
  }

  return user;
};

module.exports = {
  registerUser,
  loginUser,
  getUserById
};
