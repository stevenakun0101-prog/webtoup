#!/bin/bash

echo "🚀 Railway Deployment Script"
echo "============================"

# Check if we're in Railway environment
if [ -n "$RAILWAY_ENVIRONMENT" ]; then
    echo "✅ Running in Railway environment"
else
    echo "⚠️  Not running in Railway environment"
fi

echo ""

# Install dependencies
echo "📦 Installing PHP dependencies..."
composer install --no-dev --optimize-autoloader

echo "📦 Installing Node.js dependencies..."
npm install

echo "🔨 Building assets..."
npm run build

# Clear all caches
echo "🧹 Clearing caches..."
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Generate application key
echo "🔑 Generating application key..."
php artisan key:generate --force

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 5

# Test database connection
echo "🔍 Testing database connection..."
php test-db-connection.php

# Run migrations
echo "🗄️  Running database migrations..."
php artisan migrate --force

# Run seeders
echo "🌱 Running database seeders..."
php artisan db:seed --force

# Set proper permissions
echo "🔐 Setting proper permissions..."
chmod -R 755 storage bootstrap/cache

# Cache configurations for production
echo "⚡ Caching configurations..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo ""
echo "✅ Railway deployment completed successfully!"
echo ""
echo "🔍 To check deployment status, run:"
echo "   php check-deployment.php"
echo ""
echo "🌐 Your app should be available at:"
echo "   https://your-app-name.railway.app" 