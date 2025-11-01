"use server";

import { revalidatePath } from "next/cache";
import { getUser } from "./auth-server";
import { createJobOffer } from "./database";

export async function createJobOfferAction(formData: {
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
}) {
  try {
    const user = await getUser();

    if (!user) {
      throw new Error("Vous devez être connecté pour publier une offre");
    }

    // Validation des données
    if (!formData.title?.trim()) {
      throw new Error("Le titre est requis");
    }

    if (!formData.company?.trim()) {
      throw new Error("L'entreprise est requise");
    }

    if (!formData.type?.trim()) {
      throw new Error("Le type d'offre est requis");
    }

    if (!formData.contractType?.trim()) {
      throw new Error("Le type de contrat est requis");
    }

    if (!formData.city?.trim()) {
      throw new Error("La ville est requise");
    }

    if (!formData.startDate?.trim()) {
      throw new Error("La date de début est requise");
    }

    if (!formData.description?.trim()) {
      throw new Error("La description est requise");
    }

    if (!formData.contact?.trim()) {
      throw new Error("Les informations de contact sont requises");
    }

    // Créer l'offre d'emploi
    await createJobOffer(user.id, {
      title: formData.title.trim(),
      type: formData.type,
      contractType: formData.contractType,
      city: formData.city.trim(),
      duration: formData.duration?.trim() || "",
      startDate: formData.startDate,
      company: formData.company.trim(),
      description: formData.description.trim(),
      certificates: formData.certificates || [],
      salary: formData.salary?.trim() || "",
      contact: formData.contact.trim(),
    });

    // Revalider la page des emplois
    revalidatePath("/emplois");

    return { success: true, message: "Offre d'emploi publiée avec succès !" };
  } catch (error) {
    console.error("Erreur lors de la création de l'offre:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Une erreur est survenue",
    };
  }
}
