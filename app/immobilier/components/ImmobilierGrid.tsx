"use client";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Briefcase, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnnonceDetails, AnnonceDetailsContent } from "./AnnoneDetails";
import { PriceDisplay } from "../_component/price";

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

interface ImmobilierGridProps {
  annonces: RealEstateListing[];
}

export function ImmobilierGrid({ annonces }: ImmobilierGridProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogAnnonce, setDialogAnnonce] = useState<RealEstateListing | null>(
    null
  );
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const selectedAnnonce = annonces.find((a) => a.id === selectedId);

  // Hook pour détecter la taille d'écran
  useEffect(() => {
    const checkScreenSize = () => {
      const isLarge = window.innerWidth >= 1024; // lg breakpoint
      setIsLargeScreen(isLarge);

      // Si on passe d'un grand écran à un petit écran et qu'il y a une sélection
      // on ferme la sélection et on ferme le dialog
      if (!isLarge && selectedId) {
        setSelectedId(null);
        setIsDialogOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [selectedId]);

  const handleAnnonceClick = (annonceId: string) => {
    const annonce = annonces.find((a) => a.id === annonceId);

    if (isLargeScreen) {
      // Comportement pour grands écrans (panel)
      if (selectedId === annonceId) {
        // Si déjà sélectionné, on ferme
        setSelectedId(null);
      } else {
        // Nouvelle sélection
        setSelectedId(annonceId);
      }
    } else {
      // Comportement pour petits écrans (dialog)
      if (annonce) {
        setDialogAnnonce(annonce);
        setIsDialogOpen(true);
      }
    }
  };

  if (annonces.length === 0) {
    return (
      <div className="text-center px-4">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Aucune annonce trouvée</h3>
          <p className="text-muted-foreground mb-6">
            Essayez de modifier vos critères de recherche ou supprimez certains
            filtres
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "transition-all duration-300",
        selectedId && "max-w-7xl mx-auto"
      )}
    >
      <div
        className={cn(
          "grid gap-6 transition-all duration-300",
          selectedId
            ? "lg:grid-cols-[repeat(2,minmax(0,1fr))_450px]"
            : "md:grid-cols-2 lg:grid-cols-3"
        )}
      >
        {annonces.map((annonce) => (
          <Link
            key={annonce.id}
            href={`/immobilier/${annonce.id}`}
            className={cn(
              "relative group cursor-pointer transition-all duration-300 h-fit block",
              selectedId === annonce.id &&
                "ring-2 ring-primary rounded-xl shadow-primary"
            )}
            onClick={(e) => {
              // Sur les grands écrans, empêcher la navigation et utiliser le panel
              if (isLargeScreen) {
                e.preventDefault();
                handleAnnonceClick(annonce.id);
              }
              // Sur les petits écrans, laisser la navigation normale se faire
            }}
          >
            <div className="relative h-80 w-full rounded-xl overflow-hidden shadow-xl">
              <Image
                src={annonce.coverPhoto || "/placeholder-image.jpg"}
                alt={annonce.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <Badge className="absolute top-2 left-2 z-10">
                {annonce.type}
              </Badge>

              {/* Indicateur de photos multiples */}
              {annonce.photos.length > 0 && (
                <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-md z-10">
                  +{annonce.photos.length + 1} photos
                </div>
              )}

              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="absolute inset-x-3 bottom-3 p-3 bg-background/95 backdrop-blur-sm rounded-lg border">
              <h3 className="font-semibold mb-1 line-clamp-1">
                {annonce.title}
              </h3>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                <MapPin className="size-3" />
                {annonce.city} - {annonce.district}
              </div>
              <div className="font-bold">
                <PriceDisplay price={annonce.price} className="text-primary" />
              </div>
            </div>
          </Link>
        ))}

        {/* Panel de détails pour écrans lg */}
        {selectedAnnonce && isLargeScreen && (
          <div
            className={cn(
              "lg:col-start-3 lg:row-start-1 sticky lg:row-span-10 top-24 h-fit max-h-[calc(100vh-3rem)] overflow-y-auto"
            )}
          >
            <AnnonceDetails
              annonce={selectedAnnonce}
              onClose={() => setSelectedId(null)}
              showCloseButton={true}
            />
          </div>
        )}
      </div>

      {/* Dialog pour écrans md et sm */}
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            setDialogAnnonce(null);
          }
        }}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{dialogAnnonce?.title}</DialogTitle>
            <DialogDescription>
              Détails de l&apos;annonce immobilière
            </DialogDescription>
          </DialogHeader>
          {dialogAnnonce && <AnnonceDetailsContent annonce={dialogAnnonce} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
