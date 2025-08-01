<?php

echo "📊 Railway Deployment Monitor\n";
echo "============================\n\n";

$baseUrl = 'https://webtoup-production.up.railway.app';
$maxAttempts = 10;
$delay = 30; // seconds

echo "🔍 Monitoring deployment at: $baseUrl\n";
echo "⏱️  Checking every $delay seconds...\n";
echo "🔄 Max attempts: $maxAttempts\n\n";

for ($attempt = 1; $attempt <= $maxAttempts; $attempt++) {
    echo "📋 Attempt $attempt/$maxAttempts - " . date('Y-m-d H:i:s') . "\n";
    
    // Test homepage
    $response = testUrl($baseUrl);
    
    if ($response['success']) {
        $statusCode = $response['status'];
        
        if ($statusCode == 200) {
            echo "✅ Application is LIVE!\n";
            echo "- Status Code: $statusCode\n";
            echo "- Response Time: " . $response['time'] . "ms\n";
            
            // Test additional endpoints
            testEndpoint($baseUrl . '/login', 'Login Page');
            testEndpoint($baseUrl . '/register', 'Register Page');
            testEndpoint($baseUrl . '/products', 'Products Page');
            
            echo "\n🎉 Deployment successful! Your app is ready.\n";
            echo "🌐 Visit: $baseUrl\n";
            break;
            
        } elseif ($statusCode == 500) {
            echo "❌ Application error (500)\n";
            echo "- Status Code: $statusCode\n";
            echo "- This might be a database issue\n";
            
        } elseif ($statusCode == 404) {
            echo "⚠️  Application not found (404)\n";
            echo "- Status Code: $statusCode\n";
            echo "- Deployment might still be in progress\n";
            
        } else {
            echo "⚠️  Unexpected status: $statusCode\n";
        }
        
    } else {
        echo "❌ Connection failed: " . $response['error'] . "\n";
    }
    
    if ($attempt < $maxAttempts) {
        echo "⏳ Waiting $delay seconds before next check...\n\n";
        sleep($delay);
    }
}

if ($attempt > $maxAttempts) {
    echo "\n⏰ Timeout reached. Please check Railway dashboard for deployment status.\n";
    echo "🔍 Check logs at: https://railway.app/dashboard\n";
}

function testUrl($url) {
    $startTime = microtime(true);
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Railway-Monitor/1.0');
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);
    
    $endTime = microtime(true);
    $responseTime = round(($endTime - $startTime) * 1000, 2);
    
    if ($error) {
        return ['success' => false, 'error' => $error];
    }
    
    return [
        'success' => true,
        'status' => $httpCode,
        'time' => $responseTime,
        'response' => $response
    ];
}

function testEndpoint($url, $name) {
    $response = testUrl($url);
    if ($response['success'] && $response['status'] == 200) {
        echo "✅ $name: OK\n";
    } else {
        echo "❌ $name: " . ($response['status'] ?? 'Failed') . "\n";
    }
} 