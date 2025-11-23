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

export function ImmobilierFilters() {
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault("")
  );
  const [selectedType, setSelectedType] = useQueryState(
    "type",
    parseAsString.withDefault("")
  );
  const [city, setCity] = useQueryState("city", parseAsString.withDefault(""));
  const [bedrooms, setBedrooms] = useQueryState(
    "bedrooms",
    parseAsString.withDefault("")
  );
  const [minPrice, setMinPrice] = useQueryState(
    "minPrice",
    parseAsString.withDefault("")
  );
  const [maxPrice, setMaxPrice] = useQueryState(
    "maxPrice",
    parseAsString.withDefault("")
  );
  const [, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isPending, startTransition] = useTransition();

  const clearAllFilters = () => {
    startTransition(() => {
      setSearch("");
      setSelectedType("");
      setCity("");
      setBedrooms("");
      setMinPrice("");
      setMaxPrice("");
      setPage(1);
    });
  };

  const selectListingType = (type: string) => {
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

  const hasActiveFilters =
    search || selectedType || city || bedrooms || minPrice || maxPrice;

  return (
    <div className="space-y-4">
      {/* Barre de recherche principale */}
      <div className="flex gap-4">
        <InputGroup>
          <InputGroupInput
            placeholder="Rechercher par titre, ville, quartier..."
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
                        (city ? 1 : 0) +
                        (bedrooms ? 1 : 0) +
                        (minPrice ? 1 : 0) +
                        (maxPrice ? 1 : 0)}
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

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Nombre de chambres
                      </label>
                      <Select
                        value={bedrooms || "all"}
                        onValueChange={(value) => {
                          startTransition(() => {
                            setBedrooms(value === "all" ? "" : value);
                            setPage(1);
                          });
                        }}
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
                          value={minPrice}
                          onChange={(e) => {
                            startTransition(() => {
                              setMinPrice(e.target.value);
                              setPage(1);
                            });
                          }}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Prix max (€)
                        </label>
                        <Input
                          type="number"
                          placeholder="Max"
                          value={maxPrice}
                          onChange={(e) => {
                            startTransition(() => {
                              setMaxPrice(e.target.value);
                              setPage(1);
                            });
                          }}
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
      </div>
    </div>
  );
}
