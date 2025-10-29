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
import { MapPin, Briefcase, Calendar, Search, Filter } from "lucide-react";

// Données d'exemple pour les membres
const membres = [
  {
    id: 1,
    nom: "Ravo Andriamampianina",
    photo: "/api/placeholder/150/150",
    bio: "Développeur web passionné, j'aide les nouveaux arrivants à s'intégrer dans le secteur tech allemand.",
    ville: "Berlin",
    dateArrivee: "2020",
    statut: "Fachkraft",
    domaine: "Informatique",
    entreprise: "Tech Solutions GmbH",
    parcours: ["Goethe Institut", "Startup Incubator", "Tech Solutions GmbH"],
  },
  {
    id: 2,
    nom: "Hery Rakotomalala",
    photo: "/api/placeholder/150/150",
    bio: "Infirmier en formation, je partage mon expérience de l'Ausbildung dans le secteur médical.",
    ville: "Munich",
    dateArrivee: "2022",
    statut: "Ausbildung",
    domaine: "Santé",
    entreprise: "Klinikum München",
    parcours: ["Sprachschule München", "Klinikum München"],
  },
  {
    id: 3,
    nom: "Naina Razafy",
    photo: "/api/placeholder/150/150",
    bio: "Au pair depuis 2 ans, je prépare maintenant mes études en Allemagne.",
    ville: "Hamburg",
    dateArrivee: "2023",
    statut: "Au pair",
    domaine: "Éducation",
    entreprise: "Familie Schmidt",
    parcours: ["Agentur Hamburg", "Familie Schmidt"],
  },
];

export default function CommunautePage() {
  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Notre Communauté</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Découvrez les membres de notre communauté Malagasy en Allemagne
          </p>

          {/* Barre de recherche et filtres */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom, ville, domaine..."
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
                  <AvatarImage src={membre.photo} alt={membre.nom} />
                  <AvatarFallback>
                    {membre.nom
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{membre.nom}</CardTitle>
                <Badge variant="secondary">{membre.statut}</Badge>
              </CardHeader>

              <CardContent className="space-y-4">
                <CardDescription className="text-center">
                  {membre.bio}
                </CardDescription>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{membre.ville}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Arrivé en {membre.dateArrivee}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {membre.domaine} - {membre.entreprise}
                    </span>
                  </div>
                </div>

                {/* Parcours */}
                <div>
                  <h4 className="font-semibold text-sm mb-2">Parcours :</h4>
                  <div className="flex flex-wrap gap-1">
                    {membre.parcours.map((etape, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {etape}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  Voir le profil
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-12 p-8 bg-muted/30 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">
            Rejoignez notre communauté !
          </h3>
          <p className="text-muted-foreground mb-6">
            Créez votre profil et connectez-vous avec d&apos;autres Malagasy en
            Allemagne
          </p>
          <Button size="lg">Créer mon profil</Button>
        </div>
      </div>
    </div>
  );
}
