<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RecruitmentCampaign extends Model
{
    protected $fillable = [
        'name',
        'description',
        'position',
        'quantity',
        'start_date',
        'end_date',
        'status',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    public function resumes(): HasMany
    {
        return $this->hasMany(Resume::class);
    }

    public function getFormattedDatesAttribute(): string
    {
        $dates = $this->start_date->format('d/m/Y');
        if ($this->end_date) {
            $dates .= ' - ' . $this->end_date->format('d/m/Y');
        }
        return $dates;
    }
} 