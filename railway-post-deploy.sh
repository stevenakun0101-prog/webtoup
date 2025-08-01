#!/bin/bash

echo "🚀 Railway Post-Deploy Setup"
echo "============================"

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 10

# Run database setup
echo "🗄️  Setting up database..."
php setup-complete-database.php

# Set permissions
echo "🔐 Setting permissions..."
chmod -R 755 storage bootstrap/cache

echo "✅ Post-deploy setup completed!"
echo "🌐 Your app should be available at: https://webtoup-production.up.railway.app" 