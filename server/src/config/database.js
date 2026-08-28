const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectionLimit: 10
});

const query = async (sql, params = []) => {
  let conn;
  try {
    conn = await pool.getConnection();
    return await conn.query(sql, params);
  } catch (err) {
    console.error('Database error:', err);
    throw err;
  } finally {
    if (conn) conn.release();
  }
};

const queryOne = async (sql, params = []) => {
  const result = await query(sql, params);
  return result[0] || null;
};

module.exports = {
  pool,
  query,
  queryOne
};
