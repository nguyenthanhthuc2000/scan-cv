import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Resume } from "@/types";
import { StatusBadge } from "./status-badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ResumeDetailDialogProps {
  resume: Resume | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ResumeDetailDialog({ resume, open, onOpenChange }: ResumeDetailDialogProps) {
  if (!resume) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto p-6 lg:p-8">
        <DialogHeader className="mb-6 sticky top-0 bg-background z-10 pb-4 border-b">
          <DialogTitle className="text-2xl lg:text-3xl font-bold">{resume.title}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cơ bản</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Trạng thái</p>
                <StatusBadge status={resume.status} />
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
                <p>{new Date(resume.created_at).toLocaleDateString("vi-VN")}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Đánh giá từ AI</CardTitle>
              <CardDescription>
                {resume.ai_scored_at
                  ? `Cập nhật lần cuối: ${new Date(
                      resume.ai_scored_at
                    ).toLocaleString("vi-VN")}`
                  : "Chưa được đánh giá"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {resume.ai_overall_score && (
                <div>
                  <p className="text-sm text-gray-500">Điểm tổng thể</p>
                  <p className="text-3xl font-bold">
                    {resume.ai_overall_score}/100
                  </p>
                </div>
              )}

              {resume.ai_category_scores && (
                <div>
                  <p className="text-sm text-gray-500 mb-3">Điểm chi tiết</p>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(resume.ai_category_scores).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                        <span className="capitalize font-medium">
                          {key.replace(/_/g, " ")}
                        </span>
                        <span className="text-lg font-semibold">{value}/100</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {resume.ai_feedback && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Điểm mạnh</p>
                    <ul className="list-disc list-inside space-y-1">
                      {resume.ai_feedback.strengths.map((strength, index) => (
                        <li key={index} className="text-green-600">{strength}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-2">Điểm yếu</p>
                    <ul className="list-disc list-inside space-y-1">
                      {resume.ai_feedback.weaknesses.map((weakness, index) => (
                        <li key={index} className="text-red-600">{weakness}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-2">Gợi ý cải thiện</p>
                    <ul className="list-disc list-inside space-y-1">
                      {resume.ai_feedback?.suggestions?.map((suggestion, index) => (
                        <li key={index} className="text-blue-600">{suggestion}</li>
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
                <div className="flex flex-wrap gap-2">
                  {resume.skills.split(",").map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-md text-sm font-medium"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {resume.education && (
            <Card>
              <CardHeader>
                <CardTitle>Học vấn</CardTitle>
              </CardHeader>
              <CardContent>
                {typeof resume.education === "string" ? (
                  <p>{resume.education}</p>
                ) : (
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-lg font-semibold">{resume.education.school}</p>
                      <p className="text-gray-600">{resume.education.degree}</p>
                      <div className="mt-2 flex justify-between text-sm text-gray-500">
                        <span>Năm tốt nghiệp: {resume.education.graduation_year}</span>
                        <span>GPA: {resume.education.gpa}</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {resume.experience && (
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Kinh nghiệm</CardTitle>
              </CardHeader>
              <CardContent>
                {typeof resume.experience === "string" ? (
                  <p>{resume.experience}</p>
                ) : (
                  <div className="grid gap-4">
                    {resume.experience.map((exp: any, index: number) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-lg font-semibold">{exp.company}</p>
                        <p className="text-gray-700 font-medium mt-1">{exp.position}</p>
                        <p className="text-sm text-gray-500 mt-1">{exp.duration}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {resume.summary && (
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Tóm tắt</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line text-gray-700 leading-relaxed">
                  {resume.summary}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
} 