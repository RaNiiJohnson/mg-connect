import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Building2,
  Mail,
  Briefcase,
  DollarSign,
  FileText,
  Award,
  Share2,
  Bookmark,
} from "lucide-react";
import { getUser } from "@/lib/auth-server";
import { getJobOfferById } from "@/lib/database";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { getRelativeTime, formatDateLong } from "@/lib/date";

type Pageprops = {
  params: Promise<{ id: string }>;
};

async function JobDetailsContent(props: Pageprops) {
  const user = await getUser();
  const params = await props.params;
  const jobOffer = await getJobOfferById(params.id);

  if (!jobOffer) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-background border-b">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <Link href="/emplois">
            <Button variant="ghost" size="sm" className="hover:bg-muted -ml-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à la recherche
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4">
            {/* Job Header Card */}
            <Card>
              <CardHeader className="space-y-4">
                <div className="space-y-3">
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                    {jobOffer.title}
                  </h1>

                  <div className="flex items-center gap-2 text-base font-medium text-foreground">
                    <Building2 className="h-5 w-5 text-muted-foreground" />
                    <span>{jobOffer.company}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      <span>{jobOffer.city}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="h-4 w-4" />
                      <span>{jobOffer.type}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FileText className="h-4 w-4" />
                      <span>{jobOffer.contractType}</span>
                    </div>
                    {jobOffer.salary && (
                      <div className="flex items-center gap-1.5 font-semibold text-foreground">
                        <DollarSign className="h-4 w-4" />
                        <span>{jobOffer.salary}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Publié {getRelativeTime(jobOffer.createdAt)}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pb-6 border-b">
                  {user?.id !== jobOffer.authorId && (
                    <Button size="lg" className="font-semibold">
                      Postuler maintenant
                    </Button>
                  )}
                  <Button variant="outline" size="lg">
                    <Bookmark className="h-4 w-4 mr-2" />
                    Sauvegarder
                  </Button>
                  <Button variant="outline" size="lg">
                    <Share2 className="h-4 w-4 mr-2" />
                    Partager
                  </Button>
                </div>

                {/* Job Details */}
                <div className="space-y-4">
                  <h2 className="text-xl font-bold">
                    Détails de l&apos;offre :
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">
                        Type de contrat
                      </div>
                      <div className="font-medium">{jobOffer.contractType}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">
                        Type d&apos;emploi
                      </div>
                      <div className="font-medium">{jobOffer.type}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">
                        Date de début
                      </div>
                      <div className="font-medium">
                        {formatDateLong(jobOffer.startDate)}
                      </div>
                    </div>
                    {jobOffer.duration && (
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">
                          Durée
                        </div>
                        <div className="font-medium">{jobOffer.duration}</div>
                      </div>
                    )}
                    {jobOffer.salary && (
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">
                          Salaire
                        </div>
                        <div className="font-medium text-primary">
                          {jobOffer.salary}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-3 pt-4 border-t">
                  <h2 className="text-xl font-bold">Description du poste :</h2>
                  <CardDescription className="text-base leading-relaxed whitespace-pre-wrap text-foreground">
                    {jobOffer.description}
                  </CardDescription>
                </div>

                {/* Certificates */}
                {jobOffer.certificates.length > 0 && (
                  <div className="space-y-3 pt-4 border-t">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Certificats requis :
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {jobOffer.certificates.map((cert, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="px-3 py-1.5 text-sm font-normal"
                        >
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Comment postuler :</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Pour postuler à cette offre, veuillez contacter
                    l&apos;employeur à l&apos;adresse suivante :
                  </p>
                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg border">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-0.5">
                        Email
                      </div>
                      <a
                        href={`mailto:${jobOffer.contact}`}
                        className="sm:font-medium font-extralight max-sm:text-sm hover:text-primary transition-colors"
                      >
                        {jobOffer.contact}
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Company Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  À propos de l&apos;entreprise :
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">{jobOffer.company}</div>
                      <div className="text-sm text-muted-foreground">
                        {jobOffer.city}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Publisher Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Publié par :</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                    {(jobOffer.author.name || "U").charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-medium">
                      {jobOffer.author.name || "Utilisateur"}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {getRelativeTime(jobOffer.createdAt)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Job Summary */}
            <Card className="bg-muted/30">
              <CardHeader>
                <CardTitle className="text-lg">
                  Résumé de l&apos;offre :
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Localisation</span>
                  <span className="font-medium">{jobOffer.city}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Type</span>
                  <span className="font-medium">{jobOffer.type}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Contrat</span>
                  <span className="font-medium">{jobOffer.contractType}</span>
                </div>
                {jobOffer.duration && (
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Durée</span>
                    <span className="font-medium">{jobOffer.duration}</span>
                  </div>
                )}
                {jobOffer.salary && (
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Salaire</span>
                    <span className="font-semibold text-primary">
                      {jobOffer.salary}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function JobDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-muted/30 animate-pulse">
      {/* Header */}
      <div className="bg-background border-b">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="h-9 bg-muted rounded w-40"></div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4">
            {/* Job Header Card */}
            <Card>
              <CardHeader className="space-y-4">
                <div className="space-y-3">
                  <Skeleton className="h-8 sm:h-10 w-full max-w-md" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5" />
                    <Skeleton className="h-5 w-32" />
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-3.5 w-3.5" />
                    <Skeleton className="h-3.5 w-24" />
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pb-6 border-b">
                  <Skeleton className="h-10 w-32" />
                  <Skeleton className="h-10 w-28" />
                  <Skeleton className="h-10 w-24" />
                </div>

                {/* Job Details */}
                <div className="space-y-4">
                  <Skeleton className="h-6 w-40" />
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="space-y-1">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-5 w-32" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-3 pt-4 border-t">
                  <Skeleton className="h-6 w-48" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>

                {/* Certificates */}
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5" />
                    <Skeleton className="h-6 w-36" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-7 w-20 rounded-full" />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full max-w-md" />
                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg border">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Skeleton className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <Skeleton className="h-3 w-8" />
                      <Skeleton className="h-4 w-48" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Company Info Card */}
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-40" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-12 w-12 rounded-lg" />
                  <div className="space-y-1">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Publisher Info */}
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-24" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Job Summary */}
            <Card className="bg-muted/30">
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex justify-between py-2 border-b">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function JobDetailsPage(props: Pageprops) {
  return (
    <Suspense fallback={<JobDetailsSkeleton />}>
      <JobDetailsContent {...props} />
    </Suspense>
  );
}
