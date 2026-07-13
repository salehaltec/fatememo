<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('assessments', function (Blueprint $table) {
            $table->id();
            $table->string('phone', 20)->index();
            $table->string('tool', 40)->index();
            $table->string('business_name')->nullable();
            $table->string('business_type')->nullable();
            $table->json('answers')->nullable();
            $table->json('result')->nullable();
            $table->timestamp('verified_at');
            $table->timestamps();
        });

        Schema::create('contact_requests', function (Blueprint $table) {
            $table->id();
            $table->string('phone', 20)->index();
            $table->string('name');
            $table->string('email')->nullable();
            $table->string('business_name')->nullable();
            $table->string('service')->nullable();
            $table->text('message')->nullable();
            $table->string('source', 40)->index();
            $table->boolean('is_read')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contact_requests');
        Schema::dropIfExists('assessments');
    }
};
