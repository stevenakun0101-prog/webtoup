<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\PurchaseOrder;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;

class PurchaseOrderController extends Controller
{

    public function __construct() {}
    // Menampilkan halaman pesanan
    public function index(PurchaseOrder $orders)
    {

        if (Auth::user()->role == 1) {
            $ordersData = PurchaseOrder::with('user', 'category', 'product')->get();
            // dd($ordersData);
            return Inertia::render('PurchaseOrdersDashboard', [
                'orders' => $ordersData,
                'count' => $orders->count()
            ]);
        } else {
            return redirect()->route('/');
        }
    }

    // Membuat pesanan topup baru
    public function store(Request $request)
    {
        $request->validate([
            'topup_provider' => 'required',
            'amount' => 'required|integer|min:1',
        ]);

        // dd($request);

        $orderNumber = 'TOPUP-' . strtoupper(uniqid());

        PurchaseOrder::create([
            'user_id' => Auth::user()->id,
            'order_number' => $orderNumber,
            'topup_provider' => $request->topup_provider,
            'amount' => $request->amount,
            'status' => 'pending',
            'whatsapp' => $request->whatsapp,
            'sender_name' => $request->sender_name,
        ]);

        return redirect()->route('purchase_orders.index')->with('success', 'Topup order created!');
    }

