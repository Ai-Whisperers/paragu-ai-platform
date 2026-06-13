'use client'

import { useLocale } from '@/lib/locale-context'
import { InvestorLanding } from '@/components/InvestorLanding'
import { BusinessLanding } from '@/components/BusinessLanding'
import { TrustStrip, TRUST_ITEMS_PROFESSIONAL } from "@/components/truststrip"

export default function Home() {
  const { path } = useLocale()

  // Default to investor landing (primary audience). Business path also available.
  if (path === 'business') return <BusinessLanding />
  return <InvestorLanding />
}
