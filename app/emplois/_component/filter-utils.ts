import type { JobOfferListItem } from "@/lib/database";

export interface JobFilters {
  search: string;
  type: string;
  contractType: string;
  city: string;
}

export function filterJobs(
  jobs: JobOfferListItem[],
  filters: JobFilters
): JobOfferListItem[] {
  return jobs.filter((job) => {
    // Recherche textuelle
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch =
        job.title.toLowerCase().includes(searchLower) ||
        job.company.toLowerCase().includes(searchLower) ||
        job.city.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower);

      if (!matchesSearch) return false;
    }

    // Filtrage par type
    if (filters.type) {
      if (job.type !== filters.type) return false;
    }

    // Filtrage par type de contrat
    if (filters.contractType) {
      if (job.contractType !== filters.contractType) return false;
    }

    // Filtrage par ville
    if (filters.city) {
      const cityLower = filters.city.toLowerCase();
      if (!job.city.toLowerCase().includes(cityLower)) return false;
    }

    return true;
  });
}

export function getJobStats(jobs: JobOfferListItem[]) {
  const typeStats = jobs.reduce(
    (acc, job) => {
      acc[job.type] = (acc[job.type] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const contractStats = jobs.reduce(
    (acc, job) => {
      acc[job.contractType] = (acc[job.contractType] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const cityStats = jobs.reduce(
    (acc, job) => {
      acc[job.city] = (acc[job.city] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return {
    typeStats,
    contractStats,
    cityStats,
    total: jobs.length,
  };
}
