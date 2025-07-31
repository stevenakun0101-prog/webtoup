<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class WhatsAppController extends Controller
{
    public function show()
    {
        return Inertia::render('TestWaWeb');
    }

    public function sendMessage(Request $request)
    {
        return Inertia::render('SendMessage');
    }
}
