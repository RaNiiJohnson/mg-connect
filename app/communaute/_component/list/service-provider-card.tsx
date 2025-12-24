"use client";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, CheckCircle, Clock } from "lucide-react";
import type { ServiceProviderListItem } from "@app/communaute/_actions/community.action";

interface ServiceProviderCardProps {
  provider: ServiceProviderListItem;
}

export function ServiceProviderCard({ provider }: ServiceProviderCardProps) {
  const user = provider.user;
  const displayName = user.name || "Prestataire";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const avatarUrl = user.photo || user.image;

  return (
    <div className="bg-card border border-border rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:border-primary/30 group">
      <div className="flex flex-col h-full">
        {/* Header avec avatar et disponibilité */}
        <div className="flex items-start justify-between mb-4">
          <Avatar className="h-14 w-14 ring-2 ring-background shadow-md group-hover:ring-primary/20 transition-all">
            <AvatarImage src={avatarUrl || undefined} alt={displayName} />
            <AvatarFallback className="text-sm font-semibold bg-primary/10 text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>

          <Badge
            variant={provider.available ? "default" : "secondary"}
            className={
              provider.available
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
            }
          >
            {provider.available ? (
              <>
                <CheckCircle className="h-3 w-3 mr-1" />
                Disponible
              </>
            ) : (
              <>
                <Clock className="h-3 w-3 mr-1" />
                Indisponible
              </>
            )}
          </Badge>
        </div>

        {/* Nom et type de service */}
        <h3 className="font-semibold text-foreground text-lg mb-1 line-clamp-1">
          {displayName}
        </h3>

        <Badge variant="outline" className="w-fit mb-2 text-xs">
          {provider.serviceType}
        </Badge>

        {/* Ville */}
        {user.city && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
            <MapPin className="h-3.5 w-3.5" />
            <span>{user.city}</span>
          </div>
        )}

        {/* Description */}
        {provider.description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2 grow">
            {provider.description}
          </p>
        )}

        {/* Tarif et expérience */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
          {provider.tarif && (
            <span className="text-sm font-medium text-primary">
              {provider.tarif}
            </span>
          )}
          {provider.experience && (
            <span className="text-xs text-muted-foreground">
              {provider.experience}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
