import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { FormEvent } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STATUS_OPTIONS = [
  { value: "active", label: "Đang mở" },
  { value: "closed", label: "Đã đóng" },
];

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    description: '',
    quantity: '10',
    status: 'active',
    position: '',
  });

  const { toast } = useToast();

  const breadcrumbs = [
    { title: 'Quản đợt tuyển dụng', href: route('recruitment-campaigns.index') },
    { title: 'Tạo mới', href: route('recruitment-campaigns.create') }
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    post(route('recruitment-campaigns.store'), {
      onSuccess: () => {
        toast({
          title: 'Thành công',
          description: 'Tạo mới đợt tuyển dụng thành công',
        });
      },
      onError: () => {
        toast({
          title: 'Lỗi',
          description: 'Có lỗi xảy ra',
          variant: 'destructive',
        });
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Tạo mới đợt tuyển dụng" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Tạo mới đợt tuyển dụng</h2>

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
                    onChange={e => setData('quantity', e.target.value)}
                  />
                  {errors.quantity && (
                    <p className="text-sm text-red-500">{errors.quantity}</p>
                  )}
                </div>

                <div className="space-y-2">
                <Label>Trạng thái</Label>
                <Select
                  value={data.status}
                  onValueChange={(value) => setData("status", value)}
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