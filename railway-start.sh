#!/bin/bash

echo "🚀 Railway Auto Setup Started"
echo "============================="

# Wait a bit for everything to be ready
sleep 5

# Run simple setup
echo "🔧 Running simple setup..."
php simple-setup.php

# Start the application
echo "🌐 Starting Laravel application..."
php artisan serve --host=0.0.0.0 --port=$PORT 