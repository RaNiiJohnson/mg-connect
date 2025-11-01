import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  Building,
  Mail,
} from "lucide-react";
import { getUser } from "@/lib/auth-server";
import { getJobOfferById } from "@/lib/database";
import { notFound } from "next/navigation";
import Link from "next/link";

type Pageprops = {
  params: Promise<{ id: string }>;
};

export default async function JobDetailsPage(props: Pageprops) {
  const user = await getUser();
  const params = await props.params;
  const jobOffer = await getJobOfferById(params.id);

  if (!jobOffer) {
    notFound();
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header avec bouton retour */}
        <div className="mb-6">
          <Link href="/emplois">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux offres
            </Button>
          </Link>
        </div>

        {/* Détails de l'offre */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{jobOffer.type}</Badge>
                  <Badge variant="secondary">{jobOffer.contractType}</Badge>
                </div>
                <CardTitle className="text-2xl mb-4">
                  {jobOffer.title}
                </CardTitle>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span>Entreprise : {jobOffer.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>Ville : {jobOffer.city}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      Début:{" "}
                      {new Date(jobOffer.startDate).toLocaleDateString(
                        "fr-FR",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </div>
                  {jobOffer.duration && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Durée: {jobOffer.duration}</span>
                    </div>
                  )}
                  {jobOffer.salary && (
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span>Salaire: {jobOffer.salary}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Contrat: {jobOffer.contractType}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                {jobOffer.salary && (
                  <>
                    Salaire :{" "}
                    <span className="text-xl font-semibold text-primary">
                      {jobOffer.salary}
                    </span>
                  </>
                )}
                <div className="text-sm text-muted-foreground mt-1">
                  Publié le{" "}
                  {new Date(jobOffer.createdAt).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </div>
                <div className="text-sm text-muted-foreground">
                  Par {jobOffer.author.name}
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-3">
                Description du poste
              </h3>
              <CardDescription className="text-base whitespace-pre-wrap">
                {jobOffer.description}
              </CardDescription>
            </div>

            {/* Certificats requis */}
            {jobOffer.certificates.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Certificats requis
                </h3>
                <div className="flex flex-wrap gap-2">
                  {jobOffer.certificates.map((cert, index) => (
                    <Badge key={index} variant="outline">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Contact</h3>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{jobOffer.contact}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-6 border-t">
              {user?.id !== jobOffer.authorId && (
                <Button size="lg" className="flex-1 sm:flex-none">
                  Postuler maintenant
                </Button>
              )}
              <Button variant="outline" size="lg">
                Partager
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
