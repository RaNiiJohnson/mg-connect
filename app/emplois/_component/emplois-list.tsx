"use client";

import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";
import type { JobOfferListItem } from "@/lib/database";
import type { User } from "better-auth";
import { PublishJobDialog } from "@app/emplois/_component/publish-job-dialog";
import { formatDate } from "@/lib/date";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { truncateText } from "@/lib/utils";
import Link from "next/link";

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
    <div className="w-full mx-auto py-10 space-y-4">
      {jobs.map((job) => (
        <Item
          variant="outline"
          key={job.id}
          className="flex max-sm:flex-col max-sm:items-start max-sm:text-left"
          asChild
        >
          <Link href={`/emplois/${job.id}`}>
            <ItemContent>
              <ItemTitle>{job.title}</ItemTitle>
              <ItemDescription>
                {truncateText(job.description, 120)}
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <div className="flex flex-col gap-1 sm:text-right">
                <span>
                  {job.city} ({job.type})
                </span>
                <span className="font-bold text-primary">
                  {job.contractType}
                </span>
                <span className="text-sm text-accent-foreground/50">
                  publié {formatDate(job.createdAt)}
                </span>
              </div>
            </ItemActions>
          </Link>
        </Item>
      ))}
    </div>
  );
}
