import type { Metadata } from "next";
import { Toaster } from "sonner";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Connexion — Espace infirmier | Mediplus Home",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-primary/8 via-background to-secondary/8 p-4">
      <LoginForm />
      <Toaster position="top-center" richColors />
    </div>
  );
}
