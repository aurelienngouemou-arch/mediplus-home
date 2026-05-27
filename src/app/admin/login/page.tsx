// app/admin/login/page.tsx
import LoginForm from "./LoginForm";

export const metadata = {
  title: "Connexion — Espace infirmier | Mediplus Home",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <LoginForm />
    </div>
  );
}
