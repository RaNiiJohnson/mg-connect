"use client";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Briefcase, Home, Wrench, User } from "lucide-react";
import type { CommunityMember } from "@app/communaute/_actions/community.action";

interface MemberCardProps {
  member: CommunityMember;
}

const ROLE_CONFIG = {
  RECRUITER: {
    icon: Briefcase,
    label: "Recruteur",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  PROPERTY_OWNER: {
    icon: Home,
    label: "Propriétaire",
    color:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  SERVICE_PROVIDER: {
    icon: Wrench,
    label: "Prestataire",
    color:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  },
  MEMBER: {
    icon: User,
    label: "Membre",
    color: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
  },
} as const;

export function MemberCard({ member }: MemberCardProps) {
  const displayName = member.name || "Membre";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const avatarUrl = member.photo || member.image;

  // Filtrer les rôles pour n'afficher que les rôles "actifs" (pas MEMBER seul)
  const activeRoles = member.roles.filter((role) => role !== "MEMBER");
  const displayRoles = activeRoles.length > 0 ? activeRoles : ["MEMBER"];

  return (
    <div className="bg-card border border-border rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:border-primary/30 group">
      <div className="flex flex-col items-center text-center">
        {/* Avatar */}
        <Avatar className="h-20 w-20 mb-4 ring-2 ring-background shadow-md group-hover:ring-primary/20 transition-all">
          <AvatarImage src={avatarUrl || undefined} alt={displayName} />
          <AvatarFallback className="text-lg font-semibold bg-primary/10 text-primary">
            {initials}
          </AvatarFallback>
        </Avatar>

        {/* Nom */}
        <h3 className="font-semibold text-foreground text-lg mb-1 line-clamp-1">
          {displayName}
        </h3>

        {/* Status (Étudiant, Professionnel, etc.) */}
        {member.status && (
          <p className="text-sm text-muted-foreground mb-2">{member.status}</p>
        )}

        {/* Ville */}
        {member.city && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
            <MapPin className="h-3.5 w-3.5" />
            <span>{member.city}</span>
          </div>
        )}

        {/* Domaine */}
        {member.field && (
          <p className="text-xs text-muted-foreground mb-3 line-clamp-1">
            {member.field}
          </p>
        )}

        {/* Badges des rôles */}
        <div className="flex flex-wrap justify-center gap-1.5 mt-auto">
          {displayRoles.map((role) => {
            const config = ROLE_CONFIG[role as keyof typeof ROLE_CONFIG];
            if (!config) return null;
            const Icon = config.icon;
            return (
              <Badge
                key={role}
                variant="secondary"
                className={`text-xs font-normal ${config.color}`}
              >
                <Icon className="h-3 w-3 mr-1" />
                {config.label}
              </Badge>
            );
          })}
        </div>
      </div>
    </div>
  );
}
