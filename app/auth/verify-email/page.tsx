import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="space-y-4 pb-8 text-center">
          <div className="flex justify-center">
            <div className="p-3 rounded-full bg-blue-100">
              <Mail className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold">
              Vérifiez votre email
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Nous avons envoyé un lien de vérification à votre adresse email
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4 text-center">
            <div className="p-4 bg-blue-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-blue-800">
                Cliquez sur le lien dans l&apos;email pour activer votre compte
              </p>
            </div>

            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Vous n&apos;avez pas reçu l&apos;email ?</p>
              <ul className="space-y-1">
                <li>• Vérifiez votre dossier spam</li>
                <li>• Assurez-vous que l&apos;adresse email est correcte</li>
                <li>• L&apos;email peut prendre quelques minutes à arriver</li>
              </ul>
            </div>
          </div>

          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/auth/signin">Retour à la connexion</Link>
            </Button>

            <Button variant="outline" asChild className="w-full">
              <Link href="/auth/signup">Créer un autre compte</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
