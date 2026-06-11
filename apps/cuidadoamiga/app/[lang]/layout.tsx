import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getSite, isLang, SUPPORTED_LANGS, DEFAULT_LANG, type Lang } from '@/lib/content'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { JsonLd } from '@/components/shared/JsonLd'
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher'
import { SkipLink } from '@/components/a11y/SkipLink'
import '@/app/globals.css'

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' })

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const site = getSite(isLang(lang) ? lang : 'es')
  // Use the deployment URL for og:image. NEXT_PUBLIC_SITE_URL is set in Dockerfile.
  // Default to current deployment (paragu-ai.com subdomain).
  const deployUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cuidadoamiga.paragu-ai.com'
  const ogImageUrl = `${deployUrl}/${site._meta.locale}/opengraph-image`

  return {
    title: { default: `${site._meta.site} — ${site._meta.tagline}`, template: `%s | ${site._meta.site}` },
    description: site._meta.description,
    keywords: ['femicidio', 'femicide', 'violencia de género', 'gender-based violence', 'América Latina', 'Latin America', 'mapa', 'documentación'],
    authors: [{ name: site._meta.owner }],
    creator: site._meta.owner,
    publisher: site._meta.site,
    robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    openGraph: {
      title: `${site._meta.site} — ${site._meta.tagline}`,
      description: site._meta.description,
      url: `${deployUrl}/${site._meta.locale}`,
      siteName: site._meta.site,
      images: [
        {
          url: `${deployUrl}/og/og-image.png`,
          width: 1200,
          height: 630,
          alt: site._meta.tagline,
          type: 'image/png',
        },
      ],
      locale: site._meta.locale === 'pt' ? 'pt_BR' : site._meta.locale === 'en' ? 'en_US' : 'es_PY',
      alternateLocale: SUPPORTED_LANGS.filter((l) => l !== site._meta.locale).map((l) =>
        l === 'pt' ? 'pt_BR' : l === 'en' ? 'en_US' : 'es_PY',
      ),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: site._meta.site,
      description: site._meta.description,
      images: [`${deployUrl}/og/og-image.png`],
    },
    alternates: {
      canonical: `${deployUrl}/${site._meta.locale}`,
      languages: Object.fromEntries(
        SUPPORTED_LANGS.map((l) => [l, `${deployUrl}/${l}`]),
      ),
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
  const { lang: langRaw } = await params
  const lang: Lang = isLang(langRaw) ? langRaw : 'es'
  const site = getSite(lang)

  return (
    <html lang={lang} className={inter.className}>
      <body className="min-h-full flex flex-col">
        <SkipLink />
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: site._meta.site,
            url: site._meta.url,
            description: site._meta.description,
            inLanguage: SUPPORTED_LANGS,
            potentialAction: {
              '@type': 'SearchAction',
              target: `${site._meta.url}/${lang}/casos?q={search_term_string}`,
              'query-input': 'required name=search_term_string',
            },
          }}
        />
        <Navbar lang={lang} currentPath="/" />
        <div className="border-b border-border bg-surface-2">
          <div className="max-w-7xl mx-auto px-4 h-9 flex items-center justify-end">
            <LanguageSwitcher current={lang} />
          </div>
        </div>
        <main id="main" className="flex-1">{children}</main>
        <Footer lang={lang} />
      </body>
    </html>
  )
}
