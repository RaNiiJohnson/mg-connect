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

const STATUS_OPTIONS = [
  { value: "Étudiant", label: "Étudiant" },
  { value: "Au Pair", label: "Au Pair" },
  { value: "Professionnel", label: "Professionnel" },
  { value: "Autre", label: "Autre" },
];

const CITY_OPTIONS = [
  { value: "Berlin", label: "Berlin" },
  { value: "Munich", label: "Munich" },
  { value: "Hamburg", label: "Hamburg" },
  { value: "Frankfurt", label: "Frankfurt" },
  { value: "Cologne", label: "Cologne" },
];

export function CommunauteFilters() {
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault("")
  );
  const [selectedStatus, setSelectedStatus] = useQueryState(
    "status",
    parseAsString.withDefault("")
  );
  const [city, setCity] = useQueryState("city", parseAsString.withDefault(""));
  const [field, setField] = useQueryState(
    "field",
    parseAsString.withDefault("")
  );
  const [, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isPending, startTransition] = useTransition();

  const clearAllFilters = () => {
    startTransition(() => {
      setSearch("");
      setSelectedStatus("");
      setCity("");
      setField("");
      setPage(1);
    });
  };

  const selectStatus = (status: string) => {
    startTransition(() => {
      // Si on clique sur le statut déjà sélectionné, on le désélectionne
      if (selectedStatus === status) {
        setSelectedStatus("");
      } else {
        setSelectedStatus(status);
      }
      setPage(1);
    });
  };

  const hasActiveFilters = search || selectedStatus || city || field;

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {/* Barre de recherche principale */}
      <div className="flex gap-4">
        <InputGroup>
          <InputGroupInput
            placeholder="Rechercher par nom, ville, domaine..."
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
                      {(selectedStatus ? 1 : 0) +
                        (city ? 1 : 0) +
                        (field ? 1 : 0)}
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
                      <Select
                        value={city || "all"}
                        onValueChange={(value) => {
                          startTransition(() => {
                            setCity(value === "all" ? "" : value);
                            setPage(1);
                          });
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Toutes" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Toutes</SelectItem>
                          {CITY_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Domaine
                      </label>
                      <Input
                        placeholder="Filtrer par domaine..."
                        value={field}
                        onChange={(e) => {
                          startTransition(() => {
                            setField(e.target.value);
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

      {/* Filtres rapides par statut */}
      <div className="flex flex-wrap gap-2">
        <Badge
          variant={!selectedStatus ? "default" : "outline"}
          className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
          onClick={() => {
            startTransition(() => {
              setSelectedStatus("");
              setPage(1);
            });
          }}
        >
          Tous
        </Badge>
        {STATUS_OPTIONS.map((status) => (
          <Badge
            key={status.value}
            variant={selectedStatus === status.value ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
            onClick={() => selectStatus(status.value)}
          >
            {status.label}
          </Badge>
        ))}
      </div>
    </div>
  );
}
