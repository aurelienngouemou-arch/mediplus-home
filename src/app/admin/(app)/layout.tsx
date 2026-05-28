import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { demandesContact, patients, visites } from "@/db/schema";
import { eq, count, and, gte, lt } from "drizzle-orm";
import { Toaster } from "sonner";
import AdminShell from "@/components/admin/AdminShell";

async function getLayoutCounts() {
  try {
    const todayStr = new Date().toISOString().slice(0, 10);
    const todayStart = new Date(`${todayStr}T00:00:00Z`);
    const todayEnd = new Date(`${todayStr}T23:59:59Z`);

    const [demandesResult, patientsResult, visitesResult] = await Promise.all([
      db
        .select({ value: count() })
        .from(demandesContact)
        .where(eq(demandesContact.statut, "nouveau")),
      db
        .select({ value: count() })
        .from(patients)
        .where(eq(patients.statut, "actif")),
      db
        .select({ value: count() })
        .from(visites)
        .where(and(gte(visites.date_visite, todayStart), lt(visites.date_visite, todayEnd))),
    ]);
    return {
      newDemandes: Number(demandesResult[0].value),
      patientsActifs: Number(patientsResult[0].value),
      visitesDuJour: Number(visitesResult[0].value),
    };
  } catch {
    return { newDemandes: 0, patientsActifs: 0, visitesDuJour: 0 };
  }
}

export default async function AdminAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const { newDemandes, patientsActifs, visitesDuJour } = await getLayoutCounts();

  return (
    <>
      <AdminShell
        userNom={session.user.nom}
        userPrenom={session.user.prenom}
        userEmail={session.user.email ?? ""}
        newDemandesCount={newDemandes}
        patientsActifsCount={patientsActifs}
        visitesDuJour={visitesDuJour}
      >
        {children}
      </AdminShell>
      <Toaster position="top-right" richColors />
    </>
  );
}
