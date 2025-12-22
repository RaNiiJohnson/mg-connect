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

// Hook personnalisé pour gérer le debounce avec query state
function useDebouncedQueryState(
  key: string,
  parser: ReturnType<typeof parseAsString.withDefault>,
  delay: number = 500
) {
  const [queryValue, setQueryValue] = useQueryState(key, parser);
  const [localValue, setLocalValue] = useState(queryValue);
  const [, startTransition] = useTransition();

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

const JOB_TYPES = [
  { value: "Au pair", label: "Au pair" },
  { value: "Formation", label: "Formation" },
  { value: "Volontariat", label: "Volontariat" },
  { value: "Stage", label: "Stage" },
  { value: "Mini-job", label: "Mini-job" },
  { value: "Emploi", label: "Emploi" },
  { value: "Bourse d'étude", label: "Bourse d'étude" },
];

const CONTRACT_TYPES = [
  { value: "CDD", label: "CDD" },
  { value: "CDI", label: "CDI" },
  { value: "FSJ/FOJ/BFD", label: "FSJ/FOJ/BFD" },
  { value: "Temps plein", label: "Temps plein" },
  { value: "Temps partiel", label: "Temps partiel" },
  { value: "Freelance", label: "Freelance" },
  { value: "Aprentissage", label: "Aprentissage" },
];

export function EmploisFilters() {
  const [, startTransition] = useTransition();
  const [, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  // Query state avec debounce
  const [localSearch, setLocalSearch] = useDebouncedQueryState(
    "search",
    parseAsString.withDefault(""),
    500
  );

  // Query states sans debounce
  const [selectedType, setSelectedType] = useQueryState(
    "type",
    parseAsString.withDefault("")
  );
  const [contractType, setContractType] = useQueryState(
    "contract",
    parseAsString.withDefault("")
  );
  const [city, setCity] = useQueryState("city", parseAsString.withDefault(""));
  const [bookmarked, setBookmarked] = useQueryState(
    "bookmarked",
    parseAsBoolean.withDefault(false)
  );

  const [showAdvanced, setShowAdvanced] = useState(false);

  const clearAllFilters = () => {
    startTransition(() => {
      setLocalSearch("");
      setSelectedType("");
      setContractType("");
      setCity("");
      setPage(1);
    });
  };

  const selectJobType = (type: string) => {
    startTransition(() => {
      setSelectedType(selectedType === type ? "" : type);
      setBookmarked(false);
      setPage(1);
    });
  };

  const toggleBookmarked = () => {
    startTransition(() => {
      setBookmarked(bookmarked === true ? false : true);
      setSelectedType("");
      setPage(1);
    });
  };

  const updateContractType = (value: string) => {
    startTransition(() => {
      setContractType(value === "all" ? "" : value);
      setPage(1);
    });
  };

  const resetFilters = () => {
    startTransition(() => {
      setSelectedType("");
      setBookmarked(false);
      setPage(1);
    });
  };

  const hasActiveFilters = localSearch || selectedType || contractType || city;
  const activeFiltersCount =
    (selectedType ? 1 : 0) + (contractType ? 1 : 0) + (city ? 1 : 0);

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {/* Barre de recherche principale */}
      <div className="flex gap-4">
        <InputGroup>
          <InputGroupInput
            placeholder="Rechercher par titre, ville, type..."
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
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Filtres</h3>
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
                        Type de contrat
                      </label>
                      <Select
                        value={contractType || "all"}
                        onValueChange={updateContractType}
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
          variant={!selectedType && bookmarked !== true ? "default" : "outline"}
          className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
          onClick={resetFilters}
        >
          Toutes
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
        <Badge
          variant={bookmarked === true ? "default" : "secondary"}
          className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
          onClick={toggleBookmarked}
        >
          Favoris
        </Badge>
      </div>
    </div>
  );
}