    // Memperbarui status pesanan
    public function updateStatus($id)
    {
        $order = PurchaseOrder::findOrFail($id);
        $order->update(['status' => 1]);

        return redirect()->back()->with('success', 'Order status updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PurchaseOrder $model, $id)
    {
        $category = $model->findOrFail($id);

        $category->delete();

        // You can also use redirect()->route('your_directory')
        return back()->with('message', 'Category deleted successfully');
    }

    // Method untuk mengarahkan ke halaman checkout

    // Method untuk mengarahkan ke halaman checkout
    public function checkout(Request $request)
    {
        try {
            // Log the incoming request data for debugging purposes
            Log::info('Checkout Request Data: ', $request->all());

            // Validate the request
            $validatedData = $request->validate([
                // 'game_id' => 'required',
                'product_id' => 'required|exists:products,id',
                'payment_method' => 'required|string',
                'game_server' => 'nullable|string', // Optional field
                'whatsapp' => 'required|string', // Ensure whatsapp is required
                'sender_name' => 'required|string', // Ensure sender_name is required
            ]);

            // Fetch product
            $product = Product::with('category')->findOrFail($validatedData['product_id']);

            // Create purchase order
            $order = PurchaseOrder::create([
                'user_id' => Auth::user()->id ?? 2,
                'category_id' => $product->id_category,
                'product_id' => $product->id,
                'game_id' => $request->game_id,
                'game_server' => $request->game_server,
                'payment_method' => $request->payment_method,
                'order_number' => 'ORD/ML/' . date("Y") . "/" . date("m") . "/" . strtoupper(uniqid()),
                'amount' => $product->price,
                'whatsapp' => $request->whatsapp,
                'sender_name' => $request->sender_name,
            ]);

            // Log success before redirecting
            Log::info('Order successfully created: ', ['order_id' => $order->id]);

            // Template pesan WhatsApp
            $message = '';
            if ($product->category->type == 3) {
                // Produk aplikasi
                $message = "🧾 *ORDER BARU CUNGSSTORE*\n" .
                    "────────────────\n" .
                    "*No Invoice:* ORD_NO/{$order->id}\n" .
                    "*Produk:* {$product->title}\n" .
                    "*Harga:* Rp" . number_format($product->price, 0, ',', '.') . "\n" .
                    "*Payment:* {$request->payment_method}\n" .
                    "*Pengirim:* {$request->sender_name}\n" .
                    "*WhatsApp:* {$request->whatsapp}\n" .
                    "*Tipe Order:* {$product->category->title}\n" .
                    "────────────────";
            } elseif ($product->category && $product->category->type == 4) {
                // Produk joki
                $message = "🧾 *ORDER JOKI CUNGSSTORE*\n" .
                    "────────────────\n" .
                    "*No Invoice:* ORD_NO/{$order->id}\n" .
                    "*ID + Server:* " . ($request->game_id ?? 'N/A') . " (" . ($request->game_server ?? 'N/A') . ")\n" .
                    "*Login Via:* " . ($request->loginVia ?? 'N/A') . "\n" .
                    "*Nickname:* " . ($request->userId ?? 'N/A') . "\n" .
                    "*Email/HP:* " . ($request->emailOrPhone ?? 'N/A') . "\n" .
                    "*Password:* " . ($request->password ?? 'N/A') . "\n" .
                    "*Request Hero:* " . ($request->heroRequest ?? 'N/A') . "\n" .
                    "*Order Star:* " . ($request->starOrder ?? 'N/A') . "\n" .
                    "*Catatan:* " . ($request->notes ?? 'N/A') . "\n" .
                    "*Harga:* Rp" . number_format($product->price * ($request->starOrder ?? 1), 0, ',', '.') . "\n" .
                    "*Paket:* {$product->title}\n" .
                    "*Payment:* {$request->payment_method}\n" .
                    "*Pengirim:* {$request->sender_name}\n" .
                    "*WhatsApp:* {$request->whatsapp}\n" .
                    "*Tipe Order:* {$product->category->title}\n" .
                    "────────────────";
            } else {
                // Produk/topup biasa
                $message = "🧾 *ORDER BARU CUNGSSTORE*\n" .
                    "────────────────\n" .
                    "*No Invoice:* ORD_NO/{$order->id}\n" .
                    "*ID + Server:* " . ($request->game_id ?? 'N/A') . " (" . ($request->game_server ?? 'N/A') . ")\n" .
                    "*Produk:* {$product->title}\n" .
                    "*Harga:* Rp" . number_format($product->price, 0, ',', '.') . "\n" .
                    "*Payment:* {$request->payment_method}\n" .
                    "*Pengirim:* {$request->sender_name}\n" .
                    "*WhatsApp:* {$request->whatsapp}\n" .
                    "*Tipe Order:* {$product->category->title}\n" .
                    "────────────────";
            }

            // Send message to WhatsApp group (admin)
            $response = Http::post('https://wa-web-service.up.railway.app/send-message', [
                'groupTitle' => 'WEB CUNGS',
                'message' => $message,
            ]);

            // Kirim pesan WhatsApp ke pembeli
            $buyerMessage =
                "Terima kasih sudah order di CUNGSSTORE!\n" .
                "────────────────\n" .
                "*Kode Invoice (INV):* \n" .
                "```{$order->order_number}```\n" .
                "(Salin kode di atas untuk cek status pesanan)\n" .
                "*Produk:* {$product->title}\n" .
                "*Total:* Rp" . number_format($order->amount, 0, ',', '.') . "\n" .
                "*Status:* Menunggu Pembayaran\n" .
                "────────────────\n" .
                "Cek status pesanan: https://" . request()->getHttpHost() . "/orders/track\n" .
                "Gunakan kode invoice & WhatsApp ini untuk cek status.";
            Http::post('https://wa-web-service.up.railway.app/send-message', [
                'number' => $order->whatsapp,
                'message' => $buyerMessage,
            ]);

            if ($response->successful()) {
                Log::info('WhatsApp message sent successfully', ['response' => $response->json()]);
            } else {
                Log::error('Failed to send WhatsApp message', ['response' => $response->json()]);
            }

            // Redirect to the checkout page with data
            // Return JSON response for API
            return response()->json([
                'status' => 200,
                'message' => 'Order successfully created.',
                'order_id' => $order->id,
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Validation Error: ', $e->errors());
            return response()->json([
                'status' => 422,
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            Log::error('Checkout Error: ' . $e->getMessage());
            return response()->json([
                'status' => 500,
                'message' => 'There was an issue processing your order. Please try again.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }




    public function showCheckout($order_id)
    {
        try {
            // Fetch the order by its ID
            $order = PurchaseOrder::with('product', 'user', 'category')->find($order_id);

            $payment_method = null;
            if ($order) {
                $payment_method = DB::table('payment_options')->where('key_name', $order->payment_method)->first();
            }

            // Render the checkout view with order data or error
            return Inertia::render('Checkout', [
                'order' => $order,
                'payment_method' => $payment_method,
                'qr_url' => Storage::url("payments/qr-code.png"),
                'error' => $order ? null : 'Order not found.',
            ]);
        } catch (\Exception $e) {
            // Render error page with message
            return Inertia::render('Checkout', [
                'order' => null,
                'payment_method' => null,
                'qr_url' => Storage::url("payments/qr-code.png"),
                'error' => 'Order not found. (Exception)'
            ]);
        }
    }

    public function markAsDone(Request $request)
    {
        // Validate the incoming request
        $request->validate([
            'order_id' => 'required|string',
        ]);

        try {
            // Find the order by order_id
            $order = PurchaseOrder::where('id', $request->order_id)
                ->where('status', 0)
                ->first();

            // Check if the order exists
            if (!$order) {
                return response()->json([
                    'success' => false,
                    'message' => 'Order not found',
                ], 404);
            }

            // Update the order status to 'done'
            $order->status = 1;
            $order->save();

            return response()->json([
                'success' => true,
                'message' => 'Order marked as done successfully',
                'order' => $order,
            ]);
        } catch (\Exception $e) {
            // Handle exceptions
            return response()->json([
                'success' => false,
                'message' => 'An error occurred: ' . $e->getMessage(),
            ], 500);
        }
    }

    // API endpoint for realtime status polling
    public function apiStatus($order_id)
    {
        $order = PurchaseOrder::find($order_id);
        if (!$order) {
            return response()->json(['success' => false, 'message' => 'Order not found'], 404);
        }
        return response()->json([
            'success' => true,
            'id' => $order->id,
            'status' => $order->status,
            'updated_at' => $order->updated_at,
        ]);
    }

    // Histori pesanan user login
    public function orderHistory()
    {
        $user = Auth::user();
        if (!$user || $user->role != 0) {
            abort(403, 'Unauthorized');
        }
        $orders = PurchaseOrder::with('product', 'category')
            ->where('user_id', $user->id)
            ->orderByDesc('created_at')
            ->get();
        return Inertia::render('OrderHistory', [
            'orders' => $orders
        ]);
    }

    // Form cek status pesanan (guest & user)
    public function trackOrderForm()
    {
        if (Auth::check()) {
            return redirect()->route('orders.history');
        }
        return Inertia::render('OrderTrack', [
            'result' => null,
            'error' => null
        ]);
    }

    // Proses cek status pesanan
    public function trackOrder(Request $request)
    {
        $request->validate([
            'order_number' => 'required',
            'whatsapp' => 'required',
        ]);
        $order = PurchaseOrder::with('product', 'category')
            ->where('order_number', $request->order_number)
            ->where('whatsapp', $request->whatsapp)
            ->first();
        if (!$order) {
            return Inertia::render('OrderTrack', [
                'result' => null,
                'error' => 'Pesanan tidak ditemukan. Pastikan kode invoice dan WhatsApp benar.'
            ]);
        }
        return Inertia::render('OrderTrack', [
            'result' => $order,
            'error' => null
        ]);
    }

    /**
     * Export purchase orders to CSV/Excel
     */
    public function exportPurchaseOrders()
    {
        $orders = \App\Models\PurchaseOrder::with(['user', 'category', 'product'])->get()->map(function ($order) {
            return [
                'ID' => $order->id,
                'Order Number' => $order->order_number,
                'User' => $order->user ? $order->user->name : '-',
                'Category' => $order->category ? $order->category->title : '-',
                'Product' => $order->product ? $order->product->title : '-',
                'Amount' => $order->amount,
                'Status' => $order->status === 0 ? 'Pending' : ($order->status === 1 ? 'Success' : ($order->status === 2 ? 'Canceled' : 'Unknown')),
                'Created At' => $order->created_at,
            ];
        });
        $filename = 'purchase_orders_export_' . now()->format('Ymd_His') . '.csv';
        $handle = fopen('php://temp', 'r+');
        fputcsv($handle, array_keys($orders->first() ?? []));
        foreach ($orders as $row) {
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
