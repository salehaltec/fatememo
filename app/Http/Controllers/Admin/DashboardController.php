<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\Message;

class DashboardController extends Controller
{
    public function index()
    {
        return view('admin.dashboard.index', [
            'servicesCount' => Service::count(),
            'messagesCount' => Message::count(),
            'latestMessages' => Message::latest()->take(5)->get(),
        ]);
    }
}
