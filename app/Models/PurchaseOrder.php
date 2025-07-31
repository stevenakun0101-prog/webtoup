<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchaseOrder extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'category_id',
        'product_id',
        'game_id',
        'game_server',
        'payment_method',
        'order_number',
        'amount',
        'status',
        'whatsapp',
        'sender_name'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
