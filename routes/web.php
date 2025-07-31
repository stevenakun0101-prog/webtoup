<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\BaseController;
use App\Http\Controllers\PurchaseOrderController;
use App\Http\Controllers\WhatsAppController;
use App\Models\Product;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

// Route utama: jika admin, ke AdminDashboard, jika user biasa ke Welcome
Route::get('/', function () {
    if (Auth::check() && Auth::user()->role === 'admin') {
        return redirect('/admin/dashboard');
    }
    return app(\App\Http\Controllers\BaseController::class)->index(new \App\Models\Product);
});

//cek username game api
Route::post('/ml/{id}/{zone}', [ApiController::class, 'ml']);
Route::post('/ff/{id}/{zone}', [ApiController::class, 'ff']);
Route::post('/gi/{id}/{zone}', [ApiController::class, 'gi']);
Route::post('/valo/{id}/{zone}', [ApiController::class, 'valo']);
Route::post('/la/{id}/{zone}', [ApiController::class, 'la']);

//===============================================================


Route::middleware(['auth'])->group(function () {
    Route::get('/admin/dashboard', [ProductController::class, 'index'])->name('admin.dashboard');
    // Profile routes (proteksi role di controller)
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/productsdashboard', [ProductController::class, 'index'])->name('productsdashboard.index');
    Route::post('/addProducts', [ProductController::class, 'store'])->name('addProducts.store');
    Route::patch('/updateProducts/{id}', [ProductController::class, 'update'])->name('updateProducts.update');
    Route::delete('/deleteProducts/{id}', [ProductController::class, 'destroy'])->name('deleteProducts.destroy');
    Route::get('/export/products', [ProductController::class, 'exportProducts'])->name('products.export');

    //category
    Route::get('/categorydashboard', [CategoryController::class, 'index'])->name('categorydashboard.index');
    Route::post('/addCategory', [CategoryController::class, 'store'])->name('addCategory.store');
    Route::patch('/updateCategory/{id}', [CategoryController::class, 'update'])->name('updateCategory.update');
    Route::delete('/deleteCategory/{id}', [CategoryController::class, 'destroy'])->name('deleteCategory.destroy');
    Route::get('/orders/history', [\App\Http\Controllers\PurchaseOrderController::class, 'orderHistory'])->name('orders.history');
    Route::get('/export/purchase-orders', [\App\Http\Controllers\PurchaseOrderController::class, 'exportPurchaseOrders'])->name('purchase_orders.export');
});
Route::get('/products/{category}', [ProductController::class, 'showProducts'])->name('productlist');

//purchase orders
Route::get('purchase-orders', [PurchaseOrderController::class, 'index'])->name('purchase_orders.index');
Route::patch('updatePurchaseOrders/{id}', [PurchaseOrderController::class, 'updateStatus'])->name('purchase_orders.confirm');
Route::delete('deletePurchasePrders/{id}', [PurchaseOrderController::class, 'destroy'])->name('purchase_orders.delete');
// Route::post('purchase-orders', [PurchaseOrderController::class, 'store'])->name('purchase_orders.store');
// Route::post('/checkout', [PurchaseOrderController::class, 'checkout'])->name('purchase_orders.checkout');
// GET route to display the checkout page
Route::get('/checkout/{order}', [PurchaseOrderController::class, 'showCheckout'])->name('checkout.show');

Route::post('/api/checkout', [PurchaseOrderController::class, 'checkout']);

Route::get('/test-wa-web', [WhatsAppController::class, 'show']);
Route::get('/test-wa-web2', [WhatsAppController::class, 'sendMessage']);

Route::get('/categories', [CategoryController::class, 'getCategories']);

Route::post('/api/orders/mark-as-done', [PurchaseOrderController::class, 'markAsDone']);
Route::get('/api/order-status/{order_id}', [PurchaseOrderController::class, 'apiStatus']);
Route::get('/orders/track', [\App\Http\Controllers\PurchaseOrderController::class, 'trackOrderForm'])->name('orders.track.form');
Route::post('/orders/track', [\App\Http\Controllers\PurchaseOrderController::class, 'trackOrder'])->name('orders.track');

// Route dashboard untuk redirect setelah login
Route::middleware('auth')->get('/dashboard', function () {
    if (Auth::user()->role === 1) {
        return redirect()->route('admin.dashboard');
    }
    return app(\App\Http\Controllers\BaseController::class)->index(new \App\Models\Product);
})->name('dashboard');

require __DIR__ . '/auth.php';
