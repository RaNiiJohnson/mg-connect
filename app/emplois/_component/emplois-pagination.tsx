"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQueryState, parseAsInteger } from "nuqs";

interface EmploisPaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  itemsPerPage?: number;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
}

export function EmploisPagination({
  currentPage,
  totalPages,
  itemsPerPage = 10,
  onItemsPerPageChange,
}: EmploisPaginationProps) {
  const [, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  if (totalPages <= 1) return null;

  const handlePageChange = (page: number) => {
    setPage(page);
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate page numbers to show
  const getVisiblePages = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex flex-col items-center gap-6 mt-8">
      {/* Results info and items per page selector */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
        <div className="text-sm text-muted-foreground"></div>

        {onItemsPerPageChange && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Afficher :</span>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => onItemsPerPageChange(parseInt(value))}
            >
              <SelectTrigger className="w-20 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-muted-foreground">par page</span>
          </div>
        )}
      </div>

      {/* Pagination */}
      <Pagination>
        <PaginationContent>
          {/* Previous button */}
          <PaginationItem>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className="h-9 w-9 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </PaginationItem>

          {/* Page numbers */}
          {visiblePages.map((page, index) => (
            <PaginationItem key={index}>
              {page === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  onClick={() => handlePageChange(page as number)}
                  isActive={page === currentPage}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          {/* Next button */}
          <PaginationItem>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="h-9 w-9 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {/* Quick page jump */}
      {totalPages > 10 && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Aller à la page :</span>
          <Select
            value={currentPage.toString()}
            onValueChange={(value) => handlePageChange(parseInt(value))}
          >
            <SelectTrigger className="w-20 h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <SelectItem key={page} value={page.toString()}>
                    {page}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
          <span className="text-muted-foreground">sur {totalPages}</span>
        </div>
      )}
    </div>
  );
}
