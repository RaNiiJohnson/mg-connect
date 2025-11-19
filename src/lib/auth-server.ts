"use server";

import { auth } from "./auth";
import { headers } from "next/headers";

export const getSession = async () => {
  try {
    // Check if we're in a prerendering context
    const headersList = await headers();
    const session = await auth.api.getSession({
      headers: headersList,
    });

    return session;
  } catch (error) {
    // During prerendering, headers() might not be available
    // Return null to allow static generation
    if (error instanceof Error && error.message.includes("prerender")) {
      return null;
    }
    console.error("Error getting session:", error);
    return null;
  }
};

export const getUser = async () => {
  try {
    const session = await getSession();
    return session?.user || null;
  } catch (error) {
    console.error("Error getting user:", error);
    return null;
  }
};
