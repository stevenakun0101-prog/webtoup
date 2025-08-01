#!/bin/bash

echo "🚀 Setting up Laravel application for Railway deployment..."

# Check if we're in a Railway environment
if [ -n "$RAILWAY_ENVIRONMENT" ]; then
    echo "✅ Running in Railway environment"
else
    echo "⚠️  Not running in Railway environment"
fi

# Install dependencies
echo "📦 Installing PHP dependencies..."
composer install --no-dev --optimize-autoloader

# Install Node.js dependencies
echo "📦 Installing Node.js dependencies..."
npm install

# Build assets
echo "🔨 Building assets..."
npm run build

# Clear all caches
echo "🧹 Clearing caches..."
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Generate application key if not exists
echo "🔑 Generating application key..."
php artisan key:generate --force

# Wait for database to be ready (for Railway)
echo "⏳ Waiting for database to be ready..."
sleep 10

# Run migrations
echo "🗄️  Running database migrations..."
php artisan migrate --force

# Run seeders
echo "🌱 Running database seeders..."
php artisan db:seed --force

# Set proper permissions
echo "🔐 Setting proper permissions..."
chmod -R 755 storage bootstrap/cache

echo "✅ Setup completed successfully!" 