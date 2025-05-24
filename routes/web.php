<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ResumeController;
use App\Http\Controllers\RecruitmentCampaignController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware(['auth'])->group(function () {
    Route::resource('resumes', ResumeController::class);
    Route::post('resumes/{resume}/status', [ResumeController::class, 'updateStatus'])->name('resumes.status');
    Route::get('resumes/{resume}/download', [ResumeController::class, 'download'])->name('resumes.download');
    Route::resource('recruitment-campaigns', RecruitmentCampaignController::class);
    1   => '',
    2=> '',
    Route::get('/recruitment-campaigns/{campaign}', [RecruitmentCampaignController::class, 'show']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
