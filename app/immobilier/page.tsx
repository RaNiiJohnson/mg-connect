import { Suspense } from "react";
import { ImmobilierContainer } from "./_component/ImmobilierContainer";
import { HeroSection } from "@/components/hero-section";
import { ImmobilierFilters } from "./_component/immobilier-filters";

import { ImmobilierPageSkeleton } from "./_component/skeleton";
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
