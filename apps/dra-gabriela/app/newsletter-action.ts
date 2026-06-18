"use server"
// Newsletter subscription action.
// Stores emails in Supabase (if configured) and/or sends to Resend (if configured).
// Always logs to stdout.

import { z } from "zod"

const EmailSchema = z.string().email().max(200)

export type NewsletterResult =
  | { ok: true; message: string }
  | { ok: false; message: string }

export async function subscribeToNewsletter(email: string, locale: string): Promise<NewsletterResult> {
  const parsed = EmailSchema.safeParse(email)
  if (!parsed.success) {
    return {
      ok: false,
      message: locale === "es" ? "Email inválido" : "Invalid email address",
    }
  }

  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY
  const resendKey = process.env.RESEND_API_KEY

  // Log always
  console.log("[newsletter] new subscription", {
    email: parsed.data,
    locale,
    timestamp: new Date().toISOString(),
  })

  // Supabase
  if (supabaseUrl && supabaseKey) {
    try {
      await fetch(`${supabaseUrl}/rest/v1/newsletter_subscribers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({
          email: parsed.data,
          locale,
          source: "website",
          created_at: new Date().toISOString(),
        }),
      })
    } catch {}
  }

  // Resend
  if (resendKey) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: "Dra. Gabriella Website <noreply@dragabriela.paragu-ai.com>",
          to: ["hola@dra-gp.com.py"],
          subject: `[Newsletter] New subscriber — ${parsed.data}`,
          html: `<p>New newsletter subscription: <b>${parsed.data}</b> (locale: ${locale})</p>`,
        }),
      })
    } catch {}
  }

  return {
    ok: true,
    message:
      locale === "es"
        ? "Listo. Te avisamos cuando publiquemos algo nuevo."
        : "Done. We'll let you know when we publish something new.",
  }
}
