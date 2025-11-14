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

function PropertyPageSkeleton() {
  return (
    <div className="min-h-screenbg-background animate-pulse ">
      {/* Header skeleton */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="h-10 bg-muted rounded w-48"></div>
            <div className="flex items-center gap-2">
              <div className="h-8 bg-muted rounded w-24"></div>
              <div className="h-8 bg-muted rounded w-24"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image skeleton */}
          <div className="h-96 bg-muted rounded-xl"></div>

          {/* Details skeleton */}
          <div className="space-y-6">
            <div className="h-8 bg-muted rounded w-3/4"></div>
            <div className="h-6 bg-muted rounded w-1/2"></div>
            <div className="h-12 bg-muted rounded w-1/3"></div>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
              <div className="h-4 bg-muted rounded w-4/6"></div>
            </div>
          </div>
        </div>
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
