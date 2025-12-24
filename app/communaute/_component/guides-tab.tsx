"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText } from "lucide-react";

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

export function GuidesTab() {
  return (
    <div className="space-y-8">
      {guides.map((guide) => {
        const Icon = guide.icon;
        return (
          <div key={guide.id} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{guide.title}</h3>
                <p className="text-muted-foreground">{guide.description}</p>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Résumé</CardTitle>
                <CardDescription>{guide.summary}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {guide.sections.map((section, idx) => (
                  <div key={idx} className="space-y-4">
                    <h4 className="font-semibold text-lg border-b pb-2">
                      {section.title}
                    </h4>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {section.content.map((item, itemIdx) => (
                        <div key={itemIdx} className="space-y-1">
                          <h5 className="font-medium text-foreground">
                            {item.subtitle}
                          </h5>
                          <p className="text-sm text-muted-foreground">
                            {item.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
