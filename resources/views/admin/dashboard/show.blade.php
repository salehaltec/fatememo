@extends('layouts.admin')
@section('content')<a href="{{ route('admin.dashboard') }}">← بازگشت</a><h1>پرونده کاربر <span dir="ltr">{{ $phone }}</span></h1>
<h2>آزمون‌ها</h2>@foreach($assessments as $a)<div class="lead"><b>{{ $a->tool }} — {{ $a->created_at }}</b><p>کسب‌وکار: {{ $a->business_name }} | نوع: {{ $a->business_type }}</p><details><summary>نتیجه و پاسخ‌ها</summary><pre>{{ json_encode(['result'=>$a->result,'answers'=>$a->answers], JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE) }}</pre></details></div>@endforeach
<h2>درخواست‌های تماس</h2>@foreach($contacts as $c)<div class="lead"><b>{{ $c->name }} — {{ $c->source }}</b><p>{{ $c->business_name }} | {{ $c->service }} | {{ $c->email }}</p><p>{{ $c->message }}</p></div>@endforeach
@endsection
