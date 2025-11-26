"use server";

import { revalidatePath } from "next/cache";
import { getUser } from "@/lib/auth-server";
import prisma from "@/lib/prisma";

export async function updateJobTitle(jobId: string, title: string) {
  const user = await getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  // Verify user is the author
  const job = await prisma.jobOffer.findUnique({
    where: { id: jobId },
    select: { authorId: true },
  });

  if (!job || job.authorId !== user.id) {
    throw new Error("Vous n'êtes pas autorisé à modifier cette offre");
  }

  await prisma.jobOffer.update({
    where: { id: jobId },
    data: { title: title.trim() },
  });

  revalidatePath("/opportunites");
  revalidatePath(`/opportunites/${jobId}`);
}

export async function updateJobOffer(
  jobId: string,
  data: {
    title: string;
    company: string;
    type: string;
    contractType: string;
    city: string;
    duration: string;
    salary: string;
    description: string;
    contact: string;
    startDate: string;
    certificates?: string[];
  }
) {
  const user = await getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  // Verify user is the author
  const job = await prisma.jobOffer.findUnique({
    where: { id: jobId },
    select: { authorId: true },
  });

  if (!job || job.authorId !== user.id) {
    throw new Error("Vous n'êtes pas autorisé à modifier cette offre");
  }

  await prisma.jobOffer.update({
    where: { id: jobId },
    data: {
      title: data.title.trim(),
      company: data.company.trim(),
      type: data.type,
      contractType: data.contractType,
      city: data.city.trim(),
      duration: data.duration,
      salary: data.salary,
      description: data.description.trim(),
      contact: data.contact.trim(),
      startDate: data.startDate,
      certificates: data.certificates || [],
    },
  });

  revalidatePath("/opportunites");
  revalidatePath(`/opportunites/${jobId}`);
}
