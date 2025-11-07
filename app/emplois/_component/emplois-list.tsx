"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Building, Briefcase } from "lucide-react";
import Link from "next/link";
import type { JobOfferListItem } from "@/lib/database";
import type { User } from "better-auth";
import { PublishJobDialog } from "@/components/publish-job-dialog";

interface EmploisListProps {
  jobs: JobOfferListItem[];
  user: User | null;
}

export function EmploisList({ jobs, user }: EmploisListProps) {
  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <Briefcase className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">
          Aucune offre ne correspond à vos critères
        </h3>
        <p className="text-muted-foreground mb-6">
          Essayez de modifier vos filtres pour voir plus d&apos;offres
        </p>
        {user && (
          <PublishJobDialog trigger={<Button>Publier une offre</Button>} />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <Card key={job.id} className="hover:shadow-lg transition-shadow">
          <CardContent className="px-2 sm:px-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline">{job.type}</Badge>
                  <Badge variant="secondary">{job.contractType}</Badge>
                </div>
                <CardTitle className="text-xl mb-3 hover:text-primary transition-colors">
                  <Link href={`/emplois/${job.id}`}>{job.title}</Link>
                </CardTitle>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Building className="h-4 w-4" />
                    <span>{job.company}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{job.city}</span>
                  </div>
                  {job.duration && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{job.duration}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  {user?.id !== job.authorId && (
                    <Button size="sm">Postuler</Button>
                  )}
                  <Link href={`/emplois/${job.id}`}>
                    <Button variant="outline" size="sm">
                      Voir détails
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="text-right flex flex-col items-end gap-2">
                {job.salary && (
                  <div className="flex items-center gap-1 text-lg font-semibold text-primary">
                    <span>{job.salary}</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
