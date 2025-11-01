import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  Search,
  Filter,
  MapPin,
  Calendar,
  Euro,
  Clock,
  Building,
} from "lucide-react";
import { getUser } from "@/lib/auth-server";
import { getAllJobOffers } from "@/lib/database";
import { Suspense } from "react";
import { PublishJobDialog } from "@/components/publish-job-dialog";

async function EmploisPageContent() {
  const user = await getUser();
  const jobOffers = await getAllJobOffers();

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">Emplois</h1>
              <p className="text-base sm:text-lg text-muted-foreground">
                Découvrez les opportunités d&apos;emploi partagées par la
                communauté
              </p>
            </div>
            {user && <PublishJobDialog />}
          </div>

          {/* Barre de recherche et filtres */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par titre, ville, entreprise..."
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              className="flex items-center gap-2 shrink-0"
            >
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filtres</span>
            </Button>
          </div>

          {/* Filtres rapides */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge
              variant="secondary"
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
            >
              Toutes
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
            >
              Au pair
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
            >
              Ausbildung
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
            >
              FSJ/FOJ
            </Badge>
          </div>
        </div>
        {/* //https://www.youtube.com/watch?v=lW_0InDuejU */}

        {/* Liste des offres */}
        <div className="space-y-6">
          {jobOffers.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{job.type}</Badge>
                      <Badge variant="secondary">{job.contractType}</Badge>
                    </div>
                    <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Building className="h-4 w-4" />
                        <span>{job.company}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{job.city}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          Début:{" "}
                          {new Date(job.startDate).toLocaleDateString("fr-FR")}
                        </span>
                      </div>
                      {job.duration && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{job.duration}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    {job.salary && (
                      <div className="flex items-center gap-1 text-lg font-semibold text-primary">
                        <Euro className="h-5 w-5" />
                        <span>{job.salary}</span>
                      </div>
                    )}
                    <div className="text-sm text-muted-foreground mt-1">
                      Publié le{" "}
                      {new Date(job.createdAt).toLocaleDateString("fr-FR")}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <CardDescription className="text-base">
                  {job.description}
                </CardDescription>

                {/* Certificats requis */}
                {job.certificates.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2">
                      Certificats requis :
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {job.certificates.map((cert, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t">
                  <Button size="sm">Postuler</Button>
                  <Button variant="outline" size="sm">
                    Détails
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {jobOffers.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Aucune offre d&apos;emploi
            </h3>
            <p className="text-muted-foreground mb-6">
              Soyez le premier à partager une opportunité avec la communauté
            </p>
            {user && (
              <PublishJobDialog trigger={<Button>Publier une offre</Button>} />
            )}
          </div>
        )}

        {/* Call to action */}
        <div className="text-center mt-12 p-8  bg-linear-to-br from-accent to-accent/0 rounded-lg">
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
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-5 bg-muted rounded-full w-16"></div>
                      <div className="h-5 bg-muted rounded-full w-12"></div>
                    </div>
                    <div className="h-7 bg-muted rounded mb-2 w-64"></div>
                    <div className="flex flex-wrap items-center gap-4">
                      {[1, 2, 3, 4].map((j) => (
                        <div
                          key={j}
                          className="h-4 bg-muted rounded w-20"
                        ></div>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="h-6 bg-muted rounded mb-1 w-20"></div>
                    <div className="h-4 bg-muted rounded w-24"></div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-4/5"></div>
                  <div className="h-4 bg-muted rounded w-3/5"></div>
                </div>
                <div>
                  <div className="h-4 bg-muted rounded mb-2 w-32"></div>
                  <div className="flex flex-wrap gap-1">
                    {[1, 2, 3].map((k) => (
                      <div
                        key={k}
                        className="h-5 bg-muted rounded-full w-16"
                      ></div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 pt-4 border-t">
                  <div className="h-8 bg-muted rounded w-20"></div>
                  <div className="h-8 bg-muted rounded w-16"></div>
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
