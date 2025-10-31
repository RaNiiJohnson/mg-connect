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
  MapPin,
  Euro,
  Search,
  Filter,
  Plus,
  Bath,
  Bed,
  Square,
} from "lucide-react";
import Image from "next/image";
import { getAllRealEstateListings } from "@/lib/database";
import { Suspense } from "react";

async function ImmobilierPageContent() {
  const annonces = await getAllRealEstateListings();

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                Immobilier
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground">
                Trouvez votre logement ou partagez le vôtre avec la communauté
              </p>
            </div>
            <Button className="flex items-center gap-2 w-full sm:w-auto">
              <Plus className="h-4 w-4" />
              <span className="sm:inline">Publier une annonce</span>
            </Button>
          </div>

          {/* Barre de recherche et filtres */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par ville, quartier..."
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
              Colocation
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
            >
              Location
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
            >
              Weekend
            </Badge>
          </div>
        </div>

        {/* Grille des annonces */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {annonces.map((annonce) => (
            <Card
              key={annonce.id}
              className="hover:shadow-lg transition-shadow overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-48 w-full">
                <Image
                  src={annonce.photos[0] || "/placeholder-image.jpg"}
                  alt={annonce.title}
                  fill
                  className="object-cover"
                />
                <Badge className="absolute top-2 left-2">{annonce.type}</Badge>
                <Badge variant="secondary" className="absolute top-2 right-2">
                  {annonce.available}
                </Badge>
              </div>

              <CardHeader>
                <CardTitle className="text-lg line-clamp-2">
                  {annonce.title}
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {annonce.city} - {annonce.district}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="flex flex-col flex-1 space-y-4">
                <CardDescription className="line-clamp-3">
                  {annonce.description}
                </CardDescription>

                {/* Prix */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Euro className="h-4 w-4 text-primary" />
                    <span className="text-2xl font-bold text-primary">
                      {annonce.price}€
                    </span>
                    <span className="text-sm text-muted-foreground">
                      /{annonce.type === "Weekend" ? "nuit" : "mois"}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Caution: {annonce.deposit}€
                  </div>
                </div>

                {/* Caractéristiques */}
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    <Square className="h-4 w-4 text-muted-foreground" />
                    <span>{annonce.area}m²</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bed className="h-4 w-4 text-muted-foreground" />
                    <span>{annonce.bedrooms} ch.</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="h-4 w-4 text-muted-foreground" />
                    <span>{annonce.bathrooms} sdb</span>
                  </div>
                </div>

                {/* Détails supplémentaires */}
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Étage:</span> {annonce.floor}
                  </div>
                  <div>
                    <span className="font-medium">Animaux:</span>{" "}
                    {annonce.pets ? "Acceptés" : "Non acceptés"}
                  </div>
                </div>

                {/* Extras */}
                {annonce.extras.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Extras :</h4>
                    <div className="flex flex-wrap gap-1">
                      {annonce.extras.map((extra, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {extra}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 mt-auto">
                  <Button className="flex-1">Contacter</Button>
                  <Button variant="outline">Détails</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-12 p-8 bg-muted/30 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">
            Vous avez un logement à proposer ?
          </h3>
          <p className="text-muted-foreground mb-6">
            Partagez votre appartement, proposez une colocation ou louez pour un
            weekend
          </p>
          <Button size="lg">Publier une annonce</Button>
        </div>
      </div>
    </div>
  );
}

function ImmobilierPageSkeleton() {
  return (
    <div className="min-h-screen p-4 animate-pulse">
      <div className="max-w-6xl mx-auto">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
            <div className="flex-1">
              <div className="h-10 bg-muted rounded-lg mb-4 w-48"></div>
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
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-6 bg-muted rounded-full w-20"></div>
            ))}
          </div>
        </div>

        {/* Listings grid skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="overflow-hidden">
              {/* Image skeleton */}
              <div className="h-48 bg-muted"></div>

              <CardHeader>
                <div className="h-6 bg-muted rounded mb-2 w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-4/5"></div>
                  <div className="h-4 bg-muted rounded w-3/5"></div>
                </div>

                {/* Price skeleton */}
                <div className="flex items-center justify-between">
                  <div className="h-8 bg-muted rounded w-24"></div>
                  <div className="h-4 bg-muted rounded w-20"></div>
                </div>

                {/* Features skeleton */}
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="h-4 bg-muted rounded w-12"></div>
                  ))}
                </div>

                {/* Details skeleton */}
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-2/3"></div>
                </div>

                {/* Extras skeleton */}
                <div>
                  <div className="h-4 bg-muted rounded mb-2 w-16"></div>
                  <div className="flex flex-wrap gap-1">
                    {[1, 2, 3].map((k) => (
                      <div
                        key={k}
                        className="h-5 bg-muted rounded-full w-16"
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Buttons skeleton */}
                <div className="flex gap-2">
                  <div className="h-10 bg-muted rounded flex-1"></div>
                  <div className="h-10 bg-muted rounded w-20"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA skeleton */}
        <div className="text-center mt-12 p-8 bg-muted/30 rounded-lg">
          <div className="h-8 bg-muted rounded mb-4 w-80 mx-auto"></div>
          <div className="h-4 bg-muted rounded mb-6 w-96 mx-auto"></div>
          <div className="h-12 bg-muted rounded w-48 mx-auto"></div>
        </div>
      </div>
    </div>
  );
}

export default function ImmobilierPage() {
  return (
    <Suspense fallback={<ImmobilierPageSkeleton />}>
      <ImmobilierPageContent />
    </Suspense>
  );
}
