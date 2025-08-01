# 🚀 Railway Environment Setup

## Environment Variables untuk Railway

Berdasarkan informasi database Railway Anda:

### 1. Set Environment Variables di Railway Dashboard

Buka Railway dashboard → Project Anda → Variables tab, lalu set:

```env
APP_NAME="Web Topup"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://webtoup-production.up.railway.app

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=mysql.railway.internal
DB_PORT=3306
DB_DATABASE=railway
DB_USERNAME=root
DB_PASSWORD=uJCrLXYYXRzMsgwKTemgpSqZrFpGNgrU

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

### 2. Informasi Database Railway

```
MYSQL_DATABASE=railway
MYSQL_ROOT_PASSWORD=uJCrLXYYXRzMsgwKTemgpSqZrFpGNgrU
MYSQL_URL=mysql://root:uJCrLXYYXRzMsgwKTemgpSqZrFpGNgrU@mysql.railway.internal:3306/railway
MYSQLHOST=mysql.railway.internal
MYSQLPASSWORD=uJCrLXYYXRzMsgwKTemgpSqZrFpGNgrU
MYSQLPORT=3306
MYSQLUSER=root
```

### 3. Langkah-langkah Setup

1. **Buka Railway Dashboard**
2. **Klik project Anda**
3. **Klik tab "Variables"**
4. **Set environment variables di atas**
5. **Deploy ulang aplikasi**

### 4. Test Database Connection

Setelah environment variables diset, test koneksi:

```bash
# Di Railway terminal
railway shell

# Test database connection
php test-db-connection.php

# Cek status deployment
php check-deployment.php
```

### 5. Setup Database

Jika koneksi berhasil, setup database:

```bash
# Setup database
php setup-database.php

# Atau manual
php artisan migrate --force
php artisan db:seed --force
```

### 6. Cek Status

Untuk memastikan semuanya berjalan:

```bash
php check-deployment.php
```

### 7. Troubleshooting

Jika masih error:

1. **Cek password database di Railway dashboard**
2. **Pastikan menggunakan internal host: mysql.railway.internal**
3. **Cek logs di Railway dashboard**
4. **Test koneksi manual**

### 8. Manual Test Database

```bash
php artisan tinker
```

Lalu test:

```php
DB::connection()->getPdo();
```

Jika berhasil, akan menampilkan PDO object.

### 9. Test Aplikasi

Setelah deployment berhasil, test endpoint:

- `https://webtoup-production.up.railway.app/` - Homepage
- `https://webtoup-production.up.railway.app/login` - Login page

### 10. Cek Logs

Jika masih error 500, cek logs di Railway:

1. Buka Railway dashboard
2. Klik project Anda
3. Klik tab "Deployments"
4. Klik deployment terbaru
5. Lihat logs untuk error details 