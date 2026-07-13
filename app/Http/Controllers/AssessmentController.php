<?php

namespace App\Http\Controllers;

use App\Models\Assessment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AssessmentController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $phone = $request->session()->get('verified_phone');
        abort_unless($phone, 403, 'شماره موبایل تأیید نشده است.');
        $data = $request->validate([
            'tool' => ['required', Rule::in(['business-check', 'business-systemization', 'business-consultant'])],
            'business_name' => ['nullable', 'string', 'max:150'],
            'business_type' => ['nullable', 'string', 'max:100'],
            'answers' => ['nullable', 'array'],
            'result' => ['nullable', 'array'],
        ]);
        $assessment = Assessment::create([...$data, 'phone' => $phone, 'verified_at' => now()]);
        return response()->json(['id' => $assessment->id], 201);
    }
}
