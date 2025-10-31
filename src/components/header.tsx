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
import { Suspense, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";

export default function Header() {
  const { data: session, isPending } = authClient.useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur">
        <div className="mx-auto flex sm:gap-10 gap-2 items-center p-4 relative">
          <Link
            href="/"
            className="text-2xl text-primary font-bold hover:opacity-80 transition"
          >
            Hallo
          </Link>
          {/* Navigation Desktop */}
          <nav className="hidden md:flex gap-4 relative">
            {[
              { href: "/", label: "Accueil" },
              { href: "/communaute", label: "Communauté" },
              { href: "/emplois", label: "Emplois" },
              { href: "/immobilier", label: "Immobilier" },
            ].map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                  className="relative"
                >
                  <Link
                    href={item.href}
                    className={`text-accent-foreground/60 font-medium transition-colors relative z-10 ${
                      isActive ? "text-foreground" : "hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      layoutId="activeTab"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.div>
              );
            })}
          </nav>{" "}
          {/* Bouton hamburger mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <X size={24} strokeWidth={3.5} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <Menu size={24} strokeWidth={3.5} />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
          <span className="flex-1" />
          <div className="flex items-center sm:gap-4 gap-2">
            {isPending ? (
              <div className="flex items-center sm:space-x-2 rounded-lg sm:py-2 sm:px-4">
                <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
                <div className="hidden sm:block w-20 h-4 bg-muted animate-pulse rounded" />
              </div>
            ) : session?.user ? (
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center sm:space-x-2 hover:bg-accent rounded-lg sm:py-2 sm:px-4 transition-colors cursor-pointer">
                      <Suspense>
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
                      </Suspense>
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
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="absolute top-full left-0 right-0 md:hidden border-t bg-background/95 backdrop-blur-sm shadow-lg z-40"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <motion.nav
                className="flex flex-col p-4 gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                {[
                  { href: "/", label: "Accueil" },
                  { href: "/communaute", label: "Communauté" },
                  { href: "/emplois", label: "Emplois" },
                  { href: "/immobilier", label: "Immobilier" },
                ].map((item, index) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                      className="relative"
                    >
                      <Link
                        href={item.href}
                        className={`text-accent-foreground/60 font-medium transition-colors p-2 rounded-md block relative z-10 ${
                          isActive
                            ? "text-foreground bg-accent"
                            : "hover:text-foreground hover:bg-accent"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                      {isActive && (
                        <motion.div
                          className="absolute left-0 top-0 bottom-0 w-1 rounded-r-lg"
                          layoutId="activeMobileTab"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}
                    </motion.div>
                  );
                })}
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Overlay pour fermer le menu en cliquant ailleurs */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
