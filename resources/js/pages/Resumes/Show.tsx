import { Head, Link } from '@inertiajs/react';
import { PageProps, Resume } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface Props extends PageProps {
  resume: Resume;
}

export default function Show({ resume }: Props) {
  const breadcrumbs = [
    { title: 'Quản lý CV', href: route('resumes.index') },
    { title: resume.title, href: route('resumes.show', resume.id) }
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Chi tiết CV - ${resume.title}`} />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">{resume.title}</h2>
                <div className="flex gap-2">
                  <Link href={route('resumes.download', resume.id)}>
                    <Button variant="outline">Tải xuống</Button>
                  </Link>
                  <Link href={route('resumes.edit', resume.id)}>
                    <Button>Chỉnh sửa</Button>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Thông tin cơ bản</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Trạng thái</p>
                      <Badge variant="secondary" className={resume.status_badge}>
                        {resume.status}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Kích thước</p>
                      <p>{resume.formatted_file_size}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Loại file</p>
                      <p>{resume.mime_type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Ngày tải lên</p>
                      <p>{new Date(resume.created_at).toLocaleDateString('vi-VN')}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Đánh giá từ AI</CardTitle>
                    <CardDescription>
                      {resume.ai_scored_at
                        ? `Cập nhật lần cuối: ${new Date(resume.ai_scored_at).toLocaleString('vi-VN')}`
                        : 'Chưa được đánh giá'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {resume.ai_overall_score && (
                      <div>
                        <p className="text-sm text-gray-500">Điểm tổng thể</p>
                        <p className="text-2xl font-bold">
                          {resume.ai_overall_score}/100
                        </p>
                      </div>
                    )}

                    {resume.ai_category_scores && (
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Điểm chi tiết</p>
                        <div className="space-y-2">
                          {Object.entries(resume.ai_category_scores).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className="capitalize">{key.replace('_', ' ')}</span>
                              <span>{value}/100</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {resume.ai_feedback && (
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-2">Điểm mạnh</p>
                          <ul className="list-disc list-inside">
                            {resume.ai_feedback.strengths.map((strength, index) => (
                              <li key={index}>{strength}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500 mb-2">Điểm yếu</p>
                          <ul className="list-disc list-inside">
                            {resume.ai_feedback.weaknesses.map((weakness, index) => (
                              <li key={index}>{weakness}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500 mb-2">Gợi ý cải thiện</p>
                          <ul className="list-disc list-inside">
                            {resume.ai_feedback?.suggestions?.map((suggestion, index) => (
                              <li key={index}>{suggestion}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {resume.skills && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Kỹ năng</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{resume.skills}</p>
                    </CardContent>
                  </Card>
                )}

                {resume.education && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Học vấn</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{resume.education}</p>
                    </CardContent>
                  </Card>
                )}

                {resume.experience && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Kinh nghiệm</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{resume.experience}</p>
                    </CardContent>
                  </Card>
                )}

                {resume.summary && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Tóm tắt</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{resume.summary}</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
} 