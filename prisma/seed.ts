import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  // Clear existing data
  await prisma.realEstateListing.deleteMany();
  await prisma.jobOffer.deleteMany();
  await prisma.post.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  // Create users with complete profiles
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: "ravo.andriamampianina@email.com",
        name: "Ravo Andriamampianina",
        emailVerified: true,
        photo:
          "https://images.unsplash.com/photo-1729824186684-eaff43f7d1d9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074",
        bio: "Développeur web passionné, j'aide les nouveaux arrivants à s'intégrer dans le secteur tech allemand.",
        city: "Berlin",
        arrivalDate: "2020",
        status: "Fachkraft",
        field: "Informatique",
        company: "Tech Solutions GmbH",
        journey: [
          "Goethe Institut",
          "Startup Incubator",
          "Tech Solutions GmbH",
        ],
      },
    }),
    prisma.user.create({
      data: {
        email: "hery.rakotomalala@email.com",
        name: "Hery Rakotomalala",
        emailVerified: true,
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
    }),
    prisma.user.create({
      data: {
        email: "naina.razafy@email.com",
        name: "Naina Razafy",
        emailVerified: true,
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
    }),
    prisma.user.create({
      data: {
        email: "marie.rasoamalala@email.com",
        name: "Marie Rasoamalala",
        emailVerified: true,
        photo:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
        bio: "Étudiante en médecine, je partage mes conseils pour réussir ses études en Allemagne.",
        city: "Heidelberg",
        arrivalDate: "2021",
        status: "Étudiant",
        field: "Santé",
        company: "Universität Heidelberg",
        journey: ["Studienkolleg", "Universität Heidelberg"],
      },
    }),
    prisma.user.create({
      data: {
        email: "jean.rakoto@email.com",
        name: "Jean Rakoto",
        emailVerified: true,
        photo:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
        bio: "Ingénieur mécanique, j'accompagne les jeunes dans leur recherche d'Ausbildung technique.",
        city: "Stuttgart",
        arrivalDate: "2019",
        status: "Fachkraft",
        field: "Ingénierie",
        company: "Mercedes-Benz AG",
        journey: ["IHK Stuttgart", "Bosch GmbH", "Mercedes-Benz AG"],
      },
    }),
  ]);

  console.log(`✅ Created ${users.length} users`);

  // Create job offers
  const jobOffers = await Promise.all([
    prisma.jobOffer.create({
      data: {
        title: "Au Pair - Famille accueillante à Berlin",
        type: "Au pair",
        contractType: "12 mois",
        city: "Berlin",
        duration: "Temps plein",
        startDate: "Mars 2025",
        company: "Familie Müller",
        description:
          "Famille avec 2 enfants (5 et 8 ans) cherche au pair motivé(e). Expérience avec enfants requise.",
        certificates: ["Allemand A2", "Permis de conduire"],
        salary: "280€/mois + logement",
        contact: "familie.muller@email.de",
        authorId: users[0].id,
      },
    }),
    prisma.jobOffer.create({
      data: {
        title: "Ausbildung - Développeur d'applications",
        type: "Ausbildung",
        contractType: "3 ans",
        city: "Munich",
        duration: "Temps plein",
        startDate: "Septembre 2025",
        company: "TechStart GmbH",
        description:
          "Formation complète en développement d'applications. Accompagnement personnalisé pour les candidats internationaux.",
        certificates: ["Allemand B1", "Baccalauréat"],
        salary: "650-950€/mois",
        contact: "hr@techstart.de",
        authorId: users[1].id,
      },
    }),
    prisma.jobOffer.create({
      data: {
        title: "FSJ - Service civique en hôpital",
        type: "FSJ",
        contractType: "12 mois",
        city: "Hamburg",
        duration: "Temps plein",
        startDate: "Août 2025",
        company: "Universitätsklinikum Hamburg",
        description:
          "Opportunité d'acquérir de l'expérience dans le secteur médical tout en perfectionnant l'allemand.",
        certificates: ["Allemand A2", "Certificat médical"],
        salary: "423€/mois",
        contact: "fsj@uke.de",
        authorId: users[2].id,
      },
    }),
    prisma.jobOffer.create({
      data: {
        title: "Ausbildung - Infirmier/ère",
        type: "Ausbildung",
        contractType: "3 ans",
        city: "Heidelberg",
        duration: "Temps plein",
        startDate: "Septembre 2025",
        company: "Universitätsklinikum Heidelberg",
        description:
          "Formation d'infirmier dans un hôpital universitaire renommé. Excellent encadrement et perspectives d'évolution.",
        certificates: ["Allemand B2", "Baccalauréat", "Certificat médical"],
        salary: "1200€/mois",
        contact: "ausbildung@med.uni-heidelberg.de",
        authorId: users[3].id,
      },
    }),
    prisma.jobOffer.create({
      data: {
        title: "Ingénieur Junior - Automobile",
        type: "Travail",
        contractType: "CDI",
        city: "Stuttgart",
        duration: "Temps plein",
        startDate: "Avril 2025",
        company: "Porsche AG",
        description:
          "Rejoignez notre équipe R&D pour développer les véhicules électriques de demain. Poste idéal pour jeune diplômé.",
        certificates: [
          "Allemand C1",
          "Master Ingénierie",
          "Permis de conduire",
        ],
        salary: "55000-65000€/an",
        contact: "careers@porsche.de",
        authorId: users[4].id,
      },
    }),
  ]);

  console.log(`✅ Created ${jobOffers.length} job offers`);

  // Create real estate listings
  const realEstateListings = await Promise.all([
    prisma.realEstateListing.create({
      data: {
        title: "Chambre dans colocation sympa - Berlin Mitte",
        type: "Colocation",
        city: "Berlin",
        district: "Mitte",
        price: 450,
        deposit: 900,
        area: 15,
        bedrooms: 1,
        bathrooms: 1,
        floor: "2ème étage",
        pets: false,
        photos: [
          "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470",
        ],
        description:
          "Belle chambre meublée dans un appartement de 3 pièces. Colocation avec 2 autres personnes. Proche des transports.",
        extras: ["Jardin", "Balcon", "Internet inclus"],
        contact: "marie.berlin@email.de",
        available: "Mars 2025",
        authorId: users[0].id,
      },
    }),
    prisma.realEstateListing.create({
      data: {
        title: "Studio meublé - Munich centre",
        type: "Location",
        city: "Munich",
        district: "Schwabing",
        price: 800,
        deposit: 1600,
        area: 25,
        bedrooms: 1,
        bathrooms: 1,
        floor: "Rez-de-chaussée",
        pets: true,
        photos: [
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470",
        ],
        description:
          "Studio entièrement meublé et équipé. Idéal pour étudiant ou jeune professionnel. Toutes charges comprises.",
        extras: ["Garage", "Meublé", "Charges incluses"],
        contact: "studio.munich@email.de",
        available: "Avril 2025",
        authorId: users[1].id,
      },
    }),
    prisma.realEstateListing.create({
      data: {
        title: "Appartement weekend - Hamburg",
        type: "Weekend",
        city: "Hamburg",
        district: "St. Pauli",
        price: 60,
        deposit: 100,
        area: 40,
        bedrooms: 2,
        bathrooms: 1,
        floor: "3ème étage",
        pets: false,
        photos: [
          "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470",
        ],
        description:
          "Appartement cosy pour vos weekends à Hamburg. Proche du port et des attractions touristiques.",
        extras: ["Vue sur le port", "Cuisine équipée"],
        contact: "weekend.hamburg@email.de",
        available: "Disponible",
        authorId: users[2].id,
      },
    }),
    prisma.realEstateListing.create({
      data: {
        title: "Chambre étudiante - Heidelberg",
        type: "Colocation",
        city: "Heidelberg",
        district: "Altstadt",
        price: 380,
        deposit: 760,
        area: 12,
        bedrooms: 1,
        bathrooms: 1,
        floor: "1er étage",
        pets: false,
        photos: [
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470",
        ],
        description:
          "Chambre dans résidence étudiante proche de l'université. Ambiance internationale et conviviale.",
        extras: ["Proche université", "Salle d'étude", "Internet inclus"],
        contact: "student.heidelberg@email.de",
        available: "Septembre 2025",
        authorId: users[3].id,
      },
    }),
    prisma.realEstateListing.create({
      data: {
        title: "Appartement familial - Stuttgart",
        type: "Location",
        city: "Stuttgart",
        district: "Bad Cannstatt",
        price: 1200,
        deposit: 2400,
        area: 75,
        bedrooms: 3,
        bathrooms: 2,
        floor: "4ème étage",
        pets: true,
        photos: [
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470",
        ],
        description:
          "Grand appartement familial avec balcon. Quartier calme, proche des écoles et transports.",
        extras: ["Balcon", "Parking", "Cave", "Ascenseur"],
        contact: "family.stuttgart@email.de",
        available: "Juin 2025",
        authorId: users[4].id,
      },
    }),
  ]);

  console.log(`✅ Created ${realEstateListings.length} real estate listings`);

  // Create some posts
  const posts = await Promise.all([
    prisma.post.create({
      data: {
        title: "Guide complet pour l'Ausbildung en Allemagne",
        content: "Voici tout ce que vous devez savoir sur l'Ausbildung...",
        authorId: users[1].id,
      },
    }),
    prisma.post.create({
      data: {
        title: "Mes 5 ans en tant qu'Au Pair",
        content: "Retour d'expérience sur mon parcours d'Au Pair...",
        authorId: users[2].id,
      },
    }),
    prisma.post.create({
      data: {
        title: "Comment réussir ses études de médecine en Allemagne",
        content: "Conseils pratiques pour les étudiants internationaux...",
        authorId: users[3].id,
      },
    }),
  ]);

  console.log(`✅ Created ${posts.length} posts`);

  console.log("🎉 Database seeding completed successfully!");
  console.log(`
📊 Summary:
- ${users.length} users created
- ${jobOffers.length} job offers created
- ${realEstateListings.length} real estate listings created
- ${posts.length} posts created
  `);
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
