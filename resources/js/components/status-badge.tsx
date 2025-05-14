import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type Status = 'pending' | 'reviewing' | 'approved' | 'rejected';

const statusColors: Record<Status, string> = {
  pending: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
  reviewing: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
  approved: 'bg-green-100 text-green-800 hover:bg-green-200',
  rejected: 'bg-red-100 text-red-800 hover:bg-red-200',
};

const statusLabels: Record<Status, string> = {
  pending: 'Chờ xử lý',
  reviewing: 'Đang đánh giá',
  approved: 'Đã duyệt',
  rejected: 'Từ chối',
};

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <Badge 
      variant="secondary" 
      className={cn(statusColors[status], className)}
    >
      {statusLabels[status]}
    </Badge>
  );
} 