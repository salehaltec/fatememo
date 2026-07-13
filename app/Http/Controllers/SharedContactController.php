<?php

namespace App\Http\Controllers;

use App\Models\ContactRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class SharedContactController extends Controller
{
    public function show(Request $request): JsonResponse
    {
        $phone = $request->session()->get('verified_phone');
        if (! $phone) return response()->json(['data' => null]);
        return response()->json(['data' => ContactRequest::where('phone', $phone)->latest()->first()]);
    }

    public function store(Request $request): JsonResponse
    {
        $phone = $request->session()->get('verified_phone');
        abort_unless($phone, 403, 'شماره موبایل تأیید نشده است.');
        $data = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['nullable', 'email', 'max:190'],
            'business_name' => ['nullable', 'string', 'max:150'],
            'service' => ['nullable', 'string', 'max:150'],
            'message' => ['nullable', 'string', 'max:3000'],
            'source' => ['required', Rule::in(['business-check', 'business-systemization', 'business-consultant'])],
        ]);
        $contact = ContactRequest::create([...$data, 'phone' => $phone]);
        return response()->json(['message' => 'درخواست شما با موفقیت ثبت شد.', 'id' => $contact->id], 201);
    }
}
