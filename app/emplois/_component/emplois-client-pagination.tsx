"use client";

import { useMemo, useEffect } from "react";
import { useQueryState, parseAsInteger } from "nuqs";
import { EmploisList } from "./emplois-list";
import { EmploisPagination } from "./emplois-pagination";
import type { JobOffer } from "@/generated/prisma";
import type { User } from "better-auth";

interface EmploisClientPaginationProps {
  jobs: JobOffer[];
  user: User | null;
}

export function EmploisClientPagination({
  jobs,
  user,
}: EmploisClientPaginationProps) {
  const [currentPage, setCurrentPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1)
  );
  const [itemsPerPage, setItemsPerPage] = useQueryState(
    "limit",
    parseAsInteger.withDefault(10)
  );

  // Reset to page 1 when jobs data changes (due to filtering) or items per page changes
  useEffect(() => {
    const totalPages = Math.ceil(jobs.length / itemsPerPage);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [jobs.length, itemsPerPage, currentPage, setCurrentPage]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedJobs = jobs.slice(startIndex, endIndex);

    const totalPages = Math.ceil(jobs.length / itemsPerPage);

    return {
      jobs: paginatedJobs,
      pagination: {
        currentPage,
        totalPages,
        totalCount: jobs.length,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
      },
    };
  }, [jobs, currentPage, itemsPerPage]);

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  return (
    <>
      <EmploisList jobs={paginatedData.jobs} user={user} />
      <EmploisPagination
        currentPage={paginatedData.pagination.currentPage}
        totalPages={paginatedData.pagination.totalPages}
        totalCount={paginatedData.pagination.totalCount}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </>
  );
}
