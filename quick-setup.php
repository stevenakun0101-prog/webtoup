<?php

echo "🚀 Quick Setup for Railway Deployment\n";
echo "=====================================\n\n";

// Database configuration
$dbConfig = [
    'host' => 'mysql.railway.internal',
    'port' => '3306',
    'database' => 'railway',
    'username' => 'root',
    'password' => 'uJCrLXYYXRzMsgwKTemgpSqZrFpGNgrU'
];

echo "📋 Database Configuration:\n";
echo "- Host: {$dbConfig['host']}\n";
echo "- Port: {$dbConfig['port']}\n";
echo "- Database: {$dbConfig['database']}\n";
echo "- Username: {$dbConfig['username']}\n";
echo "- Password: " . substr($dbConfig['password'], 0, 8) . "...\n\n";

// Test direct database connection
echo "🔍 Testing Database Connection...\n";
try {
    $dsn = "mysql:host={$dbConfig['host']};port={$dbConfig['port']};dbname={$dbConfig['database']};charset=utf8mb4";
    $pdo = new PDO($dsn, $dbConfig['username'], $dbConfig['password'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
    
    echo "✅ Database connection successful!\n";
    
    // Check tables
    $stmt = $pdo->query('SHOW TABLES');
    $tables = $stmt->fetchAll();
    echo "- Tables found: " . count($tables) . "\n";
    
    if (count($tables) == 0) {
        echo "⚠️  No tables found. Running migrations...\n";
        runLaravelSetup();
    } else {
        echo "✅ Database already has tables\n";
        foreach ($tables as $table) {
            $tableName = array_values($table)[0];
            echo "  - $tableName\n";
        }
    }
    
} catch (PDOException $e) {
    echo "❌ Database connection failed: " . $e->getMessage() . "\n";
    echo "🔧 Trying Laravel setup...\n";
    runLaravelSetup();
}

function runLaravelSetup() {
    echo "\n🔧 Running Laravel Setup...\n";
    
    try {
        require_once 'vendor/autoload.php';
        
        $app = require_once 'bootstrap/app.php';
        $app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();
        
        // Clear caches
        echo "🧹 Clearing caches...\n";
        \Illuminate\Support\Facades\Artisan::call('cache:clear');
        \Illuminate\Support\Facades\Artisan::call('config:clear');
        \Illuminate\Support\Facades\Artisan::call('route:clear');
        \Illuminate\Support\Facades\Artisan::call('view:clear');
        
        // Generate key
        echo "🔑 Generating application key...\n";
        \Illuminate\Support\Facades\Artisan::call('key:generate', ['--force' => true]);
        
        // Run migrations
        echo "🗄️  Running migrations...\n";
        \Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
        
        // Run seeders
        echo "🌱 Running seeders...\n";
        \Illuminate\Support\Facades\Artisan::call('db:seed', ['--force' => true]);
        
        echo "✅ Laravel setup completed successfully!\n";
        
    } catch (Exception $e) {
        echo "❌ Laravel setup failed: " . $e->getMessage() . "\n";
    }
}

echo "\n🎉 Quick setup completed!\n";
echo "🌐 Your app should be available at: https://webtoup-production.up.railway.app\n"; 