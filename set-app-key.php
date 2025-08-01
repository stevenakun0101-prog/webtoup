<?php

echo "🔑 Generate APP_KEY for Railway\n";
echo "===============================\n\n";

// Generate a new application key
echo "🔧 Generating new application key...\n";
$key = 'base64:' . base64_encode(random_bytes(32));
echo "Generated APP_KEY: $key\n\n";

echo "📋 Copy this APP_KEY to Railway Variables:\n";
echo "==========================================\n";
echo "APP_KEY=$key\n\n";

echo "🎯 Steps to set in Railway:\n";
echo "1. Go to Railway dashboard\n";
echo "2. Click on your project\n";
echo "3. Go to Variables tab\n";
echo "4. Add new variable:\n";
echo "   - Name: APP_KEY\n";
echo "   - Value: $key\n";
echo "5. Save and redeploy\n\n";

echo "🔧 Alternative: Run this command in Railway terminal:\n";
echo "php artisan key:generate --force\n\n";

echo "📝 All required Railway Variables:\n";
echo "==================================\n";
echo "APP_NAME=Web Topup\n";
echo "APP_ENV=production\n";
echo "APP_DEBUG=true\n";
echo "APP_URL=https://webtoup-production.up.railway.app\n";
echo "APP_KEY=$key\n";
echo "DB_CONNECTION=mysql\n";
echo "DB_HOST=mysql.railway.internal\n";
echo "DB_PORT=3306\n";
echo "DB_DATABASE=railway\n";
echo "DB_USERNAME=root\n";
echo "DB_PASSWORD=uJCrLXYYXRzMsgwKTemgpSqZrFpGNgrU\n";
echo "LOG_CHANNEL=stack\n";
echo "BROADCAST_DRIVER=log\n";
echo "CACHE_DRIVER=file\n";
echo "FILESYSTEM_DISK=local\n";
echo "QUEUE_CONNECTION=sync\n";
echo "SESSION_DRIVER=file\n";
echo "SESSION_LIFETIME=120\n";
