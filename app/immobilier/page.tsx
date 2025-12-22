import { Suspense } from "react";
import { ImmobilierContainer } from "./_component/list/ImmobilierContainer";
import { HeroSection } from "@/components/hero-section";
import { ImmobilierFilters } from "./_component/immobilier-filters";

import { ImmobilierPageSkeleton } from "./_component/skeleton";
import { getAllRealEstateListings } from "./_actions/immo.action";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { getUser } from "@/lib/auth-server";

type ImmobilierSearchParams = {
  search?: string;
  type?: string;
  city?: string;
  district?: string;
  price?: string;
  minPrice?: string;
  maxPrice?: string;
  bedrooms?: string;
  bathrooms?: number;
  pets?: boolean;
  page?: string;
  bookmarked?: string;
};

type ImmobilierSearchProps = {
  searchParams?: ImmobilierSearchParams | Promise<ImmobilierSearchParams>;
};

async function ImmobilierPageContent({ searchParams }: ImmobilierSearchProps) {
  const user = await getUser();
  const resolvedParams = (await searchParams) || {};
  const { realEstateListings, pagination } = await getAllRealEstateListings({
    search: resolvedParams.search,
    type: resolvedParams.type,
    city: resolvedParams.city,
    district: resolvedParams.district,
    price: resolvedParams.price,
    minPrice: resolvedParams.minPrice,
    maxPrice: resolvedParams.maxPrice,
    bedrooms: resolvedParams.bedrooms
      ? parseInt(resolvedParams.bedrooms)
      : undefined,
    bathrooms: resolvedParams.bathrooms,
    pets: resolvedParams.pets,
    page:
      typeof resolvedParams.page === "string"
        ? parseInt(resolvedParams.page)
        : 1,
    limit: 10,
    bookmarkedOnly: resolvedParams.bookmarked === "true",
    userId: user?.id,
  });

  return (
    <>
      <ImmobilierFilters />
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 my-8">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold">Immobilier</h2>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Publier une annonce</span>
        </Button>
      </div>
      <div className="mt-8">
        <ImmobilierContainer
          key={JSON.stringify(resolvedParams)}
          annonces={realEstateListings}
          initialPagination={pagination}
          userId={user?.id}
        />
      </div>
    </>
  );
}

export default async function ImmobilierPage(props: ImmobilierSearchProps) {
  return (
    <div className="min-h-screen bg-background pb-12">
      <HeroSection
        title="Immobilier"
        subtitle="Trouvez votre logement ou partagez le vôtre avec la communauté"
        backgroundImage="/images/real-estate-bg.png"
      ></HeroSection>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <Suspense fallback={<ImmobilierPageSkeleton />}>
          <ImmobilierPageContent {...props} />
        </Suspense>
      </div>
    </div>
  );
}
