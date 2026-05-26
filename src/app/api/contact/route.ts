import { type NextRequest } from "next/server";
import { db } from "@/db";
import { demandesContact } from "@/db/schema";
import { contactFormSchema } from "@/lib/validations/contact";
import {
  sendContactNotificationToAdmin,
  sendContactConfirmationToPatient,
} from "@/lib/email/send";

// Rate limiting in-memory (best-effort — resets on cold start in serverless)
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_WINDOW_MS = 60_000;

const SPAM_KEYWORDS = [
  "casino",
  "crypto",
  "bitcoin",
  "loan",
  "mortgage",
  "viagra",
  "cialis",
  "sex",
  "porn",
  "http://",
  "https://bit.ly",
];

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

function isRateLimited(ip: string): boolean {
  const last = rateLimitMap.get(ip);
  const now = Date.now();
  if (last && now - last < RATE_LIMIT_WINDOW_MS) return true;
  rateLimitMap.set(ip, now);
  return false;
}

function isSpam(message?: string): boolean {
  if (!message) return false;
  const lower = message.toLowerCase();
  return SPAM_KEYWORDS.some((kw) => lower.includes(kw));
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return Response.json(
      { error: "Trop de demandes. Veuillez patienter une minute avant de réessayer." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Corps de requête invalide." }, { status: 400 });
  }

  const result = contactFormSchema.safeParse(body);
  if (!result.success) {
    return Response.json(
      { error: "Données invalides.", details: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const data = result.data;

  if (isSpam(data.message)) {
    return Response.json(
      { error: "Votre message a été détecté comme spam." },
      { status: 400 }
    );
  }

  let demande;
  try {
    const [inserted] = await db
      .insert(demandesContact)
      .values({
        nom: data.nom,
        telephone: data.telephone,
        email: data.email,
        commune: data.commune,
        type_demande: data.type_demande,
        message: data.message,
        rgpd_consent: data.rgpd_consent,
        statut: "nouveau",
        ip_adresse: ip,
      })
      .returning();
    demande = inserted;
  } catch (error) {
    console.error("[api/contact] Erreur insertion DB :", error);
    return Response.json(
      { error: "Une erreur est survenue. Veuillez réessayer." },
      { status: 500 }
    );
  }

  await Promise.all([
    sendContactNotificationToAdmin(demande),
    sendContactConfirmationToPatient(demande),
  ]);

  return Response.json({ success: true, id: demande.id }, { status: 201 });
}
