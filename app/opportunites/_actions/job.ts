import prisma from "@/lib/prisma";
import { authorized } from "@/lib/orpc/authorized";
import { JobOfferSchema } from "@/lib/orpc/route/schema";
import z from "zod";
import { revalidatePath } from "next/cache";

export const createJobOffer = authorized
  .input(JobOfferSchema.omit({ id: true, authorId: true }))
  .output(JobOfferSchema)
  .handler(async ({ context, input }) => {
    const jobOffer = await prisma.jobOffer.create({
      data: {
        ...input,
        authorId: context.user.id,
      },
    });
    revalidatePath("/opportunites");
    return jobOffer;
  });

export const toggleJobBookmark = authorized
  .input(z.object({ jobId: z.string() }))
  .output(z.boolean())
  .handler(async ({ context, input }) => {
    const existingBookmark = await prisma.jobBookmark.findUnique({
      where: {
        userId_jobId: {
          userId: context.user.id,
          jobId: input.jobId,
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
          userId: context.user.id,
          jobId: input.jobId,
        },
      });
    }

    revalidatePath("/opportunites");
    return !existingBookmark;
  });
