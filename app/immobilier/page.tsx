import { getAllRealEstateListings } from "@/lib/database";
import { Suspense } from "react";
import { ImmobilierContainer } from "./components/ImmobilierContainer";

import { HeroSection } from "@/components/hero-section";
import { ImmobilierFilters } from "./_component/immobilier-filters";

async function ImmobilierPageContent() {
  const annonces = await getAllRealEstateListings();

  return (
    <div className="min-h-screen bg-background pb-12">
      <HeroSection
        title="Immobilier"
        subtitle="Trouvez votre logement ou partagez le vôtre avec la communauté"
        backgroundImage="/images/real-estate-bg.png"
      >
        <ImmobilierFilters />
      </HeroSection>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <ImmobilierContainer annonces={annonces}>
          {/* Header removed as it is now in HeroSection */}
        </ImmobilierContainer>
      </div>
    </div>
  );
}

function ImmobilierPageSkeleton() {
  return (
    <div className="min-h-screen bg-background p-4 animate-pulse">
      <div className="max-w-6xl mx-auto">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
            <div className="flex-1">
              <div className="h-10 bg-muted rounded-lg mb-2 w-48"></div>
              <div className="h-6 bg-muted rounded w-96"></div>
            </div>
            <div className="h-10 bg-muted rounded w-48"></div>
          </div>

          {/* Search and filters skeleton */}
          <div className="flex gap-4 mb-6">
            <div className="h-10 bg-muted rounded flex-1"></div>
            <div className="h-10 bg-muted rounded w-24"></div>
          </div>

          {/* Filter badges skeleton */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-6 bg-muted rounded-full w-20"></div>
            ))}
          </div>
        </div>

        {/* Listings grid skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="relative">
              <div className="h-80 w-full rounded-xl bg-muted"></div>
              <div className="absolute inset-x-3 bottom-3 p-3 bg-background/95 backdrop-blur-sm rounded-lg border">
                <div className="h-5 bg-muted rounded mb-2 w-3/4"></div>
                <div className="h-4 bg-muted rounded mb-2 w-1/2"></div>
                <div className="h-6 bg-muted rounded w-24"></div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA skeleton */}
        <div className="text-center mt-12 p-8 bg-linear-to-br from-accent to-accent/0 rounded-lg">
          <div className="h-8 bg-muted rounded mb-4 w-80 mx-auto"></div>
          <div className="h-4 bg-muted rounded mb-6 w-96 mx-auto"></div>
          <div className="h-12 bg-muted rounded w-48 mx-auto"></div>
        </div>
      </div>
    </div>
  );
}

export default function ImmobilierPage() {
  return (
    <Suspense fallback={<ImmobilierPageSkeleton />}>
      <ImmobilierPageContent />
    </Suspense>
  );
}
