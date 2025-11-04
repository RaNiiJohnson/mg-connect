import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/auth-server";
import { getAllJobOffers } from "@/lib/database";
import { Suspense } from "react";
import { PublishJobDialog } from "@/components/publish-job-dialog";
import { EmploisClient } from "./_component/emplois-client";
import { Card, CardContent } from "@/components/ui/card";

async function EmploisPageContent() {
  const user = await getUser();
  const jobOffers = await getAllJobOffers();

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">Emplois</h1>
              <p className="text-base sm:text-lg text-muted-foreground">
                Découvrez les opportunités d&apos;emploi partagées par la
                communauté
              </p>
            </div>
            {user && <PublishJobDialog />}
          </div>

          {/* Filtres et recherche avec nuqs */}
          <EmploisClient jobs={jobOffers} user={user} />
        </div>

        {/* Call to action */}
        <div className="text-center mt-12 p-8 bg-linear-to-br from-accent to-accent/0 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">
            Vous avez une opportunité à partager ?
          </h3>
          <p className="text-muted-foreground mb-6">
            Aidez la communauté en partageant des offres d&apos;emploi, de stage
            ou de formation
          </p>
          {user ? (
            <PublishJobDialog
              trigger={<Button size="lg">Publier une offre</Button>}
            />
          ) : (
            <Button size="lg">S&apos;inscrire pour publier</Button>
          )}
        </div>
      </div>
    </div>
  );
}

function EmploisPageSkeleton() {
  return (
    <div className="min-h-screen p-4 animate-pulse">
      <div className="max-w-6xl mx-auto">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
            <div className="flex-1">
              <div className="h-10 bg-muted rounded-lg mb-4 w-32"></div>
              <div className="h-6 bg-muted rounded w-96"></div>
            </div>
            <div className="h-10 bg-muted rounded w-48"></div>
          </div>

          {/* Search and filters skeleton */}
          <div className="flex gap-4 mb-6">
            <div className="h-10 bg-muted rounded flex-1"></div>
            <div className="h-10 bg-muted rounded w-24"></div>
          </div>

          {/* Filter badges skeleton */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-6 bg-muted rounded-full w-16"></div>
            ))}
          </div>
        </div>

        {/* Job offers skeleton */}
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-5 bg-muted rounded-full w-16"></div>
                      <div className="h-5 bg-muted rounded-full w-12"></div>
                    </div>
                    <div className="h-7 bg-muted rounded mb-3 w-64"></div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                      {[1, 2, 3, 4].map((j) => (
                        <div
                          key={j}
                          className="h-4 bg-muted rounded w-20"
                        ></div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <div className="h-8 bg-muted rounded w-20"></div>
                      <div className="h-8 bg-muted rounded w-24"></div>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-2">
                    <div className="h-6 bg-muted rounded w-20"></div>
                    <div className="h-4 bg-muted rounded w-24"></div>
                    <div className="h-3 bg-muted rounded w-16"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA skeleton */}
        <div className="text-center mt-12 p-8  bg-linear-to-br from-accent to-accent/0 rounded-lg">
          <div className="h-8 bg-muted rounded mb-4 w-80 mx-auto"></div>
          <div className="h-4 bg-muted rounded mb-6 w-96 mx-auto"></div>
          <div className="h-12 bg-muted rounded w-48 mx-auto"></div>
        </div>
      </div>
    </div>
  );
}

export default function EmploisPage() {
  return (
    <Suspense fallback={<EmploisPageSkeleton />}>
      <EmploisPageContent />
    </Suspense>
  );
}
