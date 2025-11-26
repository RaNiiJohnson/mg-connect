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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState, useTransition } from "react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

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
  const [bookmarked, setBookmarked] = useQueryState(
    "bookmarked",
    parseAsString.withDefault("false")
  );
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
        setBookmarked("false");
      }
      setPage(1);
    });
  };

  const hasActiveFilters = search || selectedType || contractType || city;

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {/* Barre de recherche principale */}
      <div className="flex gap-4">
        <InputGroup>
          <InputGroupInput
            placeholder="Rechercher par titre, ville ..."
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
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <Popover open={showAdvanced} onOpenChange={setShowAdvanced}>
              <PopoverTrigger asChild>
                <InputGroupButton variant="outline" disabled={isPending}>
                  <Filter className="h-4 w-4" />
                  <span className="hidden sm:inline">Filtres</span>
                  {hasActiveFilters && (
                    <Badge
                      variant="secondary"
                      className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                    >
                      {(selectedType ? 1 : 0) +
                        (contractType ? 1 : 0) +
                        (city ? 1 : 0)}
                    </Badge>
                  )}
                </InputGroupButton>
              </PopoverTrigger>
              <PopoverContent className="w-[400px] p-4" align="end">
                <div className="space-y-4">
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
                      <label className="text-sm font-medium mb-2 block">
                        Ville
                      </label>
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
              </PopoverContent>
            </Popover>
          </InputGroupAddon>
        </InputGroup>
      </div>

      {/* Filtres rapides par type */}
      <div className="flex flex-wrap gap-2">
        <Badge
          variant={
            !selectedType && bookmarked !== "true" ? "default" : "outline"
          }
          className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
          onClick={() => {
            startTransition(() => {
              setSelectedType("");
              setBookmarked("false");
              setPage(1);
            });
          }}
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
          variant={bookmarked === "true" ? "default" : "secondary"}
          className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
          onClick={() => {
            startTransition(() => {
              if (bookmarked === "true") {
                setBookmarked("false");
              } else {
                setBookmarked("true");
                setSelectedType(""); // Optional: clear type filter when selecting bookmarks
              }
              setPage(1);
            });
          }}
        >
          Favoris
        </Badge>
      </div>
    </div>
  );
}
