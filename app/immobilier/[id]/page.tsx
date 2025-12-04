import { Button } from "@/components/ui/button";
import {
  getRealEstateListingById,
  getSimilarRealEstateListings,
} from "@/lib/database";
import { ArrowLeft, Heart, Share2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { SimilarListings } from "./components/SimilarListings";
import { PropertyDetails } from "./components/PropertyDetails";
import { PropertyPageSkeleton } from "../_component/skeleton";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

async function PropertyPageContent({ params }: PageProps) {
  const { id } = await params;
  const property = await getRealEstateListingById(id);

  if (!property) {
    notFound();
  }

  const similarProperties = await getSimilarRealEstateListings(
    id,
    property.city,
    property.type
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header avec navigation */}
      <div className="flex items-center justify-between border-bmax-w-7xl mx-auto px-4 py-2 sm:py-4">
        <Link href="/immobilier">
          <Button variant="ghost" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Retour aux annonces
          </Button>
        </Link>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Share2 className="h-4 w-4" />
            <span className="max-sm:hidden">Partager</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Heart className="h-4 w-4" />
            <span className="max-sm:hidden">Favoris</span>
          </Button>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-4xl mx-auto py-8 px-4">
        <PropertyDetails property={property} />

        {/* Section des annonces similaires */}
        {similarProperties.length > 0 && (
          <div className="mt-16">
            <SimilarListings properties={similarProperties} />
          </div>
        )}
      </div>
    </div>
  );
}

export default function PropertyPage({ params }: PageProps) {
  return (
    <Suspense fallback={<PropertyPageSkeleton />}>
      <PropertyPageContent params={params} />
    </Suspense>
  );
}
