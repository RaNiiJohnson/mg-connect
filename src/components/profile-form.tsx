"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface ProfileFormData {
  name: string;
  photo: string;
  bio: string;
  city: string;
  arrivalDate: string;
  status: string;
  field: string;
  company: string;
  journey: string[];
}

interface ProfileFormProps {
  initialData?: Partial<ProfileFormData>;
  onSubmit: (data: ProfileFormData) => Promise<void>;
  isLoading?: boolean;
}

const statusOptions = [
  "Au pair",
  "Ausbildung",
  "Étudiant",
  "Fachkraft",
  "FSJ/FOJ",
];

const fieldOptions = [
  "Informatique",
  "Santé",
  "Éducation",
  "Ingénierie",
  "Commerce",
  "Arts",
  "Autre",
];

export function ProfileForm({
  initialData,
  onSubmit,
  isLoading,
}: ProfileFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    photo: initialData?.photo || "",
    bio: initialData?.bio || "",
    city: initialData?.city || "",
    arrivalDate: initialData?.arrivalDate || "",
    status: initialData?.status || "",
    field: initialData?.field || "",
    company: initialData?.company || "",
    journey: initialData?.journey || [],
  });

  const [newJourneyStep, setNewJourneyStep] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const addJourneyStep = () => {
    if (newJourneyStep.trim()) {
      setFormData({
        ...formData,
        journey: [...formData.journey, newJourneyStep.trim()],
      });
      setNewJourneyStep("");
    }
  };

  const removeJourneyStep = (index: number) => {
    setFormData({
      ...formData,
      journey: formData.journey.filter((_, i) => i !== index),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Nom complet</label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Votre nom complet"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Photo de profil (URL)
          </label>
          <Input
            value={formData.photo}
            onChange={(e) =>
              setFormData({ ...formData, photo: e.target.value })
            }
            placeholder="https://..."
            type="url"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Bio</label>
        <Textarea
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          placeholder="Parlez-nous de vous, votre expérience en Allemagne..."
          rows={4}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Ville</label>
          <Input
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            placeholder="Berlin, Munich, Hamburg..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Année d&apos;arrivée
          </label>
          <Input
            value={formData.arrivalDate}
            onChange={(e) =>
              setFormData({ ...formData, arrivalDate: e.target.value })
            }
            placeholder="2023"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Statut</label>
          <Select
            value={formData.status}
            onValueChange={(value) =>
              setFormData({ ...formData, status: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez votre statut" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Domaine</label>
          <Select
            value={formData.field}
            onValueChange={(value) =>
              setFormData({ ...formData, field: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez votre domaine" />
            </SelectTrigger>
            <SelectContent>
              {fieldOptions.map((field) => (
                <SelectItem key={field} value={field}>
                  {field}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Entreprise/Organisation actuelle
        </label>
        <Input
          value={formData.company}
          onChange={(e) =>
            setFormData({ ...formData, company: e.target.value })
          }
          placeholder="Nom de votre entreprise ou organisation"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Parcours en Allemagne
        </label>
        <div className="flex gap-2 mb-2">
          <Input
            value={newJourneyStep}
            onChange={(e) => setNewJourneyStep(e.target.value)}
            placeholder="Ajouter une étape (ex: Goethe Institut)"
            onKeyPress={(e) =>
              e.key === "Enter" && (e.preventDefault(), addJourneyStep())
            }
          />
          <Button type="button" onClick={addJourneyStep}>
            Ajouter
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.journey.map((step, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {step}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => removeJourneyStep(index)}
              />
            </Badge>
          ))}
        </div>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Enregistrement..." : "Enregistrer le profil"}
      </Button>
    </form>
  );
}
