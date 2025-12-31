import { getUser } from "@/lib/auth-server";
import { HeaderClient } from "./header-client";
import { UserShape } from "./auth-nav-client";

export default async function Header() {
  const user = await getUser();

  // Transform user to match UserShape type
  const userShape: UserShape = user
    ? {
        name: user.name,
        email: user.email,
        image: user.image ?? null,
      }
    : null;

  return <HeaderClient user={userShape} />;
}
