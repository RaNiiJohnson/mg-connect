import { Suspense } from "react";
import { ImmobilierContainer } from "./components/ImmobilierContainer";
import { HeroSection } from "@/components/hero-section";
import { ImmobilierFilters } from "./_component/immobilier-filters";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllRealEstateListings } from "@/lib/database";

async function ImmobilierPageContent() {
  const annonces = await getAllRealEstateListings();

  return (
    <>
      <ImmobilierFilters />

      <div className="mt-8">
        <ImmobilierContainer annonces={annonces} />
      </div>
    </>
  );
}

function ImmobilierFiltersSkeleton() {
  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {/* Barre de recherche skeleton */}
      <div className="flex gap-4">
        <Skeleton className="h-10 flex-1" />
      </div>

      {/* Filtres rapides skeleton */}
      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
    </div>
  );
}

function ImmobilierPageSkeleton() {
  return (
    <>
      <ImmobilierFiltersSkeleton />

      {/* Listings grid skeleton */}
      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="relative">
            <div className="h-80 w-full rounded-xl bg-muted"></div>
            <div className="absolute inset-x-3 bottom-3 p-3 bg-background/95 backdrop-blur-sm rounded-lg border">
              <Skeleton className="h-5 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-2" />
              <Skeleton className="h-6 w-24" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default function ImmobilierPage() {
  return (
    <div className="min-h-screen bg-background pb-12">
      <HeroSection
        title="Immobilier"
        subtitle="Trouvez votre logement ou partagez le vôtre avec la communauté"
        backgroundImage="/images/real-estate-bg.png"
      ></HeroSection>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <Suspense fallback={<ImmobilierPageSkeleton />}>
          <ImmobilierPageContent />
        </Suspense>
      </div>
    </div>
  );
}
