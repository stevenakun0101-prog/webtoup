<?php

echo "🔒 Fix Mixed Content Issues\n";
echo "===========================\n\n";

try {
    require_once 'vendor/autoload.php';
    $app = require_once 'bootstrap/app.php';
    $app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

    echo "🔧 Setting up HTTPS configuration...\n";

    // Clear all caches
    echo "🧹 Clearing caches...\n";
    \Illuminate\Support\Facades\Artisan::call('cache:clear');
    \Illuminate\Support\Facades\Artisan::call('config:clear');
    \Illuminate\Support\Facades\Artisan::call('route:clear');
    \Illuminate\Support\Facades\Artisan::call('view:clear');
    \Illuminate\Support\Facades\Artisan::call('optimize:clear');

    // Set environment variables for HTTPS
    echo "🔒 Setting HTTPS environment variables...\n";
    putenv('APP_ENV=production');
    putenv('APP_URL=https://webtoup-production.up.railway.app');
    putenv('ASSET_URL=https://webtoup-production.up.railway.app');

    // Check current environment
    echo "📋 Current environment:\n";
    echo "APP_ENV: " . getenv('APP_ENV') . "\n";
    echo "APP_URL: " . getenv('APP_URL') . "\n";
    echo "ASSET_URL: " . getenv('ASSET_URL') . "\n\n";

    // Rebuild assets with HTTPS
    echo "🔨 Rebuilding assets...\n";
    $output = shell_exec('npm run build 2>&1');
    echo "Build output: $output\n";

    // Clear and rebuild cache
    echo "🔄 Rebuilding cache...\n";
    \Illuminate\Support\Facades\Artisan::call('config:cache');
    \Illuminate\Support\Facades\Artisan::call('route:cache');
    \Illuminate\Support\Facades\Artisan::call('view:cache');

    echo "✅ HTTPS configuration completed!\n\n";

    echo "📝 Next steps:\n";
    echo "1. Set these environment variables in Railway:\n";
    echo "   APP_ENV=production\n";
    echo "   APP_URL=https://webtoup-production.up.railway.app\n";
    echo "   ASSET_URL=https://webtoup-production.up.railway.app\n";
    echo "2. Redeploy your application\n";
    echo "3. Clear browser cache and reload\n\n";

    echo "🎯 Your app should now load assets via HTTPS!\n";
    echo "Visit: https://webtoup-production.up.railway.app\n";
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    echo "Stack trace: " . $e->getTraceAsString() . "\n";
}
