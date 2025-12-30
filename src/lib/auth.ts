import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { nextCookies } from "better-auth/next-js";
// import { sendVerificationEmail } from "./email";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
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
      roles: { type: "string[]", required: false },
      isServiceProvider: { type: "boolean", required: false },
    },
  },
  // emailVerification: {
  //   // sendOnSignUp: true,
  //   // autoSignInAfterVerification: true,
  //   sendVerificationEmail: async ({ user, url }) => {
  //     await sendVerificationEmail(user.email, url);
  //     console.log(`Email de vérification envoyé à ${user.email}`);
  //   },
  // },
  plugins: [nextCookies()],
});
