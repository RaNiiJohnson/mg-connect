import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

// URLs d'images d'appartements/maisons réalistes
const COVER_PHOTOS = [
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
];

const INTERIOR_PHOTOS = [
  // Salons
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&h=600&fit=crop",
  // Cuisines
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
  // Chambres
  "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1571508601891-ca5e7a713859?w=800&h=600&fit=crop",
  // Salles de bain
  "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop",
];

const CITIES = [
  {
    city: "Paris",
    districts: [
      "Marais",
      "Montmartre",
      "Saint-Germain",
      "Bastille",
      "République",
    ],
  },
  {
    city: "Lyon",
    districts: [
      "Presqu'île",
      "Croix-Rousse",
      "Part-Dieu",
      "Vieux Lyon",
      "Confluence",
    ],
  },
  {
    city: "Marseille",
    districts: [
      "Vieux-Port",
      "Canebière",
      "Notre-Dame du Mont",
      "Castellane",
      "Prado",
    ],
  },
  {
    city: "Toulouse",
    districts: ["Capitole", "Saint-Cyprien", "Carmes", "Minimes", "Compans"],
  },
  {
    city: "Nice",
    districts: ["Vieux Nice", "Libération", "Cimiez", "Port", "Gambetta"],
  },
  {
    city: "Nantes",
    districts: [
      "Centre-ville",
      "Île de Nantes",
      "Hauts-Pavés",
      "Dervallières",
      "Bellevue",
    ],
  },
];

const PROPERTY_TYPES = [
  "Appartement",
  "Studio",
  "Colocation",
  "Maison",
  "Loft",
];

const EXTRAS = [
  "Balcon",
  "Terrasse",
  "Parking",
  "Cave",
  "Ascenseur",
  "Climatisation",
  "Lave-vaisselle",
  "Lave-linge",
  "Internet fibre",
  "Meublé",
  "Jardin",
  "Piscine",
  "Gardien",
  "Interphone",
  "Cheminée",
  "Dressing",
];

function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function getRandomPhotos(count: number): string[] {
  return getRandomItems(INTERIOR_PHOTOS, count);
}

async function main() {
  console.log("🏠 Début du seed immobilier...");

  // Récupérer tous les utilisateurs existants
  const users = await prisma.user.findMany();

  if (users.length === 0) {
    console.log(
      "❌ Aucun utilisateur trouvé. Veuillez d'abord exécuter le seed principal avec : npm run db:seed"
    );
    return;
  }

  console.log(`✅ ${users.length} utilisateurs trouvés.`);

  // Supprimer seulement les anciennes annonces immobilières (pas les utilisateurs)
  console.log("🗑️ Suppression des anciennes annonces immobilières...");
  await prisma.contactInfo.deleteMany();
  await prisma.realEstateListing.deleteMany();
  console.log("✅ Anciennes annonces supprimées.");

  const realEstateListings = [];

  for (let i = 0; i < 20; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const randomCityData = CITIES[Math.floor(Math.random() * CITIES.length)];
    const randomDistrict =
      randomCityData.districts[
        Math.floor(Math.random() * randomCityData.districts.length)
      ];
    const randomType =
      PROPERTY_TYPES[Math.floor(Math.random() * PROPERTY_TYPES.length)];

    const bedrooms = Math.floor(Math.random() * 4) + 1; // 1-4 chambres
    const bathrooms = Math.floor(Math.random() * 2) + 1; // 1-2 salles de bain
    const area = Math.floor(Math.random() * 80) + 20; // 20-100 m²
    const floor = Math.floor(Math.random() * 10) + 1; // 1-10ème étage
    const price = Math.floor(Math.random() * 1500) + 500; // 500-2000€
    const deposit = price; // Caution = 1 mois de loyer
    const pets = Math.random() > 0.7; // 30% chance d'autoriser les animaux

    const photoCount = Math.floor(Math.random() * 4) + 3; // 3-6 photos
    const photos = getRandomPhotos(photoCount);
    const coverPhoto =
      COVER_PHOTOS[Math.floor(Math.random() * COVER_PHOTOS.length)];

    const selectedExtras = getRandomItems(
      EXTRAS,
      Math.floor(Math.random() * 6) + 2
    ); // 2-7 équipements

    const availableDate = new Date();
    availableDate.setDate(
      availableDate.getDate() + Math.floor(Math.random() * 60)
    ); // Disponible dans 0-60 jours

    const descriptions = [
      `Magnifique ${randomType.toLowerCase()} de ${area}m² situé dans le quartier ${randomDistrict}. Idéal pour ${bedrooms === 1 ? "une personne" : "une famille"}.`,
      `Superbe ${randomType.toLowerCase()} rénové avec goût, offrant ${bedrooms} chambre${bedrooms > 1 ? "s" : ""} et ${bathrooms} salle${bathrooms > 1 ? "s" : ""} de bain.`,
      `${randomType} lumineux et spacieux dans un quartier dynamique. Proche des transports et commerces.`,
      `Charmant ${randomType.toLowerCase()} avec caractère, parfait pour découvrir ${randomCityData.city}.`,
      `${randomType} moderne et bien équipé, dans une résidence sécurisée du quartier ${randomDistrict}.`,
    ];

    const listing = {
      title: `${randomType} ${bedrooms}P - ${randomDistrict}`,
      type: randomType,
      city: randomCityData.city,
      district: randomDistrict,
      price,
      deposit,
      area,
      bedrooms,
      bathrooms,
      floor,
      pets,
      photos,
      coverPhoto,
      description:
        descriptions[Math.floor(Math.random() * descriptions.length)],
      extras: selectedExtras,
      available: availableDate,
      authorId: randomUser.id,
    };

    realEstateListings.push(listing);
  }

  // Créer les annonces immobilières
  console.log("🏗️ Création des annonces immobilières...");
  for (const listing of realEstateListings) {
    const createdListing = await prisma.realEstateListing.create({
      data: listing,
    });

    // Ajouter des informations de contact pour certaines annonces
    if (Math.random() > 0.3) {
      // 70% des annonces ont des infos de contact
      await prisma.contactInfo.create({
        data: {
          listingId: createdListing.id,
          phone:
            Math.random() > 0.5
              ? `0${Math.floor(Math.random() * 9) + 1} ${Math.floor(Math.random() * 90) + 10} ${Math.floor(Math.random() * 90) + 10} ${Math.floor(Math.random() * 90) + 10} ${Math.floor(Math.random() * 90) + 10}`
              : null,
          email:
            Math.random() > 0.5
              ? `contact${Math.floor(Math.random() * 1000)}@example.com`
              : null,
        },
      });
    }
  }

  console.log(
    `✅ ${realEstateListings.length} annonces immobilières créées avec succès !`
  );
  console.log("📸 Chaque annonce contient :");
  console.log("   - 1 photo de couverture");
  console.log("   - 3 à 6 photos supplémentaires");
  console.log(
    "   - Informations complètes (prix, caution, étage, animaux, etc.)"
  );
  console.log("   - Équipements variés");
  console.log("   - Informations de contact (70% des annonces)");
}

main()
  .catch((e) => {
    console.error("❌ Erreur lors du seed :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
