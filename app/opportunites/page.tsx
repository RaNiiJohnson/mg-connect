import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/auth-server";
import { Suspense } from "react";
import { PublishJobDialog } from "@/components/publish-job-dialog";
import { EmploisClientOptimized } from "./_component/emplois-client-optimized";
import { EmploisPageSkeleton } from "./_component/skeleton";
import { HeroSection } from "@/components/hero-section";
import { EmploisFilters } from "./_component/emplois-filters";
import { getJobOffersOptimized } from "./_actions/job.action";

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
