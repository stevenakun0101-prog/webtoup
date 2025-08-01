<?php

echo "🔑 Generate Application Key\n";
echo "==========================\n\n";

// Generate a new application key
echo "🔧 Generating new application key...\n";
$key = 'base64:' . base64_encode(random_bytes(32));
echo "Generated key: $key\n\n";

// Check if we can write to .env file
$envPath = base_path('.env');
if (file_exists($envPath)) {
    echo "📝 Found .env file, updating APP_KEY...\n";

    // Read current .env content
    $envContent = file_get_contents($envPath);

    // Replace or add APP_KEY
    if (strpos($envContent, 'APP_KEY=') !== false) {
        $envContent = preg_replace('/APP_KEY=.*/', "APP_KEY=$key", $envContent);
    } else {
        $envContent .= "\nAPP_KEY=$key\n";
    }

    // Write back to .env
    if (file_put_contents($envPath, $envContent)) {
        echo "✅ APP_KEY updated in .env file\n";
    } else {
        echo "❌ Failed to update .env file\n";
    }
} else {
    echo "⚠️  .env file not found\n";
}

// Also try to set environment variable directly
echo "\n🔧 Setting APP_KEY environment variable...\n";
putenv("APP_KEY=$key");
echo "✅ APP_KEY set in environment\n";

// Test Laravel with new key
echo "\n🧪 Testing Laravel with new key...\n";
try {
    require_once 'vendor/autoload.php';
    $app = require_once 'bootstrap/app.php';
    $app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();
    echo "✅ Laravel bootstrap successful with new key\n";
} catch (Exception $e) {
    echo "❌ Laravel bootstrap failed: " . $e->getMessage() . "\n";
}

echo "\n📋 Next Steps:\n";
echo "1. Add this APP_KEY to Railway Variables:\n";
echo "   APP_KEY=$key\n";
echo "2. Redeploy your application\n";
echo "3. Run: php setup-database-railway.php\n";

echo "\n🎯 Manual Railway Setup:\n";
echo "1. Go to Railway dashboard\n";
echo "2. Click on your project\n";
echo "3. Go to Variables tab\n";
echo "4. Add: APP_KEY=$key\n";
echo "5. Save and redeploy\n";
