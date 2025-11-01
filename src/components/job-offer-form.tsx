"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
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
import { X, Plus } from "lucide-react";
import { Label } from "@/components/ui/label";

interface JobOfferFormData {
  title: string;
  type: string;
  contractType: string;
  city: string;
  duration: string;
  startDate: string;
  company: string;
  description: string;
  certificates: string[];
  salary: string;
  contact: string;
}

interface JobOfferFormProps {
  onSubmit: (data: JobOfferFormData) => Promise<void>;
  isLoading?: boolean;
}

const jobTypes = [
  "Au pair",
  "Ausbildung",
  "FSJ/FOJ",
  "Stage",
  "Emploi",
  "Freelance",
];

const contractTypes = [
  "CDI",
  "CDD",
  "Stage",
  "Apprentissage",
  "Freelance",
  "Temps partiel",
];

export function JobOfferForm({ onSubmit, isLoading }: JobOfferFormProps) {
  const [certificates, setCertificates] = useState<string[]>([]);
  const [newCertificate, setNewCertificate] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<JobOfferFormData>({
    defaultValues: {
      certificates: [],
    },
  });

  const watchedType = watch("type");
  const watchedContractType = watch("contractType");

  const addCertificate = () => {
    if (
      newCertificate.trim() &&
      !certificates.includes(newCertificate.trim())
    ) {
      const updatedCertificates = [...certificates, newCertificate.trim()];
      setCertificates(updatedCertificates);
      setValue("certificates", updatedCertificates);
      setNewCertificate("");
    }
  };

  const removeCertificate = (index: number) => {
    const updatedCertificates = certificates.filter((_, i) => i !== index);
    setCertificates(updatedCertificates);
    setValue("certificates", updatedCertificates);
  };

  const onFormSubmit = async (data: JobOfferFormData) => {
    await onSubmit({ ...data, certificates });
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Titre de l&apos;offre *</Label>
          <Input
            id="title"
            {...register("title", { required: "Le titre est requis" })}
            placeholder="Ex: Développeur Frontend React"
          />
          {errors.title && (
            <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="company">Entreprise *</Label>
          <Input
            id="company"
            {...register("company", { required: "L'entreprise est requise" })}
            placeholder="Nom de l'entreprise"
          />
          {errors.company && (
            <p className="text-sm text-red-500 mt-1">
              {errors.company.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="type">Type d&apos;offre *</Label>
          <Select
            value={watchedType}
            onValueChange={(value) => setValue("type", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez le type" />
            </SelectTrigger>
            <SelectContent>
              {jobTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.type && (
            <p className="text-sm text-red-500 mt-1">{errors.type.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="contractType">Type de contrat *</Label>
          <Select
            value={watchedContractType}
            onValueChange={(value) => setValue("contractType", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez le contrat" />
            </SelectTrigger>
            <SelectContent>
              {contractTypes.map((contract) => (
                <SelectItem key={contract} value={contract}>
                  {contract}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.contractType && (
            <p className="text-sm text-red-500 mt-1">
              {errors.contractType.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city">Ville *</Label>
          <Input
            id="city"
            {...register("city", { required: "La ville est requise" })}
            placeholder="Berlin, Munich, Hamburg..."
          />
          {errors.city && (
            <p className="text-sm text-red-500 mt-1">{errors.city.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="salary">Salaire</Label>
          <Input
            id="salary"
            {...register("salary")}
            placeholder="Ex: 2500€/mois, À négocier"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="startDate">Date de début *</Label>
          <Input
            id="startDate"
            type="date"
            {...register("startDate", {
              required: "La date de début est requise",
            })}
          />
          {errors.startDate && (
            <p className="text-sm text-red-500 mt-1">
              {errors.startDate.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="duration">Durée</Label>
          <Input
            id="duration"
            {...register("duration")}
            placeholder="Ex: 6 mois, 2 ans, Indéterminée"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          {...register("description", {
            required: "La description est requise",
          })}
          placeholder="Décrivez le poste, les missions, les compétences requises..."
          rows={4}
        />
        {errors.description && (
          <p className="text-sm text-red-500 mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="certificates">Certificats requis</Label>
        <div className="flex gap-2 mb-2">
          <Input
            value={newCertificate}
            onChange={(e) => setNewCertificate(e.target.value)}
            placeholder="Ex: Permis B, Allemand B2..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addCertificate();
              }
            }}
          />
          <Button type="button" onClick={addCertificate} size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {certificates.map((cert, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {cert}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => removeCertificate(index)}
              />
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="contact">Contact *</Label>
        <Input
          id="contact"
          {...register("contact", {
            required: "Les informations de contact sont requises",
          })}
          placeholder="Email, téléphone ou autre moyen de contact"
        />
        {errors.contact && (
          <p className="text-sm text-red-500 mt-1">{errors.contact.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Publication..." : "Publier l'offre"}
      </Button>
    </form>
  );
}
