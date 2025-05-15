import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface FiltersState {
  candidate_name: string;
  status: string;
  score_min: string;
  score_max: string;
  date_from: Date | undefined;
  date_to: Date | undefined;
  recruitment_campaign_id: string;
}

interface RecruitmentCampaign {
  id: string;
  name: string;
}

interface ResumeFiltersProps {
  filters: FiltersState;
  onChange: (filters: FiltersState) => void;
  recruitmentCampaigns: RecruitmentCampaign[];
  onReset: () => void;
}

const STATUS_OPTIONS = [
  { value: "all", label: "Tất cả trạng thái" },
  { value: "pending", label: "Chờ xử lý" },
  { value: "reviewing", label: "Đang đánh giá" },
  { value: "approved", label: "Đã duyệt" },
  { value: "rejected", label: "Từ chối" },
];

export function ResumeFilters({ filters, recruitmentCampaigns = [], onChange, onReset }: ResumeFiltersProps) {
  const handleChange = (key: keyof FiltersState, value: FiltersState[keyof FiltersState]) => {
    onChange({ ...filters, [key]: value });
  };

  const hasActiveFilters =
    filters.candidate_name !== "" ||
    filters.status !== "all" ||
    filters.score_min !== "" ||
    filters.score_max !== "" ||
    filters.date_from !== undefined ||
    filters.date_to !== undefined ||
    filters.recruitment_campaign_id !== "all";

  return (
    <div className="bg-white border rounded-lg p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <h3 className="text-lg font-medium">Bộ lọc</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="h-8 px-2 lg:px-3 w-full sm:w-auto justify-center"
          >
            Xóa bộ lọc
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2">
          <Label>Tên ứng viên</Label>
          <Input
            id="candidate_name"
            type="text"
            placeholder="Nhập tên ứng viên"
            value={filters.candidate_name}
            onChange={e => handleChange('candidate_name', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Trạng thái</Label>
          <Select
            value={filters.status}
            onValueChange={(value) => handleChange("status", value)}
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

        <div className="space-y-2">
          <Label>Điểm AI</Label>
          <div className="flex items-center justify-between space-x-2">
            <Input
              type="number"
              placeholder="Từ"
              value={filters.score_min}
              onChange={(e) => handleChange("score_min", e.target.value)}
              className="w-full sm:w-28"
              min="0"
              max="100"
            />
            <span>-</span>
            <Input
              type="number"
              placeholder="Đến"
              value={filters.score_max}
              onChange={(e) => handleChange("score_max", e.target.value)}
              className="w-full sm:w-28"
              min="0"
              max="100"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Đợt tuyển dụng</Label>
          <Select
            value={filters.recruitment_campaign_id}
            onValueChange={(value) => handleChange("recruitment_campaign_id", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Chọn đợt tuyển dụng" />
            </SelectTrigger>
            <SelectContent>
              {recruitmentCampaigns.map((option, index) => (
                <SelectItem key={index} value={option.id}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Từ ngày</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !filters.date_from && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters.date_from ? (
                  format(filters.date_from, "dd/MM/yyyy", { locale: vi })
                ) : (
                  <span>Chọn ngày</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={filters.date_from}
                onSelect={(date) => handleChange("date_from", date)}
                locale={vi}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>Đến ngày</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !filters.date_to && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters.date_to ? (
                  format(filters.date_to, "dd/MM/yyyy", { locale: vi })
                ) : (
                  <span>Chọn ngày</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={filters.date_to}
                onSelect={(date) => handleChange("date_to", date)}
                locale={vi}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
} 