<?php

echo "🔧 Railway Environment Variables\n";
echo "===============================\n\n";

// Generate APP_KEY
$appKey = 'base64:' . base64_encode(random_bytes(32));

echo "📋 Copy these variables to Railway Dashboard → Variables tab:\n";
echo "=============================================================\n\n";

echo "APP_NAME=Web Topup\n";
echo "APP_ENV=production\n";
echo "APP_DEBUG=true\n";
echo "APP_URL=https://webtoup-production.up.railway.app\n";
echo "ASSET_URL=https://webtoup-production.up.railway.app\n";
echo "APP_KEY=$appKey\n\n";

echo "DB_CONNECTION=mysql\n";
echo "DB_HOST=mysql.railway.internal\n";
echo "DB_PORT=3306\n";
echo "DB_DATABASE=railway\n";
echo "DB_USERNAME=root\n";
echo "DB_PASSWORD=uJCrLXYYXRzMsgwKTemgpSqZrFpGNgrU\n\n";

echo "LOG_CHANNEL=stack\n";
echo "LOG_DEPRECATIONS_CHANNEL=null\n";
echo "LOG_LEVEL=debug\n\n";

echo "BROADCAST_DRIVER=log\n";
echo "CACHE_DRIVER=file\n";
echo "FILESYSTEM_DISK=local\n";
echo "QUEUE_CONNECTION=sync\n";
echo "SESSION_DRIVER=file\n";
echo "SESSION_LIFETIME=120\n\n";

echo "MEMCACHED_HOST=127.0.0.1\n\n";

echo "REDIS_HOST=127.0.0.1\n";
echo "REDIS_PASSWORD=null\n";
echo "REDIS_PORT=6379\n\n";

echo "MAIL_MAILER=smtp\n";
echo "MAIL_HOST=mailpit\n";
echo "MAIL_PORT=1025\n";
echo "MAIL_USERNAME=null\n";
echo "MAIL_PASSWORD=null\n";
echo "MAIL_ENCRYPTION=null\n";
echo "MAIL_FROM_ADDRESS=hello@example.com\n";
echo "MAIL_FROM_NAME=Web Topup\n\n";

echo "VITE_APP_NAME=Web Topup\n";
echo "VITE_PUSHER_APP_KEY=\n";
echo "VITE_PUSHER_HOST=\n";
echo "VITE_PUSHER_PORT=443\n";
echo "VITE_PUSHER_SCHEME=https\n";
echo "VITE_PUSHER_APP_CLUSTER=mt1\n\n";

echo "🎯 Steps to set in Railway:\n";
echo "1. Go to Railway dashboard\n";
echo "2. Click on your project\n";
echo "3. Go to Variables tab\n";
echo "4. Add each variable above\n";
echo "5. Save and redeploy\n\n";

echo "🔧 After setting variables, run:\n";
echo "php fix-mixed-content.php\n";
