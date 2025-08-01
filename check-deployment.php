<?php

require_once 'vendor/autoload.php';

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;

// Bootstrap Laravel
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

echo "🔍 Checking deployment status...\n\n";

// Check environment
echo "📋 Environment Check:\n";
echo "- APP_ENV: " . env('APP_ENV') . "\n";
echo "- APP_DEBUG: " . (env('APP_DEBUG') ? 'true' : 'false') . "\n";
echo "- APP_URL: " . env('APP_URL') . "\n";

// Check database connection
echo "\n🗄️  Database Connection Check:\n";
try {
    $pdo = DB::connection()->getPdo();
    echo "✅ Database connected successfully\n";
    echo "- Database: " . DB::connection()->getDatabaseName() . "\n";
    echo "- Host: " . env('DB_HOST') . "\n";
    echo "- Port: " . env('DB_PORT') . "\n";
} catch (Exception $e) {
    echo "❌ Database connection failed: " . $e->getMessage() . "\n";
}

// Check if tables exist
echo "\n📊 Database Tables Check:\n";
try {
    $tables = DB::select('SHOW TABLES');
    echo "✅ Found " . count($tables) . " tables:\n";
    foreach ($tables as $table) {
        $tableName = array_values((array) $table)[0];
        echo "  - " . $tableName . "\n";
    }
} catch (Exception $e) {
    echo "❌ Cannot check tables: " . $e->getMessage() . "\n";
}

// Check storage permissions
echo "\n📁 Storage Permissions Check:\n";
$storagePath = storage_path();
$cachePath = base_path('bootstrap/cache');

if (is_writable($storagePath)) {
    echo "✅ Storage directory is writable\n";
} else {
    echo "❌ Storage directory is not writable\n";
}

if (is_writable($cachePath)) {
    echo "✅ Cache directory is writable\n";
} else {
    echo "❌ Cache directory is not writable\n";
}

// Check application key
echo "\n🔑 Application Key Check:\n";
$appKey = env('APP_KEY');
if ($appKey && $appKey !== 'base64:') {
    echo "✅ Application key is set\n";
} else {
    echo "❌ Application key is not set\n";
}

echo "\n✅ Deployment check completed!\n";
