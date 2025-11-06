"use client";

import { EmploisFilters } from "./emplois-filters";
import { EmploisClientPagination } from "./emplois-client-pagination";
import type { JobOffer } from "@/generated/prisma";
import type { User } from "better-auth";
import { useMemo } from "react";
import { useQueryState, parseAsString } from "nuqs";

interface EmploisClientProps {
  jobs: JobOffer[];
  user: User | null;
}

export function EmploisClient({ jobs, user }: EmploisClientProps) {
  // Read filters from URL (nuqs) and filter on client for instant UX
  const [search] = useQueryState("search", parseAsString.withDefault(""));
  const [selectedType] = useQueryState("type", parseAsString.withDefault(""));
  const [contractType] = useQueryState(
    "contract",
    parseAsString.withDefault("")
  );
  const [city] = useQueryState("city", parseAsString.withDefault(""));

  const filteredJobs = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    const normalizedCity = city.trim().toLowerCase();

    return jobs.filter((job) => {
      if (selectedType && job.type !== selectedType) return false;
      if (contractType && job.contractType !== contractType) return false;
      if (
        normalizedCity &&
        !(job.city ?? "").toLowerCase().includes(normalizedCity)
      )
        return false;

      if (!normalizedSearch) return true;

      const haystack = [
        job.title,
        job.company,
        job.city,
        job.description,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedSearch);
    });
  }, [jobs, search, selectedType, contractType, city]);

  return (
    <>
      <EmploisFilters totalJobs={jobs.length} filteredJobs={filteredJobs.length} />
      <EmploisClientPagination jobs={filteredJobs} user={user} />
    </>
  );
}
