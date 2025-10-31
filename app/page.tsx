"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  Briefcase,
  Home,
  Heart,
  Globe,
  HandHeart,
  User,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function HomePage() {
  const { data: session } = authClient.useSession();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full flex items-center justify-center">
        <div className="text-center p-4 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-primary">
            Hallo Hallo
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground leading-relaxed">
            Nous sommes une communauté dédiée aux réseautages entre natif et
            diaspora Malagasy en Allemagne. Une plateforme d&apos;échange et de
            partage pour favoriser l&apos;entraide entre les jeunes expats de
            Madagascar.
          </p>

          {session?.user ? (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-lg px-8 py-6">
                  <Link href="/communaute">
                    <Users className="mr-2 h-5 w-5" />
                    Voir la communauté
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6"
                >
                  <Link href="/profile">
                    <User className="mr-2 h-5 w-5" />
                    Mon profil
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/auth/signup">S&apos;inscrire</Link>
            </Button>
          )}
        </div>
      </section>

      {/* À propos Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            À propos de nous
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Heart className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Notre Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Créer un pont entre les Malagasy vivant en Allemagne et ceux
                  restés au pays, facilitant l&apos;intégration et le partage
                  d&apos;expériences.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Globe className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Notre Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Devenir la référence pour la communauté Malagasy en Allemagne,
                  un espace d&apos;entraide et de croissance mutuelle.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <HandHeart className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Nos Valeurs</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Solidarité, respect, partage et entraide. Nous croyons en la
                  force de la communauté pour surmonter les défis de
                  l&apos;expatriation.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Nos Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow flex flex-col">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Communauté</CardTitle>
                <CardDescription>
                  Connectez-vous avec d&apos;autres Malagasy en Allemagne
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex items-end">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/communaute">Découvrir</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow flex flex-col">
              <CardHeader>
                <Briefcase className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Emplois</CardTitle>
                <CardDescription>
                  Trouvez des opportunités d&apos;emploi et de formation
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex items-end">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/emplois">Explorer</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow flex flex-col">
              <CardHeader>
                <Home className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Immobilier</CardTitle>
                <CardDescription>
                  Partagez et trouvez des logements
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex items-end">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/immobilier">Voir les annonces</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
