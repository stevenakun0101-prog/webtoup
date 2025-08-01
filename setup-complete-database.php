<?php

require_once 'vendor/autoload.php';

use Illuminate\Support\Facades\Artisan;

// Bootstrap Laravel
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

echo "🚀 Setting up complete database for Railway...\n";

try {
    // Clear all caches
    echo "🧹 Clearing caches...\n";
    Artisan::call('cache:clear');
    Artisan::call('config:clear');
    Artisan::call('route:clear');
    Artisan::call('view:clear');

    // Generate application key
    echo "🔑 Generating application key...\n";
    Artisan::call('key:generate', ['--force' => true]);

    // Run migrations
    echo "🗄️  Running migrations...\n";
    Artisan::call('migrate', ['--force' => true]);

    // Run seeders with complete data
    echo "🌱 Running complete seeders...\n";
    Artisan::call('db:seed', ['--force' => true]);

    echo "✅ Complete database setup finished!\n";
    echo "📊 Data loaded:\n";
    echo "  - Users: admin@mail.com (password: password)\n";
    echo "  - Categories: 23 categories (MLBB, PUBG, Netflix, etc.)\n";
    echo "  - Products: 37 products with prices\n";
    echo "  - Payment Options: 7 payment methods\n";
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    exit(1);
}
