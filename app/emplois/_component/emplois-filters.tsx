"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X } from "lucide-react";
import { useQueryState, parseAsString, parseAsInteger } from "nuqs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useTransition } from "react";

const JOB_TYPES = [
  { value: "Au pair", label: "Au pair" },
  { value: "Ausbildung", label: "Ausbildung" },
  { value: "FSJ/FOJ", label: "FSJ/FOJ" },
  { value: "Stage", label: "Stage" },
  { value: "CDI", label: "CDI" },
  { value: "CDD", label: "CDD" },
];

const CONTRACT_TYPES = [
  { value: "Temps plein", label: "Temps plein" },
  { value: "Temps partiel", label: "Temps partiel" },
  { value: "Freelance", label: "Freelance" },
  { value: "Stage", label: "Stage" },
];

interface EmploisFiltersProps {
  totalJobs: number;
  filteredJobs: number;
}

export function EmploisFilters({
  totalJobs,
  filteredJobs,
}: EmploisFiltersProps) {
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault("")
  );
  const [selectedType, setSelectedType] = useQueryState(
    "type",
    parseAsString.withDefault("")
  );
  const [contractType, setContractType] = useQueryState(
    "contract",
    parseAsString.withDefault("")
  );
  const [city, setCity] = useQueryState("city", parseAsString.withDefault(""));
  const [, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isPending, startTransition] = useTransition();

  const clearAllFilters = () => {
    startTransition(() => {
      setSearch("");
      setSelectedType("");
      setContractType("");
      setCity("");
      setPage(1);
    });
  };

  const selectJobType = (type: string) => {
    startTransition(() => {
      // Si on clique sur le type déjà sélectionné, on le désélectionne
      if (selectedType === type) {
        setSelectedType("");
      } else {
        setSelectedType(type);
      }
      setPage(1);
    });
  };

  const hasActiveFilters = search || selectedType || contractType || city;

  return (
    <div className="space-y-4">
      {/* Barre de recherche principale */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par titre, ville, entreprise..."
            className="pl-10"
            value={search}
            disabled={isPending}
            onChange={(e) => {
              startTransition(() => {
                setSearch(e.target.value);
                setPage(1);
              });
            }}
          />
        </div>
        <Button
          variant="outline"
          className="flex items-center gap-2 shrink-0"
          onClick={() => setShowAdvanced(!showAdvanced)}
          disabled={isPending}
        >
          <Filter className="h-4 w-4" />
          <span className="hidden sm:inline">
            {isPending ? "Chargement..." : "Filtres"}
          </span>
          {hasActiveFilters && (
            <Badge
              variant="secondary"
              className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {(selectedType ? 1 : 0) + (contractType ? 1 : 0) + (city ? 1 : 0)}
            </Badge>
          )}
        </Button>
      </div>

      {/* Filtres rapides par type */}
      <div className="flex flex-wrap gap-2">
        <Badge
          variant={!selectedType ? "default" : "outline"}
          className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
          onClick={() => {
            startTransition(() => {
              setSelectedType("");
              setPage(1);
            });
          }}
        >
          Toutes ({totalJobs})
        </Badge>
        {JOB_TYPES.map((type) => (
          <Badge
            key={type.value}
            variant={selectedType === type.value ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
            onClick={() => selectJobType(type.value)}
          >
            {type.label}
          </Badge>
        ))}
      </div>

      {/* Filtres avancés */}
      {showAdvanced && (
        <div className="p-4 border rounded-lg bg-muted/50 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Filtres avancés</h3>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4 mr-1" />
                Effacer tout
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Type de contrat
              </label>
              <Select
                value={contractType || "all"}
                onValueChange={(value) => {
                  startTransition(() => {
                    setContractType(value === "all" ? "" : value);
                    setPage(1);
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tous les contrats" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les contrats</SelectItem>
                  {CONTRACT_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Ville</label>
              <Input
                placeholder="Filtrer par ville..."
                value={city}
                onChange={(e) => {
                  startTransition(() => {
                    setCity(e.target.value);
                    setPage(1);
                  });
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Résultats */}
      {hasActiveFilters && (
        <div className="text-sm text-muted-foreground">
          {filteredJobs} résultat{filteredJobs !== 1 ? "s" : ""} sur {totalJobs}{" "}
          offre{totalJobs !== 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
}
