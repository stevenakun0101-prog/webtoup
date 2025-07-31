<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Category $model)
    {
        return Inertia::render('CategoryDashboard', [
            'ProductsData' => $model->all()->map(function ($product) {
                return [
                    'id' => $product->id,
                    'status' => $product->status,
                    'image_url' => $product->image_url, // Include the image URL
                    'title' => $product->title,

                ];
            }),
            'count' => $model->count(),
        ]);
    }

    public function getCategories()
    {
        $categories = Category::select('id', 'title')->get(); // Retrieve only necessary fields
        return response()->json($categories);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function store(Request $request, Category $model)
    {
        // dd($request);
        $validatedData = $request->validate([
            'status' => 'required|max:255',
            'image' => 'required|image|mimes:jpg,jpeg,png|max:2048', // Validation for image
            'title' => 'required|max:255',

        ]);

        // Store the image file and get its path
        $imagePath = $request->file('image')->store('categories', 'public');

        // Save product data to the database with the image path
        $model->create([
            'status' => $validatedData['status'],
            'image' => $imagePath, // Save the image path to the database
            'title' => $validatedData['title'],

        ]);

        return back()->with('message', 'Product added successfully');
    }



    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $model, $id)
    {
        // You need this for encountering Log the incoming request data
        // And you can view this logs at storage/logs/laravel.log
        Log::info('Update request received for product ID: ' . $id);
        Log::info('Update request data: ', $request->all());


        $validatedData = $request->validate([
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Validasi gambar
            'title' => 'required|max:255',
            'status' => 'required|max:255',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('categories', 'public');
            $validatedData['image'] = $imagePath;
        }

        $category = $model->findOrFail($id);

        $category->update($validatedData);

        return back()->with('message', 'category updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $model, $id)
    {
        $category = $model->findOrFail($id);

        $category->delete();

        // You can also use redirect()->route('your_directory')
        return back()->with('message', 'Category deleted successfully');
    }
}
