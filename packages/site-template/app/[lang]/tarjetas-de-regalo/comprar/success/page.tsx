/**
 * ANNOTATION: GiftCardPurchaseSuccess
 *
 * What it is: Post-Stripe-checkout confirmation page for gift card purchases.
 * Reads session_id from URL, calls /api/stripe/verify to confirm payment,
 * and displays the purchased gift card denomination and recipient info.
 *
 * Why your business needs it: Provides immediate confirmation after payment.
 * Clients see their gift card details and receive next steps (email delivery,
 * in-store pickup). Reduces support queries about gift card purchases.
 *
 * What AI populates from your data:
 *   - Gift card denomination and value from Stripe session metadata
 *   - Recipient name from the checkout metadata
 *   - Business branding and WhatsApp contact from config
 *
 * Your input: Tell us your post-purchase confirmation message and WhatsApp
 * fallback number via content config.
 *
 * Plan availability: Profesional
 */

import { SuccessContent } from "./success-content"

interface SuccessProps {
  params: Promise<{ lang: string }>
  searchParams: Promise<Record<string, string | undefined>>
}

export default async function GiftCardSuccessPage({ params, searchParams }: SuccessProps) {
  const [{ lang }, query] = await Promise.all([params, searchParams])
  return <SuccessContent lang={lang || "es"} query={query} />
}
