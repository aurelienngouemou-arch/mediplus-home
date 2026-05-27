import { auth } from "@/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Mail, Shield, Hash, LogOut } from "lucide-react";
import LogoutButton from "./LogoutButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mon profil — Admin | Mediplus Home",
  robots: { index: false },
};

export default async function ProfilPage() {
  const session = await auth();
  const user = session?.user;

  if (!user) return null;

  const initials = `${user.prenom?.charAt(0) ?? ""}${user.nom?.charAt(0) ?? ""}`.toUpperCase();

  return (
    <div className="space-y-5 max-w-2xl">
      <div>
        <h1 className="text-2xl font-serif font-semibold text-foreground">Mon profil</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Vos informations de compte</p>
      </div>

      {/* Identité */}
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-sm font-semibold">Identité</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          {/* Avatar + nom */}
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-semibold">
                {user.prenom} {user.nom}
              </p>
              <Badge
                variant="outline"
                className={
                  user.role === "admin"
                    ? "text-purple-700 border-purple-200 bg-purple-50"
                    : "text-blue-700 border-blue-200 bg-blue-50"
                }
              >
                {user.role === "admin" ? "Administrateur" : "Infirmier·ère"}
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Détails */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Adresse e-mail</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Shield className="h-4 w-4 text-muted-foreground shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Rôle</p>
                <p className="font-medium capitalize">{user.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <User className="h-4 w-4 text-muted-foreground shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Identifiant</p>
                <p className="font-mono text-xs text-muted-foreground">{user.id}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Changer mot de passe (mock V1) */}
      <Card className="border-border/50 border-dashed">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-muted-foreground">
            Changer mon mot de passe
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3 opacity-50 pointer-events-none">
            <div className="h-10 bg-muted rounded-md" />
            <div className="h-10 bg-muted rounded-md" />
            <div className="h-10 bg-muted rounded-md" />
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Fonctionnalité disponible prochainement.
          </p>
        </CardContent>
      </Card>

      {/* Déconnexion */}
      <Card className="border-border/50">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Se déconnecter</p>
              <p className="text-xs text-muted-foreground">Vous serez redirigé vers la page de connexion</p>
            </div>
            <LogoutButton />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
