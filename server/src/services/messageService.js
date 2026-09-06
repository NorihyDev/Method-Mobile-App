    const { query } = require('../config/database');

    const getRecentMessages = async (limit = 50, offset = 0) => {
    const messages = await query(`
        SELECT m.id, m.user_id, m.message, m.created_at, u.username, u.avatar_url
        FROM messages m
        JOIN users u ON m.user_id = u.id
        ORDER BY m.created_at DESC
        LIMIT ? OFFSET ?
    `, [limit, offset]);

    return messages.reverse();
    };

    const saveMessage = async (userId, messageText) => {
    const result = await query('INSERT INTO messages (user_id, message, created_at) VALUES (?, ?, NOW())', [userId, messageText]);
    return Number(result.insertId);
    };

    module.exports = {
    getRecentMessages,
    saveMessage
    };
