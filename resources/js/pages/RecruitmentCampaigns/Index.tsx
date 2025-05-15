import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export interface Campaign {
  id: number;
  title: string;
  position: string;
  quantity: number;
  dates: string;
  status: 'active' | 'closed';
  resumes_count: number;
  created_at: string;
}

interface Props extends PageProps {
  campaigns: Campaign[];
}

export default function Index({ campaigns }: Props) {
  const breadcrumbs = [
    { title: 'Đợt tuyển dụng', href: route('recruitment-campaigns.index') }
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Đợt tuyển dụng" />

      <div className="py-6 sm:py-8 lg:py-12">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-semibold">Đợt tuyển dụng</h2>
              <p className="text-sm text-gray-500">
                Quản lý các đợt tuyển dụng và CV ứng viên
              </p>
            </div>
            <Link href={route('recruitment-campaigns.create')}>
              <Button>Tạo mới</Button>
            </Link>
          </div>

          <div className="bg-white overflow-hidden shadow-sm rounded-lg">
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tên đợt</TableHead>
                    <TableHead>Vị trí</TableHead>
                    <TableHead>Số lượng</TableHead>
                    <TableHead>Thời gian</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>CV đã nhận</TableHead>
                    <TableHead>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell>{campaign.title}</TableCell>
                      <TableCell>{campaign.position}</TableCell>
                      <TableCell>{campaign.quantity}</TableCell>
                      <TableCell>{campaign.dates}</TableCell>
                      <TableCell>
                        <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>
                          {campaign.status === 'active' ? 'Đang mở' : 'Đã đóng'}
                        </Badge>
                      </TableCell>
                      <TableCell>{campaign.resumes_count}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Link href={route('recruitment-campaigns.edit', { recruitment_campaign: campaign.id })}>
                            <Button variant="outline" size="sm">
                              Chỉnh sửa
                            </Button>
                          </Link>
                          <Link href={route('resumes.index', { recruitment_campaign_id: campaign.id })}>
                            <Button variant="outline" size="sm">
                              Xem CV
                            </Button>
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
} 