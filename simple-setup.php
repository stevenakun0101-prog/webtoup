<?php

echo "🚀 Simple Railway Setup\n";
echo "======================\n\n";

try {
    echo "🔧 Setting up environment...\n";

    // Set environment variables
    putenv('APP_ENV=production');
    putenv('APP_DEBUG=true');
    putenv('APP_URL=https://webtoup-production.up.railway.app');
    putenv('ASSET_URL=https://webtoup-production.up.railway.app');

    echo "✅ Environment variables set\n";

    // Test Laravel bootstrap
    echo "\n🧪 Testing Laravel bootstrap...\n";
    require_once 'vendor/autoload.php';
    $app = require_once 'bootstrap/app.php';
    $app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();
    echo "✅ Laravel bootstrap successful\n";

    // Clear caches
    echo "\n🧹 Clearing caches...\n";
    \Illuminate\Support\Facades\Artisan::call('cache:clear');
    \Illuminate\Support\Facades\Artisan::call('config:clear');
    \Illuminate\Support\Facades\Artisan::call('route:clear');
    \Illuminate\Support\Facades\Artisan::call('view:clear');
    echo "✅ Caches cleared\n";

    // Generate key if not set
    if (!getenv('APP_KEY')) {
        echo "\n🔑 Generating application key...\n";
        \Illuminate\Support\Facades\Artisan::call('key:generate', ['--force' => true]);
        echo "✅ Application key generated\n";
    }

    // Test database connection
    echo "\n🗄️  Testing database connection...\n";
    try {
        $pdo = \Illuminate\Support\Facades\DB::connection()->getPdo();
        echo "✅ Database connection successful\n";

        // Check tables
        $tables = \Illuminate\Support\Facades\DB::select('SHOW TABLES');
        echo "Tables found: " . count($tables) . "\n";

        if (count($tables) == 0) {
            echo "⚠️  No tables found. Running migrations...\n";
            \Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
            echo "✅ Migrations completed\n";

            echo "🌱 Running seeders...\n";
            \Illuminate\Support\Facades\Artisan::call('db:seed', ['--force' => true]);
            echo "✅ Seeders completed\n";
        } else {
            echo "✅ Database already has tables\n";
        }
    } catch (Exception $e) {
        echo "❌ Database connection failed: " . $e->getMessage() . "\n";
    }

    // Set permissions
    echo "\n🔐 Setting permissions...\n";
    system('chmod -R 755 storage bootstrap/cache');
    echo "✅ Permissions set\n";

    echo "\n🎉 Setup completed successfully!\n";
    echo "🌐 Your app should be available at: https://webtoup-production.up.railway.app\n";
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    echo "Stack trace: " . $e->getTraceAsString() . "\n";
}
