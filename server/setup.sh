#!/bin/bash
# Quick development setup script for Method Gaming Platform Server

set -e

echo "🚀 Method Gaming Platform - Server Setup"
echo "========================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé"
    exit 1
fi

echo "✓ Node.js $(node -v) détecté"

# Navigate to server directory
cd "$(dirname "$0")"

echo ""
echo "📦 Installation des dépendances..."
npm install

echo ""
echo "🗄️  Configuration de la base de données..."
echo ""
echo "Assurez-vous que MariaDB/MySQL est lancé et configuré avec:"
echo "  - Host: ${DB_HOST:-localhost}"
echo "  - User: ${DB_USER:-method_user}"
echo "  - Password: ${DB_PASSWORD:-method_pass_123}"
echo ""
echo "Exécutez ceci pour créer la base de données:"
echo "  mysql -u root -p < src/database/migrations/001_initial.sql"
echo ""
echo "Remplissez avec des données de test:"
echo "  npm run seed"
echo ""
echo "✅ Setup complet!"
echo ""
echo "🎮 Démarrer le serveur:"
echo "  npm run dev    (développement avec hot-reload)"
echo "  npm start      (production)"
