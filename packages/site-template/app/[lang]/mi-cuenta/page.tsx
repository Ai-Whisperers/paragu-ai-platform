/** ANNOTATION: MiCuentaPage — WHAT IT DOES: Client portal wrapper. Renders client-portal-app.tsx which handles WhatsApp OTP auth and dashboard. DATA SOURCE: Session via /api/auth/me, client data via /api/client/{phone}. PROPS: params. NOTABLE: Server wrapper for client portal app. */

/**
 * ANNOTATION: ClientPortal (Mi Cuenta)
 *
 * What it is: A client portal / "My Account" page where clients log in via
 * WhatsApp OTP to view their appointment history, loyalty points, gift cards,
 * and manage their profile.
 *
 * Why your business needs it: A client portal transforms one-time visitors into
 * repeat clients. Clients can track their visit count, see progress toward their
 * next loyalty reward, redeem gift cards, and rebook — all without calling.
 * Drives retention and repeat revenue.
 *
 * What AI populates from your data:
 *   - Appointment history from Supabase (or demo data)
 *   - Loyalty points and tier progress from content/{lang}/loyalty/
 *   - Gift card balances from the gift card system
 *   - Client profile info (phone, name, preferences)
 *
 * Your input: This is powered by client data generated as they book and visit.
 * No additional setup needed beyond enabling the feature in site.json features.
 *
 * Plan availability: Profesional
 */

import type { Metadata } from "next"
import ClientPortalApp from "./client-portal-app"
import { getSiteName } from "@/lib/config/config"
import ui from "@/content/en/ui.json"

export const metadata: Metadata = {
  title: `Mi Cuenta — ${getSiteName()}`,
  description: ui.auth.description,
}

export default async function MiCuentaPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  return <ClientPortalApp lang={lang === "en" ? "en" : "es"} />
}
