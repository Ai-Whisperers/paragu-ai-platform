import { notFound } from "next/navigation"
import { SchemaJsonLd } from "@/components/SchemaJsonLd"
import { WhatsAppFloat } from "@/components/WhatsAppFloat"
import {
  LandingHero,
  ProblemSection,
  SolutionSection,
  SocialSection,
  ProcessSection,
  PricingSection,
  FAQSection,
  FinalCTASection,
  ComparisonTable,
} from "@/components/LandingSections"
import en from "@/content/en/landing-empresa.json"
import en2 from "@/content/en/landing-profesional.json"
import en3 from "@/content/en/landing-ecommerce.json"
import en4 from "@/content/en/landing-hosting.json"
import es from "@/content/es/landing-empresa.json"
import es2 from "@/content/es/landing-profesional.json"
import es3 from "@/content/es/landing-ecommerce.json"
import es4 from "@/content/es/landing-hosting.json"
import nl from "@/content/nl/landing-empresa.json"
import nl2 from "@/content/nl/landing-profesional.json"
import nl3 from "@/content/nl/landing-ecommerce.json"
import nl4 from "@/content/nl/landing-hosting.json"
import pt from "@/content/pt/landing-empresa.json"
import pt2 from "@/content/pt/landing-profesional.json"
import pt3 from "@/content/pt/landing-ecommerce.json"
import pt4 from "@/content/pt/landing-hosting.json"
import siteEn from "@/content/en/site.json"
import siteEs from "@/content/es/site.json"
import { buildAlternates, SITE_URL } from "@/lib/seo"

const LOCALES = ["en", "es", "nl", "pt"] as const
type Locale = (typeof LOCALES)[number]

interface LandingContent {
  slug: string
  kind: string
  hero?: boolean
  price: { setup: string; monthly: string; annual: string; promo?: string }
  // Empresa / Empresarial uses `hero` (without _section suffix); Empresa also has `hero`, `process`, `social`, `pricingBreakdown`, `faq`, `finalCta`.
  // Profesional uses `hero_section` to avoid clashing with the `hero: true` boolean.
  hero_section?: {
    eyebrow: string
    title: string
    subtitle: string
    primaryCta: string
    secondaryCta: string
    primaryCtaHref: string
    secondaryCtaHref: string
  }
  hero_alt?: typeof es.hero
  problem: { title: string; lead: string; items: string[] }
  solution: { title: string; subtitle?: string; items: Array<{ title: string; desc: string }> }
  social?: { title: string; items: string[] }
  process?: { title: string; timeline: string; steps: Array<{ n: number; title: string; body: string }> }
  pricingBreakdown: {
    title: string
    setup: string
    monthly: string
    annual: string
    includes: string[]
  }
  promotion?: { title: string; highlight: string; description: string }
  promo?: string
  delivery?: { title: string; lead: string; items: string[] }
  audiences?: { title: string; items: string[] }
  includes?: { title: string; items: string[] }
  logistics?: { title: string; items: string[] }
  comparison?: { title: string; headers: [string, string, string]; rows: Array<[string, string, string]> }
  suitability?: { title: string; items: string[] }
  faq: Array<{ q: string; a: string }>
  finalCta: { title: string; subtitle: string; button: string; href: string }
}

type Slug = "empresa" | "profesional" | "ecommerce" | "hosting"
const SLUGS: Slug[] = ["empresa", "profesional", "ecommerce", "hosting"]

// Per-page metadata. Index = slug. Hand-tuned for SEO:
//  - title < 60 chars with primary keyword first
//  - description < 155 chars with CTA
//  - og:title / og:description match
// Note: title template is "%s · AI Whisperers" from root layout (matches site pattern).
const SEO: Record<
  Slug,
  {
    es: { title: string; description: string; ogTitle?: string }
    en: { title: string; description: string; ogTitle?: string }
    pt: { title: string; description: string }
    nl: { title: string; description: string }
  }
