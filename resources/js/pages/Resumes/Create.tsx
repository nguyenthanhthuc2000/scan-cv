import { Head, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { FormEvent } from 'react';

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    file: null as File | null,
  });

  const { toast } = useToast();

  const breadcrumbs = [
    { title: 'Quản lý CV', href: route('resumes.index') },
    { title: 'Tải lên CV mới', href: route('resumes.create') }
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    post(route('resumes.store'), {
      onSuccess: () => {
        toast({
          title: 'Thành công',
          description: 'CV đã được tải lên thành công',
        });
      },
      onError: () => {
        toast({
          title: 'Lỗi',
          description: 'Có lỗi xảy ra khi tải lên CV',
          variant: 'destructive',
        });
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Tải lên CV mới" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Tải lên CV mới</h2>

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
                  <Label htmlFor="file">File CV (PDF, DOC, DOCX)</Label>
                  <Input
                    id="file"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={e => setData('file', e.target.files?.[0] || null)}
                  />
                  {errors.file && (
                    <p className="text-sm text-red-500">{errors.file}</p>
                  )}
                </div>

                <Button type="submit" disabled={processing}>
                  {processing ? 'Đang tải lên...' : 'Tải lên'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
} 