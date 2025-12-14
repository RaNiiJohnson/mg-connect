import "dotenv/config";
import prisma from "@/lib/prisma";

async function main() {
  console.log("🌱 Début du seed immobilier...\n");

  // Fetch existing users
  const users = await prisma.user.findMany();
  if (users.length === 0) {
    console.error(
      "❌ Aucun utilisateur trouvé. Veuillez lancer le seed principal d'abord."
    );
    process.exit(1);
  }
  console.log(`✅ ${users.length} utilisateurs trouvés`);

  // Clean existing real estate listings
  console.log("🧹 Nettoyage des annonces immobilières...");
  await prisma.realEstateBookmark.deleteMany();
  await prisma.contactInfo.deleteMany();
  await prisma.realEstateListing.deleteMany();
  console.log("✅ Annonces nettoyées\n");

  // Create real estate listings
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
  console.log("🎉 Seed immobilier terminé avec succès!\n");
}

main()
  .catch((e) => {
    console.error("❌ Erreur lors du seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
