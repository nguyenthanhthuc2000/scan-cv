<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Resume extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'recruitment_campaign_id',
        'candidate_name',
        'file_path',
        'file_name',
        'mime_type',
        'file_size',
        'status',
        'skills',
        'education',
        'experience',
        'summary',
        'rejection_reason',
        'ai_overall_score',
        'ai_category_scores',
        'ai_feedback',
        'ai_scored_at'
    ];

    protected $casts = [
        'ai_category_scores' => 'array',
        'ai_feedback' => 'array',
        'ai_scored_at' => 'datetime',
        'file_size' => 'integer',
        'ai_overall_score' => 'float'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function recruitmentCampaign(): BelongsTo
    {
        return $this->belongsTo(RecruitmentCampaign::class);
    }

    public function getStatusBadgeAttribute()
    {
        return match($this->status) {
            'pending' => 'bg-yellow-100 text-yellow-800',
            'reviewing' => 'bg-blue-100 text-blue-800',
            'approved' => 'bg-green-100 text-green-800',
            'rejected' => 'bg-red-100 text-red-800',
            default => 'bg-gray-100 text-gray-800'
        };
    }

    public function getFormattedFileSizeAttribute()
    {
        $bytes = $this->file_size;
        $units = ['B', 'KB', 'MB', 'GB'];
        $i = 0;
        while ($bytes >= 1024 && $i < count($units) - 1) {
            $bytes /= 1024;
            $i++;
        }
        return round($bytes, 2) . ' ' . $units[$i];
    }
}
