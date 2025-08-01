# 🚀 Railway Deployment Guide

## 📋 Prerequisites
- GitHub repository connected to Railway
- Railway MySQL database service
- Railway web service

## 🔧 Setup Steps

### 1. **Set Environment Variables di Railway Dashboard**

Buka Railway dashboard → Project → Variables tab, tambahkan:

```env
APP_NAME=Web Topup
APP_ENV=production
APP_DEBUG=true
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

### 2. **Deploy dari GitHub**

1. Push code ke GitHub
2. Railway akan otomatis deploy
3. Script `railway-start.sh` akan jalan otomatis
4. Setup database akan jalan otomatis jika belum ada tables

### 3. **Manual Setup (Jika Perlu)**

Jika otomatis setup gagal, jalankan manual:

```bash
# Di Railway terminal
railway shell

# Setup environment
php setup-env.php

# Setup database
php setup-database-railway.php

# Check deployment
php check-deployment.php
```

## 🔍 Troubleshooting

### Error 500
1. Cek environment variables: `php check-env-railway.php`
2. Cek database connection: `php test-db-connection.php`
3. Cek deployment status: `php check-deployment.php`

### APP_KEY Error
1. Jalankan: `php generate-app-key.php`
2. Copy APP_KEY yang dihasilkan
3. Set di Railway Variables

### Database Connection Error
1. Pastikan MySQL service running
2. Cek credentials di Railway dashboard
3. Test connection: `php test-db-connection.php`

## 📁 Files yang Penting

- `railway-start.sh` - Script start otomatis
- `railway.json` - Railway configuration
- `setup-database-railway.php` - Database setup
- `check-deployment.php` - Deployment checker
- `test-db-connection.php` - Database tester

## 🎯 Auto-Deploy Flow

1. **Push ke GitHub** → Railway detect changes
2. **Build** → Install dependencies, build assets
3. **Deploy** → Run `railway-start.sh`
4. **Auto Setup** → Check database, run migrations, seed data
5. **Start App** → Laravel server running

## 🔗 Links

- **App URL**: https://webtoup-production.up.railway.app
- **Railway Dashboard**: https://railway.app/dashboard
- **GitHub**: Your repository URL

## 📞 Support

Jika ada masalah:
1. Cek Railway logs
2. Run diagnostic scripts
3. Check environment variables
4. Verify database connection
