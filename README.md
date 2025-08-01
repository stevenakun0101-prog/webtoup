# WebTopup - Laravel Game Topup Platform

A modern web-based game topup platform built with Laravel 11, React, and Inertia.js. This application allows users to purchase game credits, vouchers, and digital items for popular mobile games like Mobile Legends, Free Fire, Genshin Impact, Valorant, and more.

## 🚀 Features

### For Users

-   **Game Topup Services**: Purchase credits for popular mobile games
-   **Multiple Payment Options**: Support for various payment gateways including Midtrans
-   **Order Tracking**: Real-time order status tracking
-   **Order History**: View past transactions and orders
-   **WhatsApp Integration**: Receive order updates via WhatsApp
-   **Responsive Design**: Mobile-friendly interface

### For Administrators

-   **Product Management**: Add, edit, and delete game products
-   **Category Management**: Organize products by categories
-   **Order Management**: Process and manage customer orders
-   **Export Functionality**: Export products and orders to Excel
-   **User Management**: Manage user accounts and roles
-   **Dashboard Analytics**: Overview of sales and orders

### Supported Games

-   Mobile Legends (ML)
-   Free Fire (FF)
-   Genshin Impact (GI)
-   Valorant (Valo)
-   League of Angels (LA)

## 🛠️ Tech Stack

### Backend

-   **Laravel 11** - PHP framework
-   **MySQL** - Database
-   **Laravel Sanctum** - API authentication
-   **Inertia.js** - Server-side rendering
-   **Midtrans** - Payment gateway integration
-   **Maatwebsite Excel** - Excel export functionality

### Frontend

-   **React 18** - JavaScript library
-   **Inertia.js React** - Client-side framework
-   **Tailwind CSS** - Utility-first CSS framework
-   **DaisyUI** - Component library
-   **Headless UI** - Accessible UI components
-   **React Data Table** - Data table component
-   **React Slick** - Carousel component
-   **QR Code React** - QR code generation

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

-   **PHP 8.2** or higher
-   **Composer** - PHP package manager
-   **Node.js 18** or higher
-   **npm** or **yarn** - Node.js package manager
-   **MySQL** - Database server
-   **Git** - Version control

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd webtopup
```

### 2. Install PHP Dependencies

```bash
composer install
```

### 3. Install Node.js Dependencies

```bash
npm install
```

### 4. Environment Setup

```bash
cp .env.example .env
php artisan key:generate
```

### 5. Configure Environment Variables

Edit the `.env` file and configure the following:

```env
APP_NAME="WebTopup"
APP_ENV=local
APP_KEY=base64:your-generated-key
APP_DEBUG=true
APP_URL=http://localhost

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=webtopup
DB_USERNAME=your_username
DB_PASSWORD=your_password

# Midtrans Configuration
MIDTRANS_SERVER_KEY=your_midtrans_server_key
MIDTRANS_CLIENT_KEY=your_midtrans_client_key
MIDTRANS_IS_PRODUCTION=false

# WhatsApp Configuration (if using)
WHATSAPP_API_URL=your_whatsapp_api_url
WHATSAPP_API_KEY=your_whatsapp_api_key
```

### 6. Database Setup

```bash
# Create database
mysql -u root -p -e "CREATE DATABASE webtopup;"

# Run migrations
php artisan migrate

# Seed the database with sample data
php artisan db:seed
```

### 7. Build Assets

```bash
# For development
npm run dev

# For production
npm run build
```

### 8. Start the Application

```bash
php artisan serve
```

The application will be available at `http://localhost:8000`

## 📁 Project Structure

```
webtopup/
├── app/
│   ├── Http/Controllers/     # Application controllers
│   ├── Models/              # Eloquent models
│   └── Providers/           # Service providers
├── database/
│   ├── migrations/          # Database migrations
│   └── seeders/            # Database seeders
├── resources/
│   ├── js/
│   │   ├── Components/     # React components
│   │   ├── Layouts/        # Layout components
│   │   └── Pages/          # Page components
│   └── views/              # Blade templates
├── routes/                 # Application routes
└── public/                # Public assets
```

## 🔧 Configuration

### Payment Gateway (Midtrans)

1. Sign up for a Midtrans account
2. Get your Server Key and Client Key
3. Update the `.env` file with your credentials
4. Configure webhook URLs in your Midtrans dashboard

### WhatsApp Integration

1. Set up WhatsApp Business API
2. Configure the API URL and key in `.env`
3. Update webhook endpoints for order notifications

## 👥 User Roles

### Admin

-   Access to admin dashboard
-   Manage products and categories
-   Process orders
-   Export data
-   View analytics

### User

-   Browse products
-   Place orders
-   Track order status
-   View order history
-   Manage profile

## 📱 API Endpoints

### Game Username Validation

-   `POST /ml/{id}/{zone}` - Mobile Legends username check
-   `POST /ff/{id}/{zone}` - Free Fire username check
-   `POST /gi/{id}/{zone}` - Genshin Impact username check
-   `POST /valo/{id}/{zone}` - Valorant username check
-   `POST /la/{id}/{zone}` - League of Angels username check

### Order Management

-   `GET /orders/history` - User order history
-   `GET /orders/track` - Track order status
-   `POST /api/checkout` - Process checkout
-   `POST /api/orders/mark-as-done` - Mark order as completed

## 🧪 Testing

```bash
# Run PHP tests
php artisan test

# Run specific test suite
php artisan test --filter=AuthenticationTest
```

## 📦 Deployment

### Production Build

```bash
# Install dependencies
composer install --optimize-autoloader --no-dev
npm install
npm run build

# Set production environment
APP_ENV=production
APP_DEBUG=false

# Clear and cache configurations
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Server Requirements

-   PHP 8.2+
-   MySQL 8.0+
-   Node.js 18+
-   Web server (Apache/Nginx)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/webtopup/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🔄 Changelog

### Version 1.0.0

-   Initial release
-   Basic topup functionality
-   Admin dashboard
-   Payment integration
-   Order tracking system

## 📞 Contact

-   **Developer**: [Your Name]
-   **Email**: [your.email@example.com]
-   **Website**: [your-website.com]

---

**Note**: This is a production-ready application. Make sure to properly configure all environment variables and security settings before deploying to production.
