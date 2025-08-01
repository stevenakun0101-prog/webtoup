<?php

echo "🔧 Setup Environment Variables\n";
echo "=============================\n\n";

// Set environment variables
$envVars = [
    'APP_NAME' => 'Web Topup',
    'APP_ENV' => 'production',
    'APP_DEBUG' => 'true',
    'APP_URL' => 'https://webtoup-production.up.railway.app',
    'LOG_CHANNEL' => 'stack',
    'LOG_DEPRECATIONS_CHANNEL' => 'null',
    'LOG_LEVEL' => 'debug',
    'DB_CONNECTION' => 'mysql',
    'DB_HOST' => 'mysql.railway.internal',
    'DB_PORT' => '3306',
    'DB_DATABASE' => 'railway',
    'DB_USERNAME' => 'root',
    'DB_PASSWORD' => 'uJCrLXYYXRzMsgwKTemgpSqZrFpGNgrU',
    'BROADCAST_DRIVER' => 'log',
    'CACHE_DRIVER' => 'file',
    'FILESYSTEM_DISK' => 'local',
    'QUEUE_CONNECTION' => 'sync',
    'SESSION_DRIVER' => 'file',
    'SESSION_LIFETIME' => '120'
];

echo "📝 Setting environment variables...\n";
foreach ($envVars as $key => $value) {
    putenv("$key=$value");
    echo "✅ $key=$value\n";
}

// Generate APP_KEY if not set
if (!getenv('APP_KEY')) {
    $key = 'base64:' . base64_encode(random_bytes(32));
    putenv("APP_KEY=$key");
    echo "✅ APP_KEY=$key\n";
}

echo "\n🎯 Environment setup completed!\n";
echo "Now you can run: php setup-database-railway.php\n";
