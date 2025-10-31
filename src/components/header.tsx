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
import { LogOut, Menu, X } from "lucide-react";
import { ButtonGroup } from "./ui/button-group";
import { useState } from "react";

export default function Header() {
  const { data: session, isPending } = authClient.useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur">
        <div className="mx-auto flex sm:gap-4 gap-2 items-center p-4 relative">
          <Link
            href="/"
            className="text-2xl text-primary font-bold hover:opacity-80 transition"
          >
            Hallo
          </Link>
          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center gap-4">
            <Link
              href="/"
              className="font-medium hover:text-primary transition-colors"
            >
              Accueil
            </Link>
            <Link
              href="/communaute"
              className="font-medium hover:text-primary transition-colors"
            >
              Communauté
            </Link>
            <Link
              href="/emplois"
              className="font-medium hover:text-primary transition-colors"
            >
              Emplois
            </Link>
            <Link
              href="/immobilier"
              className="font-medium hover:text-primary transition-colors"
            >
              Immobilier
            </Link>
          </nav>{" "}
          {/* Bouton hamburger mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X size={24} strokeWidth={3.5} />
            ) : (
              <Menu size={24} strokeWidth={3.5} />
            )}
          </Button>
          <span className="flex-1" />
          <div className="flex items-center sm:gap-4 gap-2">
            {isPending ? (
              <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
            ) : session?.user ? (
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center sm:space-x-2 hover:bg-accent/50 rounded-lg sm:py-2 sm:px-4 transition-colors cursor-pointer">
                      <Button
                        variant="outline"
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
                      <span className="hidden sm:block text-sm font-medium">
                        {session.user.name || session.user.email}
                      </span>
                    </div>
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
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <ButtonGroup className="hidden sm:flex">
                  <Button asChild>
                    <Link href="/auth/signup">S&apos;inscrire</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/auth/signin">Se connecter</Link>
                  </Button>
                </ButtonGroup>
                <Button asChild className="sm:hidden" size="sm">
                  <Link href="/auth/signin">Connexion</Link>
                </Button>
              </div>
            )}

            <ThemeToggle />
          </div>
        </div>

        {/* Menu mobile */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 md:hidden border-t bg-background/95 backdrop-blur-sm shadow-lg z-40">
            <nav className="flex flex-col p-4 gap-2">
              <Link
                href="/"
                className="font-medium transition-colors p-2 hover:bg-accent rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link
                href="/communaute"
                className="font-medium transition-colors p-2 hover:bg-accent rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Communauté
              </Link>
              <Link
                href="/emplois"
                className="font-medium transition-colors p-2 hover:bg-accent rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Emplois
              </Link>
              <Link
                href="/immobilier"
                className="font-medium transition-colors p-2 hover:bg-accent rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Immobilier
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Overlay pour fermer le menu en cliquant ailleurs */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
