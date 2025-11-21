import { getUser } from "@/lib/auth-server";
import { HeaderClient } from "./header-client";

export default async function Header() {
  const user = await getUser();
  return <HeaderClient user={user} />;
}
