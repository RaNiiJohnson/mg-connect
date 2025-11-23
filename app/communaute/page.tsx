import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Users } from "lucide-react";
import { Suspense } from "react";

// Données statiques pour les guides
const guides = [
  {
    id: "installation",
    title: "Guide d'installation en Allemagne",
    description:
      "Tout ce qu'il faut savoir pour s'installer : compte bancaire, assurance, logement",
    icon: FileText,
    summary:
      "Pour vous installer en Allemagne, voici les étapes clés : 1. S'enregistrer à la mairie (Anmeldung) dans les 8 jours suivant votre arrivée, puis 2. Ouvrir un compte bancaire allemand. Ensuite, souscrivez une assurance santé (obligatoire) et une assurance responsabilité civile. Les citoyens de l'UE n'ont pas besoin de visa, mais doivent justifier de moyens de subsistance suffisants.",
    sections: [
      {
        title: "Démarches administratives et assurances",
        content: [
          {
            subtitle: "Enregistrement du domicile (Anmeldung)",
            text: "Rendez-vous à la mairie (Bürgeramt ou Einwohnermeldeamt) de votre commune de résidence dans les 8 jours suivant votre emménagement. Apportez une pièce d'identité et votre bail de location. Ce formulaire vous donnera votre numéro d'identification fiscale (Steueridentifikations-Nr), indispensable pour travailler.",
          },
          {
            subtitle: "Assurances",
            text: "Assurance santé : obligatoire. Choisissez entre le système public ou privé. Assurance responsabilité civile (Haftpflichtversicherung) : fortement recommandée. Assurance auto : nécessaire si vous possédez un véhicule.",
          },
          {
            subtitle: "Compte bancaire",
            text: "Ouvrez un compte courant (Girokonto) dans une banque allemande pour gérer vos finances, payer votre loyer et recevoir votre salaire.",
          },
          {
            subtitle: "Services publics (eau, électricité, gaz)",
            text: "Pour l'eau, contactez le service municipal (Stadtwerke). Pour le gaz et l'électricité, vous pouvez choisir entre les services municipaux ou d'autres fournisseurs en comparant les prix en ligne (sur des sites comme Check 24).",
          },
        ],
      },
      {
        title: "Autres formalités",
        content: [
          {
            subtitle: "Attestation de droit au séjour",
            text: "Bien que non obligatoire pour les citoyens de l'UE, elle est recommandée pour faciliter les démarches administratives.",
          },
          {
            subtitle: "Enregistrement auprès du consulat français",
            text: "Conseillé pour faciliter le renouvellement de vos documents officiels français.",
          },
        ],
      },
      {
        title: "Points importants à considérer",
        content: [
          {
            subtitle: "Déclaration de religion",
            text: "Lors de l'enregistrement à la mairie, il vous sera demandé de déclarer votre religion, ce qui a un impact sur l'impôt sur le culte. Indiquez que vous êtes athée si c'est le cas pour ne pas le payer.",
          },
          {
            subtitle: "Réglementation du travail",
            text: "Pour les ressortissants non européens, il faut généralement un permis de travail et une preuve que le poste ne peut pas être occupé par un travailleur allemand ou de l'UE, bien que la loi ait été assouplie pour les métiers en pénurie depuis novembre 2023.",
          },
        ],
      },
    ],
  },
  {
    id: "sante",
    title: "Système de santé allemand",
    description: "Comment choisir son assurance santé et trouver un médecin",
    icon: FileText,
    summary:
      "Le système de santé allemand est un système d'assurance maladie obligatoire qui se compose de deux régimes principaux : public (Gesetzliche Krankenversicherung) et privé (Private Krankenversicherung). La majorité de la population est couverte par le régime public, financé par les cotisations des employés et des employeurs.",
    sections: [
      {
        title: "Fonctionnement",
        content: [
          {
            subtitle: "Assurance obligatoire",
            text: "Toute personne résidant en Allemagne doit être assurée, soit par le régime public, soit par le régime privé.",
          },
          {
            subtitle: "Régime public",
            text: "La plupart des salariés sont couverts par le régime public. Les cotisations sont partagées entre l'employeur et l'employé, et les membres de la famille sans revenu peuvent être assurés gratuitement.",
          },
          {
            subtitle: "Régime privé",
            text: "Les personnes ayant un revenu supérieur à un certain seuil, les fonctionnaires ou les travailleurs indépendants peuvent choisir le régime privé. Les cotisations dépendent du profil de risque de l'assuré.",
          },
          {
            subtitle: "Paiement des soins",
            text: "Dans le régime public, l'assurance paie généralement directement les frais médicaux auprès du prestataire, et l'assuré ne reçoit pas de facture. Dans le régime privé, les assurés doivent payer les frais à l'avance et sont ensuite remboursés.",
          },
          {
            subtitle: "Accès aux soins",
            text: "Les assurés ont droit aux soins médicaux de base, comme les consultations, les soins dentaires et les médicaments. Pour certains soins spécialisés ou hospitalisations, une autorisation préalable peut être nécessaire.",
          },
          {
            subtitle: "Carte de santé",
            text: "Les assurés du régime public utilisent une carte de santé (eGK) pour accéder aux soins et être remboursés rapidement.",
          },
        ],
      },
      {
        title: "Points clés à retenir",
        content: [
          {
            subtitle: "Double système",
            text: "Il existe un système à deux piliers, public et privé.",
          },
          {
            subtitle: "Financement",
            text: "Le régime public est financé par des cotisations partagées entre employeurs et employés.",
          },
          {
            subtitle: "Portée",
            text: "L'assurance couvre une large gamme de prestations, de la prévention aux soins hospitaliers.",
          },
          {
            subtitle: "Famille",
            text: "Les membres de la famille à charge sont souvent couverts gratuitement par l'assurance du travailleur principal.",
          },
          {
            subtitle: "Coût",
            text: "Le coût de l'assurance publique dépend du salaire, tandis que le coût de l'assurance privée dépend du profil de risque.",
          },
        ],
      },
    ],
  },
];

