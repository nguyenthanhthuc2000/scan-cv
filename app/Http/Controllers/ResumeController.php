<?php

namespace App\Http\Controllers;

use App\Models\Resume;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ResumeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Resume::query();

        // Handle sorting
        $sortField = $request->input('sort', 'created_at');
        $sortDirection = $request->input('direction', 'desc');
        
        // Validate sort field to prevent SQL injection
        $allowedSortFields = ['status', 'ai_overall_score', 'created_at'];
        if (in_array($sortField, $allowedSortFields)) {
            $query->orderBy($sortField, $sortDirection);
        }

        // Handle filters
        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        if ($request->filled('score_min')) {
            $query->where('ai_overall_score', '>=', $request->score_min);
        }

        if ($request->filled('score_max')) {
            $query->where('ai_overall_score', '<=', $request->score_max);
        }

        if ($request->filled('date_from')) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }

        if ($request->filled('date_to')) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        $resumes = $query->paginate(10)
            ->through(function ($resume) {
                return [
                    'id' => $resume->id,
                    'title' => $resume->candidate_name,
                    'status' => $resume->status,
                    'file_path' => $resume->file_path,
                    'file_name' => $resume->file_name,
                    'mime_type' => $resume->mime_type,
                    'file_size' => $resume->file_size,
                    'formatted_file_size' => $this->formatFileSize($resume->file_size),
                    'skills' => $resume->skills,
                    'education' => $resume->education ? json_decode($resume->education) : null,
                    'experience' => $resume->experience ? json_decode($resume->experience) : null,
                    'summary' => $resume->summary,
                    'ai_overall_score' => $resume->ai_overall_score,
                    'ai_category_scores' => $resume->ai_category_scores ? json_decode($resume->ai_category_scores) : null,
                    'ai_feedback' => $resume->ai_feedback ? json_decode($resume->ai_feedback) : null,
                    'ai_scored_at' => $resume->ai_scored_at,
                    'created_at' => $resume->created_at,
                    'updated_at' => $resume->updated_at,
                ];
            })
            ->withQueryString();

        return Inertia::render('Resumes/Index', [
            'resumes' => [
                'data' => $resumes->items(),
                'links' => $resumes->linkCollection()->map(fn ($link) => [
                    'url' => $link['url'],
                    'label' => $link['label'],
                    'active' => $link['active'],
                ])->all(),
                'current_page' => $resumes->currentPage(),
                'last_page' => $resumes->lastPage(),
                'from' => $resumes->firstItem(),
                'to' => $resumes->lastItem(),
                'total' => $resumes->total(),
            ],
            'sort' => [
                'field' => $sortField,
                'direction' => $sortDirection,
            ],
            'filters' => [
                'status' => $request->status,
                'score_min' => $request->score_min,
                'score_max' => $request->score_max,
                'date_from' => $request->date_from,
                'date_to' => $request->date_to,
            ],
        ]);
    }

    private function formatFileSize($bytes)
    {
        $units = ['B', 'KB', 'MB', 'GB'];
        $bytes = max($bytes, 0);
        $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
        $pow = min($pow, count($units) - 1);
        $bytes /= pow(1024, $pow);
        
        return round($bytes, 2) . ' ' . $units[$pow];
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Resumes/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'file' => 'required|file|mimes:pdf,doc,docx|max:10240', // max 10MB
        ]);

        $file = $request->file('file');
        $path = $file->store('resumes', 'public');

        $resume = Resume::create([
            'user_id' => auth()->id(),
            'title' => $request->title,
            'file_path' => $path,
            'file_name' => $file->getClientOriginalName(),
            'mime_type' => $file->getMimeType(),
            'file_size' => $file->getSize(),
            'status' => 'pending'
        ]);

        return redirect()->route('resumes.show', $resume)
            ->with('success', 'CV đã được tải lên thành công.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Resume $resume)
    {
        $this->authorize('view', $resume);

        return Inertia::render('Resumes/Show', [
            'resume' => $resume->load('user')
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Resume $resume)
    {
        $this->authorize('update', $resume);

        return Inertia::render('Resumes/Edit', [
            'resume' => $resume
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Resume $resume)
    {
        $this->authorize('update', $resume);

        $request->validate([
            'title' => 'required|string|max:255',
            'file' => 'nullable|file|mimes:pdf,doc,docx|max:10240',
        ]);

        if ($request->hasFile('file')) {
            // Xóa file cũ
            Storage::disk('public')->delete($resume->file_path);

            // Upload file mới
            $file = $request->file('file');
            $path = $file->store('resumes', 'public');

            $resume->update([
                'file_path' => $path,
                'file_name' => $file->getClientOriginalName(),
                'mime_type' => $file->getMimeType(),
                'file_size' => $file->getSize(),
            ]);
        }

        $resume->update([
            'title' => $request->title
        ]);

        return redirect()->route('resumes.show', $resume)
            ->with('success', 'CV đã được cập nhật thành công.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Resume $resume)
    {
        $this->authorize('delete', $resume);

        Storage::disk('public')->delete($resume->file_path);
        $resume->delete();

        return redirect()->route('resumes.index')
            ->with('success', 'CV đã được xóa thành công.');
    }

    public function updateStatus(Resume $resume, Request $request)
    {
        $this->authorize('updateStatus', $resume);

        $request->validate([
            'status' => 'required|in:pending,reviewing,approved,rejected',
            'rejection_reason' => 'required_if:status,rejected|nullable|string'
        ]);

        $resume->update([
            'status' => $request->status,
            'rejection_reason' => $request->rejection_reason
        ]);

        return back()->with('success', 'Trạng thái CV đã được cập nhật.');
    }

    public function download(Resume $resume)
    {
        $this->authorize('view', $resume);

        return Storage::disk('public')->download(
            $resume->file_path,
            $resume->file_name
        );
    }
}
