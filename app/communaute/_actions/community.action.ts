"use server";

import {
  UserSelect,
  UserGetPayload,
  UserWhereInput,
  ServiceProviderSelect,
  ServiceProviderGetPayload,
} from "@/generated/prisma/models";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Sélection pour la liste des membres
const memberListSelect = {
  id: true,
  name: true,
  image: true,
  photo: true,
  city: true,
  status: true,
  field: true,
  roles: true,
  createdAt: true,
} satisfies UserSelect;

export type CommunityMember = UserGetPayload<{
  select: typeof memberListSelect;
}>;

// Type pour les paramètres de requête
type MemberQueryParams = {
  search?: string;
  status?: string;
  city?: string;
  field?: string;
  role?: string;
};

// Construire la clause WHERE pour les filtres
function buildMemberWhere(filters: MemberQueryParams): UserWhereInput {
  const search = filters.search?.trim();
  const city = filters.city?.trim();
  const field = filters.field?.trim();

  return {
    emailVerified: true,
    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { city: { contains: search, mode: "insensitive" } },
            { field: { contains: search, mode: "insensitive" } },
          ],
        }
      : {}),
    ...(filters.status ? { status: filters.status } : {}),
    ...(city ? { city: { contains: city, mode: "insensitive" } } : {}),
    ...(field ? { field: { contains: field, mode: "insensitive" } } : {}),
    ...(filters.role ? { roles: { has: filters.role } } : {}),
  } satisfies UserWhereInput;
}

// Récupérer tous les membres avec pagination et filtres
export async function getAllCommunityMembers({
  search,
  status,
  city,
  field,
  role,
  page = 1,
  limit = 12,
}: {
  search?: string;
  status?: string;
  city?: string;
  field?: string;
  role?: string;
  page?: number;
  limit?: number;
}) {
  const sanitizedLimit = Math.min(Math.max(limit, 1), 50);
  const normalizedPage = Math.max(page, 1);

  const where = buildMemberWhere({ search, status, city, field, role });

  const filteredCount = await prisma.user.count({ where });

  const totalPages = Math.ceil(filteredCount / sanitizedLimit) || 0;
  const safePage = totalPages > 0 ? Math.min(normalizedPage, totalPages) : 1;
  const skip = (safePage - 1) * sanitizedLimit;

  const members = await prisma.user.findMany({
    where,
    select: memberListSelect,
    orderBy: { createdAt: "desc" },
    skip,
    take: sanitizedLimit,
  });

  return {
    members,
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

// Sélection pour les prestataires de service
const serviceProviderListSelect = {
  id: true,
  serviceType: true,
  description: true,
  experience: true,
  tarif: true,
  available: true,
  createdAt: true,
  user: {
    select: {
      id: true,
      name: true,
      image: true,
      photo: true,
      city: true,
    },
  },
} satisfies ServiceProviderSelect;

export type ServiceProviderListItem = ServiceProviderGetPayload<{
  select: typeof serviceProviderListSelect;
}>;

// Récupérer tous les prestataires de service
export async function getAllServiceProviders({
  search,
  serviceType,
  city,
  page = 1,
  limit = 12,
}: {
  search?: string;
  serviceType?: string;
  city?: string;
  page?: number;
  limit?: number;
} = {}) {
  const sanitizedLimit = Math.min(Math.max(limit, 1), 50);
  const normalizedPage = Math.max(page, 1);

  const where = {
    ...(search
      ? {
          OR: [
            { serviceType: { contains: search, mode: "insensitive" as const } },
            { description: { contains: search, mode: "insensitive" as const } },
            {
              user: {
                name: { contains: search, mode: "insensitive" as const },
              },
            },
            {
              user: {
                city: { contains: search, mode: "insensitive" as const },
              },
            },
          ],
        }
      : {}),
    ...(serviceType
      ? { serviceType: { contains: serviceType, mode: "insensitive" as const } }
      : {}),
    ...(city
      ? { user: { city: { contains: city, mode: "insensitive" as const } } }
      : {}),
  };

  const filteredCount = await prisma.serviceProvider.count({ where });

  const totalPages = Math.ceil(filteredCount / sanitizedLimit) || 0;
  const safePage = totalPages > 0 ? Math.min(normalizedPage, totalPages) : 1;
  const skip = (safePage - 1) * sanitizedLimit;

  const providers = await prisma.serviceProvider.findMany({
    where,
    select: serviceProviderListSelect,
    orderBy: { createdAt: "desc" },
    skip,
    take: sanitizedLimit,
  });

  return {
    providers,
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

// Récupérer le profil prestataire de l'utilisateur connecté
export async function getMyServiceProvider(userId: string) {
  return await prisma.serviceProvider.findUnique({
    where: { userId },
    select: serviceProviderListSelect,
  });
}

// Créer un profil prestataire
export async function createServiceProvider({
  userId,
  serviceType,
  description,
  experience,
  tarif,
}: {
  userId: string;
  serviceType: string;
  description?: string;
  experience?: string;
  tarif?: string;
}) {
  // Ajouter le rôle SERVICE_PROVIDER si pas déjà présent
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { roles: true },
  });

  const currentRoles = user?.roles || ["MEMBER"];
  const newRoles = currentRoles.includes("SERVICE_PROVIDER")
    ? currentRoles
    : [...currentRoles, "SERVICE_PROVIDER"];

  await prisma.user.update({
    where: { id: userId },
    data: { roles: newRoles },
  });

  const provider = await prisma.serviceProvider.create({
    data: {
      userId,
      serviceType,
      description,
      experience,
      tarif,
    },
    select: serviceProviderListSelect,
  });

  revalidatePath("/communaute");
  return provider;
}

// Mettre à jour un profil prestataire
export async function updateServiceProvider({
  userId,
  serviceType,
  description,
  experience,
  tarif,
  available,
}: {
  userId: string;
  serviceType?: string;
  description?: string;
  experience?: string;
  tarif?: string;
  available?: boolean;
}) {
  const provider = await prisma.serviceProvider.update({
    where: { userId },
    data: {
      ...(serviceType !== undefined ? { serviceType } : {}),
      ...(description !== undefined ? { description } : {}),
      ...(experience !== undefined ? { experience } : {}),
      ...(tarif !== undefined ? { tarif } : {}),
      ...(available !== undefined ? { available } : {}),
    },
    select: serviceProviderListSelect,
  });

  revalidatePath("/communaute");
  return provider;
}

// Supprimer un profil prestataire
export async function deleteServiceProvider(userId: string) {
  // Retirer le rôle SERVICE_PROVIDER
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { roles: true },
  });

  const currentRoles = user?.roles || ["MEMBER"];
  const newRoles = currentRoles.filter((role) => role !== "SERVICE_PROVIDER");

  await prisma.user.update({
    where: { id: userId },
    data: { roles: newRoles.length > 0 ? newRoles : ["MEMBER"] },
  });

  await prisma.serviceProvider.delete({
    where: { userId },
  });

  revalidatePath("/communaute");
}
