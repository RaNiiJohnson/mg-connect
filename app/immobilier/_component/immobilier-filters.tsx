"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X } from "lucide-react";
import {
  useQueryState,
  parseAsString,
  parseAsInteger,
  parseAsBoolean,
} from "nuqs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState, useTransition, useCallback } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Input } from "@/components/ui/input";
import { User } from "better-auth";

// Hook personnalisé pour gérer le debounce avec query state
function useDebouncedQueryState(
  key: string,
  parser: ReturnType<typeof parseAsString.withDefault>,
  delay: number = 500
) {
  const [queryValue, setQueryValue] = useQueryState(key, parser);
  const [localValue, setLocalValue] = useState(queryValue);
  const [, startTransition] = useTransition();

  // Utiliser useCallback pour éviter de recréer la fonction à chaque render
  const setDebouncedValue = useCallback(
    (value: string) => {
      setLocalValue(value);

      const timer = setTimeout(() => {
        startTransition(() => {
          setQueryValue(value);
        });
      }, delay);

      return () => clearTimeout(timer);
    },
    [delay, setQueryValue]
  );

  return [localValue, setDebouncedValue, queryValue] as const;
}

const LISTING_TYPES = [
  { value: "Appartement", label: "Appartement" },
  { value: "Maison", label: "Maison" },
  { value: "Studio", label: "Studio" },
  { value: "Colocation", label: "Colocation" },
  { value: "Chambre", label: "Chambre" },
];

const BEDROOMS_OPTIONS = [
  { value: "1", label: "1 chambre" },
  { value: "2", label: "2 chambres" },
  { value: "3", label: "3 chambres" },
  { value: "4", label: "4+ chambres" },
];

export function ImmobilierFilters({ user }: { user: User | null }) {
  const [, startTransition] = useTransition();
  const [, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  // Query states avec debounce
  const [localSearch, setLocalSearch] = useDebouncedQueryState(
    "search",
    parseAsString.withDefault(""),
    500
  );

  const [localMinPrice, setLocalMinPrice] = useDebouncedQueryState(
    "minPrice",
    parseAsString.withDefault(""),
    500
  );

  const [localMaxPrice, setLocalMaxPrice] = useDebouncedQueryState(
    "maxPrice",
    parseAsString.withDefault(""),
    500
  );

  // Query states sans debounce (changement immédiat)
  const [selectedType, setSelectedType] = useQueryState(
    "type",
    parseAsString.withDefault("")
  );
  const [city, setCity] = useQueryState("city", parseAsString.withDefault(""));
  const [bedrooms, setBedrooms] = useQueryState(
    "bedrooms",
    parseAsString.withDefault("")
  );

  const [bookmarked, setBookmarked] = useQueryState(
    "bookmarked",
    parseAsBoolean.withDefault(false)
  );

  const [showAdvanced, setShowAdvanced] = useState(false);

  const clearAllFilters = () => {
    startTransition(() => {
      setLocalSearch("");
      setSelectedType("");
      setCity("");
      setBedrooms("");
      setLocalMinPrice("");
      setLocalMaxPrice("");
      setBookmarked(false);
      setPage(1);
    });
  };

  const selectListingType = (type: string) => {
    startTransition(() => {
      setSelectedType(selectedType === type ? "" : type);
      setBookmarked(false);
      setPage(1);
    });
  };

  const updateBedrooms = (value: string) => {
    startTransition(() => {
      setBedrooms(value === "all" ? "" : value);
      setBookmarked(false);
      setPage(1);
    });
  };

  const toggleBookmarked = () => {
    startTransition(() => {
      setBookmarked(!bookmarked);
      setSelectedType("");
      setPage(1);
    });
  };

  const hasActiveFilters =
    localSearch ||
    selectedType ||
    city ||
    bedrooms ||
    localMinPrice ||
    localMaxPrice;

  const activeFiltersCount =
    (selectedType ? 1 : 0) +
    (city ? 1 : 0) +
    (bedrooms ? 1 : 0) +
    (localMinPrice ? 1 : 0) +
    (localMaxPrice ? 1 : 0);

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {/* Barre de recherche principale */}
      <div className="flex gap-4">
        <InputGroup>
          <InputGroupInput
            placeholder="Rechercher par titre, ville, quartier..."
            className="pl-10"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <Popover open={showAdvanced} onOpenChange={setShowAdvanced}>
              <PopoverTrigger asChild>
                <InputGroupButton variant="outline">
                  <Filter className="h-4 w-4" />
                  <span className="hidden sm:inline">Filtres</span>
                  {hasActiveFilters && (
                    <Badge
                      variant="secondary"
                      className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                    >
                      {activeFiltersCount}
                    </Badge>
                  )}
                </InputGroupButton>
              </PopoverTrigger>
              <PopoverContent className="w-[400px] p-4" align="end">
                <div className="space-y-4" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Filtres avancés</h3>
                    {hasActiveFilters && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAllFilters}
                        className="text-muted-foreground hover:text-foreground h-auto p-0"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Effacer tout
                      </Button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Nombre de chambres
                      </label>
                      <Select
                        value={bedrooms || "all"}
                        onValueChange={updateBedrooms}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Toutes" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Toutes</SelectItem>
                          {BEDROOMS_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Prix min (€)
                        </label>
                        <Input
                          type="number"
                          placeholder="Min"
                          value={localMinPrice}
                          onChange={(e) => setLocalMinPrice(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Prix max (€)
                        </label>
                        <Input
                          type="number"
                          placeholder="Max"
                          value={localMaxPrice}
                          onChange={(e) => setLocalMaxPrice(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </InputGroupAddon>
        </InputGroup>
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
          Tous
        </Badge>
        {LISTING_TYPES.map((type) => (
          <Badge
            key={type.value}
            variant={selectedType === type.value ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
            onClick={() => selectListingType(type.value)}
          >
            {type.label}
          </Badge>
        ))}
        {user && (
          <Badge
            variant={bookmarked ? "default" : "secondary"}
            className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
            onClick={() => toggleBookmarked()}
          >
            Favoris
          </Badge>
        )}
      </div>
    </div>
  );
}
