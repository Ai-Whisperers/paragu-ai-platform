'use client'

import { useLocale } from '@/lib/locale-context'
import { InvestorLanding } from '@/components/InvestorLanding'
import { BusinessLanding } from '@/components/BusinessLanding'

export default function Home() {
  const { path, isReady } = useLocale()

  if (!isReady) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  }

  if (path === 'investor') return <InvestorLanding />
  if (path === 'business') return <BusinessLanding />

  return <div className="min-h-screen flex items-center justify-center text-muted">
    <p>Select your path to continue</p>
  </div>
}
