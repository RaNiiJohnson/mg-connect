import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/auth-server";
import { getJobOffersOptimized } from "@/lib/database";
import { Suspense } from "react";
import { PublishJobDialog } from "@app/emplois/_component/publish-job-dialog";
import { EmploisClientOptimized } from "./_component/emplois-client-optimized";
import { Skeleton } from "@/components/ui/skeleton";
import { HeroSection } from "@/components/hero-section";
import { EmploisFilters } from "./_component/emplois-filters";

type EmploisSearchParams = {
  search?: string;
  type?: string;
  contract?: string;
  city?: string;
  page?: string;
  limit?: string;
  bookmarked?: string;
};

type EmploisPageProps = {
  searchParams?: EmploisSearchParams | Promise<EmploisSearchParams>;
};

async function EmploisPageContent({ searchParams }: EmploisPageProps) {
  const user = await getUser();
  const resolvedParams = (await searchParams) || {};
  const page = Number(resolvedParams.page) || 1;
  const limit = 10;

  const { jobOffers, pagination } = await getJobOffersOptimized({
    page,
    limit,
    search: resolvedParams.search,
    type: resolvedParams.type,
    contractType: resolvedParams.contract,
    city: resolvedParams.city,
    bookmarkedOnly: resolvedParams.bookmarked === "true",
    userId: user?.id,
  });

  return (
    <div className="min-h-screen bg-background pb-12">
      <HeroSection
        title="Votre avenir en Allemagne commence ici"
        subtitle="Au pair, Formation, Emploi, Volontariat. Trouvez l'opportunité idéale pour votre projet de vie."
        backgroundImage="/images/jobs-bg.png"
      >
        <EmploisFilters />
      </HeroSection>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">Dernières offres</h2>
            <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-sm font-medium">
              {pagination.totalCount}
            </span>
          </div>
          {user && <PublishJobDialog />}
        </div>

        <EmploisClientOptimized
          initialJobs={jobOffers}
          initialPagination={pagination}
          user={user}
        />

        {/* Call to action */}
        <div className="text-center mt-16 p-8 bg-card border rounded-xl shadow-sm">
          <h3 className="text-2xl font-bold mb-4">
            Vous avez une opportunité à partager ?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Rejoignez des centaines d&apos;entreprises et recruteurs qui font
            confiance à notre plateforme pour trouver leurs futurs talents.
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
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
            <div className="flex-1">
              <Skeleton className="h-8 sm:h-10 mb-4 w-24 sm:w-32" />
              <Skeleton className="h-5 sm:h-6 w-full max-w-sm sm:max-w-md" />
            </div>
            <Skeleton className="h-10 w-full sm:w-48" />
          </div>

          {/* Search and filters skeleton */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 w-full sm:w-24" />
          </div>

          {/* Filter badges skeleton */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-6 w-12 sm:w-16 rounded-full" />
            ))}
          </div>
        </div>

        {/* Job offers skeleton */}
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-lg p-4"
            >
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
