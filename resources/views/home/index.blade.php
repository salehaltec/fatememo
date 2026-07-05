@extends('layouts.app')

@section('content')

    <!-- HERO -->
    <div class="bg-white p-10 rounded-xl text-center shadow">
        <h1 class="text-3xl font-bold">کوچینگ حرفه‌ای کسب‌وکار</h1>
        <p class="mt-3 text-gray-600">
            رشد سریع، فروش بیشتر و ساخت برند قدرتمند
        </p>

        <a href="/contact"
           class="inline-block mt-5 bg-black text-white px-6 py-2 rounded">
            شروع همکاری
        </a>
    </div>

    <!-- SERVICES -->
    <h2 class="text-2xl font-bold mt-10">خدمات</h2>

    <div class="grid grid-cols-2 gap-4 mt-4">

        @foreach($services as $service)
            <div class="bg-white p-5 rounded shadow">
                <h3 class="font-bold">{{ $service->title_fa }}</h3>
                <p class="text-gray-600 mt-2">{{ $service->description_fa }}</p>
            </div>
        @endforeach

    </div>

    <!-- ABOUT -->
    <div class="bg-white p-6 rounded shadow mt-10">
        <h2 class="text-xl font-bold">درباره فاطمه محمدی</h2>
        <p class="text-gray-600 mt-2">
            کوچ حرفه‌ای کسب‌وکار با تمرکز بر رشد، فروش و توسعه فردی.
        </p>
    </div>

@endsection
