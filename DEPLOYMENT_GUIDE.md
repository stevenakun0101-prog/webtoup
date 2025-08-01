# 🚀 Railway Deployment Guide - Web Topup

## 📋 Informasi Deployment

-   **URL Aplikasi**: https://webtoup-production.up.railway.app
-   **Database Host**: mysql.railway.internal:3306
-   **Status**: Error 500 (Database belum di-setup)

## 🔧 Langkah-langkah Deployment

### 1. Set Environment Variables di Railway

Buka Railway dashboard → Project Anda → Variables tab, lalu set:

```env
APP_NAME="Web Topup"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://webtoup-production.up.railway.app

DB_CONNECTION=mysql
DB_HOST=mysql.railway.internal
DB_PORT=3306
DB_DATABASE=railway
DB_USERNAME=root
DB_PASSWORD=uJCrLXYYXRzMsgwKTemgpSqZrFpGNgrU

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120
```

### 2. Deploy dan Setup Database

Setelah environment variables diset:

1. **Deploy ulang aplikasi di Railway**
2. **Railway akan otomatis menjalankan:**
    - `composer install`
    - `npm install`
    - `npm run build`
    - `php artisan key:generate`
3. **Setup database manual setelah deployment:**
    - Masuk ke Railway terminal
    - Jalankan `php setup-database-railway.php`

### 3. Test Database Connection

```bash
# Di Railway terminal
railway shell

# Test database connection
php test-db-connection.php

# Cek status deployment
php check-deployment.php
```

### 4. Manual Setup (Jika Otomatis Gagal)

```bash
# Setup database manual dengan data lengkap
php setup-database-railway.php

# Atau commands terpisah
php artisan migrate --force
php artisan db:seed --force

# Atau jalankan script post-deploy
chmod +x railway-post-deploy.sh
./railway-post-deploy.sh
```

### 5. Test Aplikasi

```bash
# Test aplikasi
php test-app.php

# Monitor deployment real-time
php monitor-deployment.php
```

## 🔍 Troubleshooting

### Error 500 - Database Issues

1. **Cek database connection:**

    ```bash
    php test-db-connection.php
    ```

2. **Pastikan environment variables benar:**

    - `DB_HOST=mysql.railway.internal`
    - `DB_PORT=3306`
    - `DB_PASSWORD=uJCrLXYYXRzMsgwKTemgpSqZrFpGNgrU`

3. **Setup database manual:**
    ```bash
    php setup-database-railway.php
    ```

### Error 404 - Deployment Issues

1. **Cek Railway logs di dashboard**
2. **Pastikan build berhasil**
3. **Test aplikasi:**
    ```bash
    php test-app.php
    ```

### Connection Refused

1. **Cek password database di Railway dashboard**
2. **Pastikan MySQL service running**
3. **Test koneksi manual:**
    ```bash
    php test-db-connection.php
    ```

## 📊 Monitoring

### Test Aplikasi

```bash
php test-app.php
```

### Monitor Deployment

```bash
php monitor-deployment.php
```

### Cek Status

```bash
php check-deployment.php
```

## 🌐 Endpoints untuk Test

-   **Homepage**: https://webtoup-production.up.railway.app/
-   **Login**: https://webtoup-production.up.railway.app/login
-   **Register**: https://webtoup-production.up.railway.app/register
-   **Products**: https://webtoup-production.up.railway.app/products
-   **Admin**: https://webtoup-production.up.railway.app/admin

## 📝 File Scripts yang Tersedia

-   ✅ `test-db-connection.php` - Test koneksi database
-   ✅ `test-app.php` - Test aplikasi
-   ✅ `monitor-deployment.php` - Monitor deployment real-time
-   ✅ `check-deployment.php` - Cek status deployment
-   ✅ `setup-database-railway.php` - Setup database dengan data lengkap
-   ✅ `railway-post-deploy.sh` - Script post-deploy otomatis
-   ✅ `railway-deploy.sh` - Script deployment lengkap

## 🚨 Common Issues & Solutions

### 1. Error 500 - Database

**Solution**: Setup database dengan `php setup-database-railway.php`

### 2. Connection Refused

**Solution**: Cek password database di Railway dashboard

### 3. Tables Not Found

**Solution**: Jalankan `php artisan migrate --force`

### 4. Permission Denied

**Solution**: Cek file permissions di storage/cache

## 📊 Data yang Akan Di-load

Setelah setup database berhasil, aplikasi akan memiliki:

### Users

-   **Admin**: admin@mail.com (password: password)
-   **User**: user@mail.com (password: password)

### Categories (23 categories)

-   MLBB, PUBG, GENSHIN, HONOR OF KINGS
-   CALL OF DUTY, VALORANT, FREE FIRE
-   NETFLIX, DISNEY HOTSTAR, YOUTUBE
-   VIDIO, WeTv, VIU, CANVA, CHATGPT 4o
-   CAPCUT, MICROSOFT 365, SPOTIFY, ZOOM PRO
-   JOKI ML, JOKI WEB, JOKI TUGAS

### Products (37 products)

-   Diamond MLBB dengan berbagai harga
-   UC PUBG, Crystal Genshin, Token HOK
-   CP CODM, VP Valorant, Diamond FF
-   Subscription services (Netflix, YouTube, etc.)
-   Jasa joki dan project

### Payment Options (7 methods)

-   DANA, GoPay, OVO
-   BCA VA, Mandiri VA, SeaBank VA
-   QRIS

## 📞 Support

Jika masih ada masalah:

1. **Cek logs di Railway dashboard**
2. **Test database connection**
3. **Jalankan setup manual**
4. **Monitor deployment real-time**

---

**Status**: Error 500 - Database belum di-setup
**Next Step**: Set environment variables dan deploy ulang
