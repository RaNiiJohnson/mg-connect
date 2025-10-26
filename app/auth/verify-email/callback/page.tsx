"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const token = searchParams.get("token");

        if (!token) {
          setStatus("error");
          setMessage("Token de vérification manquant");
          return;
        }

        // Better-auth gère automatiquement la vérification via l'URL
        // On peut juste vérifier si l'utilisateur est maintenant connecté
        const session = await authClient.getSession();

        if (session.data?.user?.emailVerified) {
          setStatus("success");
          setMessage("Email vérifié avec succès !");

          // Rediriger après 3 secondes
          setTimeout(() => {
            router.push("/");
          }, 3000);
        } else {
          setStatus("error");
          setMessage("Erreur lors de la vérification de l'email");
        }
      } catch (error) {
        setStatus("error");
        setMessage("Une erreur est survenue lors de la vérification");
        console.error("Erreur de vérification:", error);
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="space-y-4 pb-8 text-center">
          <div className="flex justify-center">
            <div
              className={`p-3 rounded-full ${
                status === "loading"
                  ? "bg-blue-100"
                  : status === "success"
                    ? "bg-green-100"
                    : "bg-red-100"
              }`}
            >
              {status === "loading" && (
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              )}
              {status === "success" && (
                <CheckCircle className="w-8 h-8 text-green-600" />
              )}
              {status === "error" && (
                <XCircle className="w-8 h-8 text-red-600" />
              )}
            </div>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold">
              {status === "loading" && "Vérification en cours..."}
              {status === "success" && "Email vérifié !"}
              {status === "error" && "Erreur de vérification"}
            </CardTitle>
            <p className="text-sm text-muted-foreground">{message}</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {status === "success" && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Redirection automatique dans 3 secondes...
              </p>
              <Button asChild className="w-full">
                <Link href="/">Accéder à l&apos;application</Link>
              </Button>
            </div>
          )}

          {status === "error" && (
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/auth/signin">Retour à la connexion</Link>
              </Button>

              <Button variant="outline" asChild className="w-full">
                <Link href="/auth/signup">Créer un nouveau compte</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function VerifyEmailCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center p-4">
          <Card className="w-full max-w-md shadow-xl border-0">
            <CardHeader className="space-y-4 pb-8 text-center">
              <div className="flex justify-center">
                <div className="p-3 rounded-full bg-blue-100">
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                </div>
              </div>
              <div className="space-y-2">
                <CardTitle className="text-2xl font-bold">
                  Chargement...
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Préparation de la vérification
                </p>
              </div>
            </CardHeader>
          </Card>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
