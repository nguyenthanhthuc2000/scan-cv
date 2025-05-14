import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Link } from "@inertiajs/react";

interface PaginationProps {
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
}

export function Pagination({ links }: PaginationProps) {
  return (
    <div className="flex items-center justify-center space-x-2 py-4">
      {links.map((link, index) => {
        // Nếu là nút Previous
        if (index === 0) {
          return (
            <Button
              key={index}
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled={!link.url}
              asChild={link.url ? true : false}
            >
              {link.url ? (
                <Link href={link.url}>
                  <ChevronLeft className="h-4 w-4" />
                </Link>
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          );
        }

        // Nếu là nút Next
        if (index === links.length - 1) {
          return (
            <Button
              key={index}
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled={!link.url}
              asChild={link.url ? true : false}
            >
              {link.url ? (
                <Link href={link.url}>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          );
        }

        // Nếu là dấu ...
        if (link.label.includes("...")) {
          return (
            <Button
              key={index}
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          );
        }

        // Các nút số trang
        return (
          <Button
            key={index}
            variant={link.active ? "default" : "outline"}
            size="icon"
            className="h-8 w-8"
            asChild={!link.active && link.url ? true : false}
            disabled={!link.url}
          >
            {!link.active && link.url ? (
              <Link href={link.url}>{link.label}</Link>
            ) : (
              link.label
            )}
          </Button>
        );
      })}
    </div>
  );
} 