import {
  JobOfferGetPayload,
  JobOfferSelect,
  JobOfferWhereInput,
} from "@/generated/prisma/models";
import prisma from "@/lib/prisma";

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
} satisfies JobOfferSelect;

export type JobOfferListItem = JobOfferGetPayload<{
  select: typeof jobOfferListSelect;
}> & { isBookmarked?: boolean };

function buildJobOfferWhere(filters: JobOfferQueryParams): JobOfferWhereInput {
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
  } satisfies JobOfferWhereInput;
}

export async function getJobOffersOptimized({
  search,
  type,
  contractType,
  city,
  page = 1,
  limit = 10,
  userId,
  bookmarkedOnly = false,
}: {
  search?: string;
  type?: string;
  contractType?: string;
  city?: string;
  page?: number;
  limit?: number;
  userId?: string;
  bookmarkedOnly?: boolean;
}) {
  "use cache";

  const sanitizedLimit = Math.min(Math.max(limit, 1), 100);
  const normalizedPage = Math.max(page, 1);

  const where = buildJobOfferWhere({ search, type, contractType, city });

  if (bookmarkedOnly && userId) {
    where.bookmarks = {
      some: {
        userId: userId,
      },
    };
  }

  const filteredCount = await prisma.jobOffer.count({ where });

  const totalPages = Math.ceil(filteredCount / sanitizedLimit) || 0;
  const safePage = totalPages > 0 ? Math.min(normalizedPage, totalPages) : 1;
  const skip = (safePage - 1) * sanitizedLimit;

  const jobOffersRaw = await prisma.jobOffer.findMany({
    where,
    select: {
      ...jobOfferListSelect,
      bookmarks: userId
        ? {
            where: { userId },
            select: { id: true },
          }
        : false,
    },
    orderBy: { createdAt: "desc" },
    skip,
    take: sanitizedLimit,
  });

  const jobOffers = jobOffersRaw.map((job) => ({
    ...job,
    isBookmarked: userId ? (job.bookmarks?.length ?? 0) > 0 : false,
    bookmarks: undefined, // Remove bookmarks array from result
  }));

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
  };
}

export async function getJobOfferById(id: string) {
  "use cache";

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

export async function getJobOffersByUser(userId: string) {
  "use cache";

  return await prisma.jobOffer.findMany({
    where: { authorId: userId },
    orderBy: { createdAt: "desc" },
  });
}
