"use client";

import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, Building2, Clock } from "lucide-react";
import type { JobOfferListItem } from "@/lib/database";
import type { User } from "better-auth";
import { PublishJobDialog } from "@app/emplois/_component/publish-job-dialog";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface EmploisListProps {
  jobs: JobOfferListItem[];
  user: User | null;
}

export function EmploisList({ jobs, user }: EmploisListProps) {
  if (jobs.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Aucune offre trouvée</h3>
          <p className="text-muted-foreground mb-6">
            Essayez de modifier vos critères de recherche ou supprimez certains
            filtres
          </p>
          {user && (
            <PublishJobDialog trigger={<Button>Publier une offre</Button>} />
          )}
        </div>
      </div>
    );
  }

  const getRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - new Date(date).getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Aujourd'hui";
    if (diffInDays === 1) return "Hier";
    if (diffInDays < 7) return `Il y a ${diffInDays} jours`;
    if (diffInDays < 30) return `Il y a ${Math.floor(diffInDays / 7)} semaines`;
    return `Il y a ${Math.floor(diffInDays / 30)} mois`;
  };

  return (
    <div className="space-y-3">
      {jobs.map((job) => (
        <Link key={job.id} href={`/emplois/${job.id}`} className="block group">
          <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200 hover:border-primary/30">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                {/* Title */}
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-1 line-clamp-1">
                  {job.title}
                </h3>

                {/* Company */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-foreground">
                    {job.company}
                  </span>
                </div>

                {/* Location & Type */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{job.city}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    <span>{job.type}</span>
                  </div>
                  {job.salary && (
                    <div className="flex items-center gap-1 font-medium text-foreground">
                      <span>{job.salary}</span>
                    </div>
                  )}
                </div>

                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-secondary/50 hover:bg-secondary/70 text-xs font-normal"
                  >
                    {job.contractType}
                  </Badge>
                  {job.duration && (
                    <Badge variant="outline" className="text-xs font-normal">
                      <Clock className="h-3 w-3 mr-1" />
                      {job.duration}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Date */}
              <div className="shrink-0 text-right">
                <div className="text-xs text-muted-foreground whitespace-nowrap">
                  {getRelativeTime(job.createdAt)}
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
