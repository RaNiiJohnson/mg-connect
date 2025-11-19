import { createJobOffer, getAllJobOffers } from "@/lib/database";

export const router = {
  jobOffer: {
    createJobOffer: createJobOffer,
    getJobOffers: getAllJobOffers,
  },
};
