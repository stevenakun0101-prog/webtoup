<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Category extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';
    protected $fillable = [
        'image',
        'title',
        'status'
    ];

    public function Products()
    {
        return $this->hasMany(Category::class, 'id_category');
    }
    public function getImageUrlAttribute()
    {
        return Storage::url($this->image); // This assumes you're storing the image in the 'public' disk
    }
}
