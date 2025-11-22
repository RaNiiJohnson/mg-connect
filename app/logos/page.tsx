import {
  LogoVariant1,
  LogoVariant2,
  LogoVariant3,
  LogoVariant4,
} from "@/components/logo-variants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LogosPage() {
  return (
    <div className="min-h-screen p-8 bg-muted/20">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Suggestions de Logo</h1>
          <p className="text-muted-foreground">
            Voici plusieurs options pour le logo de Hallo Hallo.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Option 1 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-center">Option 1 : Bulle</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <div className="p-8 bg-background rounded-xl border shadow-xs">
                <LogoVariant1 className="w-24 h-24 text-primary" />
              </div>
              <p className="text-sm text-center text-muted-foreground">
                Le design actuel. Une bulle de discussion symbolisant la
                communication, avec un H à l&apos;intérieur.
              </p>
            </CardContent>
          </Card>

          {/* Option 2 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-center">
                Option 2 : Connexion
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <div className="p-8 bg-background rounded-xl border shadow-xs">
                <LogoVariant2 className="w-24 h-24 text-primary" />
              </div>
              <p className="text-sm text-center text-muted-foreground">
                Deux points connectés symbolisant le lien entre Madagascar et
                l&apos;Allemagne, ou les membres de la communauté.
              </p>
            </CardContent>
          </Card>

          {/* Option 3 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-center">
                Option 3 : Cœur / Lieu
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <div className="p-8 bg-background rounded-xl border shadow-xs">
                <LogoVariant3 className="w-24 h-24 text-primary" />
              </div>
              <p className="text-sm text-center text-muted-foreground">
                Un mélange entre un cœur et un marqueur de carte. &quot;Home
                away from home&quot;.
              </p>
            </CardContent>
          </Card>

          {/* Option 4 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-center">
                Option 4 : Rayonnement
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <div className="p-8 bg-background rounded-xl border shadow-xs">
                <LogoVariant4 className="w-24 h-24 text-primary" />
              </div>
              <p className="text-sm text-center text-muted-foreground">
                Une forme abstraite rayonnante symbolisant la diversité, la
                croissance et le rassemblement.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
