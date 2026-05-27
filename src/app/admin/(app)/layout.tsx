import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { demandesContact } from "@/db/schema";
import { eq, count } from "drizzle-orm";
import { Toaster } from "sonner";
import AdminShell from "@/components/admin/AdminShell";

async function getNewDemandesCount() {
  try {
    const [{ value }] = await db
      .select({ value: count() })
      .from(demandesContact)
      .where(eq(demandesContact.statut, "nouveau"));
    return Number(value);
  } catch {
    return 0;
  }
}

export default async function AdminAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const newCount = await getNewDemandesCount();

  return (
    <>
      <AdminShell
        userNom={session.user.nom}
        userPrenom={session.user.prenom}
        userEmail={session.user.email ?? ""}
        newDemandesCount={newCount}
      >
        {children}
      </AdminShell>
      <Toaster position="top-right" richColors />
    </>
  );
}
