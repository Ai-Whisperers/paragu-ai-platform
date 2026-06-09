import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getSite, isLang, SUPPORTED_LANGS, DEFAULT_LANG, type Lang } from '@/lib/content'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { JsonLd } from '@/components/shared/JsonLd'
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher'
import '@/app/globals.css'

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' })

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const site = getSite(isLang(lang) ? lang : 'es')
  return {
    title: { default: `${site._meta.site} — ${site._meta.tagline}`, template: `%s | ${site._meta.site}` },
    description: site._meta.description,
    keywords: ['femicidio', 'femicide', 'violencia de género', 'gender-based violence', 'América Latina', 'Latin America', 'mapa', 'documentación'],
    openGraph: {
      title: site._meta.site,
      description: site._meta.description,
      url: site._meta.url,
      locale: site._meta.locale === 'pt' ? 'pt_BR' : site._meta.locale === 'en' ? 'en_US' : 'es_PY',
      alternateLocale: SUPPORTED_LANGS.filter((l) => l !== site._meta.locale).map((l) =>
        l === 'pt' ? 'pt_BR' : l === 'en' ? 'en_US' : 'es_PY',
      ),
      type: 'website',
    },
    alternates: {
      canonical: `${site._meta.url}/${site._meta.locale}`,
      languages: Object.fromEntries(
        SUPPORTED_LANGS.map((l) => [l, `${site._meta.url}/${l}`]),
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
        <a href="#main" className="skip-link">Saltar al contenido</a>
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
