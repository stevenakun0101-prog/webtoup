# 🚀 Railway Deployment Guide

## Setup Database di Railway

### 1. Buat MySQL Database di Railway

1. Buka dashboard Railway
2. Klik "New Project" → "Deploy from GitHub repo"
3. Pilih repository Anda
4. Setelah project dibuat, klik "New" → "Database" → "Add MySQL"
5. Catat environment variables yang diberikan Railway

### 2. Environment Variables yang Diperlukan

Di Railway dashboard, set environment variables berikut:

```env
APP_NAME="Web Topup"
APP_ENV=production
APP_KEY=base64:your-app-key-here
APP_DEBUG=false
APP_URL=https://your-app-name.railway.app

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=your-mysql-host.railway.app
DB_PORT=3306
DB_DATABASE=railway
DB_USERNAME=root
DB_PASSWORD=your-mysql-password

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

MEMCACHED_HOST=127.0.0.1

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_HOST=
PUSHER_PORT=443
PUSHER_SCHEME=https
PUSHER_APP_CLUSTER=mt1

VITE_APP_NAME="${APP_NAME}"
VITE_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
VITE_PUSHER_HOST="${PUSHER_HOST}"
VITE_PUSHER_PORT="${PUSHER_PORT}"
VITE_PUSHER_SCHEME="${PUSHER_SCHEME}"
VITE_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"
```

### 3. Deploy dan Setup Database

Setelah environment variables diset, deploy ulang aplikasi Anda. Railway akan otomatis menjalankan:

1. `composer install`
2. `npm install`
3. `npm run build`
4. `php artisan key:generate`
5. `php artisan migrate --force`
6. `php artisan db:seed --force`

### 4. Troubleshooting

Jika masih error 500, cek logs di Railway dashboard:

1. Buka project di Railway
2. Klik tab "Deployments"
3. Klik deployment terbaru
4. Lihat logs untuk error details

### 5. Manual Database Setup

Jika otomatis tidak berhasil, jalankan manual di Railway terminal:

```bash
# Masuk ke Railway terminal
railway shell

# Jalankan setup database
php setup-database.php

# Atau manual commands
php artisan migrate --force
php artisan db:seed --force
```

### 6. Cek Database Connection

Untuk memastikan database terhubung, cek di Railway terminal:

```bash
php artisan tinker
```

Lalu test:

```php
DB::connection()->getPdo();
```

Jika berhasil, akan menampilkan PDO object.

### 7. Common Issues

1. **Error 500**: Biasanya karena database belum di-migrate
2. **Connection refused**: Environment variables database salah
3. **Table not found**: Migrasi belum dijalankan
4. **Permission denied**: File permissions di storage/cache

### 8. Test Aplikasi

Setelah deployment berhasil, test endpoint:

-   `https://your-app.railway.app/` - Homepage
-   `https://your-app.railway.app/login` - Login page

Jika masih error, cek logs di Railway dashboard untuk detail error.
