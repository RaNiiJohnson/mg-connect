"use client";

import { useSession } from "@/lib/auth-client";
import { AuthNavClient, UserShape } from "./auth-nav-client";

export function AuthSection() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex items-center sm:gap-4 gap-2">
        <div className="hidden sm:flex gap-2">
          <div className="h-9 w-20 bg-muted animate-pulse rounded" />
          <div className="h-9 w-24 bg-muted animate-pulse rounded" />
        </div>
        <div className="h-9 w-20 bg-muted animate-pulse rounded sm:hidden" />
      </div>
    );
  }

  // Transform user to match UserShape type
  const userShape: UserShape = session?.user
    ? {
        name: session.user.name,
        email: session.user.email,
        image: session.user.image ?? null,
      }
    : null;

  return <AuthNavClient user={userShape} />;
}
