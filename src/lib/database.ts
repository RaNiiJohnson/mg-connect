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

// Job offer operations
export async function createJobOffer(
  authorId: string,
  data: {
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
  }
) {
  return await prisma.jobOffer.create({
    data: {
      ...data,
      authorId,
    },
  });
}

export async function getAllJobOffers() {
  return await prisma.jobOffer.findMany({
    include: {
      author: {
        select: {
          id: true,
          name: true,
          photo: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getJobOffersByUser(userId: string) {
  return await prisma.jobOffer.findMany({
    where: { authorId: userId },
    orderBy: { createdAt: "desc" },
  });
}

// Real estate operations
export async function createRealEstateListing(
  authorId: string,
  data: {
    title: string;
    type: string;
    city: string;
    district: string;
    price: number;
    deposit: number;
    area: number;
    bedrooms: number;
    bathrooms: number;
    floor: string;
    pets: boolean;
    photos: string[];
    description: string;
    extras: string[];
    contact: string;
    available: string;
  }
) {
  return await prisma.realEstateListing.create({
    data: {
      ...data,
      authorId,
    },
  });
}

export async function getAllRealEstateListings() {
  const data = await prisma.realEstateListing.findMany({
    include: {
      author: {
        select: {
          id: true,
          name: true,
          photo: true,
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
