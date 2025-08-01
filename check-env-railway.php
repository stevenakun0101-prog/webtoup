<?php

echo "🔍 Railway Environment Check\n";
echo "===========================\n\n";

// Check all environment variables
echo "📋 Environment Variables:\n";
echo "APP_NAME: " . (getenv('APP_NAME') ?: 'not set') . "\n";
echo "APP_ENV: " . (getenv('APP_ENV') ?: 'not set') . "\n";
echo "APP_DEBUG: " . (getenv('APP_DEBUG') ?: 'not set') . "\n";
echo "APP_URL: " . (getenv('APP_URL') ?: 'not set') . "\n";
echo "APP_KEY: " . (getenv('APP_KEY') ?: 'not set') . "\n";

echo "\n🗄️  Database Variables:\n";
echo "DB_CONNECTION: " . (getenv('DB_CONNECTION') ?: 'not set') . "\n";
echo "DB_HOST: " . (getenv('DB_HOST') ?: 'not set') . "\n";
echo "DB_PORT: " . (getenv('DB_PORT') ?: 'not set') . "\n";
echo "DB_DATABASE: " . (getenv('DB_DATABASE') ?: 'not set') . "\n";
echo "DB_USERNAME: " . (getenv('DB_USERNAME') ?: 'not set') . "\n";
echo "DB_PASSWORD: " . (getenv('DB_PASSWORD') ? 'set' : 'not set') . "\n";

echo "\n🔧 Other Variables:\n";
echo "LOG_CHANNEL: " . (getenv('LOG_CHANNEL') ?: 'not set') . "\n";
echo "BROADCAST_DRIVER: " . (getenv('BROADCAST_DRIVER') ?: 'not set') . "\n";
echo "CACHE_DRIVER: " . (getenv('CACHE_DRIVER') ?: 'not set') . "\n";
echo "FILESYSTEM_DISK: " . (getenv('FILESYSTEM_DISK') ?: 'not set') . "\n";
echo "QUEUE_CONNECTION: " . (getenv('QUEUE_CONNECTION') ?: 'not set') . "\n";
echo "SESSION_DRIVER: " . (getenv('SESSION_DRIVER') ?: 'not set') . "\n";
echo "SESSION_LIFETIME: " . (getenv('SESSION_LIFETIME') ?: 'not set') . "\n";

echo "\n🎯 Required Variables Check:\n";
$required = [
    'APP_NAME' => getenv('APP_NAME'),
    'APP_ENV' => getenv('APP_ENV'),
    'APP_DEBUG' => getenv('APP_DEBUG'),
    'APP_URL' => getenv('APP_URL'),
    'DB_CONNECTION' => getenv('DB_CONNECTION'),
    'DB_HOST' => getenv('DB_HOST'),
    'DB_PORT' => getenv('DB_PORT'),
    'DB_DATABASE' => getenv('DB_DATABASE'),
    'DB_USERNAME' => getenv('DB_USERNAME'),
    'DB_PASSWORD' => getenv('DB_PASSWORD')
];

$missing = [];
foreach ($required as $key => $value) {
    if (!$value) {
        $missing[] = $key;
        echo "❌ $key: not set\n";
    } else {
        echo "✅ $key: set\n";
    }
}

if (empty($missing)) {
    echo "\n🎉 All required environment variables are set!\n";
} else {
    echo "\n⚠️  Missing environment variables: " . implode(', ', $missing) . "\n";
    echo "Please set these in Railway dashboard → Variables tab\n";
}

echo "\n📝 Instructions:\n";
echo "1. Go to Railway dashboard\n";
echo "2. Click on your project\n";
echo "3. Go to Variables tab\n";
echo "4. Add these variables:\n";
echo "   - APP_NAME=Web Topup\n";
echo "   - APP_ENV=production\n";
echo "   - APP_DEBUG=true\n";
echo "   - APP_URL=https://webtoup-production.up.railway.app\n";
echo "   - DB_CONNECTION=mysql\n";
echo "   - DB_HOST=mysql.railway.internal\n";
echo "   - DB_PORT=3306\n";
echo "   - DB_DATABASE=railway\n";
echo "   - DB_USERNAME=root\n";
echo "   - DB_PASSWORD=uJCrLXYYXRzMsgwKTemgpSqZrFpGNgrU\n";
