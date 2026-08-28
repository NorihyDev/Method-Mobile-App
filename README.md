# Method Gaming Platform

Modern Gaming Platform with Apache Cordova, Node.js, Express, MariaDB, and Socket.IO.

## Project Structure

```
Method_mobile_app/
├── www/                    (Cordova frontend)
│   ├── pages/             (HTML pages)
│   ├── css/               (Stylesheets)
│   ├── js/                (JavaScript modules)
│   └── assets/            (SVG, fonts, images)
│
├── server/                (Node.js backend)
│   ├── src/
│   │   ├── config/        (Database, constants)
│   │   ├── controllers/   (Request handlers)
│   │   ├── middleware/    (Express middleware)
│   │   ├── routes/        (API endpoints)
│   │   ├── services/      (Business logic)
│   │   ├── sockets/       (Socket.IO)
│   │   ├── database/      (Schema, migrations)
│   │   ├── validators/    (Input validation)
│   │   ├── utils/         (Utilities)
│   │   └── server.js      (Entry point)
│   ├── uploads/           (Avatar storage)
│   ├── .env               (Environment variables)
│   └── package.json
│
├── config.xml             (Cordova configuration)
└── package.json           (Project scripts)
```

## Installation

### Prerequisites
- Node.js 18+
- MariaDB 10.5+
- Apache Cordova 11+

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment:
- Edit `.env` with your database credentials
- Generate secure `SESSION_SECRET` and `JWT_SECRET`

4. Create MariaDB database:
```bash
mysql -u root -p < src/database/migrations/001_initial.sql
```

5. Start server:
```bash
npm start           # Production
npm run dev         # Development (with nodemon)
```

Server will run on `http://localhost:3000`

### Frontend Setup

1. Return to project root

2. Add Cordova platforms:
```bash
cordova platform add android
cordova platform add ios      # macOS only
```

3. Build and run:
```bash
cordova run browser           # Test in browser
cordova run android           # Android device
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Verify session

### Profile
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update profile
- `POST /api/profile/avatar` - Upload avatar
- `DELETE /api/profile/avatar` - Delete avatar

### Messages
- `GET /api/messages` - Get recent messages

## Socket.IO Events

### Chat Namespace `/chat`
- `send_message` - Send message to chat
- `new_message` - Receive new message
- `error` - Error event

## Environment Variables

### Development (.env)
```
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=method_app
DB_USER=method_user
DB_PASSWORD=***
SESSION_SECRET=***
JWT_SECRET=***
FRONTEND_URL=http://localhost:8000
```

## Security

- Passwords hashed with Argon2id
- JWT token authentication
- Rate limiting on auth endpoints
- CORS enabled for trusted origins
- Helmet security headers
- Input validation on all endpoints
- SQL injection protection via prepared statements
- XSS protection via content sanitization

## Development

### Run Backend & Frontend Simultaneously

Terminal 1 (Backend):
```bash
cd server
npm run dev
```

Terminal 2 (Frontend):
```bash
cordova run browser
```

### Database Management

View logs:
```bash
tail -f server/logs/app.log
```

Execute migrations:
```bash
cd server
mysql -u method_user -p method_app < src/database/migrations/001_initial.sql
```

## Next Steps

1. ✅ ÉTAPE 1: Architecture (Completed)
2. ✅ ÉTAPE 2: Cordova & Configuration (Completed)
3. ⏳ ÉTAPE 3: Frontend + Design System
4. ⏳ ÉTAPE 4: Splash + Navigation
5. ⏳ ÉTAPE 5: Login/Register
6. ⏳ ÉTAPE 6: Backend Services
7. ⏳ ÉTAPE 7: MariaDB Schema
8. ⏳ ÉTAPE 8: Secure Authentication
9. ⏳ ÉTAPE 9: Profile + Avatar
10. ⏳ ÉTAPE 10: Chat Socket.IO
11. ⏳ ÉTAPE 11: Anti-spam & Security
12. ⏳ ÉTAPE 12: Games (Coming Soon)
13. ⏳ ÉTAPE 13: Tests
14. ⏳ ÉTAPE 14: Android Build

## License

MIT
