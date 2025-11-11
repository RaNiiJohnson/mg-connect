// app/page.tsx
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
  Sparkles,
  ArrowRightIcon,
} from "lucide-react";
import { getUser } from "@/lib/auth-server";
import { Suspense } from "react";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import { ShineBorder } from "@/components/ui/shine-border";

import { LightRays } from "@/components/ui/light-rays";
import { Highlighter } from "@/components/ui/highlighter";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CTApricing from "@/components/CTA.pricing";

const reviews = [
  {
    icon: "Heart",
    title: "Mission",
    titleAccordion: "Notre Mission",
    description:
      "Créer un pont entre les Malagasy vivant en Allemagne et ceux restés au pays, facilitant l'intégration et le partage d'expériences.",
  },
  {
    icon: "Globe",
    title: "Vision",
    titleAccordion: "Notre Vision",
    description:
      "Devenir la référence pour la communauté Malagasy en Allemagne, un espace d'entraide et de croissance mutuelle.",
  },
  {
    icon: "HandHeart",
    title: "Valeurs",
    titleAccordion: "Nos Valeurs",
    description:
      "Solidarité, partage et entraide. La force de la communauté pour surmonter ensemble les défis de l'expatriation.",
  },
  {
    icon: "Users",
    title: "Engagement",
    titleAccordion: "Notre Engagement",
    description:
      "Offrir une solution pratique pour faciliter l’épanouissement de chaque membre, en simplifiant son quotidien et en ouvrant des opportunités.",
  },
  {
    icon: "Sparkles",
    title: "Identité",
    titleAccordion: "Notre Identité",
    description:
      "Préserver et célébrer la culture Malagasy tout en embrassant la diversité allemande, pour représenter fièrement notre pays.",
  },
];

const firstRow = reviews;

