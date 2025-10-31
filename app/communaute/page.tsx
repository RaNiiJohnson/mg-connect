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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MapPin,
  Briefcase,
  Calendar,
  Search,
  Filter,
  MessageCircle,
  Plus,
} from "lucide-react";
import { getAllCommunityMembers } from "@/lib/database";
import { getUser } from "@/lib/auth-server";
import { Suspense } from "react";

async function CommunautePageContent() {
  const user = await getUser();
  const membres = await getAllCommunityMembers();

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                Communauté
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground">
                Connectez-vous avec d&apos;autres Malagasy en Allemagne
              </p>
            </div>
            {user && (
              <Button className="flex items-center gap-2 w-full sm:w-auto">
                <Plus className="h-4 w-4" />
                <span className="sm:inline">Rejoindre un groupe</span>
              </Button>
            )}
          </div>

          {/* Barre de recherche et filtres */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom, ville, domaine..."
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
              Tous
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
              Étudiant
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
            >
              Fachkraft
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
            >
              FSJ/FOJ
            </Badge>
          </div>
        </div>

        {/* Grille des membres */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {membres.map((membre) => (
            <Card key={membre.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage
                    src={membre.photo || undefined}
                    alt={membre.name || "Member"}
                    className="object-cover"
                  />
                  <AvatarFallback>
                    {membre.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("") || "?"}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">
                  {membre.name || "Nom non disponible"}
                </CardTitle>
                <Badge variant="secondary">
                  {membre.status || "Statut non défini"}
                </Badge>
              </CardHeader>

              <CardContent className="flex flex-col flex-1 space-y-4">
                <CardDescription className="text-center">
                  {membre.bio || "Aucune bio disponible"}
                </CardDescription>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{membre.city || "Ville non spécifiée"}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      Arrivé en {membre.arrivalDate || "Date inconnue"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {membre.field || "Domaine non spécifié"} -{" "}
                      {membre.company || "Entreprise non spécifiée"}
                    </span>
                  </div>
                </div>

                {/* Journey */}
                {membre.journey && membre.journey.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Parcours :</h4>
                    <div className="flex flex-wrap gap-1">
                      {membre.journey.map((etape, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {etape}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 mt-auto">
                  <Button className="flex-1" size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contacter
                  </Button>
                  <Button variant="outline" size="sm">
                    Profil
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-12 p-8  bg-linear-to-br from-accent to-accent/0 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">
            Rejoignez notre communauté !
          </h3>
          <p className="text-muted-foreground mb-6">
            Connectez-vous avec d&apos;autres Malagasy, partagez vos expériences
            et créez des liens durables
          </p>
          {!user ? (
            <Button size="lg">S&apos;inscrire maintenant</Button>
          ) : (
            <Button size="lg">Inviter des amis</Button>
          )}
        </div>
      </div>
    </div>
  );
}

function CommunautePageSkeleton() {
  return (
    <div className="min-h-screen p-4 animate-pulse">
      <div className="max-w-6xl mx-auto">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
            <div className="flex-1">
              <div className="h-10 bg-muted rounded-lg mb-4 w-64"></div>
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

        {/* Members grid skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i}>
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4"></div>
                <div className="h-6 bg-muted rounded mb-2 w-32 mx-auto"></div>
                <div className="h-5 bg-muted rounded-full w-20 mx-auto"></div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-center">
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-4/5 mx-auto"></div>
                </div>
                <div className="space-y-2">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="flex items-center gap-2">
                      <div className="h-4 w-4 bg-muted rounded"></div>
                      <div className="h-4 bg-muted rounded flex-1"></div>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="h-4 bg-muted rounded mb-2 w-16"></div>
                  <div className="flex flex-wrap gap-1">
                    {[1, 2, 3].map((k) => (
                      <div
                        key={k}
                        className="h-5 bg-muted rounded-full w-12"
                      ></div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="h-8 bg-muted rounded flex-1"></div>
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

export default function CommunautePage() {
  return (
    <Suspense fallback={<CommunautePageSkeleton />}>
      <CommunautePageContent />
    </Suspense>
  );
}
