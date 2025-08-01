<?php

echo "🔧 Fix Bootstrap Error\n";
echo "=====================\n\n";

try {
    echo "🧹 Clearing all caches...\n";
    
    // Clear all caches
    if (file_exists('vendor/autoload.php')) {
        require_once 'vendor/autoload.php';
        
        // Clear caches
        if (class_exists('Illuminate\Support\Facades\Artisan')) {
            \Illuminate\Support\Facades\Artisan::call('cache:clear');
            \Illuminate\Support\Facades\Artisan::call('config:clear');
            \Illuminate\Support\Facades\Artisan::call('route:clear');
            \Illuminate\Support\Facades\Artisan::call('view:clear');
            \Illuminate\Support\Facades\Artisan::call('optimize:clear');
            echo "✅ Caches cleared\n";
        }
    }

    // Check environment variables
    echo "\n📋 Checking environment variables...\n";
    echo "APP_ENV: " . (getenv('APP_ENV') ?: 'not set') . "\n";
    echo "APP_DEBUG: " . (getenv('APP_DEBUG') ?: 'not set') . "\n";
    echo "APP_URL: " . (getenv('APP_URL') ?: 'not set') . "\n";

    // Set required environment variables
    echo "\n🔧 Setting environment variables...\n";
    putenv('APP_ENV=production');
    putenv('APP_DEBUG=true');
    putenv('APP_URL=https://webtoup-production.up.railway.app');
    
    echo "✅ Environment variables set\n";

    // Test bootstrap
    echo "\n🧪 Testing bootstrap...\n";
    try {
        $app = require_once 'bootstrap/app.php';
        echo "✅ Bootstrap successful\n";
    } catch (Exception $e) {
        echo "❌ Bootstrap failed: " . $e->getMessage() . "\n";
        
        // Try to fix by removing problematic middleware
        echo "\n🔧 Attempting to fix middleware...\n";
        
        // Read bootstrap/app.php
        $bootstrapContent = file_get_contents('bootstrap/app.php');
        
        // Remove the problematic middleware registration
        $bootstrapContent = preg_replace(
            '/\/\/ Force HTTPS in production.*?if \(env\(\'APP_ENV\'\) === \'production\'\) \{.*?\},/s',
            '',
            $bootstrapContent
        );
        
        // Write back
        file_put_contents('bootstrap/app.php', $bootstrapContent);
        echo "✅ Middleware registration removed\n";
        
        // Test again
        try {
            $app = require_once 'bootstrap/app.php';
            echo "✅ Bootstrap successful after fix\n";
        } catch (Exception $e2) {
            echo "❌ Bootstrap still failed: " . $e2->getMessage() . "\n";
        }
    }

    echo "\n🎯 Next steps:\n";
    echo "1. Set environment variables in Railway\n";
    echo "2. Redeploy application\n";
    echo "3. Run: php setup-database-railway.php\n";

} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    echo "Stack trace: " . $e->getTraceAsString() . "\n";
} 