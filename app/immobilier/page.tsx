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

export default async function ImmobilierPage() {
  const annonces = await getAllRealEstateListings();

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-4">Immobilier</h1>
              <p className="text-lg text-muted-foreground">
                Trouvez votre logement ou partagez le vôtre avec la communauté
              </p>
            </div>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Publier une annonce
            </Button>
          </div>

          {/* Barre de recherche et filtres */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par ville, quartier..."
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filtres
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
