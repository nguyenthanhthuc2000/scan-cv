<?php

namespace App\Http\Controllers;

use App\Models\RecruitmentCampaign;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RecruitmentCampaignController extends Controller
{
    public function index()
    {
        $campaigns = RecruitmentCampaign::query()
            ->withCount('resumes')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($campaign) {
                return [
                    'id' => $campaign->id,
                    'name' => $campaign->name,
                    'position' => $campaign->position,
                    'quantity' => $campaign->quantity,
                    'dates' => $campaign->formatted_dates,
                    'status' => $campaign->status,
                    'created_at' => $campaign->created_at,
                    'resumes_count' => $campaign->resumes_count,
                ];
            });

        return Inertia::render('RecruitmentCampaigns/Index', [
            'campaigns' => $campaigns
        ]);
    }

    public function create()
    {
        return Inertia::render('RecruitmentCampaigns/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'position' => 'required|string|max:255',
            'quantity' => 'required|integer|min:1',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after:start_date',
        ]);

        RecruitmentCampaign::create($validated);

        return redirect()->route('recruitment-campaigns.index')
            ->with('success', 'Đã tạo đợt tuyển dụng mới');
    }

    public function edit(RecruitmentCampaign $campaign)
    {
        return Inertia::render('RecruitmentCampaigns/Edit', [
            'campaign' => $campaign
        ]);
    }

    public function update(Request $request, RecruitmentCampaign $campaign)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'position' => 'required|string|max:255',
            'quantity' => 'required|integer|min:1',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after:start_date',
            'status' => 'required|in:active,closed',
        ]);

        $campaign->update($validated);

        return redirect()->route('recruitment-campaigns.index')
            ->with('success', 'Đã cập nhật đợt tuyển dụng');
    }

    public function destroy(RecruitmentCampaign $campaign)
    {
        if ($campaign->resumes()->exists()) {
            return back()->with('error', 'Không thể xóa đợt tuyển dụng đã có CV');
        }

        $campaign->delete();

        return back()->with('success', 'Đã xóa đợt tuyển dụng');
    }
} 