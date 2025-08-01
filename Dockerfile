# Gunakan image PHP yang sudah support semua ekstensi Laravel
FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git curl unzip zip libpng-dev libonig-dev libxml2-dev libzip-dev \
    libpq-dev libsqlite3-dev libcurl4-openssl-dev \
    && docker-php-ext-install pdo pdo_mysql zip

# Install Composer
COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

# Install Node.js 20 LTS
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt-get install -y nodejs

# Set working directory
WORKDIR /var/www

# Copy project files
COPY . .

# Install PHP dependencies
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Install JS dependencies & build assets
RUN npm install && npm run build

# Laravel permissions
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# Expose port 8080
EXPOSE 8080

# Start Laravel app
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8080"]