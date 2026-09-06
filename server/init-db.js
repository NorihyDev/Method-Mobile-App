require('dotenv').config();
const mariadb = require('mariadb');
const fs = require('fs');

const initDatabase = async () => {
  // Try passwords in order: command line arg, env var, then common ones
  const passwordsToTry = [
    process.argv[2],           // From command line
    process.env.MYSQL_ROOT_PASSWORD,
    '',                        // No password
    'root',                    // Common default
    'password',                // Generic password
    'mariadb',                 // MariaDB
    '123456',                  // Common numeric
  ].filter(p => p !== undefined);

  let conn = null;
  let connectionPool = null;
  let rootPassword = null;

  for (const password of passwordsToTry) {
    try {
      if (process.argv[2] === password) {
        console.log(`🔌 Attempting connection with provided password...`);
      } else {
        console.log(`🔌 Attempting connection with root password: "${password || '(empty)'}"`);
      }
      
      connectionPool = mariadb.createPool({
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        user: 'root',
        password: password || undefined,
        multipleStatements: true,
        connectionLimit: 1
      });

      conn = await connectionPool.getConnection();
      rootPassword = password;
      console.log('✅ Connected to MariaDB!');
      break;
    } catch (err) {
      if (connectionPool) {
        try {
          await connectionPool.end();
        } catch (e) {}
      }
      connectionPool = null;
      continue;
    }
  }

  if (!conn) {
    console.error('❌ Could not connect to MariaDB');
    console.log('\n💡 Usage:');
    console.log('   node init-db.js "your_root_password"');
    console.log('\nExample:');
    console.log('   node init-db.js "Super"');
    process.exit(1);
  }

  try {
    // Read the migration SQL file
    const sqlFile = fs.readFileSync('./src/database/migrations/001_initial.sql', 'utf8');

    console.log('🗄️  Creating database...');
    await conn.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``);
    
    // Select the database
    await conn.query(`USE \`${process.env.DB_NAME}\``);

    console.log('👤 Creating application user...');
    try {
      await conn.query(`DROP USER IF EXISTS '${process.env.DB_USER}'@'localhost'`);
    } catch (e) {}
    
    await conn.query(`
      CREATE USER '${process.env.DB_USER}'@'localhost' IDENTIFIED BY '${process.env.DB_PASSWORD}'
    `);
    await conn.query(`
      GRANT ALL PRIVILEGES ON \`${process.env.DB_NAME}\`.* TO '${process.env.DB_USER}'@'localhost'
    `);
    await conn.query('FLUSH PRIVILEGES');

    console.log('📋 Creating tables...');
    // Split by semicolon and execute each statement
    const statements = sqlFile.split(';').filter(s => s.trim());
    
    for (const statement of statements) {
      if (statement.trim()) {
        try {
          await conn.query(statement);
        } catch (err) {
          if (!err.message.includes('already exists')) {
            throw err;
          }
        }
      }
    }

    console.log('\n✅ Database initialized successfully!');
    console.log(`   Database: ${process.env.DB_NAME}`);
    console.log(`   User: ${process.env.DB_USER}`);
    console.log(`   Password: ${process.env.DB_PASSWORD}`);
    console.log('\n🎉 Ready to test the API!');

    await conn.end();
    await connectionPool.end();
  } catch (err) {
    console.error('❌ Error initializing database:', err.message);
    if (conn) await conn.end();
    if (connectionPool) await connectionPool.end();
    process.exit(1);
  }
};

initDatabase();
