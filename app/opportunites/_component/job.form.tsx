"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { XIcon } from "lucide-react";
import { client } from "@/lib/orpc/orpc";
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
const formSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  type: z.string().min(1, "Le type d'offre est requis"),
  contractType: z.string().min(1, "Le type de contrat est requis"),
  city: z.string().min(1, "La ville est requise"),
  duration: z.string().min(1, "La durée est requise"),
  startDate: z.string().min(1, "La date de début est requise"),
  company: z.string().min(1, "L'entreprise est requise"),
  description: z
    .string()
    .min(10, "La description doit contenir au moins 10 caractères"),
  certificates: z
    .array(
      z.object({
        certificate: z.string(),
      })
    )
    .min(1, "Ajoutez au moins un certificat.")
    .max(5, "Vous pouvez ajouter jusqu'à 5 certificats."),
  salary: z.string().min(1, "Le salaire est requis"),
  contact: z.string().min(1, "Les informations de contact sont requises"),
});

interface JobFormProps {
  onSuccess?: () => void;
}

export function JobForm({ onSuccess }: JobFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      type: "",
      contractType: "",
      city: "",
      duration: "",
      startDate: "",
      company: "",
      description: "",
      certificates: [{ certificate: "" }, { certificate: "" }],
      salary: "",
      contact: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "certificates",
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await client.jobOffer.createJobOffer({
        ...data,
        certificates: data.certificates
          .map((cert) => cert.certificate)
          .filter((cert) => cert.trim() !== ""),
      });

      toast.success("Offre d'emploi publiée avec succès !");
      form.reset();
      onSuccess?.();
    } catch (error) {
      console.error("Erreur lors de la création de l'offre:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue lors de la publication"
      );
    }
  }

  return (
    <div>
      <form id="job-offer-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          {/* Titre et Entreprise */}
          <div className="grid md:grid-cols-2 gap-4">
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="job-title">
                    Titre de l&apos;offre *
                  </FieldLabel>
                  <Input
                    {...field}
                    id="job-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Ex: Développeur Frontend React"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="company"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="job-company">Entreprise *</FieldLabel>
                  <Input
                    {...field}
                    id="job-company"
                    aria-invalid={fieldState.invalid}
                    placeholder="Nom de l'entreprise"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* Type d'offre et Type de contrat */}
          <div className="grid md:grid-cols-2 gap-4">
            <Controller
              name="type"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="job-type">
                    Type d&apos;offre *
                  </FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id="job-type"
                      aria-invalid={fieldState.invalid}
                    >
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
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="contractType"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="job-contract">
                    Type de contrat *
                  </FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id="job-contract"
                      aria-invalid={fieldState.invalid}
                    >
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
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* Ville et Salaire */}
          <div className="grid md:grid-cols-2 gap-4">
            <Controller
              name="city"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="job-city">Ville *</FieldLabel>
                  <Input
                    {...field}
                    id="job-city"
                    aria-invalid={fieldState.invalid}
                    placeholder="Berlin, Munich, Hamburg..."
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="salary"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="job-salary">Salaire *</FieldLabel>
                  <Input
                    {...field}
                    id="job-salary"
                    aria-invalid={fieldState.invalid}
                    placeholder="Ex: 2500€/mois, À négocier"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* Date de début et Durée */}
          <div className="grid md:grid-cols-2 gap-4">
            <Controller
              name="startDate"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="job-start-date">
                    Date de début *
                  </FieldLabel>
                  <Input
                    {...field}
                    id="job-start-date"
                    type="date"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="duration"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="job-duration">Durée *</FieldLabel>
                  <Input
                    {...field}
                    id="job-duration"
                    aria-invalid={fieldState.invalid}
                    placeholder="Ex: 6 mois, 2 ans, Indéterminée"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* Description */}
          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="job-description">Description *</FieldLabel>
                <InputGroup>
                  <InputGroupTextarea
                    {...field}
                    id="job-description"
                    placeholder="Décrivez le poste, les missions, les compétences requises..."
                    rows={4}
                    className="min-h-24 resize-none"
                    aria-invalid={fieldState.invalid}
                  />
                  <InputGroupAddon align="block-end">
                    <InputGroupText className="tabular-nums">
                      {field.value.length} caractères
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                <FieldDescription>
                  Décrivez le poste, les missions et les compétences requises
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Contact */}
          <Controller
            name="contact"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="job-contact">Contact *</FieldLabel>
                <InputGroup>
                  <InputGroupTextarea
                    {...field}
                    id="job-contact"
                    placeholder="Email, téléphone, ou autres informations de contact..."
                    rows={2}
                    className="min-h-16 resize-none"
                    aria-invalid={fieldState.invalid}
                  />
                </InputGroup>
                <FieldDescription>
                  Indiquez comment les candidats peuvent vous contacter
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Certificats */}
          <FieldSet className="gap-4">
            <FieldLegend variant="label">Cértificat</FieldLegend>
            <FieldDescription>
              Ajoutez jusqu&apos;à 5 certificats requis pour ce poste.
            </FieldDescription>
            <FieldGroup className="gap-4">
              {fields.map((field, index) => (
                <Controller
                  key={field.id}
                  name={`certificates.${index}.certificate`}
                  control={form.control}
                  render={({ field: controllerField, fieldState }) => (
                    <Field
                      orientation="horizontal"
                      data-invalid={fieldState.invalid}
                    >
                      <FieldContent>
                        <InputGroup>
                          <InputGroupInput
                            {...controllerField}
                            id={`form-rhf-array-certificate-${index}`}
                            aria-invalid={fieldState.invalid}
                            placeholder="Ex: Permis B, Allemand B2..."
                            type="text"
                            autoComplete="off"
                          />
                          {fields.length > 1 && (
                            <InputGroupAddon align="inline-end">
                              <InputGroupButton
                                type="button"
                                variant="ghost"
                                size="icon-xs"
                                onClick={() => remove(index)}
                                aria-label={`Remove certificat ${index + 1}`}
                              >
                                <XIcon />
                              </InputGroupButton>
                            </InputGroupAddon>
                          )}
                        </InputGroup>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </FieldContent>
                    </Field>
                  )}
                />
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ certificate: "" })}
                disabled={fields.length >= 5}
              >
                Ajouter un certificat
              </Button>
            </FieldGroup>
            {form.formState.errors.certificates?.root && (
              <FieldError errors={[form.formState.errors.certificates.root]} />
            )}
          </FieldSet>
        </FieldGroup>
      </form>

      <Field orientation="horizontal" className="mt-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            form.reset();
          }}
        >
          Réinitialiser
        </Button>
        <Button
          type="submit"
          form="job-offer-form"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Publication..." : "Publier l'offre"}
        </Button>
      </Field>
    </div>
  );
}
