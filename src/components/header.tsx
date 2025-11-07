import { AuthNav } from "./auth-nav";
import { HeaderClient } from "./header-client";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";

export default function Header() {
  return (
    <HeaderClient
      rightSlot={
        <>
          <AuthNav />
          <AnimatedThemeToggler />
        </>
      }
    />
  );
}
