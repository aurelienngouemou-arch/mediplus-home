import type { DemandeContact } from "@/db/schema";

const COMMUNE_LABELS: Record<string, string> = {
  overijse: "Overijse",
  hoeilaart: "Hoeilaart",
  tervuren: "Tervuren",
  autre: "Autre commune",
};

const TYPE_LABELS: Record<string, string> = {
  "rendez-vous": "Prise de rendez-vous",
  information: "Demande d'information",
  devis: "Devis personnalisé",
  autre: "Autre",
};

export function contactAdminSubject(demande: DemandeContact): string {
  const commune = demande.commune
    ? COMMUNE_LABELS[demande.commune] ?? demande.commune
    : "—";
  return `🔔 Nouvelle demande - ${demande.nom} (${commune})`;
}

export function contactAdminHtml(
  demande: DemandeContact,
  siteUrl: string
): string {
  const commune = demande.commune
    ? COMMUNE_LABELS[demande.commune] ?? demande.commune
    : "—";
  const type = demande.type_demande
    ? TYPE_LABELS[demande.type_demande] ?? demande.type_demande
    : "—";
  const date = new Date(demande.created_at!).toLocaleString("fr-BE", {
    timeZone: "Europe/Brussels",
    dateStyle: "full",
    timeStyle: "short",
  });

  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:32px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08)">
        <!-- Header -->
        <tr>
          <td style="background:#0A4D68;padding:24px 32px">
            <p style="margin:0;color:#ffffff;font-size:20px;font-weight:bold">🔔 Nouvelle demande reçue</p>
            <p style="margin:4px 0 0;color:#05BFDB;font-size:13px">${date}</p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:32px">
            <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse">
              <tr style="background:#f8fafc">
                <td style="font-weight:bold;color:#0f172a;width:40%;border-bottom:1px solid #e2e8f0">Nom</td>
                <td style="color:#0f172a;border-bottom:1px solid #e2e8f0">${demande.nom}</td>
              </tr>
              <tr>
                <td style="font-weight:bold;color:#0f172a;border-bottom:1px solid #e2e8f0">Téléphone</td>
                <td style="border-bottom:1px solid #e2e8f0">
                  <a href="tel:${demande.telephone}" style="color:#0A4D68;font-weight:bold">${demande.telephone}</a>
                </td>
              </tr>
              <tr style="background:#f8fafc">
                <td style="font-weight:bold;color:#0f172a;border-bottom:1px solid #e2e8f0">Email</td>
                <td style="border-bottom:1px solid #e2e8f0">
                  <a href="mailto:${demande.email}" style="color:#0A4D68">${demande.email}</a>
                </td>
              </tr>
              <tr>
                <td style="font-weight:bold;color:#0f172a;border-bottom:1px solid #e2e8f0">Commune</td>
                <td style="border-bottom:1px solid #e2e8f0">${commune}</td>
              </tr>
              <tr style="background:#f8fafc">
                <td style="font-weight:bold;color:#0f172a;border-bottom:1px solid #e2e8f0">Type de demande</td>
                <td style="border-bottom:1px solid #e2e8f0">${type}</td>
              </tr>
              ${
                demande.message
                  ? `<tr>
                <td style="font-weight:bold;color:#0f172a;vertical-align:top">Message</td>
                <td style="color:#0f172a;white-space:pre-wrap">${demande.message}</td>
              </tr>`
                  : ""
              }
            </table>

            <div style="margin-top:32px;text-align:center">
              <a href="tel:${demande.telephone}"
                style="display:inline-block;background:#0A4D68;color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:50px;font-weight:bold;font-size:15px">
                📞 Rappeler maintenant
              </a>
            </div>

            <div style="margin-top:16px;text-align:center">
              <a href="${siteUrl}/admin/demandes"
                style="color:#088395;font-size:13px;text-decoration:underline">
                Voir toutes les demandes (dashboard)
              </a>
            </div>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#f8fafc;padding:16px 32px;border-top:1px solid #e2e8f0">
            <p style="margin:0;color:#64748b;font-size:12px;text-align:center">
              Mediplus Home — Soins infirmiers à domicile<br>
              Overijse · Hoeilaart · Tervuren
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
