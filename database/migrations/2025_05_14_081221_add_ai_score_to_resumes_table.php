<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('resumes', function (Blueprint $table) {
            $table->decimal('ai_overall_score', 5, 2)->nullable()->comment('Điểm tổng thể từ 0-100');
            $table->json('ai_category_scores')->nullable()->comment('Điểm chi tiết theo từng hạng mục');
            $table->json('ai_feedback')->nullable()->comment('Nhận xét chi tiết từ AI');
            $table->timestamp('ai_scored_at')->nullable()->comment('Thời điểm được AI chấm điểm');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('resumes', function (Blueprint $table) {
            $table->dropColumn([
                'ai_overall_score',
                'ai_category_scores',
                'ai_feedback',
                'ai_scored_at'
            ]);
        });
    }
};
