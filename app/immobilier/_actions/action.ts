import { authorized } from "@/lib/orpc/authorized";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const toggleRealEstateBookmark = authorized
  .input(z.object({ listingId: z.string() }))
  .output(z.boolean())
  .handler(async ({ context, input }) => {
    const existingBookmark = await prisma.realEstateBookmark.findUnique({
      where: {
        userId_listingId: {
          userId: context.user.id,
          listingId: input.listingId,
        },
      },
    });

    if (existingBookmark) {
      await prisma.realEstateBookmark.delete({
        where: {
          id: existingBookmark.id,
        },
      });
    } else {
      await prisma.realEstateBookmark.create({
        data: {
          userId: context.user.id,
          listingId: input.listingId,
        },
      });
    }

    revalidatePath(`/immobilier/${input.listingId}`);
    revalidatePath(`/immobilier`);
    return !existingBookmark;
  });
