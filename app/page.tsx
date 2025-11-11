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
import { BorderBeam } from "@/components/ui/border-beam";
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
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg relative transition-shadow flex flex-col">
              <CardHeader className="flex flex-row items-center gap-3">
                <Users className="h-12 w-12 text-primary mb-4" />
                <div>
                  <CardTitle> Communauté</CardTitle>
                  <CardDescription>
                    Connectez-vous avec d&apos;autres Malagasy en Allemagne
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex items-end">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/communaute">Découvrir</Link>
                </Button>
              </CardContent>

              <BorderBeam duration={8} size={100} />
            </Card>

            <Card className="hover:shadow-lg relative transition-shadow flex flex-col">
              <CardHeader className="flex flex-row items-center gap-3">
                <Briefcase className="h-12 w-12 text-primary mb-4" />
                <div>
                  <CardTitle>Emplois</CardTitle>
                  <CardDescription>
                    Trouvez des opportunités d&apos;emploi et de formation
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex items-end">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/emplois">Explorer</Link>
                </Button>
              </CardContent>

              <BorderBeam duration={8} size={100} />
            </Card>

            <Card className="hover:shadow-lg relative transition-shadow flex flex-col">
              <CardHeader className="flex flex-row items-center gap-3">
                <Home className="h-12 w-12 text-primary mb-4" />
                <div>
                  <CardTitle>Immobilier</CardTitle>
                  <CardDescription>
                    Partagez et trouvez des logements
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex items-end">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/immobilier">Voir les annonces</Link>
                </Button>
              </CardContent>

              <BorderBeam duration={8} size={200} />
            </Card>
          </div>
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
