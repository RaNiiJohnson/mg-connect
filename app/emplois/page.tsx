import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/auth-server";
import { getJobOffersOptimized } from "@/lib/database";
import { Suspense } from "react";
import { PublishJobDialog } from "@app/emplois/_component/publish-job-dialog";
import { EmploisClientOptimized } from "./_component/emplois-client-optimized";
import { Card, CardContent } from "@/components/ui/card";

type EmploisSearchParams = {
  search?: string;
  type?: string;
  contract?: string;
  city?: string;
  page?: string;
  limit?: string;
};

type EmploisPageProps = {
  searchParams?: EmploisSearchParams | Promise<EmploisSearchParams>;
};

// Ensure this page is always rendered dynamically so query param changes
// (filters via URL) trigger a server re-render without a manual refresh
export const dynamic = "force-dynamic";

async function EmploisPageContent({ searchParams }: EmploisPageProps) {
  const user = await getUser();

  const resolvedSearchParams =
    typeof searchParams === "object" &&
    searchParams !== null &&
    "then" in searchParams
      ? await searchParams
      : ((searchParams as EmploisSearchParams | undefined) ?? {});

  const parsePositiveInt = (value?: string) => {
    if (!value) return undefined;
    const parsed = Number.parseInt(value, 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
  };

  const search =
    typeof resolvedSearchParams.search === "string"
      ? resolvedSearchParams.search
      : undefined;
  const type =
    typeof resolvedSearchParams.type === "string"
      ? resolvedSearchParams.type
      : undefined;
  const contractType =
    typeof resolvedSearchParams.contract === "string"
      ? resolvedSearchParams.contract
      : undefined;
  const city =
    typeof resolvedSearchParams.city === "string"
      ? resolvedSearchParams.city
      : undefined;
  const page = parsePositiveInt(resolvedSearchParams.page);
  const limit = parsePositiveInt(resolvedSearchParams.limit);

  const { jobOffers, pagination, overallCount } = await getJobOffersOptimized({
    search,
    type,
    contractType,
    city,
    page,
    limit,
  });

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">Emplois</h1>
              <p className="text-base sm:text-lg text-muted-foreground">
                Découvrez les opportunités d&apos;emploi partagées par la
                communauté
              </p>
            </div>
            {user && <PublishJobDialog />}
          </div>

          {/* Filtres et recherche avec nuqs + requêtes optimisées */}
          <EmploisClientOptimized
            initialJobs={jobOffers}
            initialPagination={pagination}
            initialOverallCount={overallCount}
            user={user}
          />
        </div>

        {/* Call to action */}
        <div className="text-center mt-12 p-8 bg-linear-to-br from-accent to-accent/0 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">
            Vous avez une opportunité à partager ?
          </h3>
          <p className="text-muted-foreground mb-6">
            Aidez la communauté en partageant des offres d&apos;emploi, de stage
            ou de formation
          </p>
          {user ? (
            <PublishJobDialog
              trigger={<Button size="lg">Publier une offre</Button>}
            />
          ) : (
            <Button size="lg">S&apos;inscrire pour publier</Button>
          )}
        </div>
      </div>
    </div>
  );
}

function EmploisPageSkeleton() {
  return (
    <div className="min-h-screen p-4 animate-pulse">
      <div className="max-w-6xl mx-auto">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
            <div className="flex-1">
              <div className="h-8 sm:h-10 bg-muted rounded-lg mb-4 w-24 sm:w-32"></div>
              <div className="h-5 sm:h-6 bg-muted rounded w-full max-w-sm sm:max-w-md"></div>
            </div>
            <div className="h-10 bg-muted rounded w-full sm:w-48"></div>
          </div>

          {/* Search and filters skeleton */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="h-10 bg-muted rounded flex-1"></div>
            <div className="h-10 bg-muted rounded w-full sm:w-24"></div>
          </div>

          {/* Filter badges skeleton */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-6 bg-muted rounded-full w-12 sm:w-16"
              ></div>
            ))}
          </div>
        </div>

        {/* Job offers skeleton */}
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-5 bg-muted rounded-full w-12 sm:w-16"></div>
                      <div className="h-5 bg-muted rounded-full w-10 sm:w-12"></div>
                    </div>
                    <div className="h-6 sm:h-7 bg-muted rounded mb-3 w-full max-w-xs sm:max-w-sm"></div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                      {[1, 2, 3, 4].map((j) => (
                        <div
                          key={j}
                          className="h-4 bg-muted rounded w-16 sm:w-20"
                        ></div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <div className="h-8 bg-muted rounded w-16 sm:w-20"></div>
                      <div className="h-8 bg-muted rounded w-20 sm:w-24"></div>
                    </div>
                  </div>
                  <div className="text-left sm:text-right flex flex-row sm:flex-col sm:items-end gap-2">
                    <div className="h-6 bg-muted rounded w-16 sm:w-20"></div>
                    <div className="h-4 bg-muted rounded w-20 sm:w-24"></div>
                    <div className="h-3 bg-muted rounded w-12 sm:w-16"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA skeleton */}
        <div className="text-center mt-12 p-6 sm:p-8 bg-linear-to-br from-accent to-accent/0 rounded-lg">
          <div className="h-6 sm:h-8 bg-muted rounded mb-4 w-full max-w-sm sm:max-w-md mx-auto"></div>
          <div className="h-4 bg-muted rounded mb-6 w-full max-w-md sm:max-w-lg mx-auto"></div>
          <div className="h-10 sm:h-12 bg-muted rounded w-full max-w-xs sm:w-48 mx-auto"></div>
        </div>
      </div>
    </div>
  );
}

export default function EmploisPage(props: EmploisPageProps) {
  return (
    <Suspense fallback={<EmploisPageSkeleton />}>
      <EmploisPageContent {...props} />
    </Suspense>
  );
}
