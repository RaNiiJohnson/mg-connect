"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bath,
  Bed,
  Calendar,
  ChevronDown,
  ChevronUp,
  Euro,
  Heart,
  Mail,
  MapPin,
  Phone,
  Square,
  X,
} from "lucide-react";
import { useState } from "react";
import { ImageCarousel } from "./ImageCarousel";

interface RealEstateListing {
  id: string;
  title: string;
  city: string;
  district: string;
  price: number;
  deposit: number;
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
        {/* Prix */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Euro className="size-5 text-primary" strokeWidth={3} />
            <span className="text-3xl font-bold text-primary">
              {annonce.price.toLocaleString()}
            </span>
            <span className="text-muted-foreground">/ mois</span>
          </div>
          {annonce.deposit > 0 && (
            <div className="text-sm text-muted-foreground">
              Caution : {annonce.deposit.toLocaleString()}€
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
        <div className="flex items-center gap-2">
          <Euro className="size-5 text-primary" strokeWidth={3} />
          <span className="text-3xl font-bold text-primary">
            {annonce.price.toLocaleString()}
          </span>
          <span className="text-muted-foreground">/ mois</span>
        </div>
        {annonce.deposit > 0 && (
          <div className="text-sm text-muted-foreground">
            Caution : {annonce.deposit.toLocaleString()}€
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
    </div>
  );
}
