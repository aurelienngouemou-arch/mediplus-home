import type { Metadata } from "next";
import InstallClient from "./InstallClient";

export const metadata: Metadata = {
  title: "Installer Mediplus Home",
  description: "Installez le dashboard infirmier sur votre téléphone",
  robots: { index: false },
};

export default function InstallerPage() {
  return <InstallClient />;
}
