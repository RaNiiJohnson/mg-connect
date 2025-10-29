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
  Clock,
  Building,
  Calendar,
  Search,
  Filter,
  Plus,
} from "lucide-react";

// Données d'exemple pour les offres d'emploi
const offres = [
  {
    id: 1,
    titre: "Au Pair - Famille accueillante à Berlin",
    type: "Au pair",
    typeContrat: "12 mois",
    ville: "Berlin",
    duree: "Temps plein",
    debut: "Mars 2025",
    entreprise: "Familie Müller",
    description:
      "Famille avec 2 enfants (5 et 8 ans) cherche au pair motivé(e). Expérience avec enfants requise.",
    certificats: ["Allemand A2", "Permis de conduire"],
    salaire: "280€/mois + logement",
    contact: "familie.muller@email.de",
  },
  {
    id: 2,
    titre: "Ausbildung - Développeur d'applications",
    type: "Ausbildung",
    typeContrat: "3 ans",
    ville: "Munich",
    duree: "Temps plein",
    debut: "Septembre 2025",
    entreprise: "TechStart GmbH",
    description:
      "Formation complète en développement d'applications. Accompagnement personnalisé pour les candidats internationaux.",
    certificats: ["Allemand B1", "Baccalauréat"],
    salaire: "650-950€/mois",
    contact: "hr@techstart.de",
  },
  {
    id: 3,
    titre: "FSJ - Service civique en hôpital",
    type: "FSJ",
    typeContrat: "12 mois",
    ville: "Hamburg",
    duree: "Temps plein",
    debut: "Août 2025",
    entreprise: "Universitätsklinikum Hamburg",
    description:
      "Opportunité d'acquérir de l'expérience dans le secteur médical tout en perfectionnant l'allemand.",
    certificats: ["Allemand A2", "Certificat médical"],
    salaire: "423€/mois",
    contact: "fsj@uke.de",
  },
];

export default function EmploisPage() {
  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-4">Offres d&apos;Emploi</h1>
              <p className="text-lg text-muted-foreground">
                Découvrez les opportunités d&apos;emploi et de formation en
                Allemagne
              </p>
            </div>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Publier une offre
            </Button>
          </div>

          {/* Barre de recherche et filtres */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par titre, ville, entreprise..."
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
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
            >
              Travail
            </Badge>
          </div>
        </div>

        {/* Liste des offres */}
        <div className="space-y-6">
          {offres.map((offre) => (
            <Card key={offre.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-xl">{offre.titre}</CardTitle>
                      <Badge variant="secondary">{offre.type}</Badge>
                    </div>
                    <CardDescription className="text-base mb-4">
                      {offre.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span>{offre.entreprise}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{offre.ville}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{offre.duree}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Début: {offre.debut}</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* Détails du poste */}
                  <div>
                    <h4 className="font-semibold mb-2">Détails du poste :</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Type de contrat: {offre.typeContrat}</li>
                      <li>• Rémunération: {offre.salaire}</li>
                      <li>• Contact: {offre.contact}</li>
                    </ul>
                  </div>

                  {/* Certificats requis */}
                  <div>
                    <h4 className="font-semibold mb-2">Certificats requis :</h4>
                    <div className="flex flex-wrap gap-1">
                      {offre.certificats.map((cert, index) => (
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
                </div>

                <div className="flex gap-2">
                  <Button>Postuler</Button>
                  <Button variant="outline">Plus d&apos;infos</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-12 p-8 bg-muted/30 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">Vous recrutez ?</h3>
          <p className="text-muted-foreground mb-6">
            Publiez vos offres d&apos;emploi et trouvez les meilleurs talents de
            la communauté Malagasy
          </p>
          <Button size="lg">Publier une offre</Button>
        </div>
      </div>
    </div>
  );
}
