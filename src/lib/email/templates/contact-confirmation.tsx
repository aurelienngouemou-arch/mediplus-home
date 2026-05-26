import type { DemandeContact } from "@/db/schema";

const TYPE_LABELS: Record<string, string> = {
  "rendez-vous": "Prise de rendez-vous",
  information: "Demande d'information",
  devis: "Devis personnalisé",
  autre: "Autre",
};

const COMMUNE_LABELS: Record<string, string> = {
  overijse: "Overijse",
  hoeilaart: "Hoeilaart",
  tervuren: "Tervuren",
  autre: "Autre commune",
};

export function contactConfirmationSubject(): string {
  return "Votre demande de soins - Mediplus Home";
}

export function contactConfirmationHtml(demande: DemandeContact): string {
  const prenom = demande.nom.split(" ")[0];
  const type = demande.type_demande
    ? TYPE_LABELS[demande.type_demande] ?? demande.type_demande
    : "—";
  const commune = demande.commune
    ? COMMUNE_LABELS[demande.commune] ?? demande.commune
    : "—";

  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:32px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08)">
        <!-- Header -->
        <tr>
          <td style="background:#0A4D68;padding:24px 32px;text-align:center">
            <p style="margin:0;color:#ffffff;font-size:22px;font-weight:bold">✅ Demande bien reçue</p>
            <p style="margin:6px 0 0;color:#05BFDB;font-size:14px">Mediplus Home · Soins infirmiers à domicile</p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:32px">
            <p style="color:#0f172a;font-size:16px">Bonjour <strong>${prenom}</strong>,</p>
            <p style="color:#0f172a;line-height:1.6">
              Votre demande a bien été reçue. Notre infirmier vous contactera dans les
              <strong>2 heures</strong> aux coordonnées que vous avez fournies.
            </p>

            <!-- Récap -->
            <div style="background:#f8fafc;border-radius:8px;padding:20px;margin:24px 0;border-left:4px solid #0A4D68">
              <p style="margin:0 0 12px;font-weight:bold;color:#0A4D68">Récapitulatif de votre demande</p>
              <table cellpadding="0" cellspacing="0" style="width:100%">
                <tr>
                  <td style="color:#64748b;padding:4px 0;width:45%">Type de demande</td>
                  <td style="color:#0f172a;font-weight:500">${type}</td>
                </tr>
                <tr>
                  <td style="color:#64748b;padding:4px 0">Commune</td>
                  <td style="color:#0f172a;font-weight:500">${commune}</td>
                </tr>
                <tr>
                  <td style="color:#64748b;padding:4px 0">Téléphone transmis</td>
                  <td style="color:#0f172a;font-weight:500">${demande.telephone}</td>
                </tr>
              </table>
            </div>

            <p style="color:#0f172a;line-height:1.6">
              En cas d'urgence, vous pouvez nous joindre directement :
            </p>

            <div style="text-align:center;margin:24px 0">
              <a href="tel:+32486364888"
                style="display:inline-block;background:#0A4D68;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:50px;font-weight:bold;margin:4px">
                📞 Appeler : +32 486 364 888
              </a>
              <a href="https://wa.me/32486364888"
                style="display:inline-block;background:#25D366;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:50px;font-weight:bold;margin:4px">
                💬 WhatsApp
              </a>
            </div>

            <p style="color:#64748b;font-size:14px;line-height:1.6">
              Nous intervenons à Overijse, Hoeilaart et Tervuren, du lundi au vendredi de 8h à 18h,
              et le samedi matin sur rendez-vous.
            </p>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#f8fafc;padding:16px 32px;border-top:1px solid #e2e8f0;text-align:center">
            <p style="margin:0;color:#64748b;font-size:12px">
              Mediplus Home — Soins infirmiers à domicile<br>
              Overijse · Hoeilaart · Tervuren<br>
              <a href="tel:+32486364888" style="color:#088395">+32 486 364 888</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