> = {
  empresa: {
    es: {
      title: "Plan Empresa Paraguay — CRM + medición real",
      description:
        "Medí cuánto vuelve de cada campaña. Sitio + landing + CRM + WhatsApp Business para py con 10–80 empleados. 639K Gs/mes. Auditoría gratis.",
    },
    en: {
      title: "Plan Empresa Paraguay — CRM + real measurement",
      description:
        "Measure what returns from every campaign. Site + landing + CRM + WhatsApp Business for 10–80 employee companies. Gs 639K/mo. Free audit.",
    },
    pt: {
      title: "Plano Empresa Paraguai — CRM + medição real",
      description:
        "Meça o que retorna de cada campanha. Site + landing + CRM + WhatsApp Business para empresas de 10–80 funcionários. Auditoria grátis.",
    },
    nl: {
      title: "Bedrijfsplan Paraguay — CRM + echte meting",
      description:
        "Meet wat er terugkomt van elke campagne. Site + landing + CRM + WhatsApp Business voor bedrijven met 10–80 medewerkers. Gratis audit.",
    },
  },
  profesional: {
    es: {
      title: "Sitio profesional Paraguay en 48 horas",
      description:
        "Tu consultorio, estudio u oficina en Google con botón directo a WhatsApp. Listo en 48 horas. SEO local + reservas. 381K Gs/mes.",
    },
    en: {
      title: "Professional website Paraguay in 48 hours",
      description:
        "Your practice or office on Google with one-tap WhatsApp. Live in 48 hours. Local SEO + bookings. Gs 381K/month.",
    },
    pt: {
      title: "Site profissional Paraguai em 48 horas",
      description:
        "Seu consultório ou escritório no Google com WhatsApp em um toque. Pronto em 48 horas. SEO local + reservas. Gs 381K/mês.",
    },
    nl: {
      title: "Professionele website Paraguay in 48 uur",
      description:
        "Uw praktijk of kantoor op Google met directe WhatsApp-knop. Klaar in 48 uur. Lokale SEO + boekingen. Gs 381K/maand.",
    },
  },
  ecommerce: {
    es: {
      title: "Tienda online Paraguay — vendé en 2 semanas",
      description:
        "Vende online sin saber de tecnología. Catálogo + Tigo Money + Personal Pay + WhatsApp. Setup bonificado para el primer cliente.",
    },
    en: {
      title: "Online store Paraguay — sell in 2 weeks",
      description:
        "Sell online without learning to code. Catalog + Tigo Money + Personal Pay + WhatsApp. Setup free for first client.",
    },
    pt: {
      title: "Loja online Paraguai — venda em 2 semanas",
      description:
        "Venda online sem aprender a programar. Catálogo + Tigo Money + Personal Pay + WhatsApp. Setup grátis para o primeiro cliente.",
    },
    nl: {
      title: "Online winkel Paraguay — verkoop in 2 weken",
      description:
        "Verkoop online zonder te leren programmeren. Catalogus + Tigo Money + Personal Pay + WhatsApp. Setup gratis voor eerste klant.",
    },
  },
  hosting: {
    es: {
      title: "Hosting Paraguay con soporte en español",
      description:
        "Hosting gestionado, SSL + backups + 99,5% uptime SLA. Migramos tu sitio en 24 horas. Soporte por WhatsApp. 97K Gs/mes.",
    },
    en: {
      title: "Paraguay hosting with Spanish support",
      description:
        "Managed hosting, SSL + backups + 99.5% uptime SLA. Migration in 24 hours. WhatsApp support. Gs 97K/month.",
    },
    pt: {
      title: "Hosting Paraguai com suporte em espanhol",
      description:
        "Hospedagem gerenciada, SSL + backups + 99,5% uptime SLA. Migração em 24 horas. Suporte por WhatsApp. Gs 97K/mês.",
    },
    nl: {
      title: "Paraguay hosting met Spaanstalige support",
      description:
        "Managed hosting, SSL + backups + 99,5% uptime SLA. Migratie in 24 uur. WhatsApp-ondersteuning. Gs 97K/maand.",
    },
  },
}

