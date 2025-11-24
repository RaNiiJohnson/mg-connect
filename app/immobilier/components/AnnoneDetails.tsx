"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink, MapPin, X } from "lucide-react";
import Link from "next/link";
import { ImageCarousel } from "./ImageCarousel";
import { PriceDisplay, parsePrice } from "../_component/price";

interface RealEstateListing {
  id: string;
  title: string;
  city: string;
  district: string;
  price: string;
  deposit: string;
  type: string;
  photos: string[];
  coverPhoto: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  floor: number;
  pets: boolean;
  available: Date | null;
  description: string;
  extras: string[];
  author: {
    id: string;
    name: string | null;
    photo: string | null;
  };
  ContactInfo?: {
    phone: string | null;
    email: string | null;
  } | null;
}

export function AnnonceDetails({
  annonce,
  onClose,
  showCloseButton = true,
}: {
  annonce: RealEstateListing;
  onClose: () => void;
  showCloseButton?: boolean;
}) {
  return (
    <div className="bg-card border rounded-xl p-6 shadow-lg">
      {showCloseButton && (
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-2xl font-bold pr-4">{annonce.title}</h2>
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            <X className="size-4" />
          </Button>
        </div>
      )}

      {/* Carrousel d'images */}
      <ImageCarousel
        images={annonce.photos}
        coverPhoto={annonce.coverPhoto}
        title={annonce.title}
      />

      <div className="space-y-4">
        {/* Bouton vers les détails complets */}
        <Link href={`/immobilier/${annonce.id}`} className="block mt-4">
          <Button className="w-full flex items-center gap-2">
            <ExternalLink className="size-4" />
            Voir tous les détails
          </Button>
        </Link>
      </div>
    </div>
  );
}

// Composant pour le contenu des détails (sans wrapper, pour le dialog)
export function AnnonceDetailsContent({
  annonce,
}: {
  annonce: RealEstateListing;
}) {
  return (
    <div className="space-y-4">
      {/* Carrousel d'images */}
      <ImageCarousel
        images={annonce.photos}
        coverPhoto={annonce.coverPhoto}
        title={annonce.title}
      />

      {/* Prix */}
      <div className="space-y-2">
        <PriceDisplay
          price={annonce.price}
          className="text-3xl"
        />
        {parsePrice(annonce.deposit).amount && (
          <div className="text-sm text-muted-foreground">
            Caution : <PriceDisplay price={annonce.deposit} />
          </div>
        )}
      </div>

      {/* Localisation */}
      <div className="flex items-center gap-2 text-muted-foreground">
        <MapPin className="size-4" />
        <span>
          {annonce.city} - {annonce.district}
        </span>
      </div>

      {/* Bouton vers les détails complets */}
      <Link href={`/immobilier/${annonce.id}`} className="block mt-4">
        <Button className="w-full flex items-center gap-2">
          <ExternalLink className="size-4" />
          Voir tous les détails
        </Button>
      </Link>
    </div>
  );
}
