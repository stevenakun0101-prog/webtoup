<?php

echo "🌐 Testing Railway Application...\n\n";

$baseUrl = 'https://webtoup-production.up.railway.app';

echo "📋 Testing endpoints:\n";
echo "- Base URL: $baseUrl\n\n";

// Test homepage
echo "🏠 Testing Homepage...\n";
$homepage = testUrl($baseUrl);
if ($homepage['success']) {
    echo "✅ Homepage accessible\n";
    echo "- Status Code: " . $homepage['status'] . "\n";
} else {
    echo "❌ Homepage error: " . $homepage['error'] . "\n";
}

echo "\n";

// Test login page
echo "🔐 Testing Login Page...\n";
$login = testUrl($baseUrl . '/login');
if ($login['success']) {
    echo "✅ Login page accessible\n";
    echo "- Status Code: " . $login['status'] . "\n";
} else {
    echo "❌ Login page error: " . $login['error'] . "\n";
}

echo "\n";

// Test register page
echo "📝 Testing Register Page...\n";
$register = testUrl($baseUrl . '/register');
if ($register['success']) {
    echo "✅ Register page accessible\n";
    echo "- Status Code: " . $register['status'] . "\n";
} else {
    echo "❌ Register page error: " . $register['error'] . "\n";
}

echo "\n";

// Test products page
echo "🛍️  Testing Products Page...\n";
$products = testUrl($baseUrl . '/products');
if ($products['success']) {
    echo "✅ Products page accessible\n";
    echo "- Status Code: " . $products['status'] . "\n";
} else {
    echo "❌ Products page error: " . $products['error'] . "\n";
}

echo "\n";

// Test admin dashboard
echo "👨‍💼 Testing Admin Dashboard...\n";
$admin = testUrl($baseUrl . '/admin');
if ($admin['success']) {
    echo "✅ Admin dashboard accessible\n";
    echo "- Status Code: " . $admin['status'] . "\n";
} else {
    echo "❌ Admin dashboard error: " . $admin['error'] . "\n";
}

echo "\n✅ Application test completed!\n";

function testUrl($url)
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    if ($error) {
        return ['success' => false, 'error' => $error];
    }

    return [
        'success' => true,
        'status' => $httpCode,
        'response' => $response
    ];
}
