@extends('layouts.admin')

@section('content')
@php
    $toolLabels = [
        'business-check' => ['title' => 'چکاپ کسب‌وکار', 'icon' => '📊'],
        'business-systemization' => ['title' => 'ارزیابی سیستم‌سازی', 'icon' => '⚙️'],
        'business-consultant' => ['title' => 'تشخیص نوع همراهی', 'icon' => '🧭'],
    ];

    $keyLabels = [
        'score' => 'امتیاز',
        'totalScore' => 'امتیاز کل',
        'total' => 'مجموع',
        'max' => 'حداکثر امتیاز',
        'percentage' => 'درصد',
        'percent' => 'درصد',
        'pct' => 'درصد',
        'level' => 'سطح',
        'title' => 'عنوان نتیجه',
        'summary' => 'جمع‌بندی',
        'description' => 'توضیحات',
        'message' => 'پیام',
        'weakest' => 'نیازمند بیشترین توجه',
        'weakestSection' => 'نیازمند بیشترین توجه',
        'strongest' => 'نقطه قوت',
        'strongestSection' => 'نقطه قوت',
        'recommendation' => 'پیشنهاد',
        'recommendations' => 'پیشنهادها',
        'sections' => 'نتایج بخش‌ها',
        'result' => 'نتیجه',
        'service' => 'خدمت پیشنهادی',
        'serviceId' => 'کد خدمت',
        'consulting' => 'مشاوره',
        'coaching' => 'کوچینگ',
        'mentoring' => 'منتورینگ',
    ];

    $labelFor = function ($key) use ($keyLabels) {
        if (isset($keyLabels[$key])) return $keyLabels[$key];
        $key = preg_replace('/([a-z])([A-Z])/', '$1 $2', (string) $key);
        return str_replace(['_', '-'], ' ', $key);
    };

    $isList = fn ($value) => is_array($value) && array_is_list($value);
    $isPercentKey = fn ($key) => in_array($key, ['percentage', 'percent', 'pct'], true);
@endphp

