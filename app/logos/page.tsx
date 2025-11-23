import {
  LogoVariant1,
  LogoVariant2,
  LogoVariant3,
  LogoVariant4,
} from "@/components/logo-variants";
import {
  LogoSuggestion1,
  LogoSuggestion2,
  LogoSuggestion3,
  LogoSuggestion4,
  LogoSuggestion5,
  LogoSuggestion6,
  LogoSuggestion7,
  LogoSuggestion8,
  LogoSuggestion9,
  LogoSuggestion10,
  LogoSuggestion11,
  LogoSuggestion12,
  LogoSuggestion13,
  LogoSuggestion14,
  LogoSuggestion15,
  LogoSuggestion16,
} from "@/components/logo-suggestions";
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

        <div className="text-center space-y-2 pt-8 border-t">
          <h2 className="text-2xl font-bold">Nouvelles Suggestions</h2>
          <p className="text-muted-foreground">
            Des concepts additionnels basés sur des thèmes variés.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Suggestion 1 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-center">
                Suggestion 1 : Minimaliste
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <div className="p-8 bg-background rounded-xl border shadow-xs">
                <LogoSuggestion1 className="w-24 h-24 text-primary" />
              </div>
              <p className="text-sm text-center text-muted-foreground">
                Un design typographique simple et amical avec un &quot;H&quot;
                stylisé.
              </p>
            </CardContent>
          </Card>

          {/* Suggestion 2 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-center">
                Suggestion 2 : Communauté
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <div className="p-8 bg-background rounded-xl border shadow-xs">
                <LogoSuggestion2 className="w-24 h-24 text-primary" />
              </div>
              <p className="text-sm text-center text-muted-foreground">
                Un hexagone (ruche/communauté) combiné avec une bulle de
                discussion.
              </p>
            </CardContent>
          </Card>

          {/* Suggestion 3 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-center">
                Suggestion 3 : Diversité
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <div className="p-8 bg-background rounded-xl border shadow-xs">
                <LogoSuggestion3 className="w-24 h-24 text-primary" />
              </div>
              <p className="text-sm text-center text-muted-foreground">
                Des cercles entrelacés représentant la connexion et la
                diversité.
              </p>
            </CardContent>
          </Card>

          {/* Suggestion 4 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-center">
                Suggestion 4 : Ludique
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <div className="p-8 bg-background rounded-xl border shadow-xs">
                <LogoSuggestion4 className="w-24 h-24 text-primary" />
              </div>
              <p className="text-sm text-center text-muted-foreground">
                Un visage souriant et accueillant pour une ambiance chaleureuse.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Suggestion 5 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-center">
                Suggestion 5 : Infini
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <div className="p-8 bg-background rounded-xl border shadow-xs">
                <LogoSuggestion5 className="w-24 h-24 text-primary" />
              </div>
              <p className="text-sm text-center text-muted-foreground">
                Le symbole de l&apos;infini pour une connexion sans fin.
              </p>
            </CardContent>
          </Card>

          {/* Suggestion 6 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-center">
                Suggestion 6 : Signal
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <div className="p-8 bg-background rounded-xl border shadow-xs">
                <LogoSuggestion6 className="w-24 h-24 text-primary" />
              </div>
              <p className="text-sm text-center text-muted-foreground">
                Une onde de signal représentant la communication active.
              </p>
            </CardContent>
          </Card>

          {/* Suggestion 7 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-center">
                Suggestion 7 : Localisation
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <div className="p-8 bg-background rounded-xl border shadow-xs">
                <LogoSuggestion7 className="w-24 h-24 text-primary" />
              </div>
              <p className="text-sm text-center text-muted-foreground">
                Un marqueur de carte moderne pour symboliser la présence.
              </p>
            </CardContent>
          </Card>

          {/* Suggestion 8 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-center">
                Suggestion 8 : Structure
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <div className="p-8 bg-background rounded-xl border shadow-xs">
                <LogoSuggestion8 className="w-24 h-24 text-primary" />
              </div>
              <p className="text-sm text-center text-muted-foreground">
                Une forme abstraite en H évoquant la stabilité et la force.
              </p>
            </CardContent>
          </Card>

          {/* Suggestion 9 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-center">
                Suggestion 9 : Cercle
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <div className="p-8 bg-background rounded-xl border shadow-xs">
                <LogoSuggestion9 className="w-24 h-24 text-primary" />
              </div>
              <p className="text-sm text-center text-muted-foreground">
                Un cercle de points représentant la communauté réunie.
              </p>
            </CardContent>
          </Card>

          {/* Suggestion 10 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-center">
                Suggestion 10 : Croissance
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <div className="p-8 bg-background rounded-xl border shadow-xs">
                <LogoSuggestion10 className="w-24 h-24 text-primary" />
              </div>
              <p className="text-sm text-center text-muted-foreground">
                Une flèche vers le haut symbolisant le progrès et l&apos;avenir.
              </p>
            </CardContent>
          </Card>

          {/* Suggestion 11 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-center">
                Suggestion 11 : Confiance
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <div className="p-8 bg-background rounded-xl border shadow-xs">
                <LogoSuggestion11 className="w-24 h-24 text-primary" />
              </div>
              <p className="text-sm text-center text-muted-foreground">
                Un bouclier avec une coche pour la sécurité et la fiabilité.
              </p>
            </CardContent>
          </Card>

          {/* Suggestion 12 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-center">
                Suggestion 12 : Horizon
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <div className="p-8 bg-background rounded-xl border shadow-xs">
                <LogoSuggestion12 className="w-24 h-24 text-primary" />
              </div>
              <p className="text-sm text-center text-muted-foreground">
                Un lever de soleil symbolisant l&apos;espoir et les nouveaux
                départs.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Suggestion 13 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-center">
                Suggestion 13 : Réseau
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <div className="p-8 bg-background rounded-xl border shadow-xs">
                <LogoSuggestion13 className="w-24 h-24 text-primary" />
              </div>
              <p className="text-sm text-center text-muted-foreground">
                Des nœuds connectés représentant un réseau numérique fort.
              </p>
            </CardContent>
          </Card>

          {/* Suggestion 14 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-center">
                Suggestion 14 : Partenariat
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <div className="p-8 bg-background rounded-xl border shadow-xs">
                <LogoSuggestion14 className="w-24 h-24 text-primary" />
              </div>
              <p className="text-sm text-center text-muted-foreground">
                Une poignée de main stylisée symbolisant l&apos;entraide.
              </p>
            </CardContent>
          </Card>

          {/* Suggestion 15 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-center">
                Suggestion 15 : Pont
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <div className="p-8 bg-background rounded-xl border shadow-xs">
                <LogoSuggestion15 className="w-24 h-24 text-primary" />
              </div>
              <p className="text-sm text-center text-muted-foreground">
                Un pont reliant deux rives, métaphore du lien entre cultures.
              </p>
            </CardContent>
          </Card>

          {/* Suggestion 16 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-center">
                Suggestion 16 : Lien
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <div className="p-8 bg-background rounded-xl border shadow-xs">
                <LogoSuggestion16 className="w-24 h-24 text-primary" />
              </div>
              <p className="text-sm text-center text-muted-foreground">
                Des formes entrelacées pour une union indissociable.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
