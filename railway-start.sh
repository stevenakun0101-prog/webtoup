#!/bin/bash

echo "🚀 Railway Auto Setup Started"
echo "============================="

# Wait a bit for everything to be ready
sleep 5

# Check if we need to run setup
echo "🔍 Checking if setup is needed..."

# Check if database has tables
if php -r "
try {
    \$pdo = new PDO('mysql:host=mysql.railway.internal;port=3306;dbname=railway', 'root', 'uJCrLXYYXRzMsgwKTemgpSqZrFpGNgrU');
    \$stmt = \$pdo->query('SHOW TABLES');
    \$tables = \$stmt->fetchAll();
    if (count(\$tables) == 0) {
        echo 'SETUP_NEEDED';
    } else {
        echo 'SETUP_DONE';
    }
} catch (Exception \$e) {
    echo 'SETUP_NEEDED';
}
" | grep -q "SETUP_NEEDED"; then
    
    echo "📦 Running initial setup..."
    
    # Clear caches
    echo "🧹 Clearing caches..."
    php artisan cache:clear
    php artisan config:clear
    php artisan route:clear
    php artisan view:clear
    
    # Generate key if not set
    if [ -z "$APP_KEY" ]; then
        echo "🔑 Generating application key..."
        php artisan key:generate --force
    fi
    
    # Run migrations
    echo "🗄️  Running migrations..."
    php artisan migrate --force
    
    # Run seeders
    echo "🌱 Running seeders..."
    php artisan db:seed --force
    
    # Set permissions
    echo "🔐 Setting permissions..."
    chmod -R 755 storage bootstrap/cache
    
    echo "✅ Setup completed!"
else
    echo "✅ Database already set up, skipping..."
fi

# Start the application
echo "🌐 Starting Laravel application..."
php artisan serve --host=0.0.0.0 --port=$PORT 