import Link from "next/link"
import { ArrowRight, Github, MessageCircle, Sparkles, BookOpen, GitMerge, UserCheck, Rocket, Package, DollarSign, Globe2, Bot, Satellite, Cog, GraduationCap, Calendar, AlertTriangle, CheckCircle2, Clock, Quote, GitBranch } from "lucide-react"
import en from "@/content/en/site.json"
import es from "@/content/es/site.json"

const LOCALES = ["en", "es", "nl", "pt"] as const
const CONTENT: Record<string, any> = { en, es, nl: en, pt: en }

export function generateStaticParams() {
  return LOCALES.map(l => ({ lang: l }))
}

const ICON_MAP: Record<string, any> = {
  GitMerge, UserCheck, Rocket, Package, DollarSign, Globe2,
  Bot, MessageCircle, Satellite, Cog, GraduationCap
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const c = CONTENT[lang] || en
  const base = `/${lang}`
  const trust = c.trust
  const whyWork = c.whyWork
  const process = c.process
  const capabilities = c.capabilities
  const ws = c.whitespace
  const cases = c.caseStudies
  const testimonials = c.testimonials
  const clientsBy = c.clientsBy
  const dontDo = c.whatWeDontDo
  const team = c.team
  const contact = c.contact

  return (
    <>
      {/* HERO */}
      <section className="relative grid-bg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 bg-bg-elev border border-border rounded-full text-xs font-mono text-fg-muted">
            <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
            30+ public repos · 42 live client sites · open-source
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
            <h2 className="text-3xl sm:text-5xl font-bold mb-3">{capabilities.title}</h2>
            <p className="text-fg-muted text-lg max-w-2xl mx-auto">{capabilities.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {capabilities.items.map((cap: any) => {
              const Icon = ICON_MAP[cap.icon] || Sparkles
              return (
                <div key={cap.title} className="group p-6 bg-bg-elev border border-border rounded-xl hover:border-accent/50 transition-colors">
                  <div className="w-10 h-10 mb-4 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{cap.title}</h3>
                  <p className="text-sm text-fg-muted mb-3 leading-relaxed">{cap.desc}</p>
                  <p className="text-xs text-fg-muted/70 font-mono">▸ {cap.proof}</p>
                </div>
              )
            })}
          </div>
          <div className="mt-12 text-center">
            <Link href={`${base}/services`} className="inline-flex items-center gap-2 text-accent hover:text-accent-2 font-medium">
              See the full 28-item service menu with pricing <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY WORK WITH US (NEW) */}
      <section className="border-b border-border bg-bg-elev/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-5xl font-bold mb-3">{whyWork.title}</h2>
            <p className="text-fg-muted text-lg max-w-2xl mx-auto">{whyWork.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {whyWork.items.map((it: any) => {
              const Icon = ICON_MAP[it.icon] || Sparkles
              return (
                <div key={it.title} className="p-6 bg-bg border border-border rounded-xl">
                  <Icon className="w-6 h-6 text-accent mb-3" />
                  <h3 className="text-lg font-bold mb-2">{it.title}</h3>
                  <p className="text-sm text-fg-muted leading-relaxed">{it.body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* PROCESS (NEW) */}
      <section className="border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-5xl font-bold mb-3">{process.title}</h2>
            <p className="text-fg-muted text-lg max-w-2xl mx-auto">{process.subtitle}</p>
          </div>
          <div className="space-y-4">
            {process.steps.map((s: any) => (
              <div key={s.n} className="flex gap-6 p-6 bg-bg-elev border border-border rounded-xl">
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-accent to-accent-3 flex items-center justify-center text-white font-bold text-2xl">
                  {s.n}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                    <h3 className="text-xl font-bold">{s.title}</h3>
                    <span className="text-xs px-2 py-1 bg-accent/10 border border-accent/30 text-accent rounded font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {s.week}
                    </span>
                  </div>
                  <p className="text-fg-muted leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href={`${base}/process`} className="inline-flex items-center gap-2 text-accent hover:text-accent-2 font-medium">
              Full process detail <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-5xl font-bold">{cases.title}</h2>
              <p className="text-fg-muted text-lg mt-2">Six flagship projects. Click through to see the code, the architecture, and the decisions.</p>
            </div>
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

      {/* TESTIMONIALS (NEW) */}
      <section className="border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <Quote className="w-12 h-12 mx-auto mb-3 text-accent opacity-50" />
            <h2 className="text-3xl sm:text-5xl font-bold mb-3">{testimonials.title}</h2>
            <p className="text-fg-muted text-lg">{testimonials.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testimonials.items.slice(0, 4).map((t: any, i: number) => (
              <blockquote key={i} className="p-6 bg-bg-elev border border-border rounded-xl">
                <p className="text-fg-muted leading-relaxed italic mb-4">"{t.body}"</p>
                <footer className="text-sm">
                  <p className="font-bold">— {t.author}</p>
                  <p className="text-fg-muted text-xs">{t.company} · {t.industry}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE DON'T DO (NEW) */}
      <section className="border-b border-border bg-bg-elev/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-5xl font-bold mb-3">{dontDo.title}</h2>
            <p className="text-fg-muted text-lg max-w-2xl mx-auto">{dontDo.subtitle}</p>
          </div>
          <div className="space-y-3">
            {dontDo.items.slice(0, 4).map((it: any, i: number) => (
              <div key={i} className="p-4 bg-bg border border-border rounded-xl flex gap-4">
                <AlertTriangle className="w-5 h-5 flex-shrink-0 text-amber-400 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">{it.topic}</h3>
                  <p className="text-sm text-fg-muted">{it.reason}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href={`${base}/what-we-dont-do`} className="inline-flex items-center gap-2 text-accent hover:text-accent-2 font-medium">
              See full list <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CLIENTS / SOCIAL PROOF BAND (NEW) */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">{clientsBy.title}</h2>
            <p className="text-fg-muted">{clientsBy.subtitle}</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {clientsBy.items.map((it: string, i: number) => (
              <span key={i} className="px-4 py-2 bg-bg-elev border border-border rounded-full text-sm text-fg-muted">
                {it}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* WHITESPACE (the moat) */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-5xl font-bold mb-3">{ws.title}</h2>
            <p className="text-fg-muted text-lg">None of the 20 competitors we benchmarked against have these.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ws.items.map((it: any) => (
              <div key={it.n} className="flex gap-4 p-5 bg-bg-elev border border-border rounded-xl">
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

      {/* CHANGELOG (NEW) */}
      <section className="border-b border-border bg-bg-elev/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-5xl font-bold mb-3">Recent activity</h2>
            <p className="text-fg-muted">Public build log. Updated when something interesting goes live.</p>
          </div>
          <div className="space-y-3">
            {c.changelog.items.slice(0, 5).map((it: any, i: number) => (
              <article key={i} className="bg-bg border border-border rounded-xl p-5">
                <div className="flex items-center gap-2 mb-2 text-xs text-fg-muted">
                  <Calendar className="w-3 h-3" />
                  <time>{it.date}</time>
                  {it.tags?.slice(0, 2).map((t: string) => (
                    <span key={t} className="px-2 py-0.5 bg-bg-elev border border-border rounded text-xs">{t}</span>
                  ))}
                </div>
                <h3 className="text-base font-bold mb-1">{it.title}</h3>
                <p className="text-sm text-fg-muted leading-relaxed">{it.body}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={`${base}/changelog`} className="inline-flex items-center gap-2 text-accent hover:text-accent-2 font-medium">
              Full changelog <ArrowRight className="w-4 h-4" />
            </Link>
            <span className="text-fg-muted/40">·</span>
            <Link href={`${base}/decisions`} className="inline-flex items-center gap-2 text-fg-muted hover:text-fg font-medium">
              <GitBranch className="w-3 h-3" /> Read our decision log
            </Link>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-8">
            {team.members.map((m: any) => (
              <div key={m.name} className="p-6 bg-bg-elev border border-border rounded-xl">
                <h3 className="text-lg font-bold mb-1">{m.name}</h3>
                <p className="text-sm text-accent mb-3">{m.role}</p>
                <p className="text-sm text-fg-muted leading-relaxed mb-3">{m.bio}</p>
                {m.skills && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {m.skills.slice(0, 6).map((s: string) => (
                      <span key={s} className="px-2 py-0.5 bg-bg border border-border rounded text-xs font-mono text-fg-muted">{s}</span>
                    ))}
                  </div>
                )}
                {m.email && <p className="text-xs text-fg-muted/70 font-mono">📧 {m.email}</p>}
                {m.github && <a href={m.github} className="text-xs text-fg-muted/70 hover:text-fg font-mono">💻 GitHub</a>}
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href={`${base}/about`} className="inline-flex items-center gap-2 text-accent hover:text-accent-2 font-medium">
              About the team + 8 named AI bots <ArrowRight className="w-4 h-4" />
            </Link>
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
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm">
            <Link href={`${base}/contact`} className="inline-flex items-center gap-1 text-accent hover:text-accent-2 font-medium">
              Or fill the contact form <ArrowRight className="w-3 h-3" />
            </Link>
            <span className="text-fg-muted">·</span>
            <Link href={`${base}/faq`} className="inline-flex items-center gap-1 text-accent hover:text-accent-2 font-medium">
              Read the FAQ first <ArrowRight className="w-3 h-3" />
            </Link>
            <span className="text-fg-muted">·</span>
            <Link href={`${base}/sales-sheet`} className="inline-flex items-center gap-1 text-accent hover:text-accent-2 font-medium">
              Get the sales sheet <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
