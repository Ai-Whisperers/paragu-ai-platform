import Link from "next/link"
import { ArrowRight, Github, MessageCircle, Sparkles, BookOpen, FileSpreadsheet, MapPin, CheckCircle2 } from "lucide-react"
import en from "@/content/en/site.json"
import es from "@/content/es/site.json"

const LOCALES = ["en", "es", "nl", "pt"] as const
const CONTENT: Record<string, any> = { en, es, nl: en, pt: en }

export function generateStaticParams() {
  return LOCALES.map(l => ({ lang: l }))
}

export default function Home({ params }: { params: { lang: string } }) {
  const c = CONTENT[params.lang] || en
  const base = `/${params.lang}`
  const trust = c.trust
  const caps = c.capabilities
  const ws = c.whitespace
  const cases = c.caseStudies
  const team = c.team
  const contact = c.contact

  return (
    <>
      {/* HERO */}
      <section className="relative grid-bg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 bg-bg-elev border border-border rounded-full text-xs font-mono text-fg-muted">
            <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
            42 public repos · 28 live client sites · open-source
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            We build AI systems<br />
            <span className="gradient-text">that actually work.</span>
          </h1>
          <p className="text-lg sm:text-xl text-fg-muted max-w-3xl mx-auto mb-10 leading-relaxed">
            A 2-person engineering studio in Paraguay shipping production code across 6 capability tracks — websites, multi-tenant SaaS, AI agents, MCP servers, automation, and satellite-to-3D visualizations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href={`${base}/contact`} className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/80 transition-colors">
              <MessageCircle className="w-4 h-4" /> Free 30-min strategy call
            </Link>
            <a href={c.site.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-bg-elev border border-border font-semibold rounded-lg hover:border-accent transition-colors">
              <Github className="w-4 h-4" /> View 42 public repos
            </a>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-center text-sm text-fg-muted uppercase tracking-widest font-mono mb-8">{trust.title}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {trust.items.map((it: any) => (
              <div key={it.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">{it.n}</div>
                <div className="text-xs text-fg-muted">{it.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-5xl font-bold mb-3">{caps.title}</h2>
            <p className="text-fg-muted text-lg max-w-2xl mx-auto">{caps.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {caps.items.map((cap: any) => (
              <div key={cap.title} className="group p-6 bg-bg-elev border border-border rounded-xl hover:border-accent/50 transition-colors">
                <div className="w-10 h-10 mb-4 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold mb-2">{cap.title}</h3>
                <p className="text-sm text-fg-muted mb-3 leading-relaxed">{cap.desc}</p>
                <p className="text-xs text-fg-muted/70 font-mono">▸ {cap.proof}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href={`${base}/services`} className="inline-flex items-center gap-2 text-accent hover:text-accent-2 font-medium">
              See the full 28-item service menu with pricing <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* WHITESPACE (the moat) */}
      <section className="border-b border-border bg-bg-elev/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-5xl font-bold mb-3">{ws.title}</h2>
            <p className="text-fg-muted text-lg">None of the 20 competitors we benchmarked against have these.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ws.items.map((it: any) => (
              <div key={it.n} className="flex gap-4 p-5 bg-bg border border-border rounded-xl">
                <div className="flex-shrink-0 w-8 h-8 rounded-md bg-gradient-to-br from-accent to-accent-3 flex items-center justify-center text-white font-bold text-sm">{it.n}</div>
                <div>
                  <h3 className="font-bold mb-1">{it.title}</h3>
                  <p className="text-sm text-fg-muted leading-relaxed">{it.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-end justify-between mb-12">
            <h2 className="text-3xl sm:text-5xl font-bold">{cases.title}</h2>
            <Link href={`${base}/portfolio`} className="hidden sm:inline-flex items-center gap-1 text-accent hover:text-accent-2 text-sm font-medium">
              All case studies <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cases.items.slice(0, 4).map((cs: any) => (
              <a key={cs.title} href={cs.url} target="_blank" rel="noopener noreferrer" className="group p-6 bg-bg-elev border border-border rounded-xl hover:border-accent/50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-xs text-fg-muted font-mono uppercase tracking-wider">{cs.tier}</span>
                    <h3 className="text-xl font-bold mt-1">{cs.title}</h3>
                    <p className="text-sm text-fg-muted">{cs.subtitle}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-fg-muted group-hover:text-accent flex-shrink-0" />
                </div>
                <p className="text-sm text-fg-muted mb-3 leading-relaxed">{cs.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {cs.stack.map((s: string) => (
                    <span key={s} className="px-2 py-0.5 bg-bg border border-border rounded text-xs font-mono text-fg-muted">{s}</span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-5xl font-bold mb-3">{team.title}</h2>
            <p className="text-fg-muted text-lg">{team.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {team.members.map((m: any) => (
              <div key={m.name} className="p-6 bg-bg-elev border border-border rounded-xl">
                <h3 className="text-lg font-bold mb-1">{m.name}</h3>
                <p className="text-sm text-accent mb-3">{m.role}</p>
                <p className="text-sm text-fg-muted leading-relaxed mb-3">{m.bio}</p>
                {m.email && <p className="text-xs text-fg-muted/70 font-mono">📧 {m.email}</p>}
                {m.github && <a href={m.github} className="text-xs text-fg-muted/70 hover:text-fg font-mono">💻 GitHub</a>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="border-b border-border bg-gradient-to-br from-accent/10 to-accent-3/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-3xl sm:text-5xl font-bold mb-3">{contact.title}</h2>
          <p className="text-fg-muted text-lg mb-8 max-w-2xl mx-auto">{contact.subtitle}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
            {contact.channels.map((ch: any) => (
              <a key={ch.label} href={ch.url} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 px-5 py-3 ${ch.primary ? "bg-green text-white hover:bg-green/80" : "bg-bg-elev border border-border hover:border-accent"} font-semibold rounded-lg transition-colors`}>
                {ch.label === "WhatsApp" && <MessageCircle className="w-4 h-4" />}
                {ch.label === "Email" && <BookOpen className="w-4 h-4" />}
                {ch.label === "GitHub" && <Github className="w-4 h-4" />}
                {ch.label}: {ch.value}
              </a>
            ))}
          </div>
          <Link href={`${base}/contact`} className="inline-flex items-center gap-2 text-accent hover:text-accent-2 font-medium">
            Or fill the contact form <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
