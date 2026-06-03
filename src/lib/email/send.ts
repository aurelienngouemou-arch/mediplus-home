import { resend, FROM_ADDRESS } from "./client";
import {
  contactAdminSubject,
  contactAdminHtml,
} from "./templates/contact-admin";
import {
  contactConfirmationSubject,
  contactConfirmationHtml,
} from "./templates/contact-confirmation";
import {
  delegationPartenaireSubject,
  delegationPartenaireHtml,
} from "./templates/delegation-partenaire";
import { env } from "@/lib/env";
import type {
  DemandeContact,
  Delegation,
  Visite,
  Patient,
  InfirmierPartenaire,
} from "@/db/schema";

export async function sendContactNotificationToAdmin(
  demande: DemandeContact
): Promise<void> {
  const adminEmail = env.ADMIN_EMAIL;

  console.log("[Email] Sending admin notification to:", adminEmail);
  console.log("[Email] Demande received from:", demande.email);

  try {
    const result = await resend.emails.send({
      from: FROM_ADDRESS,
      to: adminEmail,
      subject: contactAdminSubject(demande),
      html: contactAdminHtml(demande, env.NEXT_PUBLIC_SITE_URL),
    });

    if (result.error) {
      console.error("[Email] Resend error:", result.error);
      throw new Error(`Resend error: ${result.error.message}`);
    }

    console.log("[Email] Admin email sent successfully:", result.data?.id);
  } catch (error) {
    console.error("[Email] Failed to send admin notification:", error);
    throw error;
  }
}

export async function sendContactConfirmationToPatient(
  demande: DemandeContact
): Promise<void> {
  console.log("[Email] Sending confirmation to patient:", demande.email);

  try {
    const result = await resend.emails.send({
      from: FROM_ADDRESS,
      to: demande.email,
      subject: contactConfirmationSubject(),
      html: contactConfirmationHtml(demande),
    });

    if (result.error) {
      console.error("[Email] Resend error (patient confirmation):", result.error);
      throw new Error(`Resend error: ${result.error.message}`);
    }

    console.log("[Email] Patient confirmation sent successfully:", result.data?.id);
  } catch (error) {
    console.error("[Email] Failed to send patient confirmation:", error);
    throw error;
  }
}

export async function sendDelegationToPartner(
  delegation: Delegation,
  visite: Visite,
  patient: Patient,
  partenaire: InfirmierPartenaire
): Promise<void> {
  try {
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: partenaire.email,
      subject: delegationPartenaireSubject(),
      html: delegationPartenaireHtml(delegation, visite, patient, partenaire),
    });
  } catch (error) {
    console.error("[email] Échec envoi délégation partenaire :", error);
  }
}
