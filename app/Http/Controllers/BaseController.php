<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BaseController extends Controller
{
    public function index(Product $model)
    {
        return Inertia::render('Welcome', [
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
