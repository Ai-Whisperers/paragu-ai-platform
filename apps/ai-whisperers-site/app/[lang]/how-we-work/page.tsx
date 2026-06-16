import { notFound } from "next/navigation"
import { Bot, Sparkles, Code, Users, FileText, Search, Briefcase, Mail, Cpu, Workflow } from "lucide-react"
import en from "@/content/en/site.json"
import es from "@/content/es/site.json"
import nl from "@/content/nl/site.json"
import pt from "@/content/pt/site.json"

const LOCALES = ["en", "es", "nl", "pt"] as const
const CONTENT: Record<string, any> = { en, es, nl, pt }

export function generateStaticParams() {
  return LOCALES.map(l => ({ lang: l }))
}

export const metadata = { title: "How we work" }

// Map bot name (EN) to lucide icon
const ICON_MAP: Record<string, any> = {
  Erebus: Cpu,
  "explorer-bot": Search,
  "closer-bot": Briefcase,
  "copy-bot": FileText,
  "architect-bot": Workflow,
  "client-success-bot": Users,
  "delivery-bot": Sparkles,
  "ops-bot": Bot,
}

// Bot name translations per locale
const BOT_NAMES: Record<string, Record<string, string>> = {
  es: {
    Erebus: "Erebus",
    "explorer-bot": "explorer-bot",
    "closer-bot": "closer-bot",
    "copy-bot": "copy-bot",
    "architect-bot": "architect-bot",
    "client-success-bot": "client-success-bot",
    "delivery-bot": "delivery-bot",
    "ops-bot": "ops-bot",
  },
  nl: {
    Erebus: "Erebus",
    "explorer-bot": "verkenner-bot",
    "closer-bot": "sluit-bot",
    "copy-bot": "kopieer-bot",
    "architect-bot": "architect-bot",
    "client-success-bot": "klant-succes-bot",
    "delivery-bot": "levering-bot",
    "ops-bot": "ops-bot",
  },
  pt: {
    Erebus: "Erebus",
    "explorer-bot": "explorador-bot",
    "closer-bot": "fechador-bot",
    "copy-bot": "copia-bot",
    "architect-bot": "arquiteto-bot",
    "client-success-bot": "sucesso-do-cliente-bot",
    "delivery-bot": "entrega-bot",
    "ops-bot": "ops-bot",
  },
}