<style>
.user-file-head{display:flex;align-items:center;justify-content:space-between;gap:18px;margin-bottom:24px}
.back-link{display:inline-flex;align-items:center;gap:7px;color:#1e40af;text-decoration:none;font-weight:700}
.user-phone{display:inline-flex;direction:ltr;background:#e8eefc;color:#1e3a8a;border-radius:999px;padding:6px 12px;font:700 15px Roboto,sans-serif}
.section-title{display:flex;align-items:center;gap:9px;margin:28px 0 12px;font-size:21px}
.section-title span{display:grid;place-items:center;width:38px;height:38px;border-radius:11px;background:#e8eefc}
.assessment-card{background:#fff;border:1px solid #e5e7eb;border-radius:18px;padding:0;margin:14px 0;overflow:hidden;box-shadow:0 8px 25px rgba(15,23,42,.05)}
.assessment-head{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:18px 20px;background:linear-gradient(135deg,#172554,#1e40af);color:#fff}
.assessment-name{display:flex;align-items:center;gap:11px;font-size:17px;font-weight:800}
.assessment-icon{display:grid;place-items:center;width:42px;height:42px;background:rgba(255,255,255,.14);border-radius:12px;font-size:21px}
.assessment-date{font-size:12px;color:#dbeafe;direction:ltr;font-family:Roboto,sans-serif}
.business-meta{display:flex;flex-wrap:wrap;gap:9px;padding:14px 20px;border-bottom:1px solid #eef2f7}
.meta-pill{background:#f8fafc;border:1px solid #e5e7eb;border-radius:999px;padding:6px 11px;color:#475569;font-size:13px}
.result-area{padding:20px}
.result-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:11px;margin-bottom:15px}
.metric{position:relative;background:#f8fafc;border:1px solid #e5e7eb;border-radius:13px;padding:14px;overflow:hidden}
.metric-label{display:block;color:#64748b;font-size:12px;margin-bottom:7px}
.metric-value{display:block;color:#172033;font-weight:800;font-size:17px;line-height:1.65;overflow-wrap:anywhere}
.progress{height:7px;background:#e2e8f0;border-radius:999px;margin-top:10px;overflow:hidden}
.progress span{display:block;height:100%;background:linear-gradient(90deg,#2563eb,#06b6d4);border-radius:inherit}
.breakdown{background:#f8fafc;border:1px solid #e5e7eb;border-radius:14px;padding:14px;margin-top:11px}
.breakdown-title{font-weight:800;margin-bottom:11px;color:#334155}
.breakdown-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(185px,1fr));gap:9px}
.breakdown-item{background:#fff;border:1px solid #e5e7eb;border-radius:11px;padding:11px}
.breakdown-item strong{display:block;color:#334155;margin-bottom:6px}
.breakdown-item span{color:#64748b;font-size:13px;line-height:1.7}
.list-tags{display:flex;flex-wrap:wrap;gap:7px}
.list-tag{background:#eff6ff;color:#1e40af;border:1px solid #bfdbfe;border-radius:9px;padding:7px 10px;font-size:13px}
.answers-box{margin:0 20px 20px;border-top:1px solid #e5e7eb;padding-top:17px}
.answers-box summary{cursor:pointer;font-weight:800;color:#1e40af;list-style:none;display:flex;align-items:center;justify-content:space-between}
.answers-box summary:after{content:'+';display:grid;place-items:center;width:26px;height:26px;border-radius:8px;background:#eff6ff;font-size:18px}
.answers-box[open] summary:after{content:'−'}
.answer-list{display:grid;gap:9px;margin-top:14px}
.answer-row{display:flex;align-items:flex-start;gap:10px;background:#f8fafc;border:1px solid #e5e7eb;border-radius:11px;padding:11px}
.answer-no{flex:0 0 29px;height:29px;display:grid;place-items:center;background:#1e40af;color:#fff;border-radius:8px;font:700 12px Roboto,sans-serif}
.answer-content{min-width:0;line-height:1.8;color:#334155;overflow-wrap:anywhere}
.answer-content b{color:#172033}
.empty-state{background:#fff;border:1px dashed #cbd5e1;border-radius:15px;padding:30px;text-align:center;color:#64748b}
.contact-card{background:#fff;border:1px solid #e5e7eb;border-right:4px solid #1e40af;border-radius:14px;padding:17px;margin:11px 0}
.contact-head{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}
.contact-name{font-weight:800;color:#172033}
.contact-details{display:flex;gap:7px;flex-wrap:wrap;margin:10px 0}
.contact-details span{background:#f1f5f9;border-radius:7px;padding:5px 8px;font-size:12px;color:#475569}
.contact-message{margin:10px 0 0;line-height:1.9;color:#475569}
@media(max-width:700px){.user-file-head,.assessment-head{align-items:flex-start;flex-direction:column}.result-area{padding:14px}.business-meta{padding:12px 14px}.answers-box{margin:0 14px 16px}.result-grid{grid-template-columns:1fr 1fr}.breakdown-grid{grid-template-columns:1fr}}
@media(max-width:430px){.result-grid{grid-template-columns:1fr}}
</style>

<div class="user-file-head">
    <div>
        <a class="back-link" href="{{ route('admin.dashboard') }}">→ بازگشت به داشبورد</a>
        <h1>پرونده کاربر</h1>
    </div>
    <span class="user-phone">{{ $phone }}</span>
</div>

<h2 class="section-title"><span>📝</span> آزمون‌ها و ارزیابی‌ها</h2>

@forelse($assessments as $a)
    @php
        $tool = $toolLabels[$a->tool] ?? ['title' => $labelFor($a->tool), 'icon' => '📋'];
        $result = is_array($a->result) ? $a->result : [];
        $answers = is_array($a->answers) ? $a->answers : [];
    @endphp
    <article class="assessment-card">
        <header class="assessment-head">
            <div class="assessment-name">
                <span class="assessment-icon">{{ $tool['icon'] }}</span>
                <span>{{ $tool['title'] }}</span>
            </div>
            <time class="assessment-date">{{ $a->created_at?->format('Y/m/d - H:i') }}</time>
        </header>

        @if($a->business_name || $a->business_type)
            <div class="business-meta">
                @if($a->business_name)<span class="meta-pill">🏢 نام کسب‌وکار: <b>{{ $a->business_name }}</b></span>@endif
                @if($a->business_type)<span class="meta-pill">🏷️ نوع کسب‌وکار: <b>{{ $labelFor($a->business_type) }}</b></span>@endif
            </div>
        @endif

        <div class="result-area">
            @if(count($result))
                <div class="result-grid">
                    @foreach($result as $key => $value)
                        @if(!is_array($value))
                            <div class="metric">
                                <span class="metric-label">{{ $labelFor($key) }}</span>
                                <span class="metric-value">{{ is_bool($value) ? ($value ? 'بله' : 'خیر') : $labelFor($value) }}</span>
                                @if($isPercentKey($key) && is_numeric($value))
                                    <div class="progress"><span style="width:{{ max(0, min(100, (float) $value)) }}%"></span></div>
                                @endif
                            </div>
                        @endif
                    @endforeach
                </div>

                @foreach($result as $key => $value)
                    @if(is_array($value))
                        <div class="breakdown">
                            <div class="breakdown-title">{{ $labelFor($key) }}</div>
                            @if($isList($value))
                                <div class="list-tags">
                                    @foreach($value as $item)
                                        <span class="list-tag">{{ is_array($item) ? json_encode($item, JSON_UNESCAPED_UNICODE) : $labelFor($item) }}</span>
                                    @endforeach
                                </div>
                            @else
                                <div class="breakdown-grid">
                                    @foreach($value as $subKey => $subValue)
                                        <div class="breakdown-item">
                                            <strong>{{ $labelFor($subKey) }}</strong>
                                            @if(is_array($subValue))
                                                @foreach($subValue as $innerKey => $innerValue)
                                                    <span>{{ is_string($innerKey) ? $labelFor($innerKey).': ' : '' }}{{ is_array($innerValue) ? json_encode($innerValue, JSON_UNESCAPED_UNICODE) : $labelFor($innerValue) }}</span>@if(!$loop->last)<br>@endif
                                                @endforeach
                                            @else
                                                <span>{{ $labelFor($subValue) }}</span>
                                                @if(is_numeric($subValue) && $subValue >= 0 && $subValue <= 100)
                                                    <div class="progress"><span style="width:{{ $subValue }}%"></span></div>
                                                @endif
                                            @endif
                                        </div>
                                    @endforeach
                                </div>
                            @endif
                        </div>
                    @endif
                @endforeach
            @else
                <div class="empty-state">برای این ارزیابی نتیجه‌ای ذخیره نشده است.</div>
            @endif
        </div>

        <details class="answers-box">
            <summary>مشاهده پاسخ‌های ثبت‌شده <small>({{ count($answers) }} مورد)</small></summary>
            <div class="answer-list">
                @forelse($answers as $answerKey => $answer)
                    <div class="answer-row">
                        <span class="answer-no">{{ is_numeric($answerKey) ? $answerKey + 1 : $loop->iteration }}</span>
                        <div class="answer-content">
                            @if(is_array($answer))
                                @foreach($answer as $itemKey => $itemValue)
                                    <b>{{ $labelFor($itemKey) }}:</b>
                                    {{ is_array($itemValue) ? json_encode($itemValue, JSON_UNESCAPED_UNICODE) : $labelFor($itemValue) }}
                                    @if(!$loop->last)<br>@endif
                                @endforeach
                            @else
                                {{ $labelFor($answer) }}
                            @endif
                        </div>
                    </div>
                @empty
                    <div class="empty-state">پاسخی ذخیره نشده است.</div>
                @endforelse
            </div>
        </details>
    </article>
@empty
    <div class="empty-state">هنوز آزمونی برای این کاربر ثبت نشده است.</div>
@endforelse

<h2 class="section-title"><span>☎️</span> درخواست‌های تماس</h2>
@forelse($contacts as $c)
    <article class="contact-card">
        <div class="contact-head">
            <span class="contact-name">{{ $c->name ?: 'بدون نام' }}</span>
            <span class="user-phone">{{ $c->phone }}</span>
        </div>
        <div class="contact-details">
            @if($c->business_name)<span>🏢 {{ $c->business_name }}</span>@endif
            @if($c->service)<span>🎯 {{ $c->service }}</span>@endif
            @if($c->source)<span>📍 {{ $c->source }}</span>@endif
            @if($c->email)<span dir="ltr">✉️ {{ $c->email }}</span>@endif
        </div>
        @if($c->message)<p class="contact-message">{{ $c->message }}</p>@endif
    </article>
@empty
    <div class="empty-state">درخواست تماسی از این کاربر ثبت نشده است.</div>
@endforelse
@endsection
