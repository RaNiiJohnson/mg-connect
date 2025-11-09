import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting job offers seeding...");

  // Récupérer les utilisateurs existants
  const users = await prisma.user.findMany();

  if (users.length === 0) {
    console.log(
      "❌ Aucun utilisateur trouvé. Veuillez d'abord exécuter le seed principal."
    );
    return;
  }

  console.log(`✅ Found ${users.length} existing users`);

  // Types et contrats prédéfinis
  const jobTypes = [
    "Au pair",
    "Formation",
    "Volontariat",
    "Stage",
    "Mini-job",
    "Emploi",
    "Freelance",
    "Bourse d'étude",
  ];

  const contractTypes = [
    "CDI",
    "CDD",
    "FSJ/FOJ/BFD",
    "Temps plein",
    "Temps partiel",
    "Freelance",
    "Apprentissage",
  ];

  const cities = [
    "Berlin",
    "Munich",
    "Hamburg",
    "Cologne",
    "Frankfurt",
    "Stuttgart",
    "Düsseldorf",
    "Dortmund",
    "Essen",
    "Leipzig",
    "Bremen",
    "Dresden",
    "Hannover",
    "Nuremberg",
    "Duisburg",
  ];

  // Données d'exemple pour chaque type d'emploi
  const jobTemplates = {
    "Au pair": [
      {
        title: "Au Pair - Famille avec 3 enfants",
        company: "Familie Weber",
        description:
          "Famille chaleureuse cherche au pair pour s'occuper de 3 enfants (4, 7 et 10 ans). Expérience avec enfants souhaitée.",
        certificates: ["Allemand A2", "Premiers secours"],
        salary: "280€/mois + logement + nourriture",
        duration: "12 mois",
        startDate: "Septembre 2025",
      },
      {
        title: "Au Pair - Famille bilingue Berlin",
        company: "Familie Schmidt",
        description:
          "Famille franco-allemande recherche au pair francophone pour 2 enfants (3 et 6 ans). Environnement multiculturel.",
        certificates: ["Allemand A2", "Expérience enfants"],
        salary: "300€/mois + logement",
        duration: "12 mois",
        startDate: "Juin 2025",
      },
    ],
    Formation: [
      {
        title: "Formation - Développeur Web Full Stack",
        company: "Digital Academy Berlin",
        description:
          "Formation intensive de 6 mois en développement web. JavaScript, React, Node.js, bases de données. Accompagnement personnalisé.",
        certificates: ["Allemand B1", "Baccalauréat"],
        salary: "Financement possible",
        duration: "6 mois",
        startDate: "Avril 2025",
      },
      {
        title: "Formation - Marketing Digital",
        company: "Marketing Institute Munich",
        description:
          "Formation complète en marketing digital : SEO, réseaux sociaux, analytics. Stage en entreprise inclus.",
        certificates: ["Allemand B2", "Baccalauréat"],
        salary: "1200€ (financement)",
        duration: "8 mois",
        startDate: "Septembre 2025",
      },
    ],
    Volontariat: [
      {
        title: "Volontariat - Aide aux réfugiés",
        company: "Caritas Hamburg",
        description:
          "Accompagnement des réfugiés dans leurs démarches administratives et apprentissage de l'allemand.",
        certificates: ["Allemand B1", "Casier judiciaire"],
        salary: "450€/mois + logement",
        duration: "12 mois",
        startDate: "Août 2025",
      },
      {
        title: "Volontariat écologique - Protection de l'environnement",
        company: "NABU Deutschland",
        description:
          "Participation à des projets de protection de la nature et sensibilisation environnementale.",
        certificates: ["Allemand A2", "Motivation écologique"],
        salary: "423€/mois",
        duration: "12 mois",
        startDate: "Mars 2025",
      },
    ],
    Stage: [
      {
        title: "Stage - Développement logiciel",
        company: "SAP SE",
        description:
          "Stage de 6 mois dans l'équipe de développement. Travail sur des projets innovants avec mentoring.",
        certificates: ["Allemand B2", "Études informatique"],
        salary: "1200€/mois",
        duration: "6 mois",
        startDate: "Juillet 2025",
      },
      {
        title: "Stage - Marketing International",
        company: "BMW Group",
        description:
          "Stage dans l'équipe marketing international. Gestion de campagnes et analyse de marché.",
        certificates: ["Allemand C1", "Études marketing"],
        salary: "1000€/mois",
        duration: "6 mois",
        startDate: "Septembre 2025",
      },
    ],
    "Mini-job": [
      {
        title: "Mini-job - Serveur/Serveuse",
        company: "Restaurant Zur Linde",
        description:
          "Service en salle dans restaurant traditionnel allemand. Horaires flexibles, ambiance conviviale.",
        certificates: ["Allemand A2", "Expérience service"],
        salary: "520€/mois",
        duration: "Indéterminée",
        startDate: "Immédiatement",
      },
      {
        title: "Mini-job - Assistant administratif",
        company: "Büro Service GmbH",
        description:
          "Saisie de données, classement, accueil téléphonique. Parfait pour étudiants.",
        certificates: ["Allemand B1", "Bureautique"],
        salary: "520€/mois",
        duration: "Flexible",
        startDate: "Mars 2025",
      },
    ],
    Emploi: [
      {
        title: "Ingénieur Logiciel Senior",
        company: "Siemens AG",
        description:
          "Développement de solutions IoT industrielles. Équipe internationale, projets innovants.",
        certificates: [
          "Allemand C1",
          "Master Informatique",
          "5 ans expérience",
        ],
        salary: "65000-75000€/an",
        duration: "Indéterminée",
        startDate: "Mai 2025",
      },
      {
        title: "Chef de Projet Marketing",
        company: "Adidas AG",
        description:
          "Gestion de projets marketing pour les marchés européens. Leadership d'équipe multiculturelle.",
        certificates: ["Allemand C1", "Master Marketing", "3 ans expérience"],
        salary: "55000-65000€/an",
        duration: "Indéterminée",
        startDate: "Juin 2025",
      },
    ],
    Freelance: [
      {
        title: "Freelance - Traducteur FR/DE",
        company: "Agence de traduction Berlin",
        description:
          "Traduction de documents techniques et commerciaux. Missions ponctuelles ou régulières.",
        certificates: ["Allemand C2", "Français natif", "Formation traduction"],
        salary: "25-35€/heure",
        duration: "Missions ponctuelles",
        startDate: "Immédiatement",
      },
      {
        title: "Freelance - Développeur React",
        company: "Startup Tech Munich",
        description:
          "Développement d'applications web modernes. Projets variés, équipe agile.",
        certificates: ["Allemand B2", "Portfolio React", "3 ans expérience"],
        salary: "50-70€/heure",
        duration: "Projets 3-6 mois",
        startDate: "Avril 2025",
      },
    ],
    "Bourse d'étude": [
      {
        title: "Bourse DAAD - Master en Informatique",
        company: "DAAD Deutschland",
        description:
          "Bourse complète pour Master en informatique dans universités allemandes. Frais de scolarité + allocation mensuelle.",
        certificates: [
          "Allemand B2",
          "Licence informatique",
          "Excellent dossier",
        ],
        salary: "934€/mois + frais",
        duration: "24 mois",
        startDate: "Octobre 2025",
      },
      {
        title: "Bourse Erasmus+ - Échange universitaire",
        company: "Commission Européenne",
        description:
          "Programme d'échange pour étudiants européens. Semestre ou année complète en Allemagne.",
        certificates: [
          "Allemand B1",
          "Inscription université",
          "Dossier académique",
        ],
        salary: "300-500€/mois",
        duration: "6-12 mois",
        startDate: "Septembre 2025",
      },
    ],
  };

  // Type pour les offres d'emploi
  type JobOfferData = {
    title: string;
    type: string;
    contractType: string;
    city: string;
    duration: string;
    startDate: string;
    company: string;
    description: string;
    certificates: string[];
    salary: string;
    contact: string;
    authorId: string;
  };

  const jobOffers: JobOfferData[] = [];

  // Créer plusieurs offres pour chaque type et contrat
  for (const jobType of jobTypes) {
    const templates = jobTemplates[jobType as keyof typeof jobTemplates] || [];

    for (const contractType of contractTypes) {
      // Créer 2-3 offres par combinaison type/contrat
      const numOffers = Math.floor(Math.random() * 2) + 2; // 2 ou 3 offres

      for (let i = 0; i < numOffers; i++) {
        const template = templates[
          Math.floor(Math.random() * templates.length)
        ] || {
          title: `${jobType} - Opportunité ${i + 1}`,
          company: `Entreprise ${Math.floor(Math.random() * 100)}`,
          description: `Excellente opportunité de ${jobType.toLowerCase()} dans une entreprise dynamique.`,
          certificates: ["Allemand B1"],
          salary: "À négocier",
          duration: "À définir",
          startDate: "2025",
        };

        const randomUser = users[Math.floor(Math.random() * users.length)];
        const randomCity = cities[Math.floor(Math.random() * cities.length)];

        jobOffers.push({
          title: template.title,
          type: jobType,
          contractType: contractType,
          city: randomCity,
          duration: template.duration,
          startDate: template.startDate,
          company: template.company,
          description: template.description,
          certificates: template.certificates,
          salary: template.salary,
          contact: `contact@${template.company.toLowerCase().replace(/\s+/g, "")}.de`,
          authorId: randomUser.id,
        });
      }
    }
  }

  // Créer les offres d'emploi en batch
  console.log(`📝 Creating ${jobOffers.length} job offers...`);

  const createdOffers = await prisma.jobOffer.createMany({
    data: jobOffers,
  });

  console.log(`✅ Created ${createdOffers.count} job offers`);

  // Statistiques par type
  const stats = jobTypes.reduce(
    (acc, type) => {
      acc[type] = jobOffers.filter((job) => job.type === type).length;
      return acc;
    },
    {} as Record<string, number>
  );

  console.log("\n📊 Répartition par type d'emploi:");
  Object.entries(stats).forEach(([type, count]) => {
    console.log(`  - ${type}: ${count} offres`);
  });

  console.log("\n🎉 Job offers seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error during job seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
