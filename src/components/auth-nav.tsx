import { getUser } from "@/lib/auth-server";
import { AuthNavClient } from "./auth-nav-client";
import { Suspense } from "react";

async function AuthNavContent() {
  const user = await getUser();
  return <AuthNavClient user={user ?? null} />;
}

export function AuthNav() {
  return (
    <Suspense fallback={<AuthNavClient user={null} />}>
      <AuthNavContent />
    </Suspense>
  );
}
