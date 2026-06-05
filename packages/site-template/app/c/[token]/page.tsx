/**
 * ANNOTATION: GiftCardClaim
 *
 * What it is: The gift card claim page — accessible via a UUID token link
 * (e.g., /c/abc123...). Fetches gift card data from /api/gift-card/{token}
 * and displays a visual gift card viewer (amount, recipient, message, balance,
 * expiry). Shows an error state if the token is invalid.
 *
 * Why your business needs it: This is the page your gift card purchaser shares
 * with their recipient. When the recipient opens the link, they see their gift
 * card and can "redeem" it (in practice, show it at the business as proof of
 * payment). Makes gift cards feel premium and trustworthy.
 *
 * What AI populates from your data:
 *   - Gift card data (amount, balance, recipient name, message) from Supabase
 *   - Design/theme from the card's design field
 *   - Expiry date and status
 *
 * Your input: Gift cards are created via the purchase flow (Stripe). This
 * page renders whatever data was stored at creation time. No additional
 * configuration needed — it works automatically.
 */

import type { Metadata } from "next"
import Link from "next/link"
import GiftCardViewer from "./gift-card-viewer"
import { getSiteName } from "@/lib/config/config"

export const metadata: Metadata = {
  title: `Tarjeta de Regalo — ${getSiteName()}`,
  description: `Tu tarjeta de regalo digital de ${getSiteName()}`,
}

type GiftCardData = {
  code: string
  amount_gs: number
  balance_gs: number
  buyer_name: string | null
  recipient_name: string | null
  message: string | null
  design: string | null
  status: string
  expires_at: string | null
}

async function fetchGiftCard(token: string): Promise<GiftCardData | null> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3001"
  try {
    const res = await fetch(`${baseUrl}/api/gift-card/${encodeURIComponent(token)}`, { cache: "no-store" })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export default async function GiftCardPage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params
  const card = await fetchGiftCard(token)

  if (!card) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="font-heading text-2xl font-bold text-gray-900 mb-2">Tarjeta no encontrada</h1>
          <p className="text-gray-500 mb-6">Este enlace no corresponde a una tarjeta de regalo válida.</p>
          <Link href="/es" className="inline-flex items-center gap-2 bg-gray-900 text-white font-bold px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors">
            Volver al inicio
          </Link>
        </div>
      </div>
    )
  }

  return <GiftCardViewer card={card} />
}