export default async function HowWeWorkPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!LOCALES.includes(lang as any)) notFound()
  const c = CONTENT[lang] || en
  const team = c.team
  const base = `/${lang}`
  const isEs = lang === "es"
  const isNl = lang === "nl"
  const isPt = lang === "pt"

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl sm:text-6xl font-extrabold mb-3 tracking-tight">
        {isEs ? "Cómo trabajamos" : isNl ? "Hoe we werken" : isPt ? "Como trabalhamos" : "How we work"}
      </h1>
      <p className="text-xl text-fg-muted mb-3">{team.subtitle}</p>
      <p className="text-fg-muted leading-relaxed max-w-3xl mb-12">
        {isEs
          ? "No somos una agencia de 50 personas. Somos 2 fundadores + 8 bots de IA nombrados. Cada bot tiene un rol, una responsabilidad, y un set de skills. Trabajan con nosotros, no para nosotros."
          : isNl
          ? "We zijn geen 50-mensen bureau. We zijn 2 oprichters + 8 vernoemde AI-bots. Elke bot heeft een rol, verantwoordelijkheid, en skillset. Ze werken met ons, niet voor ons."
          : isPt
          ? "Não somos um bureau de 50 pessoas. Somos 2 fundadores + 8 bots de IA nomeados. Cada bot tem um papel, responsabilidade e conjunto de habilidades. Trabalham conosco, não para nós."
          : "We're not a 50-person agency. We're 2 founders + 8 named AI bots. Each bot has a role, a responsibility, and a skillset. They work with us, not for us."}
      </p>

      {/* Team members */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Users className="w-6 h-6 text-accent" />
          {isEs ? "Los 2 fundadores" : isNl ? "De 2 oprichters" : isPt ? "Os 2 fundadores" : "The 2 founders"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {team.members.map((m: any) => (
            <div key={m.name} className="p-6 bg-bg-elev border border-border rounded-xl">
              <h3 className="text-2xl font-bold mb-1">{m.name}</h3>
              <p className="text-accent font-medium mb-3">{m.role}</p>
              <p className="text-fg-muted mb-3 text-sm leading-relaxed">{m.bio}</p>
              {m.skills && (
                <div className="flex flex-wrap gap-1.5">
                  {m.skills.map((s: string) => (
                    <span key={s} className="px-2 py-0.5 bg-bg border border-border rounded text-xs">{s}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* The 8 bots */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
          <Bot className="w-6 h-6 text-accent" />
          {isEs ? "Los 8 bots de IA nombrados" : isNl ? "De 8 vernoemde AI-bots" : isPt ? "Os 8 bots de IA nomeados" : "The 8 named AI bots"}
        </h2>
        <p className="text-fg-muted leading-relaxed mb-6 max-w-3xl">
          {isEs
            ? "Cada bot es un agente persistente con memoria, identidad, y un scope claro. Trabajan como un equipo asíncrono: Erebus (el orquestador) coordina a los otros 7 según la tarea. Ningún bot hace todo. Cada uno hace una cosa bien."
            : isNl
            ? "Elke bot is een persistente agent met geheugen, identiteit, en een duidelijke scope. Ze werken als een asynchroon team: Erebus (de orkestrator) coördineert de andere 7 op basis van de taak. Geen enkele bot doet alles. Elke doet één ding goed."
            : isPt
            ? "Cada bot é um agente persistente com memória, identidade e escopo claro. Trabalham como uma equipe assíncrona: Erebus (o orquestrador) coordena os outros 7 baseado na tarefa. Nenhum bot faz tudo. Cada um faz uma coisa bem."
            : "Each bot is a persistent agent with memory, identity, and a clear scope. They work as an async team: Erebus (the orchestrator) coordinates the other 7 based on the task. No single bot does everything. Each does one thing well."}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {team.bots.map((b: any) => {
            const Icon = ICON_MAP[b.name] || Cpu
            const localizedName = (BOT_NAMES[lang] && BOT_NAMES[lang][b.name]) || b.name
            return (
              <div key={b.name} className="p-6 bg-bg-elev border border-border rounded-xl hover:border-accent/50 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-md bg-gradient-to-br from-accent to-accent-3 flex items-center justify-center text-white">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold font-mono">{localizedName}</h3>
                </div>
                <p className="text-accent text-sm font-medium mb-2">{b.role}</p>
                <p className="text-fg-muted text-sm leading-relaxed">{b.purpose}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* How a project flows */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Workflow className="w-6 h-6 text-accent" />
          {isEs ? "Cómo fluye un proyecto entre los bots" : "How a project flows between bots"}
        </h2>
        <div className="space-y-3">
          {[
            { en: "1. Prospect inquiry → closer-bot drafts response (Tone-of-voice: technical, transparent, no fluff).", es: "1. Consulta inicial → closer-bot redacta respuesta (tono: técnico, transparente, sin rodeos)." },
            { en: "2. Architect-bot reviews the brief and produces an architecture doc + cost estimate.", es: "2. Architect-bot revisa el brief y produce un doc de arquitectura + estimación de costo." },
            { en: "3. Discovery call with Ivan + Kyrian. Closer-bot attends for notes, never speaks directly.", es: "3. Discovery call con Ivan + Kyrian. Closer-bot asiste para tomar notas, nunca habla directo." },
            { en: "4. Once contracted, delivery-bot spins up the project board + tracks milestones. Architect-bot reviews the build weekly.", es: "4. Una vez contratado, delivery-bot arma el tablero del proyecto + trackea milestones. Architect-bot revisa el build semanalmente." },
            { en: "5. Copy-bot handles client-facing copy (emails, doc, README). client-success-bot sends weekly check-ins.", es: "5. Copy-bot maneja el copy de cara al cliente (emails, doc, README). client-success-bot envía check-ins semanales." },
            { en: "6. Explorer-bot scans the market for any competitor / regulatory changes that might affect the project.", es: "6. Explorer-bot escanea el mercado por cualquier cambio en competidores / regulación que pueda afectar el proyecto." },
            { en: "7. ops-bot handles deploys, monitors uptime, and pages the humans (via Telegram) if anything goes sideways.", es: "7. ops-bot maneja deploys, monitorea uptime, y avisa a los humanos (vía Telegram) si algo se desvía." },
            { en: "8. Erebus (Ivan's digital twin) coordinates all of the above, writes the daily standup, and proposes next steps to the team.", es: "8. Erebus (el gemelo digital de Ivan) coordina todo lo anterior, escribe el daily standup, y propone próximos pasos al equipo." },
          ].map((step, i) => (
            <div key={i} className="p-4 bg-bg-elev border border-border rounded-lg flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center font-bold text-sm">
                {i + 1}
              </div>
              <p className="text-fg-muted leading-relaxed text-sm pt-1">{isEs ? step.es : step.en}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What this means for clients */}
      <section className="p-8 bg-gradient-to-br from-accent/10 to-accent-3/10 border border-accent/30 rounded-2xl">
        <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-accent" />
          {isEs ? "Qué significa esto para vos" : "What this means for you"}
        </h2>
        <p className="text-fg-muted leading-relaxed mb-4">
          {isEs
            ? "Más capacidad por hora-dinero. Un equipo de 8 bots con humanos en el loop es más rápido que una agencia de 5 personas que hace lo mismo. También es más transparente — cada decisión tiene autor, cada commit tiene razonamiento, cada PR tiene review."
            : "More capacity per hour-dollar. A team of 8 bots with humans in the loop is faster than a 5-person agency doing the same work. It's also more transparent — every decision has an author, every commit has reasoning, every PR has a review."}
        </p>
        <p className="text-fg-muted leading-relaxed">
          {isEs
            ? "Y es honesto: vas a trabajar con Ivan y Kyrian, no con un account manager junior que no entiende lo que está construyendo. Los bots hacen el trabajo repetitivo. Los humanos hacen el trabajo importante."
            : "And it's honest: you'll work with Ivan and Kyrian, not a junior account manager who doesn't understand what's being built. The bots do the repetitive work. The humans do the important work."}
        </p>
      </section>
    </div>
  )
}
