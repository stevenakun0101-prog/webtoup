<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';
    protected $primaryKey = 'id';
    protected $fillable = [
        'code',
        'id_category',
        'image',
        'title',
        'description',
        'price',
        'stock',
    ];

    // Define the inverse relationship with Category
    public function category()
    {
        return $this->belongsTo(Category::class, 'id_category');
    }

    // Accessor to get the full URL of the image
    public function getImageUrlAttribute()
    {
        return Storage::url($this->image); // This assumes you're storing the image in the 'public' disk
    }

    public function orders()
    {
        return $this->hasMany(\App\Models\PurchaseOrder::class, 'product_id');
    }
}
