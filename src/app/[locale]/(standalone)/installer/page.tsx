import type { Metadata } from "next";
import { auth } from "@/auth";
import InstallClient from "./InstallClient";

export const metadata: Metadata = {
  title: "Installer Mediplus Home",
  description: "Installez le dashboard infirmier sur votre téléphone",
  robots: { index: false },
};

export default async function InstallerPage() {
  const session = await auth();
  return <InstallClient isAuthenticated={!!session?.user} />;
}