const ReviewCard = ({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) => {
  const iconMap = {
    Heart,
    Globe,
    HandHeart,
    Users,
    Sparkles,
  };

  const IconComponent = iconMap[icon as keyof typeof iconMap];

  return (
    <figure
      className={cn(
        "relative h-full w-70 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/10 bg-gray-950/1 hover:bg-gray-950/5",
        // dark styles
        "dark:border-gray-50/10 dark:bg-gray-50/10 dark:hover:bg-gray-50/15"
      )}
    >
      <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
      <div className="flex flex-row items-center gap-3">
        {IconComponent && <IconComponent className="h-6 w-6 text-primary" />}
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {title}
          </figcaption>
        </div>
      </div>
      <blockquote className="mt-3 text-sm leading-relaxed">
        {description}
      </blockquote>
    </figure>
  );
};

async function HomePageContent() {
  const user = await getUser();

  return (
    <div className="min-h-screen overflow-hidden flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen sm:min-h-[90vh] md:min-h-screen w-full flex flex-col items-center justify-center gap-4 py-8">
        <div className="text-center p-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold sm:mb-6 mb-3 pt-20">
            Hallo Hallo
          </h1>
          <p className="md:text-2xl mb-8 text-muted-foreground leading-relaxed">
            Nous sommes une communauté dédiée aux réseautages entre natif et
            diaspora{" "}
            <Highlighter action="underline" color="#FF9800">
              Malagasy en Allemagne
            </Highlighter>{" "}
            . Une plateforme d&apos;échange et de partage pour favoriser
            l&apos;entraide entre les jeunes expats de Madagascar.
          </p>

          {user ? (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/communaute"
                  className="z-10 flex items-center justify-center"
                >
                  <div
                    className={cn(
                      "group rounded-full border border-border bg-card/90 text-base text-card-foreground transition-all ease-in hover:cursor-pointer hover:bg-accent/80 backdrop-blur-sm shadow-sm hover:shadow-xl"
                    )}
                  >
                    <AnimatedShinyText className="inline-flex items-center justify-center px-6 py-3 transition ease-out hover:text-accent-foreground hover:duration-300">
                      <Users className="mr-2 h-4 w-4" />
                      <span>Voir la communauté</span>
                      <ArrowRightIcon className="ml-2 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                    </AnimatedShinyText>
                  </div>
                </Link>
              </div>
            </div>
          ) : (
            <Link
              href="/auth/signin"
              className="z-10 flex items-center justify-center"
            >
              <InteractiveHoverButton className="bg-card/90 shadow-sm hover:shadow-xl">
                Se connecter
              </InteractiveHoverButton>
            </Link>
          )}
        </div>
        <div className="flex w-full flex-col">
          <div className="relative w-full overflow-hidden">
            <Marquee pauseOnHover className="[--duration:40s] py-4">
              {firstRow.map((review) => (
                <ReviewCard key={review.icon} {...review} />
              ))}
            </Marquee>
            <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r z-10"></div>
            <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l z-10"></div>
          </div>
        </div>
        <LightRays />
      </section>

      {/* Services Section */}
      <section className="py-8 sm:py-12 md:py-16 px-4 bg-secondary shrink-0">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Nos Services</h2>
          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            {/* Communauté */}
            <div className="text-center space-y-4 group cursor-pointer">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold">Communauté</h3>
              <p className="text-muted-foreground leading-relaxed">
                Connectez-vous avec d&apos;autres Malagasy en Allemagne et créez
                des liens durables au sein de notre communauté.
              </p>
              <div className="pt-4">
                <Button
                  asChild
                  variant="ghost"
                  className="group-hover:bg-primary/10"
                >
                  <Link
                    href="/communaute"
                    className="inline-flex items-center gap-2"
                  >
                    Découvrir
                    <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Emplois */}
            <div className="text-center space-y-4 group cursor-pointer">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Briefcase className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold">Emplois</h3>
              <p className="text-muted-foreground leading-relaxed">
                Trouvez des opportunités d&apos;emploi et de formation adaptées
                à votre profil et vos ambitions professionnelles.
              </p>
              <div className="pt-4">
                <Button
                  asChild
                  variant="ghost"
                  className="group-hover:bg-primary/10"
                >
                  <Link
                    href="/emplois"
                    className="inline-flex items-center gap-2"
                  >
                    Explorer
                    <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Immobilier */}
            <div className="text-center space-y-4 group cursor-pointer">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Home className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold">Immobilier</h3>
              <p className="text-muted-foreground leading-relaxed">
                Partagez et trouvez des logements facilement grâce à notre
                réseau de confiance au sein de la communauté.
              </p>
              <div className="pt-4">
                <Button
                  asChild
                  variant="ghost"
                  className="group-hover:bg-primary/10"
                >
                  <Link
                    href="/immobilier"
                    className="inline-flex items-center gap-2"
                  >
                    Voir les annonces
                    <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Premium CTA Section */}
          <CTApricing />
        </div>
      </section>
      {/* About Us Section */}
      <section className="py-8 sm:py-12 md:py-16 px-4 shrink-0">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            À Propos de Nous
          </h2>
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-0"
          >
            {reviews.map((review, index) => {
              const iconMap = {
                Heart,
                Globe,
                HandHeart,
                Users,
                Sparkles,
              };
              const IconComponent =
                iconMap[review.icon as keyof typeof iconMap];

              return (
                <AccordionItem key={review.icon} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      {IconComponent && (
                        <IconComponent className="h-5 w-5 text-primary" />
                      )}
                      <span>{review.titleAccordion}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-balance leading-relaxed">
                    <p className="ml-8">{review.description}</p>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </section>
    </div>
  );
}

function HomePageSkeleton() {
  return (
    <div className="min-h-screen animate-pulse">
      {/* Hero Section Skeleton */}
      <section className="relative h-[80vh] w-full flex items-center justify-center">
        <div className="text-center p-4 max-w-4xl mx-auto">
          <div className="h-20 md:h-24 bg-muted rounded-lg mb-6 w-3/4 mx-auto"></div>
          <div className="space-y-3 mb-8">
            <div className="h-6 bg-muted rounded w-full"></div>
            <div className="h-6 bg-muted rounded w-5/6 mx-auto"></div>
            <div className="h-6 bg-muted rounded w-4/5 mx-auto"></div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="h-14 bg-muted rounded-lg w-48"></div>
            <div className="h-14 bg-muted rounded-lg w-48"></div>
          </div>
        </div>
      </section>

      {/* Services Section Skeleton */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="h-12 bg-muted rounded-lg mb-12 w-64 mx-auto"></div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="flex flex-col">
                <CardHeader>
                  <div className="h-12 w-12 bg-muted rounded mb-4"></div>
                  <div className="h-6 bg-muted rounded w-2/3"></div>
                  <div className="space-y-2 mt-2">
                    <div className="h-4 bg-muted rounded w-full"></div>
                    <div className="h-4 bg-muted rounded w-4/5"></div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex items-end">
                  <div className="h-10 bg-muted rounded w-full"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <HomePageContent />
    </Suspense>
  );
}