// Données statiques pour les groupes
const communityGroups = [
  { name: "Berlin", members: 45, category: "Ville" },
  { name: "Munich", members: 32, category: "Ville" },
  { name: "Hamburg", members: 18, category: "Ville" },
  { name: "Au Pair", members: 28, category: "Statut" },
  { name: "Étudiants", members: 35, category: "Statut" },
  { name: "Professionnels", members: 42, category: "Statut" },
  { name: "Cuisine Malagasy", members: 22, category: "Intérêt" },
  { name: "Sport & Fitness", members: 15, category: "Intérêt" },
];

import { HeroSection } from "@/components/hero-section";
import { CommunauteFilters } from "./_component/communaute-filters";

// ... existing imports ...

async function CommunautePageContent() {
  // const membres = await getAllCommunityMembers();

  return (
    <div className="min-h-screen bg-background pb-12">
      <HeroSection
        title="Communauté"
        subtitle="Connectez-vous avec d'autres Malagasy en Allemagne"
        backgroundImage="/images/community-bg.png"
      >
        <CommunauteFilters />
      </HeroSection>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Contenu principal avec onglets */}
        <Tabs defaultValue="membres" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="membres">Membres</TabsTrigger>
            <TabsTrigger value="groupes">Groupes</TabsTrigger>
            <TabsTrigger value="guides">Guides</TabsTrigger>
          </TabsList>

          {/* Onglet Membres */}
          <TabsContent value="membres" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {/* {membres.map((membre) => (
                <Card
                  key={membre.id}
                  className="hover:shadow-lg transition-shadow p-4"
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="w-12 h-12 shrink-0">
                      <AvatarImage
                        src={membre.photo || undefined}
                        alt={membre.name || "Member"}
                        className="object-cover"
                      />
                      <AvatarFallback className="text-sm">
                        {membre.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("") || "?"}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-sm truncate">
                            {membre.name || "Nom non disponible"}
                          </h3>
                          <p className="text-xs text-muted-foreground truncate">
                            {"Email non disponible"}
                          </p>
                        </div>
                        {!membre.photo && (
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <span className="text-xs font-medium text-primary">
                              {membre.name
                                ?.split(" ")
                                .map((n) => n[0])
                                .join("") || "?"}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="mt-2">
                        <Badge
                          variant="secondary"
                          className="text-xs px-2 py-1"
                        >
                          {membre.status || "Statut non défini"}
                        </Badge>
                      </div>

                      <div className="mt-2 space-y-1">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3 shrink-0" />
                          <span className="truncate">
                            {membre.city || "Ville non spécifiée"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Briefcase className="h-3 w-3 shrink-0" />
                          <span className="truncate">
                            {membre.field || "Domaine non spécifié"}
                          </span>
                        </div>
                      </div>

                      <Button
                        variant="link"
                        size="sm"
                        className="h-auto p-0 mt-2 text-xs text-blue-600 hover:text-blue-800"
                      >
                        Plus d&apos;options →
                      </Button>
                    </div>
                  </div>
                </Card>
              ))} */}
            </div>
          </TabsContent>

          {/* Onglet Groupes */}
          <TabsContent value="groupes" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {communityGroups.map((group, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Users className="h-8 w-8 text-primary" />
                        <div>
                          <CardTitle className="text-lg">
                            {group.name}
                          </CardTitle>
                          <Badge variant="outline" className="text-xs">
                            {group.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-muted-foreground">
                        {group.members} membres
                      </span>
                    </div>
                    <Button className="w-full" size="sm">
                      Rejoindre le groupe
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          {/* Onglet Guides */}
          <TabsContent value="guides" className="space-y-6">
            <div className="space-y-8">
              {guides.map((guide) => {
                const IconComponent = guide.icon;
                return (
                  <Card key={guide.id} className="overflow-hidden">
                    <CardHeader className="bg-muted/50">
                      <div className="flex items-start gap-4">
                        <IconComponent className="h-10 w-10 text-primary mt-1" />
                        <div className="flex-1">
                          <CardTitle className="text-2xl mb-2">
                            {guide.title}
                          </CardTitle>
                          <CardDescription className="text-base leading-relaxed">
                            {guide.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      {/* Résumé */}
                      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border-l-4 border-blue-500">
                        <p className="text-sm leading-relaxed text-blue-900 dark:text-blue-100">
                          {guide.summary}
                        </p>
                      </div>

                      {/* Sections */}
                      <div className="space-y-6">
                        {guide.sections.map((section, sectionIndex) => (
                          <div key={sectionIndex}>
                            <h3 className="text-xl font-semibold mb-4 text-primary">
                              {section.title}
                            </h3>
                            <div className="space-y-4">
                              {section.content.map((item, itemIndex) => (
                                <div
                                  key={itemIndex}
                                  className="border-l-2 border-muted pl-4"
                                >
                                  <h4 className="font-medium mb-2 text-foreground">
                                    {item.subtitle}
                                  </h4>
                                  <p className="text-sm text-muted-foreground leading-relaxed">
                                    {item.text}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
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
