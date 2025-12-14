import "dotenv/config"; // Prisma 7 requires explicit env loading
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

// Villes allemandes principales
const GERMAN_CITIES = [
  "Berlin",
  "München",
  "Hamburg",
  "Frankfurt",
  "Köln",
  "Stuttgart",
  "Düsseldorf",
  "Dortmund",
  "Leipzig",
  "Hannover",
];

// Types d'emplois (correspondant aux filtres)
const JOB_TYPES = [
  "Au pair",
  "Formation",
  "Volontariat",
  "Stage",
  "Mini-job",
  "Emploi",
  "Bourse d'étude",
];

// Types de contrat (correspondant aux filtres)
const CONTRACT_TYPES = [
  "CDI",
  "CDD",
  "FSJ/FOJ/BFD",
  "Temps plein",
  "Temps partiel",
  "Freelance",
  "Apprentissage",
];

// Types de logement (correspondant aux filtres)
const REAL_ESTATE_TYPES = [
  "Appartement",
  "Maison",
  "Studio",
  "Colocation",
  "Chambre",
];

async function main() {
  console.log("🌱 Début du seed de la base de données...\n");
  console.log("🇩🇪 Contexte: Réseau Malagasy en Allemagne\n");

  // Nettoyage de la base de données
  console.log("🧹 Nettoyage de la base de données...");
  await prisma.jobBookmark.deleteMany();
  await prisma.realEstateBookmark.deleteMany();
  await prisma.contactInfo.deleteMany();
  await prisma.realEstateListing.deleteMany();
  await prisma.jobOffer.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
  console.log("✅ Base de données nettoyée\n");

  // Création des utilisateurs
  console.log("👤 Création des utilisateurs...");
  const users = [];

  const userNames = [
    {
      name: "Rakoto Jean",
      email: "rakoto.jean@example.de",
      city: "Berlin",
      company: "TechBerlin GmbH",
      field: "Informatique",
    },
    {
      name: "Rasolofonirina Marie",
      email: "marie.raso@example.de",
      city: "München",
      company: "Bavarian Hotels",
      field: "Tourisme",
    },
    {
      name: "Andriantsoa Paul",
      email: "paul.andria@example.de",
      city: "Hamburg",
      company: "Hamburg University",
      field: "Éducation",
    },
    {
      name: "Randrianasolo Sophie",
      email: "sophie.rand@example.de",
      city: "Frankfurt",
      company: "Deutsche Bank",
      field: "Finance",
    },
    {
      name: "Rabemananjara Luc",
      email: "luc.rabe@example.de",
      city: "Köln",
      company: "Kölner Universität",
      field: "Recherche",
    },
  ];

  for (const userData of userNames) {
    // Créer le compte avec better-auth pour hacher le mot de passe
    const account = await auth.api.signUpEmail({
      body: {
        email: userData.email,
        password: "Password123!",
        name: userData.name,
      },
    });

    if (account && account.user) {
      // Mettre à jour l'utilisateur avec des informations supplémentaires
      const user = await prisma.user.update({
        where: { id: account.user.id },
        data: {
          city: userData.city,
          company: userData.company,
          field: userData.field,
          bio: `Membre de la diaspora Malagasy en ${userData.city}, travaillant dans le domaine de ${userData.field}.`,
          arrivalDate: new Date(2020, Math.floor(Math.random() * 4), 1)
            .toISOString()
            .split("T")[0],
          status: "Actif",
          emailVerified: true,
        },
      });

      users.push(user);
      console.log(`  ✓ Utilisateur créé: ${user.name} (${user.email})`);
    }
  }

  console.log(`✅ ${users.length} utilisateurs créés\n`);

  // Création des offres d'emploi
  console.log("💼 Création des offres d'emploi...");

  const jobOffers = [
    {
      title: "Au Pair pour famille berlinoise",
      type: "Au pair",
      contractType: "Temps plein",
      city: "Berlin",
      duration: "12 mois",
      startDate: "2025-03-01",
      company: "Famille Schmidt",
      description: `Famille allemande chaleureuse recherche au pair dynamique pour s'occuper de 2 enfants (5 et 8 ans).

Vos missions:
• Garde d'enfants (emmener à l'école, activités)
• Aide aux devoirs
• Jeux et activités éducatives
• Préparation de repas simples

Nous offrons:
• Chambre privée dans notre maison
• 280€ d'argent de poche par semaine
• Cours d'allemand pris en charge
• Ticket de transport mensuel
• Weekends libres

Profil recherché:
• Expérience avec les enfants
• Niveau d'allemand A2 minimum
• Non-fumeur
• Permis de séjour valide

Environnement familial et convivial à Charlottenburg.`,
      certificates: ["Premiers secours", "Allemand A2"],
      salary: "280€/semaine",
      contact: "famille.schmidt@email.de",
    },
    {
      title: "Stage en Marketing Digital",
      type: "Stage",
      contractType: "Temps plein",
      city: "München",
      duration: "6 mois",
      startDate: "2025-02-15",
      company: "Digital Bavaria GmbH",
      description: `Start-up innovante recherche stagiaire motivé(e) en marketing digital.

Missions principales:
• Gestion des réseaux sociaux
• Création de contenus (articles, posts)
• Analyse de performances
• Support campagnes publicitaires
• Veille concurrentielle

Compétences requises:
• Études en marketing/communication
• Maîtrise des réseaux sociaux
• Bon niveau d'allemand (B2) et anglais
• Créativité et autonomie
• Outils: Canva, Google Analytics

Ce que nous offrons:
• Rémunération: 800€/mois
• Environnement start-up dynamique
• Formation aux outils marketing
• Possibilité d'embauche après le stage
• Bureau moderne au centre de Munich`,
      certificates: ["Bac+3 en Marketing", "Allemand B2"],
      salary: "800€/mois",
      contact: "jobs@digitalbavaria.de",
    },
    {
      title: "Volontariat FSJ dans centre social",
      type: "Volontariat",
      contractType: "FSJ/FOJ/BFD",
      city: "Hamburg",
      duration: "12 mois",
      startDate: "2025-09-01",
      company: "Sozialwerk Hamburg e.V.",
      description: `Centre social recherche volontaire pour service civique (FSJ).

Vos activités:
• Accompagnement de personnes âgées
• Organisation d'activités culturelles
• Aide administrative
• Participation aux événements
• Travail d'équipe multiculturel

Conditions:
• 18-27 ans
• Motivation pour le social
• Ouverture d'esprit
• Allemand B1 minimum

Nous proposons:
• 420€ d'indemnité mensuelle
• Logement possible (150€/mois)
• Assurance santé
• 26 jours de congés
• Séminaires de formation
• Attestation reconnue

Expérience enrichissante et sociale garantie!`,
      certificates: ["Allemand B1"],
      salary: "420€/mois",
      contact: "freiwillige@sozialwerk-hh.de",
    },
    {
      title: "Mini-job Serveur/Serveuse Restaurant",
      type: "Mini-job",
      contractType: "Temps partiel",
      city: "Frankfurt",
      duration: "Indéterminée",
      startDate: "2025-01-15",
      company: "Le Bistro Français",
      description: `Restaurant français cherche serveur/serveuse pour mini-job.

Vos tâches:
• Service en salle
• Accueil des clients
• Prise de commandes
• Encaissement

Horaires:
• Vendredis et samedis soirs
• 18h-23h
• 10-15h par semaine

Profil:
• Expérience en restauration appréciée
• Allemand courant (français = +)
• Souriant et professionnel
• Disponible weekends

Rémunération:
• 15€/heure
• Max 538€/mois (mini-job)
• Pourboires
• Repas fournis

Ambiance conviviale dans le centre de Frankfurt!`,
      certificates: [],
      salary: "15€/heure",
      contact: "contact@lebistro-ffm.de",
    },
    {
      title: "Développeur Full Stack",
      type: "Emploi",
      contractType: "CDI",
      city: "Berlin",
      duration: "Indéterminée",
      startDate: "2025-02-01",
      company: "TechBerlin Solutions GmbH",
      description: `Scale-up tech recherche développeur Full Stack talentueux.

Stack technique:
• Frontend: React, TypeScript, Next.js
• Backend: Node.js, Python
• Base de données: PostgreSQL, MongoDB
• Cloud: AWS, Docker
• Git, CI/CD

Responsabilités:
• Développement de nouvelles features
• Architecture système
• Code reviews
• Collaboration avec l'équipe produit
• Mentorat des juniors

Profil:
• 3+ ans d'expérience
• Maîtrise JavaScript/TypeScript
• Expérience avec APIs REST
• Allemand ou anglais courant
• Passion pour la tech

Package:
• 50 000-70 000€/an
• Télétravail flexible (3j/semaine)
• Budget formation
• Tickets resto et transport
• Team events réguliers
• Équipement fourni`,
      certificates: ["Licence Informatique", "Allemand B2 ou Anglais C1"],
      salary: "60000€/an",
      contact: "talent@techberlin.de",
    },
    {
      title: "Bourse d'études Doctorat Sciences",
      type: "Bourse d'étude",
      contractType: "CDD",
      city: "Leipzig",
      duration: "3 ans",
      startDate: "2025-10-01",
      company: "Université de Leipzig",
      description: `Bourse doctorale en sciences environnementales disponible.

Projet de recherche:
• Changement climatique et biodiversité
• Collaboration internationale
• Publications scientifiques
• Enseignement (6h/semaine)

Exigences:
• Master en sciences (mention bien)
• Motivation pour la recherche
• Anglais scientifique C1
• Allemand B1 (souhaité)

Financement complet:
• 1 500€/mois (TV-L E13/2)
• Assurance santé
• Budget recherche: 5 000€/an
• Conférences internationales
• Bureau équipé

Opportunité unique dans laboratoire de renommée!
Encadrement de qualité assuré.`,
      certificates: ["Master en Sciences", "Anglais C1"],
      salary: "1500€/mois",
      contact: "phd-applications@uni-leipzig.de",
    },
    {
      title: "Formation Aide-soignant(e) en Alternance",
      type: "Formation",
      contractType: "Apprentissage",
      city: "Stuttgart",
      duration: "3 ans",
      startDate: "2025-08-01",
      company: "Klinikum Stuttgart",
      description: `Grand hôpital recrute pour formation d'aide-soignant en alternance.

Programme:
• Formation théorique (école)
• Formation pratique (hôpital)
• Diplôme d'État reconnu
• Accompagnement personnalisé

Conditions:
• Niveau Bac ou équivalent
• Allemand B2 minimum
• Motivation pour le secteur santé
• Visite médicale d'aptitude

Avantages:
• Formation entièrement payée
• Salaire pendant la formation:
  - 1ère année: 1 190€/mois
  - 2ème année: 1 250€/mois
  - 3ème année: 1 350€/mois
• Repas à tarif préférentiel
• Transport pris en charge
• Forte probabilité d'embauche

Métier d'avenir avec débouchés garantis!`,
      certificates: ["Baccalauréat", "Allemand B2"],
      salary: "1190-1350€/mois",
      contact: "ausbildung@klinikum-stuttgart.de",
    },
    {
      title: "Assistant(e) Commercial(e) Freelance",
      type: "Emploi",
      contractType: "Freelance",
      city: "Düsseldorf",
      duration: "Mission 6 mois",
      startDate: "2025-01-20",
      company: "Import-Export Europe",
      description: `Société d'import-export recherche assistant commercial freelance.

Missions:
• Prospection commerciale
• Gestion relation clients
• Suivi des commandes
• Facturation et administration
• Reporting hebdomadaire

Profil recherché:
• Expérience commerce B2B
• Maîtrise Excel et CRM
• Allemand et anglais courants
• Français = atout majeur
• Autonomie et rigueur

Conditions:
• Statut freelance (Gewerbe)
• Télétravail possible
• 2-3 jours/semaine au bureau
• Durée: 6 mois renouvelable

Rémunération:
• À négocier selon profil
• 35-45€/heure
• Flexibilité horaire
• Possibilité CDI après mission

Contact pour plus d'infos!`,
      certificates: ["Expérience commerce"],
      salary: "À négocier",
      contact: "kontakt@import-export-eu.de",
    },
  ];

  const createdJobs = [];
  for (let i = 0; i < jobOffers.length; i++) {
    const job = await prisma.jobOffer.create({
      data: {
        ...jobOffers[i],
        authorId: users[i % users.length].id,
      },
    });
    createdJobs.push(job);
    console.log(`  ✓ Offre créée: ${job.title} (${job.type} - ${job.city})`);
  }

  console.log(`✅ ${createdJobs.length} offres d'emploi créées\n`);

  // Création de quelques bookmarks
  console.log("⭐ Création de bookmarks...");
  await prisma.jobBookmark.create({
    data: {
      userId: users[0].id,
      jobId: createdJobs[0].id,
    },
  });
  await prisma.jobBookmark.create({
    data: {
      userId: users[0].id,
      jobId: createdJobs[4].id,
    },
  });
  console.log(`✅ 2 bookmarks créés\n`);

  // Création des annonces immobilières
  console.log("🏠 Création des annonces immobilières...");

  const realEstateListings = [
    {
      title: "Studio meublé Kreuzberg - Berlin",
      type: "Studio",
      city: "Berlin",
      district: "Kreuzberg",
      price: "650€/mois",
      priceNumeric: 650,
      deposit: "1300€",
      area: 28,
      bedrooms: 1,
      bathrooms: 1,
      floor: 3,
      pets: false,
      photos: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&h=600&fit=crop",
      ],
      coverPhoto:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
      description: `Joli studio meublé dans le quartier animé de Kreuzberg.

Équipement:
• Entièrement meublé
• Cuisine équipée avec électroménager
• Salle de bain moderne
• Internet haut débit inclus
• Machine à laver commune

Localisation:
• À 5 min du U-Bahn Görlitzer Bahnhof
• Commerces et cafés à proximité
• Quartier multiculturel et vivant
• Nombreux parcs

Charges:
• 50€/mois (eau, chauffage, Internet)

Idéal pour étudiant ou jeune professionnel.
Disponible immédiatement!`,
      extras: ["Meublé", "Internet", "Machine à laver", "Transport proche"],
      available: new Date("2025-01-15"),
      ContactInfo: {
        create: {
          phone: "+49 30 1234 5678",
          email: "studio.kreuzberg@immobilien.de",
        },
      },
    },
    {
      title: "Chambre en Colocation - München Schwabing",
      type: "Colocation",
      city: "München",
      district: "Schwabing",
      price: "550€/mois",
      priceNumeric: 550,
      deposit: "1100€",
      area: 18,
      bedrooms: 1,
      bathrooms: 2,
      floor: 2,
      pets: false,
      photos: [
        "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=800&h=600&fit=crop",
      ],
      coverPhoto:
        "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&h=600&fit=crop",
      description: `Belle chambre spacieuse dans colocation sympathique (3 colocataires).

La chambre:
• 18m² avec grand lit
• Bureau et armoire
• Fenêtre donnant sur cour calme

Appartement:
• 90m² au total
• Cuisine équipée commune
• 2 salles de bain
• Salon avec balcon
• Cave privée

Colocataires:
• Marie (26 ans) - infirmière
• Paul (28 ans) - ingénieur
• Toi! :)

Localisation:
• Quartier résidentiel et calme
• U-Bahn à 7 min à pied
• Université proche
• Supermarchés à 2 min

Charges comprises (chauffage, eau, Internet, GEZ).
Ambiance internationale et conviviale!`,
      extras: [
        "Meublé",
        "Charges incluses",
        "Internet",
        "Balcon",
        "Cave",
        "2 SdB",
      ],
      available: new Date("2025-02-01"),
      ContactInfo: {
        create: {
          phone: "+49 89 9876 5432",
          email: "coloc.schwabing@gmail.com",
        },
      },
    },
    {
      title: "Appartement 2 pièces - Hamburg Altona",
      type: "Appartement",
      city: "Hamburg",
      district: "Altona",
      price: "950€/mois",
      priceNumeric: 950,
      deposit: "1900€",
      area: 55,
      bedrooms: 1,
      bathrooms: 1,
      floor: 4,
      pets: true,
      photos: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
      ],
      coverPhoto:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      description: `Bel appartement 2 pièces lumineux avec balcon.

Composition:
• Chambre spacieuse (16m²)
• Séjour avec coin cuisine (28m²)
• Salle de bain avec douche
• Balcon orienté sud
• Cave

Équipements:
• Cuisine équipée récente
• Parquet dans toutes les pièces
• Double vitrage
• Chauffage central

Immeuble:
• Bien entretenu
• Ascenseur
• Local vélos
• Animaux acceptés

Quartier Altona:
• Très bien desservi (S-Bahn)
• Commerces variés
• Restaurants et cafés
• Proche de l'Elbe

Charges: 120€/mois
Libre dès le 15 février.`,
      extras: [
        "Balcon",
        "Ascenseur",
        "Cave",
        "Animaux OK",
        "Parquet",
        "Cuisine équipée",
      ],
      available: new Date("2025-02-15"),
      ContactInfo: {
        create: {
          phone: "+49 40 5555 7777",
          email: "wohnung.altona@vermieter.de",
        },
      },
    },
    {
      title: "Maison 4 chambres avec jardin - Frankfurt Sachsenhausen",
      type: "Maison",
      city: "Frankfurt",
      district: "Sachsenhausen",
      price: "2100€/mois",
      priceNumeric: 2100,
      deposit: "4200€",
      area: 130,
      bedrooms: 4,
      bathrooms: 2,
      floor: 2,
      pets: true,
      photos: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop",
      ],
      coverPhoto:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      description: `Belle maison familiale dans quartier calme de Sachsenhausen.

Rez-de-chaussée:
• Grand salon-salle à manger (40m²)
• Cuisine équipée moderne
• WC invités
• Accès direct au jardin

Premier étage:
• 4 chambres (12-18m²)
• 2 salles de bain complètes
• Bureau/coin lecture

Extérieur:
• Jardin privatif (200m²)
• Terrasse avec barbecue
• 2 places de parking

Équipements:
• Chauffage au gaz
• Double vitrage
• Cave aménagée
• Buanderie

Quartier:
• Écoles internationales à proximité
• Transports en commun
• Zone résidentielle calme
• Mainufer à 10 min

Idéal pour famille.
Animaux bienvenus!`,
      extras: [
        "Jardin",
        "Parking 2 places",
        "Terrasse",
        "Cave",
        "Animaux OK",
        "2 SdB",
        "Buanderie",
      ],
      available: new Date("2025-03-01"),
      ContactInfo: {
        create: {
          phone: "+49 69 4444 8888",
          email: "haus.sachsenhausen@immobilien-ffm.de",
        },
      },
    },
    {
      title: "Chambre chez l'habitant - Köln Ehrenfeld",
      type: "Chambre",
      city: "Köln",
      district: "Ehrenfeld",
      price: "420€/mois",
      priceNumeric: 420,
      deposit: "840€",
      area: 14,
      bedrooms: 1,
      bathrooms: 1,
      floor: 1,
      pets: false,
      photos: [
        "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=600&fit=crop",
      ],
      coverPhoto:
        "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&h=600&fit=crop",
      description: `Chambre confortable chez l'habitant dans quartier branché d'Ehrenfeld.

La chambre:
• 14m² avec lit double
• Bureau et chaise
• Grande armoire
• Fenêtre sur rue calme

Parties communes:
• Cuisine équipée partagée
• Salle de bain commune (2 personnes)
• Salon avec TV
• Balcon

Hôte:
• Sophie, 35 ans, enseignante
• Non-fumeuse
• Parle français et allemand
• Accueillante et respectueuse

Localisation:
• Quartier multiculturel et artistique
• Nombreux cafés et bars
• U-Bahn et bus à 5 min
• Centre-ville en 15 min

Charges:
• Tout inclus (électricité, eau, Internet, GEZ)

Parfait pour étudiant(e) ou jeune professionnel(le).
Bail à partir de 3 mois.`,
      extras: ["Meublé", "Charges incluses", "Internet", "Balcon", "WG"],
      available: new Date("2025-01-20"),
      ContactInfo: {
        create: {
          phone: "+49 221 3333 6666",
          email: "zimmer.ehrenfeld@web.de",
        },
      },
    },
    {
      title: "Studio étudiant - Leipzig Zentrum-Süd",
      type: "Studio",
      city: "Leipzig",
      district: "Zentrum-Süd",
      price: "480€/mois",
      priceNumeric: 480,
      deposit: "960€",
      area: 25,
      bedrooms: 1,
      bathrooms: 1,
      floor: 2,
      pets: false,
      photos: [
        "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&h=600&fit=crop",
      ],
      coverPhoto:
        "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&h=600&fit=crop",
      description: `Studio fonctionnel proche de l'université de Leipzig.

Aménagement:
• Pièce principale avec coin nuit
• Kitchenette équipée
• Salle d'eau avec WC
• Rangements intégrés

Équipements:
• Meublé (lit, bureau, armoire)
• Plaques de cuisson, frigo
• Internet haut débit
• Chauffage individuel

Résidence:
• Immeuble rénové 2020
• Local vélos sécurisé
• Laverie au sous-sol
• Quartier calme

Proximité:
• Université à 10 min à pied
• Tram et bus devant
• Supermarchés à 2 min
• Bibliothèque municipale

Charges: 80€/mois
Bail étudiant possible (semestre).
Disponible pour semestre d'été!`,
      extras: ["Meublé", "Internet", "Laverie", "Local vélos", "Rénovéé"],
      available: new Date("2025-04-01"),
      ContactInfo: {
        create: {
          phone: "+49 341 2222 9999",
          email: "student.studio@leipzig-wohnen.de",
        },
      },
    },
    {
      title: "Appartement 3 pièces - Stuttgart Mitte",
      type: "Appartement",
      city: "Stuttgart",
      district: "Stuttgart-Mitte",
      price: "1350€/mois",
      priceNumeric: 1350,
      deposit: "2700€",
      area: 75,
      bedrooms: 2,
      bathrooms: 1,
      floor: 5,
      pets: false,
      photos: [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
      ],
      coverPhoto:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      description: `Bel appartement 3 pièces au cœur de Stuttgart.

Distribution:
• 2 chambres (14m² et 16m²)
• Grand séjour lumineux (30m²)
• Cuisine séparée équipée
• Salle de bain avec baignoire
• WC séparé
• Balcon

Prestations:
• Immeuble rénové
• Ascenseur
• Cave privative
• Chauffage central
• Double vitrage

Localisation premium:
• Centre-ville
• U-Bahn et S-Bahn à 3 min
• Commerces au pied
• Königstraße à 5 min
• Parcs et espaces verts

Charges: 200€/mois (chauffage, eau, entretien)

Idéal couple ou colocataires.
Visite possible dès maintenant!`,
      extras: [
        "Ascenseur",
        "Balcon",
        "Cave",
        "Cuisine équipée",
        "WC séparé",
        "Centre-ville",
      ],
      available: new Date("2025-02-10"),
      ContactInfo: {
        create: {
          phone: "+49 711 7777 3333",
          email: "wohnung.stuttgart@hausverwaltung.de",
        },
      },
    },
    {
      title: "Colocation 4 personnes - Düsseldorf Pempelfort",
      type: "Colocation",
      city: "Düsseldorf",
      district: "Pempelfort",
      price: "520€/mois",
      priceNumeric: 520,
      deposit: "1040€",
      area: 16,
      bedrooms: 1,
      bathrooms: 2,
      floor: 3,
      pets: false,
      photos: [
        "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=600&fit=crop",
      ],
      coverPhoto:
        "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=800&h=600&fit=crop",
      description: `Grande colocation internationale cherche 4ème colocataire!

Ta chambre:
• 16m² meublée
• Lit double, bureau, armoire
• Lumineuse et calme

Appart 120m²:
• 4 chambres privées
• Cuisine américaine équipée
• 2 salles de bain
• Grand salon commun
• 2 balcons
• Cave et grenier

Ton profil:
• Étudiant(e) ou jeune actif
• 22-30 ans
• Ouvert et respectueux
• Non-fumeur

Tes futurs colocs:
• Lisa (24) - designer
• Tom (26) - ingénieur
• Sara (25) - traductrice

Quartier Pempelfort:
• Résidentiel et verdoyant
• U-Bahn à 5 min
• Hofgarten tout proche
• Nombreux restaurants

Tout inclus: 520€ (loyer + charges + Internet + GEZ)

On organise des soirées cuisine internationale!
Candidature avec mini présentation svp :)`,
      extras: [
        "Meublé",
        "Tout inclus",
        "Internet",
        "2 SdB",
        "Balcons",
        "WG 4 pers",
      ],
      available: new Date("2025-02-01"),
      ContactInfo: {
        create: {
          phone: "+49 211 8888 4444",
          email: "wg.pempelfort@students.de",
        },
      },
    },
  ];

  const createdListings = [];
  for (let i = 0; i < realEstateListings.length; i++) {
    const listing = await prisma.realEstateListing.create({
      data: {
        ...realEstateListings[i],
        authorId: users[i % users.length].id,
      },
    });
    createdListings.push(listing);
    console.log(
      `  ✓ Annonce créée: ${listing.title} (${listing.type} - ${listing.city})`
    );
  }

  console.log(`✅ ${createdListings.length} annonces immobilières créées\n`);

  console.log("🎉 Seed terminé avec succès!\n");
  console.log("📊 Résumé:");
  console.log(`   • ${users.length} utilisateurs`);
  console.log(`   • ${createdJobs.length} offres d'emploi`);
  console.log(`   • ${createdListings.length} annonces immobilières`);
  console.log(`   • 2 bookmarks`);
  console.log("\n💡 Connexion:");
  console.log("   Email: n'importe quel email ci-dessus");
  console.log("   Mot de passe: Password123!");
  console.log("\n🇩🇪 Contexte: Réseau Malagasy en Allemagne");
}

main()
  .catch((e) => {
    console.error("❌ Erreur lors du seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
