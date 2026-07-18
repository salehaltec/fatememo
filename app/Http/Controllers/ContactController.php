<?php

namespace App\Http\Controllers;

use App\Mail\NewRequestNotification;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function index()
    {
        return view('contact.index');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'message' => 'required',
        ]);

        $message = Message::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'message' => $request->message,
            'is_read' => false,
        ]);

        $this->notifyAdmin($message);

        return back()->with('success', 'پیام شما با موفقیت ارسال شد');
    }

    private function notifyAdmin(Message $message): void
    {
        if (! config('services.admin.email')) {
            logger()->warning('Admin email notification skipped: ADMIN_EMAIL is not configured.');

            return;
        }

        try {
            Mail::to(config('services.admin.email'))->send(NewRequestNotification::forMessage($message));
        } catch (\Throwable $exception) {
            report($exception);
        }
    }
}
