"use server";

import prisma from "@/lib/prisma";
import { getUser } from "@/lib/auth-server";
import { revalidatePath } from "next/cache";

export async function toggleJobBookmark(jobId: string) {
  const user = await getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const existingBookmark = await prisma.jobBookmark.findUnique({
    where: {
      userId_jobId: {
        userId: user.id,
        jobId,
      },
    },
  });

  if (existingBookmark) {
    await prisma.jobBookmark.delete({
      where: {
        id: existingBookmark.id,
      },
    });
  } else {
    await prisma.jobBookmark.create({
      data: {
        userId: user.id,
        jobId,
      },
    });
  }

  revalidatePath("/opportunites");
  return !existingBookmark;
}
