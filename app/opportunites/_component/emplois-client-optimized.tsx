"use client";

import { EmploisList } from "./list/emplois-list";
import { EmploisPagination } from "./list/emplois-pagination";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getJobOffersOptimized,
  type JobOfferListItem,
} from "@app/opportunites/_actions/job.action";
import type { User } from "better-auth";
import { useEffect, useState, useTransition, useRef, useCallback } from "react";
import {
  useQueryState,
  parseAsString,
  parseAsInteger,
  parseAsBoolean,
} from "nuqs";

interface EmploisClientOptimizedProps {
  initialJobs: JobOfferListItem[];
  initialPagination: PaginationData;
  user: User | null;
}

interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  pageSize?: number;
}

export function EmploisClientOptimized({
  initialJobs,
  initialPagination,
  user,
}: EmploisClientOptimizedProps) {
  const [jobs, setJobs] = useState(initialJobs);
  const [pagination, setPagination] = useState<PaginationData>({
    ...initialPagination,
    pageSize: initialPagination.pageSize ?? 10,
  });
  const [isPending, startTransition] = useTransition();
  const isFirstRender = useRef(true);

  // Filtres avec nuqs
  const [search] = useQueryState("search", parseAsString.withDefault(""));
  const [selectedType] = useQueryState("type", parseAsString.withDefault(""));
  const [contractType] = useQueryState(
    "contract",
    parseAsString.withDefault("")
  );
  const [city] = useQueryState("city", parseAsString.withDefault(""));
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [limit, setLimit] = useQueryState(
    "limit",
    parseAsInteger.withDefault(initialPagination.pageSize ?? 10)
  );
  const [bookmarked] = useQueryState(
    "bookmarked",
    parseAsBoolean.withDefault(false)
  );

  // Effect to fetch data when filters change
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const fetchJobs = () => {
      startTransition(async () => {
        try {
          const { jobOffers, pagination: newPagination } =
            await getJobOffersOptimized({
              search,
              type: selectedType,
              contractType,
              city,
              page: Math.max(page, 1),
              limit: Math.max(limit, 1),
              userId: user?.id,
              bookmarkedOnly: bookmarked,
            });
          setJobs(jobOffers);
          setPagination({
            ...newPagination,
            pageSize: newPagination.pageSize ?? Math.max(limit, 1),
          });
        } catch (error) {
          console.error("Erreur lors du chargement des données:", error);
        }
      });
    };

    fetchJobs();
  }, [
    search,
    selectedType,
    contractType,
    city,
    page,
    limit,
    bookmarked,
    user?.id,
  ]);

  const handleItemsPerPageChange = useCallback(
    (newLimit: number) => {
      setLimit(newLimit);
      setPage(1);
    },
    [setLimit, setPage]
  );

  return (
    <div className="space-y-6">
      {/* Filtres removed from here to be placed in Hero */}

      {pagination.totalPages > 1 && pagination.currentPage > 1 && (
        <div className={isPending ? "opacity-50 pointer-events-none" : ""}>
          <EmploisPagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            totalCount={pagination.totalCount}
            itemsPerPage={pagination.pageSize ?? limit}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </div>
      )}

      {/* Loading state avec skeleton */}
      {isPending && <EmploisListSkeleton />}

      {/* Liste des emplois */}
      {!isPending && <EmploisList jobs={jobs} user={user} />}

      {/* Pagination du bas */}
      {!isPending && pagination.totalPages > 1 && (
        <EmploisPagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          totalCount={pagination.totalCount}
          itemsPerPage={pagination.pageSize ?? limit}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      )}
    </div>
  );
}

// Composant skeleton pour le chargement des offres d'emploi
function EmploisListSkeleton() {
  return (
    <div className="space-y-3">
      {/* Liste des emplois skeleton */}
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0 space-y-3">
                {/* Title skeleton */}
                <Skeleton className="h-6 w-3/4" />

                {/* Company skeleton */}
                <Skeleton className="h-4 w-1/4" />

                {/* Location, Type & Salary skeleton */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-28" />
                </div>

                {/* Badges skeleton */}
                <div className="flex flex-wrap items-center gap-2">
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="h-5 w-20 rounded-full" />
                </div>
              </div>

              {/* Date skeleton */}
              <div className="shrink-0">
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination skeleton */}
      <div className="flex justify-end mt-8">
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-9" />
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-9 w-9" />
          ))}
          <Skeleton className="h-9 w-9" />
        </div>
      </div>
    </div>
  );
}