// Content maps per locale. Each landing has a (slug, locale) -> JSON object lookup.
const CONTENT: Record<Locale, Record<Slug, LandingContent>> = {
  en: { empresa: en as unknown as LandingContent, profesional: en2 as unknown as LandingContent, ecommerce: en3 as unknown as LandingContent, hosting: en4 as unknown as LandingContent },
  es: { empresa: es as unknown as LandingContent, profesional: es2 as unknown as LandingContent, ecommerce: es3 as unknown as LandingContent, hosting: es4 as unknown as LandingContent },
  nl: { empresa: nl as unknown as LandingContent, profesional: nl2 as unknown as LandingContent, ecommerce: nl3 as unknown as LandingContent, hosting: nl4 as unknown as LandingContent },
  pt: { empresa: pt as unknown as LandingContent, profesional: pt2 as unknown as LandingContent, ecommerce: pt3 as unknown as LandingContent, hosting: pt4 as unknown as LandingContent },
}

const SITE_CONTENT: Record<Locale, any> = {
  en: siteEn,
  es: siteEs,
  nl: siteEn,
  pt: siteEn,
}

export async function generateStaticParams() {
  // For each (lang, slug) -> emit a static page
  const out: Array<{ lang: Locale; slug: Slug }> = []
  for (const l of LOCALES) for (const s of SLUGS) out.push({ lang: l, slug: s })
  return out
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params
  if (!LOCALES.includes(lang as Locale) || !SLUGS.includes(slug as Slug)) return {}
  const seoByLocale = SEO[slug as Slug]
  const seo = (seoByLocale as any)[lang as Locale] ?? seoByLocale.en
  const title = `${seo.title}`
  const description = seo.description

  // Build hreflang alternates per locale for this landing
  const alts = buildAlternates(`landings/${slug}`)

  return {
    title,
    description,
    alternates: alts,
    openGraph: {
      type: "website",
      title,
      description,
      url: `${SITE_URL}/${lang}/landings/${slug}`,
      siteName: "AI Whisperers",
      locale: lang,
      images: [
        {
          url: `${SITE_URL}/og/og-landings-${slug}.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [`${SITE_URL}/og/og-landings-${slug}.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" as const, "max-snippet": -1 },
    },
  }
}

export default async function LandingPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params
  if (!LOCALES.includes(lang as Locale) || !SLUGS.includes(slug as Slug)) notFound()

  const cRaw = (CONTENT[lang as Locale]?.[slug as Slug]) ?? CONTENT.en[slug as Slug]
  const site = SITE_CONTENT[lang as Locale]
  const c = cRaw as unknown as LandingContent & { [key: string]: any }

  // Pick the hero data — empresa uses `hero` as data object; profesional uses `hero_section`
  // because its top-level `hero` is a boolean flag. Pick the data object, not the flag.
  const heroObj: {
    eyebrow: string
    title: string
    subtitle: string
    primaryCta: string
    secondaryCta: string
    primaryCtaHref: string
    secondaryCtaHref: string
  } =
    (c as any).hero_section ??
    ((c as any).hero && typeof (c as any).hero === "object" ? (c as any).hero : null) ??
    (c as any).hero_alt
  if (!heroObj) {
    // Should never happen given our JSON shape; guard for type narrowing.
    throw new Error(`Landing "${slug}" locale "${lang}" missing hero block`)
  }
  const isHero = !!(c as any).hero
  const pageUrl = `${SITE_URL}/${lang}/landings/${slug}`

  // Schema data fields
  const priceNumber = (c.price?.monthly ?? "").match(/[\d.,]+/)?.[0]?.replace(/[.,]/g, "") ?? ""

  return (
    <>
      <SchemaJsonLd
        site={{ name: site.site.name, description: site.site.description, phone: site.site.phone, whatsapp: site.site.whatsapp, email: site.site.email, address: site.site.address, basedIn: site.site.basedIn, serviceArea: site.site.serviceArea, github: site.site.github, liveSite: site.site.liveSite, founded: site.site.founded }}
        pageUrl={pageUrl}
        pageTitle={heroObj.title}
        pageDescription={heroObj.subtitle}
        imageUrl={`${SITE_URL}/og/og-landings-${slug}.png`}
        faqs={c.faq}
        productName={c.kind}
        productDescription={heroObj.subtitle}
        productPrice={priceNumber}
        productCurrency="PYG"
      />
      <LandingHero
        eyebrow={heroObj.eyebrow}
        title={heroObj.title}
        subtitle={heroObj.subtitle}
        primaryCta={heroObj.primaryCta}
        secondaryCta={heroObj.secondaryCta}
        primaryCtaHref={heroObj.primaryCtaHref}
        secondaryCtaHref={heroObj.secondaryCtaHref}
        hero={isHero}
        deliveryNote={c.delivery?.lead}
      />

      <ProblemSection title={c.problem.title} lead={c.problem.lead} items={c.problem.items} />

      <SolutionSection title={c.solution.title} subtitle={c.solution.subtitle} items={c.solution.items} />

      {c.audiences && (
        <section className="py-12 sm:py-16 border-t border-border">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-4xl font-bold mb-6 text-center">{c.audiences.title}</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {c.audiences.items.map((item, i) => (
                <li key={i} className="p-4 bg-bg-elev border border-border rounded-xl text-fg-muted text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {c.delivery && (
        <section className="py-12 sm:py-16 border-t border-border bg-bg-elev/40">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-4xl font-bold mb-3 text-center">{c.delivery.title}</h2>
            <p className="text-fg-muted text-center mb-8 max-w-xl mx-auto">{c.delivery.lead}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {c.delivery.items.map((item, i) => (
                <div key={i} className="p-4 bg-bg border border-border rounded-xl text-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {c.suitability && (
        <section className="py-12 sm:py-16 border-t border-border">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-4xl font-bold mb-6 text-center">{c.suitability.title}</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {c.suitability.items.map((item, i) => (
                <li key={i} className="p-4 bg-bg-elev border border-border rounded-xl text-fg-muted text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {c.social && <SocialSection title={c.social.title} items={c.social.items} />}

      <div className="px-4 py-4 bg-accent/20">SOCIAL_GROUP_END</div>

      {c.comparison && <ComparisonTable title={c.comparison.title} headers={c.comparison.headers} rows={c.comparison.rows} />}

      {c.process && <ProcessSection title={c.process.title} timeline={c.process.timeline} steps={c.process.steps} />}

      {c.includes && (
        <section className="py-12 sm:py-16 border-t border-border">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-4xl font-bold mb-6 text-center">{c.includes.title}</h2>
            <ul className="space-y-2">
              {c.includes.items.map((item, i) => (
                <li key={i} className="flex gap-3 text-fg-muted">
                  <span className="text-green">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {c.logistics && (
        <section className="py-12 sm:py-16 border-t border-border">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-4xl font-bold mb-6 text-center">{c.logistics.title}</h2>
            <ul className="space-y-3">
              {c.logistics.items.map((item, i) => (
                <li key={i} className="p-4 bg-bg-elev border border-border rounded-xl text-fg-muted text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {(c as any).promo && (c as any).promo.title && (
        <section className="py-12 sm:py-16 border-t border-border bg-amber/5">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-4xl font-bold mb-3">{(c as any).promo.title}</h2>
            <div className="inline-block px-4 py-1 bg-amber/20 border border-amber/40 rounded-full text-amber font-bold mb-4">
              {(c as any).promo.highlight}
            </div>
            <p className="text-fg-muted">{(c as any).promo.description}</p>
          </div>
        </section>
      )}

      <PricingSection
        title={c.pricingBreakdown.title}
        setup={c.pricingBreakdown.setup}
        monthly={c.pricingBreakdown.monthly}
        annual={c.pricingBreakdown.annual}
        includes={c.pricingBreakdown.includes}
        promo={c.price?.promo}
        primaryCtaLabel={c.finalCta.button}
        primaryCtaHref={c.finalCta.href}
        hero={isHero}
      />
      <WhatsAppFloat phone={site.site.whatsapp} defaultMessage={heroObj.subtitle} label="Respondemos al toque" productSlug={slug} />
    </>
  )
}

