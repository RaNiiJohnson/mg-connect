import { AuthNav } from "./auth-nav";
import { HeaderClient } from "./header-client";
import { ThemeToggle } from "./theme-toggle";

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
