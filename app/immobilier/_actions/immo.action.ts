"use server";

import {
  RealEstateListingSelect,
  RealEstateListingWhereInput,
} from "@/generated/prisma/models";
import prisma from "@/lib/prisma";

const realEstateListingSelect = {
  id: true,
  title: true,
  type: true,
  city: true,
  district: true,
  price: true,
  deposit: true,
  area: true,
  bedrooms: true,
  bathrooms: true,
  floor: true,
  pets: true,
  photos: true,
  coverPhoto: true,
  description: true,
  extras: true,
  available: true,
  authorId: true,
  createdAt: true,
  author: {
    select: {
      id: true,
      name: true,
      photo: true,
    },
  },
} satisfies RealEstateListingSelect;

function buildRealEstateListingWhere(filters: {
  search?: string;
  type?: string;
  city?: string;
  district?: string;
  price?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  pets?: boolean;
}): RealEstateListingWhereInput {
  const search = filters.search?.trim();
  const city = filters.city?.trim();

  return {
    ...(search
      ? {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { city: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
          ],
        }
      : {}),
    ...(filters.type ? { type: filters.type } : {}),
    ...(filters.city ? { city: { contains: city, mode: "insensitive" } } : {}),
    ...(filters.district
      ? { district: { contains: filters.district, mode: "insensitive" } }
      : {}),
    ...(filters.price
      ? { price: { contains: filters.price, mode: "insensitive" } }
      : {}),
    ...(filters.minPrice || filters.maxPrice
      ? {
          priceNumeric: {
            ...(filters.minPrice ? { gte: filters.minPrice } : {}),
            ...(filters.maxPrice ? { lte: filters.maxPrice } : {}),
          },
        }
      : {}),
    ...(filters.bedrooms ? { bedrooms: filters.bedrooms } : {}),
    ...(filters.bathrooms ? { bathrooms: filters.bathrooms } : {}),
    ...(filters.pets ? { pets: filters.pets } : {}),
  } satisfies RealEstateListingWhereInput;
}

export async function getAllRealEstateListings({
  search,
  type,
  city,
  district,
  price,
  minPrice,
  maxPrice,
  bedrooms,
  bathrooms,
  pets,
  page = 1,
  limit = 10,
  // bookmarkedOnly = false,
  // userId,
}: {
  search?: string;
  type?: string;
  city?: string;
  district?: string;
  price?: string;
  minPrice?: string;
  maxPrice?: string;
  bedrooms?: number;
  bathrooms?: number;
  pets?: boolean;
  page?: number;
  limit?: number;
  bookmarkedOnly?: boolean;
  userId?: string;
}) {
  const sanitizedLimit = Math.min(Math.max(limit, 1), 100);
  const normalizedPage = Math.max(page, 1);

  const where = buildRealEstateListingWhere({
    search,
    type,
    city,
    district,
    price,
    minPrice: minPrice ? parseInt(minPrice) : undefined,
    maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
    bedrooms: bedrooms ? Number(bedrooms) : undefined,
    bathrooms,
    pets,
  });

  console.log(
    "getAllRealEstateListings where:",
    JSON.stringify(where, null, 2)
  );

  const filteredCount = await prisma.realEstateListing.count({ where });

  const totalPages = Math.ceil(filteredCount / sanitizedLimit) || 0;
  const safePage = totalPages > 0 ? Math.min(normalizedPage, totalPages) : 1;
  const skip = (safePage - 1) * sanitizedLimit;

  const realEstateListings = await prisma.realEstateListing.findMany({
    orderBy: { createdAt: "desc" },
    where,
    select: {
      ...realEstateListingSelect,
    },
    skip,
    take: sanitizedLimit,
  });

  return {
    realEstateListings,
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
