import prisma from "./prisma";

// User operations
export async function getUserProfile(userId: string) {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      photo: true,
      bio: true,
      city: true,
      arrivalDate: true,
      status: true,
      field: true,
      company: true,
      journey: true,
      createdAt: true,
    },
  });
}

export async function updateUserProfile(
  userId: string,
  data: {
    name?: string;
    photo?: string;
    bio?: string;
    city?: string;
    arrivalDate?: string;
    status?: string;
    field?: string;
    company?: string;
    journey?: string[];
  }
) {
  return await prisma.user.update({
    where: { id: userId },
    data,
  });
}

export async function getAllCommunityMembers() {
  return await prisma.user.findMany({
    where: {
      emailVerified: true,
      bio: { not: null },
    },
    select: {
      id: true,
      name: true,
      photo: true,
      bio: true,
      city: true,
      arrivalDate: true,
      status: true,
      field: true,
      company: true,
      journey: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

// Real estate operation

export async function getAllRealEstateListings() {
  "use cache";
  const data = await prisma.realEstateListing.findMany({
    include: {
      author: {
        select: {
          id: true,
          name: true,
          photo: true,
        },
      },
      ContactInfo: {
        select: {
          phone: true,
          email: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return data;
}

export async function getRealEstateListingsByUser(userId: string) {
  return await prisma.realEstateListing.findMany({
    where: { authorId: userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function getRealEstateListingById(id: string) {
  return await prisma.realEstateListing.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          photo: true,
        },
      },
      ContactInfo: {
        select: {
          phone: true,
          email: true,
        },
      },
    },
  });
}

export async function getSimilarRealEstateListings(
  excludeId: string,
  city: string,
  type: string,
  limit: number = 6
) {
  return await prisma.realEstateListing.findMany({
    where: {
      id: { not: excludeId },
      OR: [{ city: { contains: city, mode: "insensitive" } }, { type: type }],
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          photo: true,
        },
      },
    },
    orderBy: [
      { city: "asc" }, // Priorité aux annonces de la même ville
      { createdAt: "desc" },
    ],
    take: limit,
  });
}
