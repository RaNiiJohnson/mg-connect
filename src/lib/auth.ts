import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { sendVerificationEmail } from "./email";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  user: {
    additionalFields: {
      photo: { type: "string", required: false },
      bio: { type: "string", required: false },
      city: { type: "string", required: false },
      arrivalDate: { type: "string", required: false },
      status: { type: "string", required: false },
      field: { type: "string", required: false },
      company: { type: "string", required: false },
      journey: { type: "string[]", required: false },
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      try {
        await sendVerificationEmail(user.email, url);
        console.log(`Email de vérification envoyé à ${user.email}`);
      } catch (error) {
        console.error(
          "Erreur lors de l'envoi de l'email de vérification:",
          error
        );
        throw error;
      }
    },
  },
});
