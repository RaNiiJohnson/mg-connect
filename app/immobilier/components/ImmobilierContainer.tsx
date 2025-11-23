"use client";

import { useState } from "react";
import { ImmobilierGrid } from "./ImmobilierGrid";

interface RealEstateListing {
  id: string;
  title: string;
  city: string;
  district: string;
  price: number;
  deposit: number;
  type: string;
  photos: string[];
  coverPhoto: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  floor: number;
  pets: boolean;
  available: Date | null;
  description: string;
  extras: string[];
  author: {
    id: string;
    name: string | null;
    photo: string | null;
  };
  ContactInfo?: {
    phone: string | null;
    email: string | null;
  } | null;
}

interface ImmobilierContainerProps {
  annonces: RealEstateListing[];
  children?: React.ReactNode;
}

export function ImmobilierContainer({
  annonces,
  children,
}: ImmobilierContainerProps) {
  const [hasSelection, setHasSelection] = useState(false);

  return (
    <div
      className={`mx-auto transition-all duration-300 ${hasSelection ? "max-w-7xl" : "max-w-6xl"}`}
    >
      {children}

      {/* Grille interactive avec panel de détails */}
      <ImmobilierGrid annonces={annonces} onSelectionChange={setHasSelection} />
    </div>
  );
}
