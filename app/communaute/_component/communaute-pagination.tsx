"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQueryState, parseAsInteger } from "nuqs";
import { usePagination } from "@/hooks/use-pagination";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface CommunautePaginationProps {
  currentPage: number;
  totalPages: number;
  paginationItemsToDisplay?: number;
}

export function CommunautePagination({
  currentPage,
  totalPages,
  paginationItemsToDisplay = 5,
}: CommunautePaginationProps) {
  const [, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentPage,
    totalPages,
    paginationItemsToDisplay,
  });

  if (totalPages <= 1) return null;

  const handlePageChange = (page: number) => {
    setPage(page);
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="flex flex-col items-center gap-4">
        <Pagination>
          <PaginationContent className="inline-flex gap-0 -space-x-px rounded-md shadow-xs rtl:space-x-reverse">
            {/* Previous page button */}
            <PaginationItem className="[&:first-child>a]:rounded-s-md [&:last-child>a]:rounded-e-md">
              <PaginationLink
                className={cn(
                  buttonVariants({
                    variant: "outline",
                  }),
                  "rounded-none shadow-none focus-visible:z-10 aria-disabled:pointer-events-none [&[aria-disabled]>svg]:opacity-50 cursor-pointer"
                )}
                onClick={() =>
                  currentPage > 1 && handlePageChange(currentPage - 1)
                }
                aria-label="Go to previous page"
                aria-disabled={currentPage === 1}
              >
                <ChevronLeft size={16} aria-hidden="true" />
              </PaginationLink>
            </PaginationItem>

            {/* First page and Left ellipsis */}
            {showLeftEllipsis && (
              <>
                <PaginationItem>
                  <PaginationLink
                    className={cn(
                      buttonVariants({
                        variant: "outline",
                      }),
                      "rounded-none shadow-none focus-visible:z-10 cursor-pointer"
                    )}
                    onClick={() => handlePageChange(1)}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis
                    className={cn(
                      buttonVariants({
                        variant: "outline",
                      }),
                      "pointer-events-none rounded-none shadow-none"
                    )}
                  />
                </PaginationItem>
              </>
            )}

            {/* Page number links */}
            {pages.map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                    }),
                    "rounded-none shadow-none focus-visible:z-10 cursor-pointer",
                    page === currentPage &&
                      "border-primary border-3 text-primary"
                  )}
                  onClick={() => handlePageChange(page)}
                  isActive={page === currentPage}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            {/* Right ellipsis and Last page */}
            {showRightEllipsis && (
              <>
                <PaginationItem>
                  <PaginationEllipsis
                    className={cn(
                      buttonVariants({
                        variant: "outline",
                      }),
                      "pointer-events-none rounded-none shadow-none"
                    )}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    className={cn(
                      buttonVariants({
                        variant: "outline",
                      }),
                      "rounded-none shadow-none focus-visible:z-10 cursor-pointer"
                    )}
                    onClick={() => handlePageChange(totalPages)}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}

            {/* Next page button */}
            <PaginationItem className="[&:first-child>a]:rounded-s-md [&:last-child>a]:rounded-e-md">
              <PaginationLink
                className={cn(
                  buttonVariants({
                    variant: "outline",
                  }),
                  "rounded-none shadow-none focus-visible:z-10 aria-disabled:pointer-events-none [&[aria-disabled]>svg]:opacity-50 cursor-pointer"
                )}
                onClick={() =>
                  currentPage < totalPages && handlePageChange(currentPage + 1)
                }
                aria-label="Go to next page"
                aria-disabled={currentPage === totalPages}
              >
                <ChevronRight size={16} aria-hidden="true" />
              </PaginationLink>
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
    </div>
  );
}
