# Method Gaming Platform - Backend Server

API serveur pour la plateforme de jeux Method Gaming avec Node.js, Express, MariaDB et Socket.IO.

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+
- MariaDB 10.5+ ou MySQL 8.0+
- npm ou yarn

### Installation

1. **Naviguer vers le dossier serveur**
```bash
cd server
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**
   - Copier/modifier le fichier `.env` avec vos paramètres
   - Les variables par défaut sont pour développement local

### Configuration Base de Données

1. **Créer la base de données**
```bash
mysql -u root -p < src/database/migrations/001_initial.sql
```

2. **Remplir avec données de test (optionnel)**
```bash
npm run seed
```

Cela crée 3 utilisateurs de test :
- `player1` / `player2` : TestPass@123
- `admin` : AdminPass@123

### Démarrage

**Mode développement** (avec hot-reload)
```bash
npm run dev
```

**Mode production**
```bash
npm start
```

Le serveur démarre sur `http://localhost:3000` par défaut.

### 🧪 Tester l'API

```bash
# Health check
curl http://localhost:3000/health

# Enregistrement
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"TestPass@123","confirmPassword":"TestPass@123"}'

# Connexion
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"player1","password":"TestPass@123"}'

# Récupérer le profil (utiliser le token reçu)
curl http://localhost:3000/api/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# Créer un message
curl -X POST http://localhost:3000/api/messages \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"message":"Hello World!"}'

# Récupérer les messages
curl http://localhost:3000/api/messages \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 📚 Documentation API

### Authentification

#### Register
- **POST** `/api/auth/register`
- Body: `{ username, email, password, confirmPassword }`
- Response: `{ token, user }`

#### Login
- **POST** `/api/auth/login`
- Body: `{ username, password }`
- Response: `{ token, user }`

#### Get Current User
- **GET** `/api/auth/me`
- Auth: JWT Token
- Response: `{ user }`

### Profil Utilisateur

#### Get Profile
- **GET** `/api/profile`
- Auth: JWT Token

#### Update Profile
- **PUT** `/api/profile`
- Auth: JWT Token
- Body: `{ username }`

#### Upload Avatar
- **POST** `/api/profile/avatar`
- Auth: JWT Token
- Form-Data: `avatar` (file, max 2MB)
- Formats acceptés: JPEG, PNG, WEBP

#### Delete Avatar
- **DELETE** `/api/profile/avatar`
- Auth: JWT Token

### Messages

#### Get Messages
- **GET** `/api/messages?limit=50&offset=0`
- Auth: JWT Token
- Query: `limit` (max 100), `offset`

#### Create Message
- **POST** `/api/messages`
- Auth: JWT Token
- Body: `{ message }`
- Max 500 caractères

### Socket.IO Chat

Connectez-vous au namespace `/chat` avec un token JWT :

```javascript
const socket = io('http://localhost:3000/chat', {
  auth: {
    token: 'YOUR_JWT_TOKEN'
  }
});

// Envoyer un message
socket.emit('send_message', { message: 'Hello!' });

// Recevoir les nouveaux messages
socket.on('new_message', (data) => {
  console.log(data); // { userId, message, timestamp }
});
```

## 🔒 Sécurité

- Argon2 pour le hash des mots de passe
- JWT pour l'authentification
- Rate limiting sur les endpoints sensibles
- CORS configuré
- Helmet pour les en-têtes HTTP
- Validation des inputs avec express-validator
- Gestion des erreurs Multer

## 📋 Logs

Les logs sont disponibles dans :
- Console (développement)
- Fichier `logs/app.log` (production)

## 🐛 Dépannage

**Erreur de connexion BD**
- Vérifier les paramètres `.env`
- S'assurer que MariaDB est lancé
- Vérifier que la BD a été créée

**Erreur CORS**
- Vérifier la variable `FRONTEND_URL` dans `.env`

**Fichier avatar trop volumineux**
- Maximum 2MB
- Formats acceptés: JPEG, PNG, WEBP

## 📦 Structure du Projet

```
src/
├── config/          # Configuration (BD, constants)
├── controllers/     # Handlers des requêtes
├── middleware/      # Middlewares Express
├── routes/          # Définition des routes
├── services/        # Logique métier
├── sockets/         # Socket.IO
├── database/        # Migrations, seeders
├── utils/           # Utilitaires (logs, hash, tokens)
├── validators/      # Validation des inputs
└── server.js        # Point d'entrée
```

## 📄 Licence

MIT - Method Gaming Platform Team
