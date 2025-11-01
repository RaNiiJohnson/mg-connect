import { AuthNav } from "./auth-nav";
import { ThemeToggle } from "./theme-toggle";
import { HeaderClient } from "./header-client";

export default function Header() {
  return (
    <HeaderClient
      rightSlot={
        <>
          <AuthNav />
          <ThemeToggle />
        </>
      }
    />
  );
}
