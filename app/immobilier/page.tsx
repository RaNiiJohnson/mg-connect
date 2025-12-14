import { Suspense } from "react";
import { ImmobilierContainer } from "./_component/ImmobilierContainer";
import { HeroSection } from "@/components/hero-section";
import { ImmobilierFilters } from "./_component/immobilier-filters";

import { ImmobilierPageSkeleton } from "./_component/skeleton";
import { getAllRealEstateListings } from "./_actions/immo.action";

type ImmobilierSearchParams = {
  search?: string;
  type?: string;
  city?: string;
  district?: string;
  price?: string;
  bedrooms?: number;
  bathrooms?: number;
  pets?: boolean;
  page?: string;
};

type ImmobilierSearchProps = {
  searchParams?: ImmobilierSearchParams | Promise<ImmobilierSearchParams>;
};

async function ImmobilierPageContent({ searchParams }: ImmobilierSearchProps) {
  const resolvedParams = (await searchParams) || {};
  const { realEstateListings, pagination } = await getAllRealEstateListings({
    search: resolvedParams.search,
    type: resolvedParams.type,
    city: resolvedParams.city,
    district: resolvedParams.district,
    price: resolvedParams.price,
    bedrooms: resolvedParams.bedrooms,
    bathrooms: resolvedParams.bathrooms,
    pets: resolvedParams.pets,
    page:
      typeof resolvedParams.page === "string"
        ? parseInt(resolvedParams.page)
        : 1,
    limit: 10,
  });

  return (
    <>
      <ImmobilierFilters />

      <div className="mt-8">
        <ImmobilierContainer
          key={JSON.stringify(resolvedParams)}
          annonces={realEstateListings}
          initialPagination={pagination}
        />
      </div>
    </>
  );
}

export default async function ImmobilierPage() {
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
