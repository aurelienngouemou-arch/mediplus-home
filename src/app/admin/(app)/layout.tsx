import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { demandesContact, patients } from "@/db/schema";
import { eq, count } from "drizzle-orm";
import { Toaster } from "sonner";
import AdminShell from "@/components/admin/AdminShell";

async function getLayoutCounts() {
  try {
    const [demandesResult, patientsResult] = await Promise.all([
      db
        .select({ value: count() })
        .from(demandesContact)
        .where(eq(demandesContact.statut, "nouveau")),
      db
        .select({ value: count() })
        .from(patients)
        .where(eq(patients.statut, "actif")),
    ]);
    return {
      newDemandes: Number(demandesResult[0].value),
      patientsActifs: Number(patientsResult[0].value),
    };
  } catch {
    return { newDemandes: 0, patientsActifs: 0 };
  }
}

export default async function AdminAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const { newDemandes, patientsActifs } = await getLayoutCounts();

  return (
    <>
      <AdminShell
        userNom={session.user.nom}
        userPrenom={session.user.prenom}
        userEmail={session.user.email ?? ""}
        newDemandesCount={newDemandes}
        patientsActifsCount={patientsActifs}
      >
        {children}
      </AdminShell>
      <Toaster position="top-right" richColors />
    </>
  );
}
