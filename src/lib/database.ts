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
type JobOfferQueryParams = {
  search?: string;
  type?: string;
  contractType?: string;
  city?: string;
};

const jobOfferListSelect = {
  id: true,
  title: true,
  type: true,
  contractType: true,
  city: true,
  duration: true,
  company: true,
  salary: true,
  description: true,
  authorId: true,
  createdAt: true,
  author: {
    select: {
      id: true,
      name: true,
      photo: true,
    },
  },
} satisfies Prisma.JobOfferSelect;

export type JobOfferListItem = Prisma.JobOfferGetPayload<{
  select: typeof jobOfferListSelect;
}>;

function buildJobOfferWhere(
  filters: JobOfferQueryParams
): Prisma.JobOfferWhereInput {
  const search = filters.search?.trim();
  const city = filters.city?.trim();

  return {
    ...(search
      ? {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { company: { contains: search, mode: "insensitive" } },
            { city: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
          ],
        }
      : {}),
    ...(filters.type ? { type: filters.type } : {}),
    ...(filters.contractType ? { contractType: filters.contractType } : {}),
    ...(city ? { city: { contains: city, mode: "insensitive" } } : {}),
  } satisfies Prisma.JobOfferWhereInput;
}

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
  return getJobOffersOptimized({
    page,
    limit,
    search,
    type,
    contractType,
    city,
  });
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
    floor: number;
    pets: boolean;
    photos: string[];
    coverPhoto: string;
    description: string;
    extras: string[];
    available: Date | null;
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
      ContactInfo: true,
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
  const sanitizedLimit = Math.min(Math.max(limit, 1), 100);
  const normalizedPage = Math.max(page, 1);

  const where = buildJobOfferWhere({ search, type, contractType, city });

  const overallCountPromise = prisma.jobOffer.count();
  const filteredCount = await prisma.jobOffer.count({ where });

  const totalPages = Math.ceil(filteredCount / sanitizedLimit) || 0;
  const safePage = totalPages > 0 ? Math.min(normalizedPage, totalPages) : 1;
  const skip = (safePage - 1) * sanitizedLimit;

  const [jobOffers, overallCount] = await Promise.all([
    prisma.jobOffer.findMany({
      where,
      select: jobOfferListSelect,
      orderBy: { createdAt: "desc" },
      skip,
      take: sanitizedLimit,
    }),
    overallCountPromise,
  ]);

  return {
    jobOffers,
    pagination: {
      currentPage: safePage,
      totalPages,
      totalCount: filteredCount,
      pageSize: sanitizedLimit,
      hasNextPage: safePage < totalPages,
      hasPreviousPage: safePage > 1 && totalPages > 0,
    },
    overallCount,
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
