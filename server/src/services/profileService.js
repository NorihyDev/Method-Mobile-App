const { query, queryOne } = require('../config/database');
const { saveAvatar, deleteAvatar, getAvatarPath } = require('../utils/fileHandler');

const getUserProfile = async (userId) => {
  const user = await queryOne('SELECT id, username, email, avatar_url, created_at, last_login FROM users WHERE id = ?', [userId]);

  if (!user) {
    const err = new Error('Utilisateur non trouvé');
    err.statusCode = 404;
    throw err;
  }

  return {
    ...user,
    avatar: user.avatar_url ? getAvatarPath(user.avatar_url) : null
  };
};

const updateUserProfile = async (userId, updates) => {
  if (updates.username) {
    const existing = await queryOne('SELECT id FROM users WHERE username = ? AND id != ?', [updates.username, userId]);
    if (existing) {
      const err = new Error('Ce pseudo est déjà utilisé');
      err.statusCode = 409;
      throw err;
    }

    await query('UPDATE users SET username = ?, updated_at = NOW() WHERE id = ?', [updates.username, userId]);
  }

  return await getUserProfile(userId);
};

const uploadUserAvatar = async (userId, buffer, filename) => {
  const user = await queryOne('SELECT avatar_url FROM users WHERE id = ?', [userId]);
  if (!user) {
    const err = new Error('Utilisateur non trouvé');
    err.statusCode = 404;
    throw err;
  }

  if (user.avatar_url) {
    deleteAvatar(user.avatar_url);
  }

  const newFilename = await saveAvatar(buffer, filename);
  await query('UPDATE users SET avatar_url = ?, updated_at = NOW() WHERE id = ?', [newFilename, userId]);

  return {
    avatar: getAvatarPath(newFilename)
  };
};

const deleteUserAvatar = async (userId) => {
  const user = await queryOne('SELECT avatar_url FROM users WHERE id = ?', [userId]);

  if (user && user.avatar_url) {
    deleteAvatar(user.avatar_url);
    await query('UPDATE users SET avatar_url = NULL, updated_at = NOW() WHERE id = ?', [userId]);
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  uploadUserAvatar,
  deleteUserAvatar
};
