"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  X,
  MapPin,
  Euro,
  Bed,
  Bath,
  Square,
  Calendar,
  Phone,
  Mail,
  Heart,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface RealEstateListing {
  id: string;
  title: string;
  city: string;
  district: string;
  price: number;
  type: string;
  photos: string[];
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  available?: string;
  description?: string;
  features?: string[];
  contact?: string;
  author?: {
    id: string;
    name: string | null;
    photo: string | null;
  };
}

interface ImmobilierGridProps {
  annonces: RealEstateListing[];
  onSelectionChange?: (hasSelection: boolean) => void;
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
          <div
            key={annonce.id}
            className={cn(
              "relative group cursor-pointer transition-all duration-300 ",
              selectedId === annonce.id &&
                "ring-2 ring-primary rounded-xl shadow-primary"
            )}
            onClick={() => handleAnnonceClick(annonce.id)}
          >
            <div className="relative h-80 w-full rounded-xl overflow-hidden shadow-xl">
              <Image
                src={annonce.photos[0] || "/placeholder-image.jpg"}
                alt={annonce.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105 "
              />
              <Badge className="absolute top-2 left-2">{annonce.type}</Badge>
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
              <div className="flex items-center gap-1 font-bold text-primary">
                <Euro className="size-4" strokeWidth={3} />
                {annonce.price.toLocaleString()}
                <span className="font-light text-xs text-muted-foreground">
                  / mois
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Panel de détails pour écrans lg */}
        {selectedAnnonce && isLargeScreen && (
          <div
            className={cn(
              "lg:col-start-3 lg:row-start-1 lg:row-span-3 sticky top-24 h-fit"
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

// Composant réutilisable pour les détails d'une annonce
function AnnonceDetails({
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

      <div className="space-y-4">
        {/* Prix */}
        <div className="flex items-center gap-2">
          <Euro className="size-5 text-primary" strokeWidth={3} />
          <span className="text-3xl font-bold text-primary">
            {annonce.price.toLocaleString()}
          </span>
          <span className="text-muted-foreground">/ mois</span>
        </div>

        {/* Localisation */}
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="size-4" />
          <span>
            {annonce.city} - {annonce.district}
          </span>
        </div>

        {/* Caractéristiques */}
        {(annonce.bedrooms || annonce.bathrooms || annonce.area) && (
          <div className="grid grid-cols-3 gap-3 py-4 border-y">
            {annonce.bedrooms && (
              <div className="text-center">
                <Bed className="size-5 mx-auto mb-1 text-muted-foreground" />
                <div className="font-semibold">{annonce.bedrooms}</div>
                <div className="text-xs text-muted-foreground">Chambres</div>
              </div>
            )}
            {annonce.bathrooms && (
              <div className="text-center">
                <Bath className="size-5 mx-auto mb-1 text-muted-foreground" />
                <div className="font-semibold">{annonce.bathrooms}</div>
                <div className="text-xs text-muted-foreground">
                  Salles de bain
                </div>
              </div>
            )}
            {annonce.area && (
              <div className="text-center">
                <Square className="size-5 mx-auto mb-1 text-muted-foreground" />
                <div className="font-semibold">{annonce.area}m²</div>
                <div className="text-xs text-muted-foreground">Surface</div>
              </div>
            )}
          </div>
        )}

        {/* Disponibilité */}
        {annonce.available && (
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="size-4 text-muted-foreground" />
            <span className="text-muted-foreground">Disponible :</span>
            <span className="font-medium">{annonce.available}</span>
          </div>
        )}

        {/* Description */}
        {annonce.description && (
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {annonce.description}
            </p>
          </div>
        )}

        {/* Équipements */}
        {annonce.features && annonce.features.length > 0 && (
          <div>
            <h3 className="font-semibold mb-2">Équipements</h3>
            <div className="flex flex-wrap gap-2">
              {annonce.features.map((feature, i) => (
                <Badge key={i} variant="secondary">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Contact */}
        {annonce.contact && (
          <div className="space-y-2 pt-4 border-t">
            <h3 className="font-semibold mb-3">Contact</h3>
            <Button className="w-full gap-2">
              <Phone className="size-4" />
              {annonce.contact}
            </Button>
            <Button variant="outline" className="w-full gap-2">
              <Mail className="size-4" />
              Envoyer un message
            </Button>
            <Button variant="ghost" className="w-full gap-2">
              <Heart className="size-4" />
              Ajouter aux favoris
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// Composant pour le contenu des détails (sans wrapper, pour le dialog)
function AnnonceDetailsContent({ annonce }: { annonce: RealEstateListing }) {
  return (
    <div className="space-y-4">
      {/* Prix */}
      <div className="flex items-center gap-2">
        <Euro className="size-5 text-primary" strokeWidth={3} />
        <span className="text-3xl font-bold text-primary">
          {annonce.price.toLocaleString()}
        </span>
        <span className="text-muted-foreground">/ mois</span>
      </div>

      {/* Localisation */}
      <div className="flex items-center gap-2 text-muted-foreground">
        <MapPin className="size-4" />
        <span>
          {annonce.city} - {annonce.district}
        </span>
      </div>

      {/* Caractéristiques */}
      {(annonce.bedrooms || annonce.bathrooms || annonce.area) && (
        <div className="grid grid-cols-3 gap-3 py-4 border-y">
          {annonce.bedrooms && (
            <div className="text-center">
              <Bed className="size-5 mx-auto mb-1 text-muted-foreground" />
              <div className="font-semibold">{annonce.bedrooms}</div>
              <div className="text-xs text-muted-foreground">Chambres</div>
            </div>
          )}
          {annonce.bathrooms && (
            <div className="text-center">
              <Bath className="size-5 mx-auto mb-1 text-muted-foreground" />
              <div className="font-semibold">{annonce.bathrooms}</div>
              <div className="text-xs text-muted-foreground">
                Salles de bain
              </div>
            </div>
          )}
          {annonce.area && (
            <div className="text-center">
              <Square className="size-5 mx-auto mb-1 text-muted-foreground" />
              <div className="font-semibold">{annonce.area}m²</div>
              <div className="text-xs text-muted-foreground">Surface</div>
            </div>
          )}
        </div>
      )}

      {/* Disponibilité */}
      {annonce.available && (
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="size-4 text-muted-foreground" />
          <span className="text-muted-foreground">Disponible :</span>
          <span className="font-medium">{annonce.available}</span>
        </div>
      )}

      {/* Description */}
      {annonce.description && (
        <div>
          <h3 className="font-semibold mb-2">Description</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {annonce.description}
          </p>
        </div>
      )}

      {/* Équipements */}
      {annonce.features && annonce.features.length > 0 && (
        <div>
          <h3 className="font-semibold mb-2">Équipements</h3>
          <div className="flex flex-wrap gap-2">
            {annonce.features.map((feature, i) => (
              <Badge key={i} variant="secondary">
                {feature}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Contact */}
      {annonce.contact && (
        <div className="space-y-2 pt-4 border-t">
          <h3 className="font-semibold mb-3">Contact</h3>
          <Button className="w-full gap-2">
            <Phone className="size-4" />
            {annonce.contact}
          </Button>
          <Button variant="outline" className="w-full gap-2">
            <Mail className="size-4" />
            Envoyer un message
          </Button>
          <Button variant="ghost" className="w-full gap-2">
            <Heart className="size-4" />
            Ajouter aux favoris
          </Button>
        </div>
      )}
    </div>
  );
}
