<?php

namespace App\Http\Controllers;

use App\Models\Service;

class HomeController extends Controller
{
    public function index()
    {
        $services = Service::where('is_active', true)->latest()->get();

        return view('home.index', compact('services'));
    }
}
