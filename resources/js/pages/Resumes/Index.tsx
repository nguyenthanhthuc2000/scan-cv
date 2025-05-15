import { Head, Link, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Resume } from '@/types';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { StatusBadge } from '@/components/status-badge';
import { ArrowUpDown } from 'lucide-react';
import { useState } from 'react';
import { ResumeDetailDialog } from '@/components/resume-detail-dialog';
import { Pagination } from '@/components/ui/pagination';
import { ResumeFilters, FiltersState } from '@/components/resume-filters';

interface RecruitmentCampaign {
  id: string;
  name: string;
}

interface Props extends PageProps {
  resumes: {
    data: Resume[];
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    total: number;
  };
  sort?: {
    field: string;
    direction: 'asc' | 'desc';
  };
  filters?: FiltersState;
  recruitment_campaigns: RecruitmentCampaign[];
}

export default function Index({ resumes, sort, filters: initialFilters, recruitment_campaigns }: Props) {
  const [currentSort, setCurrentSort] = useState(sort || { field: '', direction: 'asc' });
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [filters, setFilters] = useState({
    candidate_name: initialFilters?.candidate_name || '',
    status: initialFilters?.status || 'all',
    score_min: initialFilters?.score_min || '',
    score_max: initialFilters?.score_max || '',
    date_from: initialFilters?.date_from ? new Date(initialFilters.date_from) : undefined,
    date_to: initialFilters?.date_to ? new Date(initialFilters.date_to) : undefined,
    recruitment_campaign_id: initialFilters?.recruitment_campaign_id || 'all',
  });
  
  const handleSort = (field: string) => {
    const direction = currentSort.field === field && currentSort.direction === 'asc' ? 'desc' : 'asc';
    setCurrentSort({ field, direction });
    router.get(route('resumes.index'), { 
      sort: field, 
      direction,
      ...formatFilters(filters),
    }, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handleShowDetail = (resume: Resume) => {
    setSelectedResume(resume);
    setIsDetailOpen(true);
  };

  const handleFiltersChange = (newFilters: FiltersState) => {
    setFilters(newFilters);
    router.get(route('resumes.index'), { 
      sort: currentSort.field,
      direction: currentSort.direction,
      ...formatFilters(newFilters),
    }, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handleResetFilters = () => {
    const defaultFilters = {
      candidate_name: '',
      status: 'all',
      score_min: '',
      score_max: '',
      date_from: undefined,
      date_to: undefined,
      recruitment_campaign_id: 'all',
    };
    setFilters(defaultFilters);
    router.get(route('resumes.index'), { 
      sort: currentSort.field,
      direction: currentSort.direction,
    }, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const formatFilters = (filters: FiltersState) => {
    return {
      candidate_name: filters.candidate_name,
      status: filters.status,
      score_min: filters.score_min,
      score_max: filters.score_max,
      date_from: filters.date_from?.toISOString().split('T')[0],
      date_to: filters.date_to?.toISOString().split('T')[0],
      recruitment_campaign_id: filters.recruitment_campaign_id,
    };
  };

  const breadcrumbs = [
    { title: 'Quản lý CV', href: route('resumes.index') }
  ];
  
  const reviewResume = () => {
    window.open('https://wakeup-s3.s3.ap-southeast-1.amazonaws.com/public/categories/CV_Nguyen_Van_Hoang_09_2023.pdf', '_blank');
  };

  const handleDeleteResume = (resume: Resume) => {
    alert('Feature is updating');
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Quản lý CV" />

      <div className="py-6 sm:py-8 lg:py-12">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-semibold">Danh sách CV</h2>
              <p className="text-sm text-gray-500">
                Hiển thị {resumes.from} đến {resumes.to} trong tổng số {resumes.total} CV
              </p>
            </div>
            <Link href={route('resumes.create')}>
              <Button>Tải lên CV mới</Button>
            </Link>
          </div>

          <ResumeFilters
            filters={filters}
            onChange={handleFiltersChange}
            onReset={handleResetFilters}
            recruitmentCampaigns={recruitment_campaigns}
          />

          <div className="bg-white overflow-hidden shadow-sm rounded-lg">
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tên ứng viên</TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        onClick={() => handleSort('status')}
                        className="flex items-center gap-2 hover:bg-transparent"
                      >
                        Trạng thái
                        <ArrowUpDown className="h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        onClick={() => handleSort('ai_overall_score')}
                        className="flex items-center gap-2 hover:bg-transparent"
                      >
                        Điểm AI
                        <ArrowUpDown className="h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>Ngày tạo</TableHead>
                    <TableHead>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resumes.data.map((resume) => (
                    <TableRow key={resume.id}>
                      <TableCell>{resume.title}</TableCell>
                      <TableCell>
                        <StatusBadge status={resume.status} />
                      </TableCell>
                      <TableCell>
                        {resume.ai_overall_score 
                          ? `${resume.ai_overall_score}/100`
                          : 'Chưa chấm điểm'}
                      </TableCell>
                      <TableCell>
                        {new Date(resume.created_at).toLocaleDateString('vi-VN')}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleShowDetail(resume)}
                          >
                            Chi tiết
                          </Button>
                          <Link 
                            href="https://wakeup-s3.s3.ap-southeast-1.amazonaws.com/public/categories/CV_Nguyen_Van_Hoang_09_2023.pdf"
                            target="_blank"
                          >
                            <Button variant="outline" size="sm" onClick={reviewResume}>
                              Xem CV
                            </Button>
                          </Link>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteResume(resume)}
                          >
                            Xoá
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Pagination links={resumes.links} />
          </div>
        </div>
      </div>

      <ResumeDetailDialog
        resume={selectedResume}
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
      />
    </AppLayout>
  );
} 