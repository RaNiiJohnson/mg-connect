"use client";

import { useState } from "react";
import { ImmobilierGrid } from "./ImmobilierGrid";

interface RealEstateListing {
  id: string;
  title: string;
  city: string;
  district: string;
  price: number;
  type: string;
  photos: string[];
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  available?: string;
  description?: string;
  features?: string[];
  contact?: string;
  author?: {
    id: string;
    name: string | null;
    photo: string | null;
  };
}

interface ImmobilierContainerProps {
  annonces: RealEstateListing[];
  children: React.ReactNode;
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
