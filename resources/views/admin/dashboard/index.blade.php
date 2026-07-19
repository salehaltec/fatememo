@extends('layouts.admin')
@section('content')
<div class="top"><div><h1>داشبورد سایت</h1><p>اطلاعات فرم ها و درخواست‌های تماس</p></div><a class="btn" href="{{ route('admin.export') }}">خروجی Excel</a></div>
<div class="stats"><div class="card"><b>{{ $usersCount }}</b><span>کاربر</span></div><div class="card"><b>{{ $assessmentsCount }}</b><span>فرم تکمیل‌شده</span></div><div class="card"><b>{{ $contactsCount }}</b><span>درخواست تماس</span></div></div>
<form class="search"><input name="q" value="{{ request('q') }}" placeholder="جست‌وجوی شماره موبایل"><button>جست‌وجو</button></form>
<div class="table"><table><thead><tr><th>شماره</th><th>تعداد فرم پر شده</th><th>آخرین فعالیت</th><th></th></tr></thead><tbody>
@forelse($users as $user)<tr><td dir="ltr">{{ $user->phone }}</td><td>{{ $user->assessments_count }}</td><td>{{ $user->last_activity }}</td><td><a href="{{ route('admin.users.show',$user->phone) }}">مشاهده کامل</a></td></tr>@empty<tr><td colspan="4">داده‌ای ثبت نشده است.</td></tr>@endforelse
</tbody></table></div>{{ $users->links() }}
<h2>آخرین درخواست‌های تماس</h2>@foreach($contacts as $c)<div class="lead"><b>{{ $c->name }} — <span dir="ltr">{{ $c->phone }}</span></b><span>{{ $c->source }} | {{ $c->service }}</span><p>{{ $c->message }}</p></div>@endforeach
@endsection
