"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Users } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function NotFound() {
  const { data: session } = authClient.useSession();
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* 404 Animation/Visual */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary/20 mb-4">404</h1>
          <div className="text-6xl mb-6">🏝️</div>
        </div>

        {/* Error Message */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
          Oups! Page introuvable
        </h2>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Il semblerait que cette page se soit perdue quelque part entre
          Madagascar et l&apos;Allemagne. Pas de panique, nous allons vous aider
          à retrouver votre chemin!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Retour à l&apos;accueil
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="text-lg px-8 py-6"
          >
            <Link href="/communaute">
              <Users className="mr-2 h-5 w-5" />
              Voir la communauté
            </Link>
          </Button>
        </div>

        {/* Helpful Links */}
        <div className="border-t pt-8">
          <p className="text-sm text-muted-foreground mb-4">
            Vous cherchiez peut-être:
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/communaute" className="text-primary hover:underline">
              Communauté
            </Link>
            <Link href="/emplois" className="text-primary hover:underline">
              Emplois
            </Link>
            <Link href="/immobilier" className="text-primary hover:underline">
              Immobilier
            </Link>
            {!session && (
              <Link
                href="/auth/signin"
                className="text-primary hover:underline"
              >
                Se connecter
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
