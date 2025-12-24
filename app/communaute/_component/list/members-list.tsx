"use client";

import { Users } from "lucide-react";
import { MemberCard } from "./member-card";
import type { CommunityMember } from "@app/communaute/_actions/community.action";
import { CommunautePagination } from "../communaute-pagination";

interface MembersListProps {
  members: CommunityMember[];
  currentPage: number;
  totalPages: number;
}

export function MembersList({
  members,
  currentPage,
  totalPages,
}: MembersListProps) {
  if (members.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Aucun membre trouvé</h3>
          <p className="text-muted-foreground">
            Essayez de modifier vos critères de recherche ou supprimez certains
            filtres
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {members.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
      <CommunautePagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
