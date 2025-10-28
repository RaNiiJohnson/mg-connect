"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { ButtonGroup } from "./ui/button-group";

export default function Header() {
  const { data: session, isPending } = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur">
      <div className="mx-auto flex gap-4 items-center p-4">
        <Link
          href="/"
          className="text-2xl text-primary font-bold hover:opacity-80 transition"
        >
          Hallo
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/"
            className=" font-medium hover:text-primary transition-colors"
          >
            Accueil
          </Link>
          <Link
            href="/actualites"
            className=" font-medium hover:text-primary transition-colors"
          >
            Actualités
          </Link>
          <Link
            href="/evenements"
            className=" font-medium hover:text-primary transition-colors"
          >
            Événements
          </Link>
        </nav>
        <span className="flex-1" />

        <div className="flex items-center gap-4 ">
          {isPending ? (
            <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
          ) : session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={session.user.image || ""}
                      alt={session.user.name || ""}
                    />
                    <AvatarFallback>
                      {session.user.name?.charAt(0)?.toUpperCase() ||
                        session.user.email?.charAt(0)?.toUpperCase() ||
                        "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    {session.user.name && (
                      <p className="font-medium">{session.user.name}</p>
                    )}
                    {session.user.email && (
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {session.user.email}
                      </p>
                    )}
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Se déconnecter</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <ButtonGroup>
                <Button asChild>
                  <Link href="/auth/signup">S&apos;inscrire</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/auth/signin">Se connecter</Link>
                </Button>
              </ButtonGroup>
            </div>
          )}

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
