"use client";

import { EmploisFilters } from "./emplois-filters";
import { EmploisList } from "./emplois-list";
import { EmploisPagination } from "./emplois-pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import type { JobOffer } from "@/generated/prisma";
import type { User } from "better-auth";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useQueryState, parseAsString, parseAsInteger } from "nuqs";

interface EmploisClientOptimizedProps {
  initialJobs: (JobOffer & {
    author: {
      id: string;
      name: string | null;
      photo: string | null;
    };
  })[];
  user: User | null;
}

interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export function EmploisClientOptimized({
  initialJobs,
  user,
}: EmploisClientOptimizedProps) {
  // État pour les données optimisées
  const [jobs, setJobs] = useState(initialJobs);
  const [pagination, setPagination] = useState<PaginationData>({
    currentPage: 1,
    totalPages: Math.ceil(initialJobs.length / 10),
    totalCount: initialJobs.length,
    hasNextPage: initialJobs.length > 10,
    hasPreviousPage: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [useOptimizedAPI, setUseOptimizedAPI] = useState(false);

  // Filtres avec nuqs
  const [search] = useQueryState("search", parseAsString.withDefault(""));
  const [selectedType] = useQueryState("type", parseAsString.withDefault(""));
  const [contractType] = useQueryState(
    "contract",
    parseAsString.withDefault("")
  );
  const [city] = useQueryState("city", parseAsString.withDefault(""));
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));

  // Fonction pour charger les données optimisées via API
  const loadOptimizedData = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (selectedType) params.set("type", selectedType);
      if (contractType) params.set("contract", contractType);
      if (city) params.set("city", city);
      params.set("page", page.toString());
      params.set("limit", "10");

      const response = await fetch(`/api/emplois?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setJobs(data.jobOffers);
        setPagination(data.pagination);
        setUseOptimizedAPI(true);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
      // Fallback vers le filtrage client
      setUseOptimizedAPI(false);
    } finally {
      setIsLoading(false);
    }
  }, [search, selectedType, contractType, city, page]);

  // Filtrage côté client (fallback)
  const filteredJobsClient = useMemo(() => {
    if (useOptimizedAPI) return jobs; // Utiliser les données de l'API

    const normalizedSearch = search.trim().toLowerCase();
    const normalizedCity = city.trim().toLowerCase();

    return initialJobs.filter((job) => {
      if (selectedType && job.type !== selectedType) return false;
      if (contractType && job.contractType !== contractType) return false;
      if (
        normalizedCity &&
        !(job.city ?? "").toLowerCase().includes(normalizedCity)
      )
        return false;

      if (!normalizedSearch) return true;

      const haystack = [job.title, job.company, job.city, job.description]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedSearch);
    });
  }, [
    initialJobs,
    search,
    selectedType,
    contractType,
    city,
    useOptimizedAPI,
    jobs,
  ]);

  // Pagination côté client
  const paginatedJobsClient = useMemo(() => {
    if (useOptimizedAPI) return jobs; // Utiliser les données de l'API

    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;
    return filteredJobsClient.slice(startIndex, endIndex);
  }, [filteredJobsClient, page, useOptimizedAPI, jobs]);

  // Charger les données optimisées quand les filtres changent
  useEffect(() => {
    // Utiliser l'API optimisée seulement si on a des filtres actifs
    const hasFilters =
      search || selectedType || contractType || city || page > 1;

    if (hasFilters) {
      loadOptimizedData();
    } else {
      // Pas de filtres, utiliser les données initiales
      setUseOptimizedAPI(false);
      setJobs(initialJobs.slice(0, 10));
      setPagination({
        currentPage: 1,
        totalPages: Math.ceil(initialJobs.length / 10),
        totalCount: initialJobs.length,
        hasNextPage: initialJobs.length > 10,
        hasPreviousPage: false,
      });
    }
  }, [
    search,
    selectedType,
    contractType,
    city,
    page,
    loadOptimizedData,
    initialJobs,
  ]);

  // Données finales à afficher
  const finalJobs = useOptimizedAPI ? jobs : paginatedJobsClient;
  const finalPagination = useOptimizedAPI
    ? pagination
    : {
        currentPage: page,
        totalPages: Math.ceil(filteredJobsClient.length / 10),
        totalCount: filteredJobsClient.length,
        hasNextPage: page < Math.ceil(filteredJobsClient.length / 10),
        hasPreviousPage: page > 1,
      };

  return (
    <div className="space-y-6">
      {/* Filtres */}
      <EmploisFilters
        totalJobs={useOptimizedAPI ? pagination.totalCount : initialJobs.length}
        filteredJobs={useOptimizedAPI ? jobs.length : filteredJobsClient.length}
      />

      {/* Loading state avec skeleton */}
      {isLoading && <EmploisListSkeleton />}

      {/* Liste des emplois */}
      {!isLoading && <EmploisList jobs={finalJobs} user={user} />}

      {/* Pagination */}
      {!isLoading && finalPagination.totalPages > 1 && (
        <EmploisPagination
          currentPage={finalPagination.currentPage}
          totalPages={finalPagination.totalPages}
          totalCount={finalPagination.totalCount}
          itemsPerPage={10}
        />
      )}
    </div>
  );
}

// Composant skeleton pour le chargement des offres d'emploi
function EmploisListSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <Card key={i}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                {/* Badges skeleton */}
                <div className="flex items-center gap-2 mb-3">
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="h-5 w-20 rounded-full" />
                </div>

                {/* Titre skeleton */}
                <Skeleton className="h-7 w-64 mb-3" />

                {/* Informations skeleton */}
                <div className="flex flex-wrap gap-4 text-sm mb-4">
                  <div className="flex items-center gap-1">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="flex items-center gap-1">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className="flex items-center gap-1">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>

                {/* Boutons skeleton */}
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-24" />
                </div>
              </div>

              {/* Salaire skeleton */}
              <div className="text-right flex flex-col items-end gap-2">
                <Skeleton className="h-6 w-20" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
