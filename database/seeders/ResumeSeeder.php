<?php

namespace Database\Seeders;

use App\Models\Resume;
use App\Models\RecruitmentCampaign;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Faker\Factory as Faker;

class ResumeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('vi_VN');
        $campaigns = RecruitmentCampaign::all();
        
        // Tạo 20 CV mẫu
        foreach (range(1, 20) as $index) {
            $campaign = $campaigns->random();
            
            Resume::create([
                'recruitment_campaign_id' => $campaign->id,
                'candidate_name' => $faker->name,
                'file_path' => 'resumes/sample.pdf',
                'file_name' => 'CV_' . $faker->lastName . '_' . $faker->firstName . '.pdf',
                'mime_type' => 'application/pdf',
                'file_size' => rand(500000, 2000000),
                'status' => $faker->randomElement(['pending', 'reviewing', 'approved', 'rejected']),
                'skills' => json_encode([
                    $faker->randomElement(['PHP', 'Laravel', 'React', 'Vue.js', 'Node.js']),
                    $faker->randomElement(['MySQL', 'PostgreSQL', 'MongoDB']),
                    $faker->randomElement(['Docker', 'AWS', 'Git']),
                ]),
                'education' => $faker->randomElement([
                    'Đại học Bách Khoa Hà Nội',
                    'Đại học Công nghệ - ĐHQGHN',
                    'Đại học FPT',
                    'Đại học RMIT'
                ]),
                'experience' => rand(1, 5) . ' năm kinh nghiệm',
                'summary' => $faker->paragraph,
                'ai_overall_score' => $faker->randomFloat(1, 6, 9),
                'ai_category_scores' => json_encode([
                    'technical_skills' => $faker->randomFloat(1, 6, 9),
                    'experience' => $faker->randomFloat(1, 6, 9),
                    'education' => $faker->randomFloat(1, 6, 9),
                ]),
                'ai_feedback' => json_encode([
                    'strengths' => [
                        $faker->sentence,
                        $faker->sentence,
                    ],
                    'weaknesses' => [
                        $faker->sentence,
                    ],
                    'recommendations' => [
                        $faker->sentence,
                    ],
                ]),
                'ai_scored_at' => now(),
            ]);
        }

        // Tạo file mẫu nếu chưa có
        if (!Storage::disk('public')->exists('resumes/sample.pdf')) {
            Storage::disk('public')->put('resumes/sample.pdf', '');
        }
    }
}
