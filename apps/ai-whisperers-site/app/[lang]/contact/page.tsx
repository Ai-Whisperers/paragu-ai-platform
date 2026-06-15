import { ContactForm } from "@/components/ContactForm"
import { MessageCircle, BookOpen, Github } from "lucide-react"
import en from "@/content/en/site.json"
import es from "@/content/es/site.json"

const LOCALES = ["en", "es", "nl", "pt"] as const
const CONTENT: Record<string, any> = { en, es, nl: en, pt: en }

export function generateStaticParams() { return LOCALES.map(l => ({ lang: l })) }

export const metadata = { title: "Contact" }

export default async function Contact({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const c = CONTENT[lang] || en
  const contact = c.contact
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-6xl font-bold mb-3">{contact.title}</h1>
        <p className="text-fg-muted text-lg max-w-2xl mx-auto">{contact.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {contact.channels.map((ch: any) => (
          <a key={ch.label} href={ch.url} target="_blank" rel="noopener noreferrer" className={`p-5 ${ch.primary ? "bg-green/10 border-green/30" : "bg-bg-elev border-border"} border rounded-xl hover:scale-[1.02] transition-transform`}>
            <div className="flex items-center gap-2 mb-2 text-fg-muted">
              {ch.label === "WhatsApp" && <MessageCircle className="w-4 h-4" />}
              {ch.label === "Email" && <BookOpen className="w-4 h-4" />}
              {ch.label === "GitHub" && <Github className="w-4 h-4" />}
              <span className="text-xs uppercase tracking-wider font-mono">{ch.label}</span>
            </div>
            <p className="font-mono text-sm break-all">{ch.value}</p>
          </a>
        ))}
      </div>

      <div className="max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Or send us a message</h2>
        <ContactForm content={c} />
      </div>
    </div>
  )
}
