import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Début du seed principal...");

  // Créer quelques utilisateurs de test
  const users = [
    {
      email: "marie.dupont@example.com",
      name: "Marie Dupont",
      photo:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      bio: "Étudiante en master à Paris, recherche colocation sympa !",
      city: "Paris",
      field: "Éducation",
    },
    {
      email: "thomas.martin@example.com",
      name: "Thomas Martin",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      bio: "Développeur freelance, propriétaire de plusieurs biens",
      city: "Lyon",
      field: "Technologie",
    },
    {
      email: "sophie.bernard@example.com",
      name: "Sophie Bernard",
      photo:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      bio: "Architecte, passionnée d'immobilier et de design",
      city: "Marseille",
      field: "Architecture",
    },
    {
      email: "julien.petit@example.com",
      name: "Julien Petit",
      photo:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      bio: "Jeune professionnel, propose des logements temporaires",
      city: "Toulouse",
      field: "Finance",
    },
    {
      email: "camille.robert@example.com",
      name: "Camille Robert",
      photo:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      bio: "Investisseuse immobilière, spécialisée dans les colocations",
      city: "Nice",
      field: "Immobilier",
    },
  ];

  // Vérifier s'il y a déjà des utilisateurs
  const existingUsers = await prisma.user.findMany();

  if (existingUsers.length === 0) {
    console.log(
      "Aucun utilisateur existant, création des utilisateurs de test..."
    );

    // Créer les utilisateurs seulement s'il n'y en a pas
    for (const userData of users) {
      await prisma.user.create({
        data: userData,
      });
    }
    console.log(`✅ ${users.length} utilisateurs créés avec succès !`);
  } else {
    console.log(
      `✅ ${existingUsers.length} utilisateurs existants trouvés, pas besoin d'en créer de nouveaux.`
    );
  }

  console.log(
    "🏠 Vous pouvez maintenant exécuter le seed immobilier avec : npm run db:seed:immobilier"
  );
}

main()
  .catch((e) => {
    console.error("❌ Erreur lors du seed :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
