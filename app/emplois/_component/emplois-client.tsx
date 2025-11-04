"use client";

import { useQueryState, parseAsString } from "nuqs";
import { EmploisFilters } from "./emplois-filters";
import { EmploisList } from "./emplois-list";
import { filterJobs, type JobFilters } from "./filter-utils";
import type { JobOffer } from "@/generated/prisma";
import type { User } from "better-auth";

interface EmploisClientProps {
  jobs: JobOffer[];
  user: User | null;
}

export function EmploisClient({ jobs, user }: EmploisClientProps) {
  const [search] = useQueryState("search", parseAsString.withDefault(""));
  const [selectedType] = useQueryState("type", parseAsString.withDefault(""));
  const [contractType] = useQueryState(
    "contract",
    parseAsString.withDefault("")
  );
  const [city] = useQueryState("city", parseAsString.withDefault(""));

  const filters: JobFilters = {
    search,
    type: selectedType,
    contractType,
    city,
  };

  const filteredJobs = filterJobs(jobs, filters);

  return (
    <>
      <EmploisFilters
        totalJobs={jobs.length}
        filteredJobs={filteredJobs.length}
      />
      <EmploisList jobs={jobs} user={user} />
    </>
  );
}
