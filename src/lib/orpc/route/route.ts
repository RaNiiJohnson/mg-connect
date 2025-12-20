import { toggleRealEstateBookmark } from "@app/immobilier/_actions/action";
import {
  createJobOffer,
  toggleJobBookmark,
  updateJobOffer,
  deleteJobOffer,
} from "@app/opportunites/_actions/job";

export const router = {
  jobOffer: {
    createJobOffer,
    toggleJobBookmark,
    updateJobOffer,
    deleteJobOffer,
  },
  realEstate: {
    toggleRealEstateBookmark,
  },
};
