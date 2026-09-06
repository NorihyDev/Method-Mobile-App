require('dotenv').config();
const { query } = require('../../config/database');
const { hashPassword } = require('../../utils/passwordHash');
const logger = require('../../utils/logger');

const seedDatabase = async () => {
  try {
    logger.info('🌱 Starting database seeding...');

    // Clear existing data
    await query('DELETE FROM security_logs');
    await query('DELETE FROM sessions');
    await query('DELETE FROM messages');
    await query('DELETE FROM users');

    logger.info('✓ Cleared existing data');

    // Create test users
    const testUsers = [
      {
        username: 'player1',
        email: 'player1@method.local',
        password: 'TestPass@123'
      },
      {
        username: 'player2',
        email: 'player2@method.local',
        password: 'TestPass@123'
      },
      {
        username: 'admin',
        email: 'admin@method.local',
        password: 'AdminPass@123'
      }
    ];

    const createdUsers = [];

    for (const user of testUsers) {
      const passwordHash = await hashPassword(user.password);
      const role = user.username === 'admin' ? 'admin' : 'user';
      
      const result = await query(
        'INSERT INTO users (username, email, password_hash, role, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())',
        [user.username, user.email, passwordHash, role]
      );

      createdUsers.push({
        id: result.insertId,
        username: user.username,
        email: user.email
      });

      logger.info(`✓ Created user: ${user.username}`);
    }

    // Create test messages
    const testMessages = [
      { userId: createdUsers[0].id, message: 'Salut tout le monde! 🎮' },
      { userId: createdUsers[1].id, message: 'Bienvenue sur Method Gaming!' },
      { userId: createdUsers[0].id, message: 'Qui veut jouer une partie?' },
      { userId: createdUsers[2].id, message: 'Bienvenue sur notre plateforme 👋' },
      { userId: createdUsers[1].id, message: 'Déjà connecté, cool!' }
    ];

    for (const msg of testMessages) {
      await query(
        'INSERT INTO messages (user_id, message, created_at) VALUES (?, ?, NOW())',
        [msg.userId, msg.message]
      );
    }

    logger.info(`✓ Created ${testMessages.length} test messages`);

    logger.info('✅ Database seeded successfully!');
    logger.info('Test users:');
    createdUsers.forEach(u => {
      logger.info(`  - ${u.username} (${u.email}) - Password: TestPass@123`);
    });
    logger.info(`  - ${createdUsers[2].username} (${createdUsers[2].email}) - Password: AdminPass@123`);

    process.exit(0);
  } catch (err) {
    logger.error('❌ Seeding failed', { error: err.message });
    console.error(err);
    process.exit(1);
  }
};

seedDatabase();
