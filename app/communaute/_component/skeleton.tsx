import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function CommunauteFiltersSkeleton() {
  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {/* Barre de recherche skeleton */}
      <div className="flex gap-4">
        <Skeleton className="h-10 flex-1" />
      </div>

      {/* Filtres rapides skeleton */}
      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-28 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
    </div>
  );
}

export function CommunautePageSkeleton() {
  return (
    <>
      <CommunauteFiltersSkeleton />

      {/* Tabs skeleton */}
      <div className="mt-8 space-y-6">
        <div className="flex gap-2">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 flex-1" />
        </div>

        {/* Members grid skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i}>
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4"></div>
                <Skeleton className="h-6 w-32 mx-auto mb-2" />
                <Skeleton className="h-5 w-20 rounded-full mx-auto" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-center">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5 mx-auto" />
                </div>
                <div className="space-y-2">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 flex-1" />
                    </div>
                  ))}
                </div>
                <div>
                  <Skeleton className="h-4 w-16 mb-2" />
                  <div className="flex flex-wrap gap-1">
                    {[1, 2, 3].map((k) => (
                      <Skeleton key={k} className="h-5 w-12 rounded-full" />
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-8 flex-1" />
                  <Skeleton className="h-8 w-16" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
