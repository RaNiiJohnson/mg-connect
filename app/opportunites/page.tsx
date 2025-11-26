import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/auth-server";
import { getJobOffersOptimized } from "@/lib/database";
import { Suspense } from "react";
import { PublishJobDialog } from "@/components/publish-job-dialog";
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
    <>
      <EmploisFilters />

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 my-8">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold">Opportunités</h2>
        </div>
        <PublishJobDialog />
      </div>
      <div className="min-h-screen bg-background pb-12">
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
    </>
  );
}

function EmploisFiltersSkeleton() {
  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {/* Barre de recherche skeleton */}
      <div className="flex gap-4">
        <Skeleton className="h-10 flex-1" />
      </div>

      {/* Filtres rapides skeleton */}
      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-6 w-28 rounded-full" />
        <Skeleton className="h-6 w-32 rounded-full" />
      </div>
    </div>
  );
}

function EmploisPageSkeleton() {
  return (
    <>
      <EmploisFiltersSkeleton />

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 my-8">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-10 w-40" />
      </div>

      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
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
    </>
  );
}

export default function EmploisPage(props: EmploisPageProps) {
  return (
    <div className="min-h-screen bg-background pb-12">
      <HeroSection
        title="Votre avenir en Allemagne commence ici"
        subtitle="Au pair, Formation, Emploi, Volontariat. Trouvez l'opportunité idéale pour votre projet de vie."
        backgroundImage="/images/jobs-bg.png"
      ></HeroSection>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <Suspense fallback={<EmploisPageSkeleton />}>
          <EmploisPageContent {...props} />
        </Suspense>
      </div>
    </div>
  );
}
