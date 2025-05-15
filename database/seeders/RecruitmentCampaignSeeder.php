<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\RecruitmentCampaign;
use Carbon\Carbon;

class RecruitmentCampaignSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $campaigns = [
            [
                'title' => 'Tuyển dụng Frontend Developer 2024',
                'description' => 'Chúng tôi đang tìm kiếm Frontend Developer có kinh nghiệm với React/Vue.js',
                'position' => 'Frontend Developer',
                'quantity' => 2,
                'start_date' => Carbon::now(),
                'end_date' => Carbon::now()->addMonths(1),
                'status' => 'active',
            ],
            [
                'title' => 'Tuyển dụng Backend Developer 2024',
                'description' => 'Tuyển Backend Developer có kinh nghiệm với PHP/Laravel',
                'position' => 'Backend Developer',
                'quantity' => 3,
                'start_date' => Carbon::now(),
                'end_date' => Carbon::now()->addMonths(2),
                'status' => 'active',
            ],
            [
                'title' => 'Tuyển dụng UI/UX Designer',
                'description' => 'Cần tuyển UI/UX Designer có kinh nghiệm thiết kế sản phẩm số',
                'position' => 'UI/UX Designer',
                'quantity' => 1,
                'start_date' => Carbon::now()->subMonth(),
                'end_date' => Carbon::now()->addWeek(),
                'status' => 'active',
            ],
            [
                'title' => 'Tuyển dụng DevOps Engineer',
                'description' => 'Tìm kiếm DevOps Engineer có kinh nghiệm với AWS/Docker',
                'position' => 'DevOps Engineer',
                'quantity' => 1,
                'start_date' => Carbon::now()->subMonths(2),
                'end_date' => Carbon::now()->subMonth(),
                'status' => 'closed',
            ],
        ];

        foreach ($campaigns as $campaign) {
            RecruitmentCampaign::create($campaign);
        }
    }
}
