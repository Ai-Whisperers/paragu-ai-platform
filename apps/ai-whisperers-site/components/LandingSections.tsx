import { ArrowRight, Check, MessageCircle, Clock, Shield, MapPin, Globe2 } from "lucide-react"
import Link from "next/link"
import { FAQItem } from "@/components/FAQItem"

// LandingSections — shared blocks used by all 4 landing pages.
// Pure presentational components. Each accepts typed props so call sites
// can be terse. Theme: existing site dark/indigo tokens, no new design.

interface HeroProps {
  eyebrow: string
  title: string
  subtitle: string
  primaryCta: string
  secondaryCta: string
  primaryCtaHref: string
  secondaryCtaHref: string
  hero?: boolean
  deliveryNote?: string
}

export function LandingHero({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  primaryCtaHref,
  secondaryCtaHref,
  hero = false,
  deliveryNote,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60" aria-hidden />
      <div
        className={`absolute -top-32 right-0 w-[40rem] h-[40rem] rounded-full blur-3xl ${
          hero ? "bg-accent/20" : "bg-accent-3/15"
        }`}
        aria-hidden
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 sm:pt-20 sm:pb-24">
        {eyebrow && (
          <div className="flex items-center gap-2 mb-4 text-xs sm:text-sm font-mono uppercase tracking-widest text-accent-2">
            <span className={`inline-block w-2 h-2 rounded-full ${hero ? "bg-green animate-pulse" : "bg-accent"}`} />
            {eyebrow}
          </div>
        )}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl mb-6">
          {hero ? <span className="gradient-text">{title}</span> : title}
        </h1>
        <p className="text-lg sm:text-xl text-fg-muted max-w-3xl mb-8 leading-relaxed">{subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <a
            href={primaryCtaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent hover:bg-accent/90 text-white font-semibold rounded-lg shadow-lg shadow-accent/20 transition-all"
          >
            {primaryCta} <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href={secondaryCtaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-green/40 bg-green/10 hover:bg-green/15 text-green font-semibold rounded-lg transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            {secondaryCta}
          </a>
        </div>
        {deliveryNote && (
          <p className="mt-6 text-sm text-fg-muted flex items-center gap-2">
            <Clock className="w-4 h-4 text-accent-3" /> {deliveryNote}
          </p>
        )}
      </div>
    </section>
  )
}

interface ProblemProps {
  title: string
  lead: string
  items: string[]
}

export function ProblemSection({ title, lead, items }: ProblemProps) {
  return (
    <section className="py-12 sm:py-16 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <h2 className="text-2xl sm:text-4xl font-bold mb-4">{title}</h2>
            <p className="text-fg-muted text-lg leading-relaxed">{lead}</p>
          </div>
          <div className="lg:col-span-7">
            <ul className="space-y-3">
              {items.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-3 p-4 bg-bg-elev border border-border rounded-xl text-fg"
                >
                  <span className="text-pink font-mono mt-0.5 shrink-0">!</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

interface SolutionItem { title: string; desc: string }
interface SolutionProps {
  title: string
  subtitle?: string
  items: SolutionItem[]
}

export function SolutionSection({ title, subtitle, items }: SolutionProps) {
  return (
    <section className="py-12 sm:py-16 border-t border-border bg-bg-elev/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-4xl font-bold mb-3">{title}</h2>
          {subtitle && <p className="text-fg-muted text-lg">{subtitle}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <div
              key={i}
              className="p-6 bg-bg border border-border rounded-xl hover:border-accent/40 transition-colors"
            >
              <div className="inline-flex items-center justify-center w-9 h-9 bg-accent/10 border border-accent/30 rounded-lg mb-3">
                <Check className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-fg-muted text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

interface ProcessStep { n: number; title: string; body: string }
interface ProcessProps {
  title: string
  timeline: string
  steps: ProcessStep[]
}

export function ProcessSection({ title, timeline, steps }: ProcessProps) {
  return (
    <section className="py-12 sm:py-16 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-10">
          <h2 className="text-2xl sm:text-4xl font-bold">{title}</h2>
          <div className="inline-flex items-center gap-2 text-sm text-fg-muted">
            <Clock className="w-4 h-4 text-accent-3" />
            <span className="font-mono">{timeline}</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((s) => (
            <div key={s.n} className="p-6 bg-bg-elev border border-border rounded-xl">
              <div className="font-mono text-accent text-sm mb-3">PASO {s.n}</div>
              <h3 className="font-bold text-lg mb-2">{s.title}</h3>
              <p className="text-fg-muted text-sm leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

interface PricingProps {
  title: string
  setup: string
  monthly: string
  annual: string
  includes: string[]
  promo?: string
  primaryCtaLabel: string
  primaryCtaHref: string
  monthlyBadge?: string
  hero?: boolean
}

export function PricingSection({
  title,
  setup,
  monthly,
  annual,
  includes,
  promo,
  primaryCtaLabel,
  primaryCtaHref,
  monthlyBadge,
  hero = false,
}: PricingProps) {
  return (
    <section className="py-12 sm:py-16 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-4xl font-bold mb-8 text-center">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className={`p-6 border rounded-xl ${hero ? "bg-accent/10 border-accent/40" : "bg-bg-elev border-border"}`}>
            <p className="text-xs font-mono uppercase tracking-wider text-fg-muted mb-2">Setup único</p>
            <p className="text-2xl sm:text-3xl font-bold gradient-text">{setup}</p>
          </div>
          <div className={`p-6 border rounded-xl ${hero ? "bg-green/10 border-green/40" : "bg-bg-elev border-border"}`}>
            <p className="text-xs font-mono uppercase tracking-wider text-fg-muted mb-2">Mensual</p>
            <p className="text-2xl sm:text-3xl font-bold gradient-text">{monthly}</p>
            {monthlyBadge && <p className="text-xs text-fg-muted mt-1">{monthlyBadge}</p>}
          </div>
          <div className={`p-6 border rounded-xl ${hero ? "bg-accent-3/10 border-accent-3/40" : "bg-bg-elev border-border"}`}>
            <p className="text-xs font-mono uppercase tracking-wider text-fg-muted mb-2">Anual</p>
            <p className="text-base sm:text-lg font-bold text-accent-3">{annual}</p>
          </div>
        </div>
        {promo && (
          <div className="mb-8 p-5 bg-amber/10 border border-amber/40 rounded-xl text-amber-200 text-sm">
            <strong className="font-bold">Promo lanzamiento:</strong> {promo}
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ul className="space-y-2">
            {includes.map((item, i) => (
              <li key={i} className="flex gap-3 text-fg-muted">
                <Check className="w-5 h-5 text-green shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="p-6 bg-gradient-to-br from-accent/10 to-accent-3/10 border border-accent/30 rounded-2xl text-center flex flex-col justify-center">
            <a
              href={primaryCtaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent hover:bg-accent/90 text-white font-semibold rounded-lg shadow-lg shadow-accent/20 transition-all"
            >
              {primaryCtaLabel} <ArrowRight className="w-4 h-4" />
            </a>
            <p className="mt-3 text-xs text-fg-muted">Respondemos al toque en horario comercial.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

interface FAQProps {
  title: string
  items: Array<{ q: string; a: string }>
}

export function FAQSection({ title, items }: FAQProps) {
  return (
    <section className="py-12 sm:py-16 border-t border-border" id="faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-4xl font-bold mb-8 text-center">{title}</h2>
        <div className="space-y-3">
          {items.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface FinalCTAProps {
  title: string
  subtitle: string
  button: string
  href: string
}

export function FinalCTASection({ title, subtitle, button, href }: FinalCTAProps) {
  return (
    <section className="py-16 sm:py-20 border-t border-border bg-gradient-to-br from-accent/10 via-accent-2/5 to-accent-3/10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-5xl font-bold mb-4 gradient-text">{title}</h2>
        <p className="text-lg text-fg-muted mb-8 max-w-xl mx-auto">{subtitle}</p>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green hover:bg-green/90 text-white font-bold text-lg rounded-full shadow-lg shadow-green/30 transition-all"
        >
          <MessageCircle className="w-5 h-5" />
          {button}
        </a>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-fg-muted">
          <span className="inline-flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> Sin compromiso</span>
          <span className="inline-flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Asunción, Paraguay</span>
          <span className="inline-flex items-center gap-1.5"><Globe2 className="w-3.5 h-3.5" /> 4 idiomas</span>
        </div>
      </div>
    </section>
  )
}

interface SocialProofProps {
  title: string
  items: string[]
}

export function SocialSection({ title, items }: SocialProofProps) {
  return (
    <section className="py-12 sm:py-16 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-4xl font-bold mb-8 text-center">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item, i) => (
            <div
              key={i}
              className="p-5 bg-bg-elev border border-border rounded-xl text-sm text-fg-muted text-center leading-relaxed"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

interface ComparisonProps {
  title: string
  headers: [string, string, string]
  rows: Array<[string, string, string]>
}

export function ComparisonTable({ title, headers, rows }: ComparisonProps) {
  return (
    <section className="py-12 sm:py-16 border-t border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-4xl font-bold mb-8 text-center">{title}</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-bg-elev">
                {headers.map((h, i) => (
                  <th
                    key={i}
                    className={`px-4 py-3 font-bold text-left ${i === 2 ? "text-accent" : "text-fg"}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-t border-border">
                  <td className="px-4 py-3 text-fg-muted font-medium">{row[0]}</td>
                  <td className="px-4 py-3 text-fg-muted">{row[1]}</td>
                  <td className="px-4 py-3 text-accent font-medium">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
