<?php

echo "🔍 Debug Error Check\n";
echo "===================\n\n";

// Check if Laravel is working
echo "1. Checking Laravel Bootstrap...\n";
try {
    require_once 'vendor/autoload.php';
    $app = require_once 'bootstrap/app.php';
    $app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();
    echo "✅ Laravel bootstrap successful\n";
} catch (Exception $e) {
    echo "❌ Laravel bootstrap failed: " . $e->getMessage() . "\n";
    echo "Stack trace: " . $e->getTraceAsString() . "\n";
    exit(1);
}

// Check environment variables
echo "\n2. Checking Environment Variables...\n";
echo "APP_DEBUG: " . (getenv('APP_DEBUG') ?: 'not set') . "\n";
echo "APP_ENV: " . (getenv('APP_ENV') ?: 'not set') . "\n";
echo "DB_HOST: " . (getenv('DB_HOST') ?: 'not set') . "\n";
echo "DB_PORT: " . (getenv('DB_PORT') ?: 'not set') . "\n";
echo "DB_DATABASE: " . (getenv('DB_DATABASE') ?: 'not set') . "\n";
echo "DB_USERNAME: " . (getenv('DB_USERNAME') ?: 'not set') . "\n";
echo "DB_PASSWORD: " . (getenv('DB_PASSWORD') ? 'set' : 'not set') . "\n";

// Check storage permissions
echo "\n3. Checking Storage Permissions...\n";
$storagePath = base_path('storage');
$logsPath = base_path('storage/logs');
$cachePath = base_path('storage/framework/cache');

echo "Storage path exists: " . (is_dir($storagePath) ? 'Yes' : 'No') . "\n";
echo "Storage writable: " . (is_writable($storagePath) ? 'Yes' : 'No') . "\n";
echo "Logs path exists: " . (is_dir($logsPath) ? 'Yes' : 'No') . "\n";
echo "Logs writable: " . (is_writable($logsPath) ? 'Yes' : 'No') . "\n";
echo "Cache path exists: " . (is_dir($cachePath) ? 'Yes' : 'No') . "\n";
echo "Cache writable: " . (is_writable($cachePath) ? 'Yes' : 'No') . "\n";

// Try to write to log
echo "\n4. Testing Log Writing...\n";
try {
    \Illuminate\Support\Facades\Log::info('Debug test message');
    echo "✅ Log writing successful\n";
} catch (Exception $e) {
    echo "❌ Log writing failed: " . $e->getMessage() . "\n";
}

// Check database connection
echo "\n5. Testing Database Connection...\n";
try {
    $pdo = \Illuminate\Support\Facades\DB::connection()->getPdo();
    echo "✅ Database connection successful\n";

    // Test query
    $tables = \Illuminate\Support\Facades\DB::select('SHOW TABLES');
    echo "Tables found: " . count($tables) . "\n";
} catch (Exception $e) {
    echo "❌ Database connection failed: " . $e->getMessage() . "\n";
}

// Check if .env file exists
echo "\n6. Checking .env file...\n";
$envPath = base_path('.env');
echo ".env file exists: " . (file_exists($envPath) ? 'Yes' : 'No') . "\n";

// Check bootstrap/cache permissions
echo "\n7. Checking Bootstrap Cache...\n";
$bootstrapCachePath = base_path('bootstrap/cache');
echo "Bootstrap cache exists: " . (is_dir($bootstrapCachePath) ? 'Yes' : 'No') . "\n";
echo "Bootstrap cache writable: " . (is_writable($bootstrapCachePath) ? 'Yes' : 'No') . "\n";

// List files in storage/logs
echo "\n8. Checking Log Files...\n";
if (is_dir($logsPath)) {
    $logFiles = scandir($logsPath);
    echo "Log files found: " . count($logFiles) . "\n";
    foreach ($logFiles as $file) {
        if ($file !== '.' && $file !== '..') {
            echo "  - $file\n";
        }
    }
}

echo "\n🎯 Debug check completed!\n";
echo "If you see any ❌ errors above, those are likely the cause of your 500 error.\n";
