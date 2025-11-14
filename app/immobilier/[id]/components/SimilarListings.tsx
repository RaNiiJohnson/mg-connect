"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bath, Bed, Euro, Heart, MapPin, Square } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface RealEstateListing {
  id: string;
  title: string;
  city: string;
  district: string;
  price: number;
  type: string;
  photos: string[];
  coverPhoto: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
}

interface SimilarListingsProps {
  properties: RealEstateListing[];
}

export function SimilarListings({ properties }: SimilarListingsProps) {
  if (properties.length === 0) {
    return null;
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Annonces similaires</h2>
        <Link href="/immobilier">
          <Button variant="outline">Voir toutes les annonces</Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <Card
            key={property.id}
            className="group overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <div className="relative">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={property.coverPhoto || "/placeholder-image.jpg"}
                  alt={property.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <Badge className="absolute top-3 left-3 z-10">
                  {property.type}
                </Badge>

                {/* Bouton favoris */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 z-10 bg-white/80 hover:bg-white"
                >
                  <Heart className="h-4 w-4" />
                </Button>

                {/* Indicateur de photos multiples */}
                {property.photos.length > 0 && (
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-md z-10">
                    +{property.photos.length + 1} photos
                  </div>
                )}
              </div>
            </div>

            <CardContent className="p-4">
              <div className="space-y-3">
                {/* Prix */}
                <div className="flex items-center gap-2">
                  <Euro className="h-5 w-5 text-primary" strokeWidth={3} />
                  <span className="text-2xl font-bold text-primary">
                    {property.price.toLocaleString()}
                  </span>
                  <span className="text-muted-foreground text-sm">/ mois</span>
                </div>

                {/* Titre */}
                <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
                  {property.title}
                </h3>

                {/* Localisation */}
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">
                    {property.city} - {property.district}
                  </span>
                </div>

                {/* Caractéristiques */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Bed className="h-4 w-4" />
                    <span>{property.bedrooms}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="h-4 w-4" />
                    <span>{property.bathrooms}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Square className="h-4 w-4" />
                    <span>{property.area}m²</span>
                  </div>
                </div>

                {/* Bouton voir détails */}
                <Link href={`/immobilier/${property.id}`} className="block">
                  <Button className="w-full mt-4" variant="outline">
                    Voir les détails
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Message si peu d'annonces similaires */}
      {properties.length < 3 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">
            Pas assez d&apos;annonces similaires dans cette zone ?
          </p>
          <Link href="/immobilier">
            <Button variant="outline">Découvrir toutes nos annonces</Button>
          </Link>
        </div>
      )}
    </section>
  );
}
