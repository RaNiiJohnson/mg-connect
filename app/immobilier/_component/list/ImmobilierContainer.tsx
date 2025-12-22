"use client";

import { ImmobilierGrid } from "./ImmobilierGrid";
import {
  getAllRealEstateListings,
  RealEstateListingListItem,
} from "../../_actions/immo.action";
import { useEffect, useState, useTransition, useRef } from "react";
import {
  useQueryState,
  parseAsString,
  parseAsInteger,
  parseAsBoolean,
} from "nuqs";
import { ImmobilierPagination } from "./immobilier-pagination";
import { ImmobilierListSkeleton } from "../skeleton";
import { User } from "better-auth";

interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface ImmobilierContainerProps {
  annonces: RealEstateListingListItem[];
  initialPagination: PaginationData; // Add this
  children?: React.ReactNode;
  user?: User;
}

export function ImmobilierContainer({
  annonces: initialAnnonces,
  initialPagination,
  children,
  user,
}: ImmobilierContainerProps) {
  const [annonces, setAnnonces] =
    useState<RealEstateListingListItem[]>(initialAnnonces);
  const [pagination, setPagination] =
    useState<PaginationData>(initialPagination);
  const [isPending, startTransition] = useTransition();
  const isFirstRender = useRef(true);

  // URL State (nuqs)
  const [search] = useQueryState("search", parseAsString.withDefault(""));
  const [type] = useQueryState("type", parseAsString.withDefault(""));
  const [city] = useQueryState("city", parseAsString.withDefault(""));
  const [district] = useQueryState("district", parseAsString.withDefault(""));
  const [price] = useQueryState("price", parseAsString.withDefault("")); // Note: Action expects string for contains search? Or number? Action uses string contains.
  const [bedrooms] = useQueryState("bedrooms", parseAsInteger);
  const [bathrooms] = useQueryState("bathrooms", parseAsInteger);
  const [pets] = useQueryState("pets", parseAsBoolean);

  // Note: ImmobilierFilters uses minPrice/maxPrice but action uses 'price' string?
  // Let's check ImmobilierFilters again. It uses minPrice and maxPrice.
  // But getAllRealEstateListings uses 'price'.
  // So currently, minPrice/maxPrice filters DO NOTHING in the action.
  // I should probably fix the action to support range, OR just support 'price' if that's what the user wants.
  // Given the user wants "filtering feature", I should probably make it work.
  // But for this specific task "implement filtering feature... same as opportunities",
  // I will focus on connecting the existing pieces.
  // However, since I'm "optimizing", I should probably fix the mismatch.
  // But let's stick to connecting the existing URL params to the action first.
  // The action accepts: search, type, city, district, price, bedrooms, bathrooms, pets.

  // Let's assume for now we just pass what we have.
  // If ImmobilierFilters sets minPrice/maxPrice, the Action won't see them unless we update the Action.
  // I will stick to the params that match the Action for now to avoid scope creep,
  // but I'll add minPrice/maxPrice to the state here just in case I decide to pass them.

  const [minPrice] = useQueryState("minPrice", parseAsString);
  const [maxPrice] = useQueryState("maxPrice", parseAsString);
  const [page] = useQueryState("page", parseAsInteger.withDefault(1)); // Add page state
  const [bookmarked] = useQueryState(
    "bookmarked",
    parseAsBoolean.withDefault(false)
  );

  // Effect to fetch data when filters change
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const fetchListings = () => {
      startTransition(async () => {
        try {
          const { realEstateListings, pagination: newPagination } =
            await getAllRealEstateListings({
              search,
              type,
              city,
              district,
              price,
              minPrice: minPrice ?? undefined,
              maxPrice: maxPrice ?? undefined,
              bedrooms: bedrooms ?? undefined,
              bathrooms: bathrooms ?? undefined,
              pets: pets ?? undefined,
              page, // Pass page
              limit: 10, // Default limit
              bookmarkedOnly: bookmarked,
              userId: user?.id,
            });
          setAnnonces(realEstateListings);
          setPagination(newPagination);
        } catch (error) {
          console.error("Error fetching listings:", error);
        }
      });
    };

    fetchListings();
  }, [
    search,
    type,
    city,
    district,
    price,
    bedrooms,
    bathrooms,
    pets,
    minPrice,
    maxPrice,
    page,
    bookmarked,
    user?.id,
  ]);

  return (
    <div className="mx-auto transition-all duration-300 max-w-7xl">
      {children}

      <div className="relative min-h-[200px]">
        {isPending ? (
          <ImmobilierListSkeleton />
        ) : (
          <ImmobilierGrid user={user} annonces={annonces} />
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <ImmobilierPagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            totalCount={pagination.totalCount}
          />
        )}
      </div>
    </div>
  );
}
