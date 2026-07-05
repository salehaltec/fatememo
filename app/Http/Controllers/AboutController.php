<?php

namespace App\Http\Controllers;

use App\Models\Page;

class AboutController extends Controller
{
    public function index()
    {
        $page = Page::where('slug', 'about')->first();

        return view('about.index', compact('page'));
    }
}
