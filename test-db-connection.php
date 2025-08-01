<?php

echo "🔍 Testing Railway Database Connection...\n\n";

// Test environment variables
echo "📋 Environment Variables:\n";
echo "- DB_CONNECTION: " . (getenv('DB_CONNECTION') ?: 'not set') . "\n";
echo "- DB_HOST: " . (getenv('DB_HOST') ?: 'not set') . "\n";
echo "- DB_PORT: " . (getenv('DB_PORT') ?: 'not set') . "\n";
echo "- DB_DATABASE: " . (getenv('DB_DATABASE') ?: 'not set') . "\n";
echo "- DB_USERNAME: " . (getenv('DB_USERNAME') ?: 'not set') . "\n";
echo "- DB_PASSWORD: " . (getenv('DB_PASSWORD') ? 'set' : 'not set') . "\n\n";

// Test direct MySQL connection
echo "🗄️  Testing Direct MySQL Connection:\n";

$host = getenv('DB_HOST') ?: 'mysql.railway.internal';
$port = getenv('DB_PORT') ?: '3306';
$database = getenv('DB_DATABASE') ?: 'railway';
$username = getenv('DB_USERNAME') ?: 'root';
$password = getenv('DB_PASSWORD') ?: 'uJCrLXYYXRzMsgwKTemgpSqZrFpGNgrU';

echo "- Host: $host\n";
echo "- Port: $port\n";
echo "- Database: $database\n";
echo "- Username: $username\n";
echo "- Password: " . ($password ? 'set' : 'not set') . "\n\n";

try {
    $dsn = "mysql:host=$host;port=$port;dbname=$database;charset=utf8mb4";
    $pdo = new PDO($dsn, $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);

    echo "✅ Direct MySQL connection successful!\n";

    // Test query
    $stmt = $pdo->query('SELECT VERSION() as version');
    $result = $stmt->fetch();
    echo "- MySQL Version: " . $result['version'] . "\n";

    // Check tables
    $stmt = $pdo->query('SHOW TABLES');
    $tables = $stmt->fetchAll();
    echo "- Tables found: " . count($tables) . "\n";

    if (count($tables) > 0) {
        echo "- Table names:\n";
        foreach ($tables as $table) {
            $tableName = array_values($table)[0];
            echo "  - $tableName\n";
        }
    }
} catch (PDOException $e) {
    echo "❌ Direct MySQL connection failed: " . $e->getMessage() . "\n";
}

echo "\n";

// Test Laravel connection
echo "🔧 Testing Laravel Database Connection:\n";

try {
    require_once 'vendor/autoload.php';

    $app = require_once 'bootstrap/app.php';
    $app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

    $pdo = \Illuminate\Support\Facades\DB::connection()->getPdo();
    echo "✅ Laravel database connection successful!\n";
    echo "- Database: " . \Illuminate\Support\Facades\DB::connection()->getDatabaseName() . "\n";

    // Test Laravel query
    $tables = \Illuminate\Support\Facades\DB::select('SHOW TABLES');
    echo "- Tables found via Laravel: " . count($tables) . "\n";
} catch (Exception $e) {
    echo "❌ Laravel database connection failed: " . $e->getMessage() . "\n";
}

echo "\n✅ Database connection test completed!\n";
