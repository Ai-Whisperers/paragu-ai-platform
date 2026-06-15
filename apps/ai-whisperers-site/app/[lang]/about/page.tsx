import en from "@/content/en/site.json"
import es from "@/content/es/site.json"

const LOCALES = ["en", "es", "nl", "pt"] as const
const CONTENT: Record<string, any> = { en, es, nl: en, pt: en }

export function generateStaticParams() { return LOCALES.map(l => ({ lang: l })) }

export const metadata = { title: "About" }

export default function About({ params }: { params: { lang: string } }) {
  const c = CONTENT[params.lang] || en
  const team = c.team
  const site = c.site
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl sm:text-6xl font-bold mb-6">{team.title}</h1>
      <p className="text-xl text-fg-muted mb-12">{team.subtitle}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        {team.members.map((m: any) => (
          <div key={m.name} className="p-6 bg-bg-elev border border-border rounded-xl">
            <h3 className="text-2xl font-bold mb-1">{m.name}</h3>
            <p className="text-accent font-medium mb-3">{m.role}</p>
            <p className="text-fg-muted mb-3 leading-relaxed">{m.bio}</p>
            {m.email && <p className="text-xs text-fg-muted/70 font-mono">📧 {m.email}</p>}
            {m.github && <a href={m.github} className="text-xs text-fg-muted/70 hover:text-fg font-mono">💻 GitHub</a>}
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-bold mb-4">Our story</h2>
      <div className="prose prose-invert max-w-none text-fg-muted space-y-4 leading-relaxed">
        <p>
          AI Whisperers was founded in November 2025 in San Lorenzo, Paraguay — a small city just outside Asunción, the capital. The mission was simple: make production AI practical for the businesses that need it most.
        </p>
        <p>
          Paraguay is a country of <strong>PYMEs</strong> — small and medium-sized businesses that drive the economy but rarely have access to the kind of AI engineering talent that Fortune 500s take for granted. The same is true across LATAM. We built AI Whisperers to close that gap.
        </p>
        <p>
          We don't sell slide decks. We sell <strong>publicly verifiable production systems</strong>. Every claim on this site is backed by a public GitHub repository. Every project we ship can be inspected, audited, and forked. 42 public repos, 28 live client sites, 1 open-source 20-pattern agentic framework, and a 4-language website are the proof.
        </p>
        <p>
          Today we work across 6 capability tracks: web & SaaS, AI agents, WhatsApp + customer engagement, 3D & satellite visualization, automation & data, and training & strategy. We ship in public. We don't hide behind NDAs. We don't sell hours — we ship code.
        </p>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-4">Where we are</h2>
      <p className="text-fg-muted leading-relaxed">
        {site.basedIn}. {site.serviceArea}.
      </p>
      <p className="text-fg-muted leading-relaxed">
        WhatsApp: <a href={`https://wa.me/${site.whatsapp}`} className="text-accent hover:text-accent-2">{site.phone}</a> · Email: <a href={`mailto:${site.email}`} className="text-accent hover:text-accent-2">{site.email}</a>
      </p>
    </div>
  )
}
