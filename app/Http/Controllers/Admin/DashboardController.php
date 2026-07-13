<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Assessment;
use App\Models\ContactRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\View\View;
use Symfony\Component\HttpFoundation\StreamedResponse;

class DashboardController extends Controller
{
    public function index(Request $request): View
    {
        $search = trim((string) $request->query('q'));
        $users = Assessment::query()
            ->select('phone', DB::raw('COUNT(*) as assessments_count'), DB::raw('MAX(created_at) as last_activity'))
            ->when($search, fn ($q) => $q->where('phone', 'like', "%{$search}%"))
            ->groupBy('phone')->orderByDesc('last_activity')->paginate(20)->withQueryString();
        $contacts = ContactRequest::latest()->take(10)->get();

        return view('admin.dashboard.index', [
            'users' => $users, 'contacts' => $contacts,
            'usersCount' => Assessment::distinct('phone')->count('phone'),
            'assessmentsCount' => Assessment::count(),
            'contactsCount' => ContactRequest::count(),
        ]);
    }

    public function show(string $phone): View
    {
        return view('admin.dashboard.show', [
            'phone' => $phone,
            'assessments' => Assessment::where('phone', $phone)->latest()->get(),
            'contacts' => ContactRequest::where('phone', $phone)->latest()->get(),
        ]);
    }

    public function export(): StreamedResponse
    {
        return response()->streamDownload(function () {
            $out = fopen('php://output', 'w');
            fwrite($out, "\xEF\xBB\xBF");
            fputcsv($out, ['شماره موبایل', 'نام', 'نام کسب‌وکار', 'ابزار', 'نوع کسب‌وکار', 'نتیجه', 'پاسخ‌ها', 'خدمت', 'پیام', 'تاریخ']);
            Assessment::with([])->orderBy('id')->chunk(200, function ($rows) use ($out) {
                foreach ($rows as $a) {
                    $c = ContactRequest::where('phone', $a->phone)->latest()->first();
                    fputcsv($out, [$a->phone, $c?->name, $a->business_name ?: $c?->business_name, $a->tool, $a->business_type,
                        json_encode($a->result, JSON_UNESCAPED_UNICODE), json_encode($a->answers, JSON_UNESCAPED_UNICODE),
                        $c?->service, $c?->message, $a->created_at?->format('Y-m-d H:i:s')]);
                }
            });
            fclose($out);
        }, 'business-leads-'.now()->format('Y-m-d').'.csv', ['Content-Type' => 'text/csv; charset=UTF-8']);
    }
}
