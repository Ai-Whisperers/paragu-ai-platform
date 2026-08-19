import './globals.css'
import type { Metadata } from 'next'
import Script from 'next/script'
// ExitPopup disabled 2026-06-24 per Luana: 'el pop up ese qeu te pide el mail para recibir notificaciones del news letter tmb desactiva'
// import ExitPopupWrapper from '../components/ExitPopupWrapper'
import { CookieBanner } from '../components/CookieBanner'
import { CookieConsent } from '../components/ui/CookieConsent'
import WhatsAppButton from '../../components/WhatsAppButton'
import { LocalBusinessSchema } from '../components/seo/LocalBusinessSchema'
import { OrganizationSchema } from '../components/seo/OrganizationSchema'
import { SITE_URL, buildAlternates } from '@/lib/seo'

const GA_ID = process.env.NEXT_PUBLIC_GA4_ID || 'G-XE49GLEP34'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Nexa Paraguay — Residency, Banking & Company for Europeans',
    template: '%s | Nexa Paraguay',
  },
  description:
    'Professional advisory for permanent residency, banking & company incorporation in Paraguay. Close guidance for citizens of the Netherlands, Belgium, Germany and all of Europe.',
  icons: { icon: '/images/brand/favicon.webp' },
  openGraph: {
    title: 'Nexa Paraguay — Residency, Banking & Company for Europeans',
    description:
      'Professional advisory for permanent residency, banking and company incorporation in Paraguay. Close guidance for European citizens.',
    url: SITE_URL,
    siteName: 'Nexa Paraguay',
    locale: 'es_PY',
    type: 'website',
    images: [{ url: '/images/og-default.svg', width: 1200, height: 630 }],
  },
  alternates: buildAlternates(''),
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  // Google Search Console verification code.
  // Set NEXT_PUBLIC_GSC_VERIFICATION in your env (or .env.local) to the actual code
  // from https://search.google.com/search-console (Settings → Ownership verification).
  // Leave unset (empty string) to omit the meta tag.
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || '',
  },
}

import { headers } from 'next/headers'
import { LOCALES } from '@/lib/locales'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Read locale from x-next-locale header set by middleware, or fall back to 'es'
  // The middleware sets this so the root layout can render the correct <html lang>
  const headersList = await headers()
  const locale = headersList.get('x-next-locale') || 'es'
  const safeLocale = (LOCALES as readonly string[]).includes(locale) ? locale : 'es'
  return (
    <html lang={safeLocale}>
      <head>
        {/* Organization schema — site-wide */}
        <OrganizationSchema />
        {/* LocalBusiness / ProfessionalService schema — site-wide */}
        <LocalBusinessSchema locale='es' />
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy='afterInteractive'
        />
        <Script id='ga4-init' strategy='afterInteractive'>
          {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GA_ID}', { cookie_flags: 'max-age=7200;secure;samesite=none' });`}
        </Script>
      </head>
      <body className='font-inter bg-background text-text'>
        <CookieBanner />
        {/* <ExitPopupWrapper /> - disabled per Luana */}
        {children}
        <WhatsAppButton phone="595982515138" />
        <CookieConsent />
      </body>
    </html>
  )
}