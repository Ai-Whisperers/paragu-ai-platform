/**
 * ANNOTATION: LanguageLayout
 *
 * What it is: Root layout for all language-specific routes (es/en).
 * Wraps all [lang] pages with the providers, header, and footer.
 *
 * Why your business needs it: This layout ensures every page has
 * consistent navigation, branding, and language switching capability.
 * The root app/layout.tsx handles html/body — this handles the
 * language-specific UI shell.
 *
 * What AI populates from your data:
 *   - Navigation items from content/{lang}/site.json
 *   - Header logo and branding from content/{lang}/site.json
 *   - Footer content from content/{lang}/site.json
 *   - Cookie consent config from content/{lang}/site.json
 *
 * Plan availability: All plans
 */
import type { Metadata } from "next"
import { LocalBusinessJsonLd } from "@/components/shared/JsonLd"
import { CookieConsent } from "@/components/shared/CookieConsent"
import { ExitIntentPopup } from "@/components/sections/marketing/ExitIntentPopup"
import { ErrorBoundary } from "@/components/shared/ErrorBoundary"
import { CartProvider } from "@/components/shared/cart-store"
import { ScrollToTop } from "@/components/layout/ScrollToTop"
import { getSiteConfig, getSiteName } from "@/lib/config/config"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const site = getSiteConfig(lang as "es" | "en")
  return {
    title: site.site?.name || getSiteName(),
    description: site.site?.metaDescription || "",
    openGraph: {
      type: "website",
      locale: lang === "es" ? "es_PY" : "en_US",
      alternateLocale: lang === "es" ? "en_US" : "es_PY",
      siteName: site.site?.name || getSiteName(),
    },
    alternates: {
      canonical: `/${lang}`,
      languages: {
        es: "/es",
        en: "/en",
      },
    },
  }
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const site = getSiteConfig(lang as "es" | "en")
  return (
    <>
      <LocalBusinessJsonLd
        name={site.site?.name || getSiteName()}
        url={site.site?.url || ""}
        address={site.business?.address || ""}
        phone={site.business?.phone || ""}
        lat={site.business?.coordinates?.lat ?? -25.2637}
        lng={site.business?.coordinates?.lng ?? -57.5759}
      />
      <ScrollToTop />
      <ErrorBoundary>
        <CartProvider>
          {children}
        </CartProvider>
      </ErrorBoundary>
      {site.features?.exitIntentPopup !== false && (
        <ExitIntentPopup lang={lang as "es" | "en"} />
      )}
      <CookieConsent lang={lang as "es" | "en"} />
    </>
  )
}
