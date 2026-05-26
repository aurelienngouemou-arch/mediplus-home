import type { Delegation, Visite, Patient, InfirmierPartenaire } from "@/db/schema";

export function delegationPartenaireSubject(): string {
  return "Demande de remplacement - Mediplus Home";
}

export function delegationPartenaireHtml(
  delegation: Delegation,
  visite: Visite,
  patient: Patient,
  partenaire: InfirmierPartenaire
): string {
  const dateVisite = delegation.date_visite_prevue
    ? new Date(delegation.date_visite_prevue).toLocaleString("fr-BE", {
        timeZone: "Europe/Brussels",
        dateStyle: "full",
        timeStyle: "short",
      })
    : "À confirmer";

  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:32px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08)">
        <!-- Header -->
        <tr>
          <td style="background:#088395;padding:24px 32px">
            <p style="margin:0;color:#ffffff;font-size:20px;font-weight:bold">🤝 Demande de remplacement</p>
            <p style="margin:4px 0 0;color:#05BFDB;font-size:13px">Mediplus Home · Soins infirmiers à domicile</p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:32px">
            <p style="color:#0f172a;font-size:16px">Bonjour <strong>${partenaire.prenom}</strong>,</p>
            <p style="color:#0f172a;line-height:1.6">
              Je vous contacte pour une demande de remplacement sur une visite à domicile.
              Seriez-vous disponible pour la prise en charge suivante ?
            </p>

            <!-- Détails visite -->
            <div style="background:#f8fafc;border-radius:8px;padding:20px;margin:24px 0;border-left:4px solid #088395">
              <p style="margin:0 0 12px;font-weight:bold;color:#088395">Détails de la visite</p>
              <table cellpadding="0" cellspacing="0" style="width:100%">
                <tr>
                  <td style="color:#64748b;padding:4px 0;width:45%">Date et heure</td>
                  <td style="color:#0f172a;font-weight:500">${dateVisite}</td>
                </tr>
                <tr>
                  <td style="color:#64748b;padding:4px 0">Acte principal</td>
                  <td style="color:#0f172a;font-weight:500">${visite.acte_principal ?? "—"}</td>
                </tr>
                ${
                  visite.duree_minutes
                    ? `<tr>
                  <td style="color:#64748b;padding:4px 0">Durée estimée</td>
                  <td style="color:#0f172a;font-weight:500">${visite.duree_minutes} minutes</td>
                </tr>`
                    : ""
                }
                ${
                  delegation.motif
                    ? `<tr>
                  <td style="color:#64748b;padding:4px 0">Motif</td>
                  <td style="color:#0f172a;font-weight:500">${delegation.motif}</td>
                </tr>`
                    : ""
                }
              </table>
            </div>

            <!-- Coordonnées patient -->
            <div style="background:#fff7ed;border-radius:8px;padding:20px;margin:24px 0;border-left:4px solid #f97316">
              <p style="margin:0 0 12px;font-weight:bold;color:#ea580c">Coordonnées du patient</p>
              <table cellpadding="0" cellspacing="0" style="width:100%">
                <tr>
                  <td style="color:#64748b;padding:4px 0;width:45%">Nom</td>
                  <td style="color:#0f172a;font-weight:500">${patient.prenom} ${patient.nom}</td>
                </tr>
                <tr>
                  <td style="color:#64748b;padding:4px 0">Adresse</td>
                  <td style="color:#0f172a;font-weight:500">${patient.adresse}, ${patient.code_postal} ${patient.commune}</td>
                </tr>
                <tr>
                  <td style="color:#64748b;padding:4px 0">Téléphone</td>
                  <td>
                    <a href="tel:${patient.telephone}" style="color:#0A4D68;font-weight:bold">${patient.telephone}</a>
                  </td>
                </tr>
                ${
                  patient.code_porte
                    ? `<tr>
                  <td style="color:#64748b;padding:4px 0">Code porte</td>
                  <td style="color:#0f172a;font-weight:500">${patient.code_porte}</td>
                </tr>`
                    : ""
                }
                ${
                  patient.allergies
                    ? `<tr>
                  <td style="color:#64748b;padding:4px 0;vertical-align:top">Allergies</td>
                  <td style="color:#dc2626;font-weight:500">${patient.allergies}</td>
                </tr>`
                    : ""
                }
              </table>
            </div>

            <p style="color:#0f172a;line-height:1.6">
              Merci de me répondre dès que possible pour confirmer votre disponibilité.
            </p>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#f8fafc;padding:16px 32px;border-top:1px solid #e2e8f0;text-align:center">
            <p style="margin:0;color:#64748b;font-size:12px">
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
