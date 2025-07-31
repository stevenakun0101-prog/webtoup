<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    /* Read */
    public function index(Product $model)
    {
        if (request()->routeIs('admin.dashboard')) {
            // Statistik
            $productsCount = \App\Models\Product::count();
            $categoriesCount = \App\Models\Category::count();
            $ordersCount = \App\Models\PurchaseOrder::count();
            $usersCount = \App\Models\User::count();
            // 5 produk terbaru
            $latestProducts = \App\Models\Product::with('category')->latest('created_at')->take(5)->get()->map(function ($product) {
                return [
                    'id' => $product->id,
                    'code' => $product->code,
                    'image_url' => $product->image_url,
                    'title' => $product->title,
                    'category' => $product->category ? $product->category->title : 'No Category',
                    'price' => $product->price,
                    'stock' => $product->stock,
                ];
            });
            // 5 order terbaru
            $latestOrders = \App\Models\PurchaseOrder::with(['user', 'category', 'product'])->latest('created_at')->take(5)->get()->map(function ($order) {
                return [
                    'id' => $order->id,
                    'order_number' => $order->order_number,
                    'user' => $order->user ? $order->user->name : '-',
                    'category' => $order->category ? $order->category->title : '-',
                    'product' => $order->product ? $order->product->title : '-',
                    'amount' => $order->amount,
                    'status' => $order->status,
                    'created_at' => $order->created_at,
                ];
            });
            // Statistik order per status
            $ordersPending = \App\Models\PurchaseOrder::where('status', 0)->count();
            $ordersSuccess = \App\Models\PurchaseOrder::where('status', 1)->count();
            $ordersCanceled = \App\Models\PurchaseOrder::where('status', 2)->count();
            // 5 user terbaru
            $latestUsers = \App\Models\User::latest('created_at')->take(5)->get()->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'created_at' => $user->created_at,
                ];
            });
            // Top produk terlaris (dummy: produk dengan order terbanyak)
            $topProducts = \App\Models\Product::withCount('orders')->orderByDesc('orders_count')->take(5)->get()->map(function ($product) {
                return [
                    'id' => $product->id,
                    'title' => $product->title,
                    'category' => $product->category ? $product->category->title : 'No Category',
                    'orders_count' => $product->orders_count,
                ];
            });
            return Inertia::render('AdminDashboard', [
                'ProductsCount' => $productsCount,
                'CategoriesCount' => $categoriesCount,
                'OrdersCount' => $ordersCount,
                'UsersCount' => $usersCount,
                'LatestProducts' => $latestProducts,
                'LatestOrders' => $latestOrders,
                'OrdersPending' => $ordersPending,
                'OrdersSuccess' => $ordersSuccess,
                'OrdersCanceled' => $ordersCanceled,
                'LatestUsers' => $latestUsers,
                'TopProducts' => $topProducts,
            ]);
        } elseif (request()->routeIs('productsdashboard.index')) {
            // Data khusus untuk productsdashboard
            return Inertia::render('ProductsDashboard', [
                'ProductsData' => Product::with('category')->get()->map(function ($product) {
                    return [
                        'id' => $product->id,
                        'code' => $product->code,
                        'image_url' => $product->image_url,
                        'title' => $product->title,
                        'description' => $product->description,
                        'price' => $product->price,
                        'stock' => $product->stock,
                        'category' => $product->category ? $product->category->title : 'No Category',
                    ];
                }),
                'categories' => \App\Models\Category::all()->map(function ($category) {
                    return [
                        'id' => $category->id,
                        'title' => $category->title,
                        'type' => $category->type,
                    ];
                }),
                'count' => Product::count(),
            ]);
        } else {
            return Inertia::render('Dashboard', [
                'CategoryData' => Category::where('status', 1)->get()->map(function ($category) {
                    return [
                        'id' => $category->id,
                        'image_url' => $category->image_url, // Include the image URL
                        'title' => $category->title,
                        'type' => $category->type,
                    ];
                }),

                // Adding carousel data
                'CarouselData' => [
                    [
                        'id' => 1,
                        'title' => 'Special Offer',
                        'description' => 'Check out the latest offer!',
                        'image_url' =>  Storage::url('carousel/carousel1.png'), // Example image path
                    ],
                    [
                        'id' => 2,
                        'title' => 'New Arrivals',
                        'description' => 'Discover the latest products!',
                        'image_url' =>  Storage::url('carousel/carousel2.png'),
                    ],
                    [
                        'id' => 3,
                        'title' => 'Event',
                        'description' => 'Don’t miss out on our upcoming event!',
                        'image_url' =>  Storage::url('carousel/carousel3.png'),
                    ],
                ],

                'count' => $model->count(),
            ]);
        }
    }

    public function showProducts(Category $category)
    {
        // Get the products related to the category
        $products = Product::where('id_category', $category->id)->get();

        return Inertia::render('ProductList', [
            'products' => Product::with('category')->where('id_category', $category->id)->get()->map(function ($product) {
                return [
                    'id' => $product->id,
                    'code' => $product->code,
                    'image_url' => $product->image_url, // Include the image URL
                    'title' => $product->title,
                    'description' => $product->description,
                    'price' => $product->price,
                    'stock' => $product->stock,
                    'category' => $product->category ? $product->category->title : 'No Category',
                ];
            }),
            'category' => $category,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Product $model)
    {
        try {
            $validatedData = $request->validate([
                'code' => 'required|max:255',
                'image' => 'required|image|mimes:jpg,jpeg,png|max:2048', // Validation for image
                'title' => 'required|max:255',
                'description' => 'required|max:255',
                'price' => 'required',
                'stock' => 'required',
                'category_id' => 'required'
            ]);

            // Store the image file and get its path
            $imagePath = $request->file('image')->store('products', 'public');

            // Save product data to the database with the image path
            DB::beginTransaction();
            try {
                $model->create([
                    'code' => $validatedData['code'],
                    'image' => $imagePath, // Save the image path to the database
                    'title' => $validatedData['title'],
                    'description' => $validatedData['description'],
                    'price' => $validatedData['price'],
                    'stock' => $validatedData['stock'],
                    'id_category' => $validatedData['category_id'],
                ]);
                DB::commit();
                return back()->with('message', 'Product added successfully');
            } catch (\Exception $e) {
                DB::rollBack();
                Log::error('Error storing product: ' . $e->getMessage());
                return back()->withErrors('An error occurred while adding the product. Please try again.');
            }
        } catch (\Exception $e) {
            Log::error('Error validating product: ' . $e->getMessage());
            return back()->withErrors('An error occurred while validating the product. Please try again.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product) {}

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $model, $id)
    {
        // You need this for encountering Log the incoming request data
        // And you can view this logs at storage/logs/laravel.log
        Log::info('Update request received for product ID: ' . $id);
        Log::info('Update request data: ', $request->all());


        $validatedData = $request->validate([
            'code' => 'required|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Validasi gambar
            'title' => 'required|max:255',
            'description' => 'required|max:255',
            'price' => 'required',
            'stock' => 'required'
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('products', 'public');
            $validatedData['image'] = $imagePath;
        }

        $product = $model->findOrFail($id);

        $product->update($validatedData);

        return back()->with('message', 'Product updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $model, $id)
    {
        $product = $model->findOrFail($id);

        $product->delete();

        // You can also use redirect()->route('your_directory')
        return back()->with('message', 'product deleted successfully');
    }

    /**
     * Export products to Excel/CSV
     */
    public function exportProducts()
    {
        $products = Product::with('category')->get()->map(function ($product) {
            return [
                'ID' => $product->id,
                'Code' => $product->code,
                'Title' => $product->title,
                'Description' => $product->description,
                'Price' => $product->price,
                'Stock' => $product->stock,
                'Category' => $product->category ? $product->category->title : 'No Category',
                'Created At' => $product->created_at,
            ];
        });
        $filename = 'products_export_' . now()->format('Ymd_His') . '.csv';
        $handle = fopen('php://temp', 'r+');
        fputcsv($handle, array_keys($products->first()));
        foreach ($products as $row) {
            fputcsv($handle, $row);
        }
        rewind($handle);
        $csv = stream_get_contents($handle);
        fclose($handle);
        return response($csv)
            ->header('Content-Type', 'text/csv')
            ->header('Content-Disposition', 'attachment; filename="' . $filename . '"');
    }
}
