// Server actions for the contact form.
// Submits to Supabase (if configured) and always logs for backup.
//
// Env vars (optional):
//   - SUPABASE_URL, SUPABASE_SERVICE_KEY: enable storage to contact_submissions table
//   - RESEND_API_KEY: enable email notification to hola@dra-gp.com.py
//   - CONTACT_NOTIFY_EMAIL: where to send notifications (default: hola@dra-gp.com.py)

"use server"

import { z } from "zod"

// Simple in-memory rate limiter.
// Key = email address, Value = array of submission timestamps in the last hour.
// This is per-server-instance — for a multi-instance deploy, swap to Redis/Upstash.
// Limit: max 3 submissions per email per hour, max 1 submission per email per 30s.
const RATE_LIMIT_MAP: Map<string, number[]> = new Map()
const RATE_LIMIT_MAX = 3
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 1 hour
const RATE_LIMIT_MIN_INTERVAL_MS = 30 * 1000 // 30 seconds

function checkRateLimit(email: string): { allowed: boolean; reason?: string } {
  const now = Date.now()
  const submissions = RATE_LIMIT_MAP.get(email) || []
  // Drop entries outside the window
  const recent = submissions.filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
  // Check minimum interval
  if (recent.length > 0 && now - recent[recent.length - 1] < RATE_LIMIT_MIN_INTERVAL_MS) {
    return {
      allowed: false,
      reason: "Please wait a moment before submitting again.",
    }
  }
  // Check max submissions
  if (recent.length >= RATE_LIMIT_MAX) {
    return {
      allowed: false,
      reason: "Too many submissions. Please try again later or contact us directly.",
    }
  }
  // Record this submission
  RATE_LIMIT_MAP.set(email, [...recent, now])
  return { allowed: true }
}

const ContactSchema = z.object({
  name: z.string().min(2, "Name too short").max(100),
  email: z.string().email().max(200),
  phone: z.string().max(50).optional().default(""),
  subject: z.string().max(200).optional().default(""),
  message: z.string().min(10, "Message too short").max(2000),
  locale: z.enum(["en", "es"]),
})

export type ContactFormInput = z.infer<typeof ContactSchema>

export type ContactFormResult =
  | { ok: true; message: string }
  | { ok: false; message: string; field?: keyof ContactFormInput }

export async function submitContactForm(input: ContactFormInput): Promise<ContactFormResult> {
  // Validate
  const parsed = ContactSchema.safeParse(input)
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]
    return {
      ok: false,
      message: firstError?.message || "Invalid input",
      field: firstError?.path[0] as keyof ContactFormInput | undefined,
    }
  }

  const data = parsed.data

  // Rate limit by email
  const limit = checkRateLimit(data.email)
  if (!limit.allowed) {
    return {
      ok: false,
      message: data.locale === "es"
        ? limit.reason || "Demasiados envíos. Probá más tarde."
        : limit.reason || "Too many submissions. Please try again later.",
    }
  }

  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY
  const notifyEmail = process.env.CONTACT_NOTIFY_EMAIL || "hola@dra-gp.com.py"
  const resendKey = process.env.RESEND_API_KEY

  const errors: string[] = []

  // 1. Log to console (always — fallback trail)
  console.log("[contact-form] new submission", {
    name: data.name,
    email: data.email,
    phone: data.phone,
    subject: data.subject,
    locale: data.locale,
    message_preview: data.message.slice(0, 100),
    timestamp: new Date().toISOString(),
  })

  // 2. Store in Supabase if configured
  if (supabaseUrl && supabaseKey) {
    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/contact_submissions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone || null,
          subject: data.subject || null,
          message: data.message,
          locale: data.locale,
          source: "website",
          created_at: new Date().toISOString(),
        }),
      })
      if (!res.ok) {
        errors.push(`supabase ${res.status}`)
      }
    } catch (err) {
      errors.push(`supabase error: ${err instanceof Error ? err.message : "unknown"}`)
    }
  }

  // 3. Send email notification if Resend is configured
  if (resendKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: "Dra. Gabriella Website <noreply@dragabriela.paragu-ai.com>",
          to: [notifyEmail],
          reply_to: data.email,
          subject: `[Website] ${data.subject || "Contact form submission"} — ${data.name}`,
          html: `
            <h2>New contact form submission</h2>
            <table style="border-collapse:collapse">
              <tr><td><b>Name</b></td><td>${escapeHtml(data.name)}</td></tr>
              <tr><td><b>Email</b></td><td><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
              <tr><td><b>Phone</b></td><td>${escapeHtml(data.phone || "—")}</td></tr>
              <tr><td><b>Subject</b></td><td>${escapeHtml(data.subject || "—")}</td></tr>
              <tr><td><b>Locale</b></td><td>${data.locale}</td></tr>
              <tr><td><b>Submitted</b></td><td>${new Date().toISOString()}</td></tr>
            </table>
            <h3>Message</h3>
            <p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>
          `,
        }),
      })
      if (!res.ok) {
        errors.push(`resend ${res.status}`)
      }
    } catch (err) {
      errors.push(`resend error: ${err instanceof Error ? err.message : "unknown"}`)
    }
  }

  // Result: success if at least the log succeeded
  // (Supabase and Resend are "best effort" — if neither is configured, we still
  // log to stdout which the orchestrator can scrape)
  return {
    ok: true,
    message:
      data.locale === "es"
        ? "Mensaje enviado. Te respondemos en menos de 24 horas."
        : "Message sent. We'll respond within 24 hours.",
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}
