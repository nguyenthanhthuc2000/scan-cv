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
                    'title' => $campaign->title,
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
        $request->request->add(['start_date' => now()]);
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'position' => 'required|string|max:255',
            'quantity' => 'required|integer|min:1|max:100',
            'status' => 'required',
        ]);

        RecruitmentCampaign::create($request->all());

        return redirect()->route('recruitment-campaigns.index')
            ->with('success', 'Đã tạo đợt tuyển dụng mới');
    }

    public function edit(RecruitmentCampaign $recruitmentCampaign)
    {
        return Inertia::render('RecruitmentCampaigns/Edit', [
            'campaign' => $recruitmentCampaign,
        ]);
    }

    public function update(Request $request, RecruitmentCampaign $recruitmentCampaign)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'position' => 'required|string|max:255',
            'quantity' => 'required|integer|min:1|max:100',
            'status' => 'required|in:active,closed',
        ]);

        $recruitmentCampaign->update($request->all());

        return redirect()->route('recruitment-campaigns.index')
            ->with('success', 'Đã cập nhật đợt tuyển dụng');
    }

    public function destroy(RecruitmentCampaign $recruitmentCampaign)
    {
        if ($recruitmentCampaign->resumes()->exists()) {
            return back()->with('error', 'Không thể xóa đợt tuyển dụng đã có CV');
        }

        $recruitmentCampaign->delete();

        return back()->with('success', 'Đã xóa đợt tuyển dụng');
    }
} 