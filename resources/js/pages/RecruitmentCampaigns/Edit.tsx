import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormEvent } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Campaign } from '@/pages/RecruitmentCampaigns/Index';

const STATUS_OPTIONS = [
  { value: "active", label: "Đang mở" },
  { value: "closed", label: "Đã đóng" },
];

interface EditProps {
  campaign: Campaign;
}

export default function Edit({ campaign }: EditProps) {
  
  const { data, setData, processing, errors, patch } = useForm({
    title: campaign.title,
    description: campaign.description || '',
    quantity: campaign.quantity,
    status: campaign.status,
    position: campaign.position,
  });

  const breadcrumbs = [
    { title: 'Quản đợt tuyển dụng', href: route('recruitment-campaigns.index') },
    { title: 'Chỉnh sửa', href: '' },
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    patch(route('recruitment-campaigns.update', { recruitment_campaign: campaign.id }), {
      preserveScroll: true,
      onSuccess: () => {
      },
      onError: () => {
      },
    });
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setData('quantity', value);
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Cập nhật đợt tuyển dụng" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Cập nhật đợt tuyển dụng</h2>

              <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
                <div className="space-y-2">
                  <Label htmlFor="title">Tiêu đề</Label>
                  <Input
                    id="title"
                    type="text"
                    value={data.title}
                    onChange={e => setData('title', e.target.value)}
                  />
                  {errors.title && (
                    <p className="text-sm text-red-500">{errors.title}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Vị trí tuyển</Label>
                  <Input
                    id="position"
                    type="text"
                    value={data.position}
                    onChange={e => setData('position', e.target.value)}
                  />
                  {errors.position && (
                    <p className="text-sm text-red-500">{errors.position}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Mô tả</Label>
                  <Input
                    id="description"
                    type="text"
                    value={data.description}
                    onChange={e => setData('description', e.target.value)}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500">{errors.description}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Số lượng cần tuyển</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={data.quantity}
                    min="1"
                    onChange={handleQuantityChange}
                  />
                  {errors.quantity && (
                    <p className="text-sm text-red-500">{errors.quantity}</p>
                  )}
                </div>

                <div className="space-y-2">
                <Label>Trạng thái</Label>
                <Select
                  value={data.status}
                  onValueChange={(value: 'active' | 'closed') => setData('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                </div>

                <Button type="submit" disabled={processing}>
                  {processing ? 'Đang lưu...' : 'Lưu'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
} 