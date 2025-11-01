import { getUser } from "@/lib/auth-server";
import { AuthNavClient } from "./auth-nav-client";

export async function AuthNav() {
  const user = await getUser();
  return <AuthNavClient user={user ?? null} />;
}
