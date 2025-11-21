"use client";

import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";
import { AuthNavClient, UserShape } from "./auth-nav-client";

type HeaderClientProps = {
  user: UserShape;
};

export function HeaderClient({ user }: HeaderClientProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Header transparent et fixe sur la page d'accueil, sticky sur les autres
  const isHomePage = pathname === "/";
  const headerClasses = isHomePage
    ? "fixed top-0 z-50 w-full bg-transparent backdrop-blur-lg"
    : "sticky top-0 z-50 w-full bg-transparent backdrop-blur-lg";

  return (
    <header className={`${headerClasses} + h-16`}>
      <div className="mx-auto flex sm:gap-10 gap-2 items-center p-4 relative">
        <Link
          href="/"
          className="text-2xl text-primary font-bold hover:opacity-80 transition"
        >
          Hallo
        </Link>
        {/* Navigation Desktop */}
        <nav className="hidden md:flex gap-4 relative">
          {/* Accueil */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="relative"
          >
            <Link
              href="/"
              className={`text-accent-foreground/60 font-medium transition-colors relative z-10 ${
                pathname === "/" ? "text-foreground" : "hover:text-foreground"
              }`}
            >
              Accueil
            </Link>
            {pathname === "/" && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                layoutId="activeTab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </motion.div>

          {/* Communauté */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="relative"
          >
            <Link
              href="/communaute"
              className={`text-accent-foreground/60 font-medium transition-colors relative z-10 ${
                pathname === "/communaute"
                  ? "text-foreground"
                  : "hover:text-foreground"
              }`}
            >
              Communauté
            </Link>
            {pathname === "/communaute" && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                layoutId="activeTab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </motion.div>

          {/* Emplois */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="relative"
          >
            <Link
              href="/emplois"
              className={`text-accent-foreground/60 font-medium transition-colors relative z-10 ${
                pathname === "/emplois"
                  ? "text-foreground"
                  : "hover:text-foreground"
              }`}
            >
              Emplois
            </Link>
            {pathname === "/emplois" && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                layoutId="activeTab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </motion.div>

          {/* Immobilier */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="relative"
          >
            <Link
              href="/immobilier"
              className={`text-accent-foreground/60 font-medium transition-colors relative z-10 ${
                pathname === "/immobilier"
                  ? "text-foreground"
                  : "hover:text-foreground"
              }`}
            >
              Immobilier
            </Link>
            {pathname === "/immobilier" && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                layoutId="activeTab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </motion.div>

          {/* Premium - Styles spéciaux */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="relative"
          >
            <Link
              href="/pricing"
              className={`font-medium transition-all relative z-10 px-3 py-1.5 rounded-full border-2 ${
                pathname === "/pricing"
                  ? "text-white bg-linear-to-r from-purple-500 to-pink-500 border-transparent shadow-lg"
                  : "text-transparent bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text border-gradient-to-r hover:shadow-lg hover:scale-105"
              }`}
              style={{
                borderImage:
                  pathname !== "/pricing"
                    ? "linear-gradient(to right, #a855f7, #ec4899) 1"
                    : undefined,
              }}
            >
              Passer au Premium
            </Link>
            {pathname === "/pricing" && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-purple-500 to-pink-500"
                layoutId="activeTab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </motion.div>
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
          <AuthNavClient user={user} />
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
              {/* Accueil Mobile */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="relative"
              >
                <Link
                  href="/"
                  className={`text-accent-foreground/60 font-medium transition-colors p-2 rounded-md block relative z-10 ${
                    pathname === "/"
                      ? "text-foreground bg-accent"
                      : "hover:text-foreground hover:bg-accent"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Accueil
                </Link>
                {pathname === "/" && (
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-1 rounded-r-lg bg-primary"
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

              {/* Communauté Mobile */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="relative"
              >
                <Link
                  href="/communaute"
                  className={`text-accent-foreground/60 font-medium transition-colors p-2 rounded-md block relative z-10 ${
                    pathname === "/communaute"
                      ? "text-foreground bg-accent"
                      : "hover:text-foreground hover:bg-accent"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Communauté
                </Link>
                {pathname === "/communaute" && (
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-1 rounded-r-lg bg-primary"
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

              {/* Emplois Mobile */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="relative"
              >
                <Link
                  href="/emplois"
                  className={`text-accent-foreground/60 font-medium transition-colors p-2 rounded-md block relative z-10 ${
                    pathname === "/emplois"
                      ? "text-foreground bg-accent"
                      : "hover:text-foreground hover:bg-accent"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Emplois
                </Link>
                {pathname === "/emplois" && (
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-1 rounded-r-lg bg-primary"
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

              {/* Immobilier Mobile */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="relative"
              >
                <Link
                  href="/immobilier"
                  className={`text-accent-foreground/60 font-medium transition-colors p-2 rounded-md block relative z-10 ${
                    pathname === "/immobilier"
                      ? "text-foreground bg-accent"
                      : "hover:text-foreground hover:bg-accent"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Immobilier
                </Link>
                {pathname === "/immobilier" && (
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-1 rounded-r-lg bg-primary"
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

              {/* Premium Mobile - Styles spéciaux */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="relative"
              >
                <Link
                  href="/pricing"
                  className={`font-medium transition-all p-2 rounded-md block relative z-10 ${
                    pathname === "/pricing"
                      ? "text-white bg-linear-to-r from-purple-500 to-pink-500 shadow-lg"
                      : "text-transparent bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text hover:text-foreground hover:bg-accent"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Passer au Premium
                </Link>
                {pathname === "/pricing" && (
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-1 rounded-r-lg bg-linear-to-b from-purple-500 to-pink-500"
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
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
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
    </header>
  );
}
