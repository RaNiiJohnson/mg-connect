"use client";

import { Wrench } from "lucide-react";
import { ServiceProviderCard } from "./service-provider-card";
import type { ServiceProviderListItem } from "@app/communaute/_actions/community.action";
import { Button } from "@/components/ui/button";
import { User } from "better-auth";
import { BecomeProviderDialog } from "../dialogs/become-provider-dialog";
import { CommunautePagination } from "../communaute-pagination";

interface ServiceProvidersListProps {
  providers: ServiceProviderListItem[];
  user: User | null;
  userProviderProfile?: ServiceProviderListItem | null;
  currentPage: number;
  totalPages: number;
}

export function ServiceProvidersList({
  providers,
  user,
  userProviderProfile,
  currentPage,
  totalPages,
}: ServiceProvidersListProps) {
  if (providers.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Wrench className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">
            Aucun prestataire trouvé
          </h3>
          <p className="text-muted-foreground mb-6">
            Soyez le premier à proposer vos services à la communauté !
          </p>
          {user && !userProviderProfile && (
            <BecomeProviderDialog
              userId={user.id}
              trigger={<Button>Devenir prestataire</Button>}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {user && !userProviderProfile && (
        <div className="flex justify-end">
          <BecomeProviderDialog
            userId={user.id}
            trigger={<Button>Proposer mes services</Button>}
          />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {providers.map((provider) => (
          <ServiceProviderCard key={provider.id} provider={provider} />
        ))}
      </div>
      <CommunautePagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
