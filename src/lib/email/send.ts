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

const ADMIN_EMAIL = "aurelienngouemou@gmail.com";

export async function sendContactNotificationToAdmin(
  demande: DemandeContact
): Promise<void> {
  try {
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: ADMIN_EMAIL,
      subject: contactAdminSubject(demande),
      html: contactAdminHtml(demande, env.NEXT_PUBLIC_SITE_URL),
    });
  } catch (error) {
    console.error("[email] Échec envoi admin :", error);
  }
}

export async function sendContactConfirmationToPatient(
  demande: DemandeContact
): Promise<void> {
  try {
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: demande.email,
      subject: contactConfirmationSubject(),
      html: contactConfirmationHtml(demande),
    });
  } catch (error) {
    console.error("[email] Échec envoi confirmation patient :", error);
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
