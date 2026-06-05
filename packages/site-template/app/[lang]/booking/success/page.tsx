/**
 * ANNOTATION: BookingSuccessPage
 *
 * What it is: A post-booking confirmation page shown after a client successfully
 * submits an appointment request. Reads query parameters (name, service, date)
 * to display a personalized thank-you message.
 *
 * Why your business needs it: Reduces post-booking anxiety. Clients need
 * reassurance their request was received. This page tells them exactly what
 * happens next ("We'll confirm via WhatsApp in minutes") and can upsell loyalty
 * programs or gift cards.
 *
 * What AI populates from your data:
 *   - Confirmation copy from content/{lang}/ui.json
 *   - Next-steps instructions based on your booking workflow
 *   - Loyalty program upsell from site config
 *   - WhatsApp confirmation copy
 *
 * Your input: Tell us your post-booking confirmation message via WhatsApp
 * (e.g., "Thanks! We'll text you within 2 hours to confirm.").
 *
 * Plan availability: Crecimiento, Profesional
 */

import { SuccessContent } from "./success-content"

interface SuccessProps {
  params: Promise<{ lang: string }>
  searchParams: Promise<Record<string, string | undefined>>
}

export default async function ReservationSuccessPage({ params, searchParams }: SuccessProps) {
  const [{ lang }, query] = await Promise.all([params, searchParams])
  return <SuccessContent lang={lang || "es"} query={query} />
}
