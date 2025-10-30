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

// Sample data for members
const membres = [
  {
    id: 1,
    name: "Ravo Andriamampianina",
    photo:
      "https://images.unsplash.com/photo-1729824186684-eaff43f7d1d9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074",
    bio: "Développeur web passionné, j'aide les nouveaux arrivants à s'intégrer dans le secteur tech allemand.",
    city: "Berlin",
    arrivalDate: "2020",
    status: "Fachkraft",
    field: "Informatique",
    company: "Tech Solutions GmbH",
    journey: ["Goethe Institut", "Startup Incubator", "Tech Solutions GmbH"],
  },
  {
    id: 2,
    name: "Hery Rakotomalala",
    photo:
      "https://images.unsplash.com/photo-1749003659356-1d1a4451a49d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=627",
    bio: "Infirmier en formation, je partage mon expérience de l'Ausbildung dans le secteur médical.",
    city: "Munich",
    arrivalDate: "2022",
    status: "Ausbildung",
    field: "Santé",
    company: "Klinikum München",
    journey: ["Sprachschule München", "Klinikum München"],
  },
  {
    id: 3,
    name: "Naina Razafy",
    photo:
      "https://images.unsplash.com/photo-1662195725820-6dae903b8457?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=780",
    bio: "Au pair depuis 2 ans, je prépare maintenant mes études en Allemagne.",
    city: "Hamburg",
    arrivalDate: "2023",
    status: "Au pair",
    field: "Éducation",
    company: "Familie Schmidt",
    journey: ["Agentur Hamburg", "Familie Schmidt"],
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
                  <AvatarImage
                    src={membre.photo}
                    alt={membre.name}
                    className="object-cover"
                  />
                  <AvatarFallback>
                    {membre.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{membre.name}</CardTitle>
                <Badge variant="secondary">{membre.status}</Badge>
              </CardHeader>

              <CardContent className="flex flex-col flex-1 space-y-4">
                <CardDescription className="text-center">
                  {membre.bio}
                </CardDescription>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{membre.city}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Arrivé en {membre.arrivalDate}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {membre.field} - {membre.company}
                    </span>
                  </div>
                </div>

                {/* Journey */}
                <div>
                  <h4 className="font-semibold text-sm mb-2">Parcours :</h4>
                  <div className="flex flex-wrap gap-1">
                    {membre.journey.map((etape, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {etape}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-auto">
                  <Button variant="outline" className="w-full">
                    Voir le profil
                  </Button>
                </div>
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
