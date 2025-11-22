"use client";

import { EmploisFilters } from "./emplois-filters";
import { EmploisList } from "./emplois-list";
import { EmploisPagination } from "./emplois-pagination";
import { Skeleton } from "@/components/ui/skeleton";
import type { JobOfferListItem } from "@/lib/database";
import type { User } from "better-auth";
import { useEffect, useState, useCallback, useRef } from "react";
import { useQueryState, parseAsString, parseAsInteger } from "nuqs";

interface EmploisClientOptimizedProps {
  initialJobs: JobOfferListItem[];
  initialPagination: PaginationData;
  initialOverallCount: number;
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
  initialOverallCount,
  user,
}: EmploisClientOptimizedProps) {
  const [jobs, setJobs] = useState(initialJobs);
  const [pagination, setPagination] = useState<PaginationData>({
    ...initialPagination,
    pageSize: initialPagination.pageSize ?? 10,
  });
  const [overallCount, setOverallCount] = useState(initialOverallCount);
  const [isLoading, setIsLoading] = useState(false);
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

  // Fonction pour charger les données optimisées via API
  const loadOptimizedData = useCallback(async () => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (selectedType) params.set("type", selectedType);
    if (contractType) params.set("contract", contractType);
    if (city) params.set("city", city);
    params.set("page", Math.max(page, 1).toString());
    params.set("limit", Math.max(limit, 1).toString());

    setIsLoading(true);
    try {
      const response = await fetch(`/api/emplois?${params.toString()}`, {
        cache: "no-store",
      });
      if (response.ok) {
        const data = await response.json();
        if (
          typeof data.pagination?.currentPage === "number" &&
          data.pagination.currentPage !== page
        ) {
          setPage(data.pagination.currentPage);
        }
        setJobs(data.jobOffers);
        setPagination({
          ...data.pagination,
          pageSize: data.pagination?.pageSize ?? Math.max(limit, 1),
        });
        if (typeof data.overallCount === "number") {
          setOverallCount(data.overallCount);
        }
      }
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
    } finally {
      setIsLoading(false);
    }
  }, [search, selectedType, contractType, city, page, limit, setPage]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    void loadOptimizedData();
  }, [loadOptimizedData]);

  const handleItemsPerPageChange = useCallback(
    (newLimit: number) => {
      setLimit(newLimit);
      setPage(1);
    },
    [setLimit, setPage]
  );

  return (
    <div className="space-y-6">
      {/* Filtres */}
      <EmploisFilters
        totalJobs={overallCount}
        filteredJobs={pagination.totalCount}
      />

      {/* Pagination du haut - toujours visible si plus d'une page */}
      {pagination.totalPages > 1 && pagination.currentPage > 1 && (
        <div className={isLoading ? "opacity-50 pointer-events-none" : ""}>
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
      {isLoading && <EmploisListSkeleton />}

      {/* Liste des emplois */}
      {!isLoading && <EmploisList jobs={jobs} user={user} />}

      {/* Pagination du bas */}
      {!isLoading && pagination.totalPages > 1 && (
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
