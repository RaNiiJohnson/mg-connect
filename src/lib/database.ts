import { Prisma } from "@/generated/prisma";
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

export async function getJobOffersWithPagination({
  page = 1,
  limit = 10,
  search,
  type,
  contractType,
  city,
}: {
  page?: number;
  limit?: number;
  search?: string;
  type?: string;
  contractType?: string;
  city?: string;
}) {
  const skip = (page - 1) * limit;

  // Build where clause for filtering
  const where: Prisma.JobOfferWhereInput = {};

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { company: { contains: search, mode: "insensitive" } },
      { city: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  if (type) {
    where.type = type;
  }

  if (contractType) {
    where.contractType = contractType;
  }

  if (city) {
    where.city = { contains: city, mode: "insensitive" };
  }

  // Get total count for pagination
  const totalCount = await prisma.jobOffer.count({ where });

  // Get paginated results
  const jobOffers = await prisma.jobOffer.findMany({
    where,
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
    skip,
    take: limit,
  });

  const totalPages = Math.ceil(totalCount / limit);

  return {
    jobOffers,
    pagination: {
      currentPage: page,
      totalPages,
      totalCount,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
}

export async function getJobOffersByUser(userId: string) {
  return await prisma.jobOffer.findMany({
    where: { authorId: userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function getJobOfferById(id: string) {
  return await prisma.jobOffer.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          photo: true,
        },
      },
    },
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
export async function getJobOffersOptimized({
  search,
  type,
  contractType,
  city,
  page = 1,
  limit = 10,
}: {
  search?: string;
  type?: string;
  contractType?: string;
  city?: string;
  page?: number;
  limit?: number;
}) {
  const skip = (page - 1) * limit;

  // Build where clause for filtering
  const where: Prisma.JobOfferWhereInput = {};

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { company: { contains: search, mode: "insensitive" } },
      { city: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  if (type) {
    where.type = type;
  }

  if (contractType) {
    where.contractType = contractType;
  }

  if (city) {
    where.city = { contains: city, mode: "insensitive" };
  }

  // Execute both queries in parallel for better performance
  const [jobOffers, totalCount] = await Promise.all([
    prisma.jobOffer.findMany({
      where,
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
      skip,
      take: limit,
    }),
    prisma.jobOffer.count({ where }),
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  return {
    jobOffers,
    pagination: {
      currentPage: page,
      totalPages,
      totalCount,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
}
export async function getJobOffersStats() {
  const [totalCount, typeStats] = await Promise.all([
    prisma.jobOffer.count(),
    prisma.jobOffer.groupBy({
      by: ["type"],
      _count: {
        type: true,
      },
    }),
  ]);

  return {
    totalCount,
    typeStats: typeStats.reduce(
      (acc, stat) => {
        acc[stat.type] = stat._count.type;
        return acc;
      },
      {} as Record<string, number>
    ),
  };
}
