import z from "zod";

export const JobOfferSchema = z.object({
  id: z.string(),
  authorId: z.string(),
  title: z.string(),
  type: z.string(),
  contractType: z.string(),
  city: z.string(),
  duration: z.string(),
  startDate: z.string(),
  company: z.string(),
  description: z.string(),
  certificates: z.array(z.string()),
  salary: z.string(),
  contact: z.string(),
});

export const JobOfferWithAuthorSchema = JobOfferSchema.extend({
  createdAt: z.date(),
  updatedAt: z.date(),
  author: z.object({
    id: z.string(),
    name: z.string().nullable(),
    photo: z.string().nullable(),
  }),
});
