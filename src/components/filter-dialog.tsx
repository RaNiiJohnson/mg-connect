"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select } from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { X } from "lucide-react";

interface EmploisFilters {
  typeEmploi?: string;
  ville?: string;
  domaine?: string;
}

interface ImmobilierFilters {
  typeLogement?: string;
  prixMin?: number;
  prixMax?: number;
  ville?: string;
  chambres?: string;
  surface?: number;
}

interface CommunauteFilters {
  statut?: string;
  ville?: string;
  domaine?: string;
  anneeArrivee?: string;
}

type FilterType = EmploisFilters | ImmobilierFilters | CommunauteFilters;

interface FilterDialogProps {
  type: "emplois" | "immobilier" | "communaute";
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterType) => void;
}

export function FilterDialog({
  type,
  isOpen,
  onClose,
  onApplyFilters,
}: FilterDialogProps) {
  const [filters] = useState<FilterType>({});

  if (!isOpen) return null;

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const renderEmploisFilters = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="type-emploi">Type d&apos;emploi</Label>
        <Select>
          <option value="">Tous les types</option>
          <option value="au-pair">Au pair</option>
          <option value="ausbildung">Ausbildung</option>
          <option value="fsj">FSJ/FOJ</option>
          <option value="travail">Travail</option>
        </Select>
      </div>

      <div>
        <Label htmlFor="ville">Ville</Label>
        <Input id="ville" placeholder="Berlin, Munich, Hamburg..." />
      </div>

      <div>
        <Label htmlFor="domaine">Domaine</Label>
        <Select>
          <option value="">Tous les domaines</option>
          <option value="informatique">Informatique</option>
          <option value="sante">Santé</option>
          <option value="education">Éducation</option>
          <option value="commerce">Commerce</option>
        </Select>
      </div>
    </div>
  );

  const renderImmobilierFilters = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="type-logement">Type de logement</Label>
        <Select>
          <option value="">Tous les types</option>
          <option value="colocation">Colocation</option>
          <option value="location">Location</option>
          <option value="À courte durée">À courte durée</option>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="prix-min">Prix min (€)</Label>
          <Input id="prix-min" type="number" placeholder="0" />
        </div>
        <div>
          <Label htmlFor="prix-max">Prix max (€)</Label>
          <Input id="prix-max" type="number" placeholder="1000" />
        </div>
      </div>

      <div>
        <Label htmlFor="ville-immo">Ville</Label>
        <Input id="ville-immo" placeholder="Berlin, Munich, Hamburg..." />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="chambres">Nombre de chambres</Label>
          <Select>
            <option value="">Peu importe</option>
            <option value="1">1 chambre</option>
            <option value="2">2 chambres</option>
            <option value="3">3+ chambres</option>
          </Select>
        </div>
        <div>
          <Label htmlFor="surface">Surface min (m²)</Label>
          <Input id="surface" type="number" placeholder="20" />
        </div>
      </div>
    </div>
  );

  const renderCommunauteFilters = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="statut">Statut</Label>
        <Select>
          <option value="">Tous les statuts</option>
          <option value="au-pair">Au pair</option>
          <option value="ausbildung">Ausbildung</option>
          <option value="etudiant">Étudiant</option>
          <option value="fachkraft">Fachkraft</option>
          <option value="fsj">FSJ/FOJ</option>
        </Select>
      </div>

      <div>
        <Label htmlFor="ville-comm">Ville</Label>
        <Input id="ville-comm" placeholder="Berlin, Munich, Hamburg..." />
      </div>

      <div>
        <Label htmlFor="domaine-comm">Domaine de travail</Label>
        <Select>
          <option value="">Tous les domaines</option>
          <option value="informatique">Informatique</option>
          <option value="sante">Santé</option>
          <option value="education">Éducation</option>
          <option value="commerce">Commerce</option>
        </Select>
      </div>

      <div>
        <Label htmlFor="annee-arrivee">Année d&apos;arrivée</Label>
        <Select>
          <option value="">Toutes les années</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021 et avant</option>
        </Select>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md max-h-[80vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Filtres avancés</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {type === "emplois" && renderEmploisFilters()}
          {type === "immobilier" && renderImmobilierFilters()}
          {type === "communaute" && renderCommunauteFilters()}

          <div className="flex gap-2 pt-4">
            <Button onClick={handleApply} className="flex-1">
              Appliquer
            </Button>
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
