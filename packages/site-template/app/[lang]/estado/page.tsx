import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { WhatsAppFloat } from "@/components/sections/social/WhatsAppFloat"
import { isFeatureEnabled } from "@/lib/features"

const services = [
  { name: "Sitio web", uptime: "99.9%", status: "operational" as const, color: "text-green-500" },
  { name: "WhatsApp API", uptime: "98.5%", status: "degraded" as const, color: "text-yellow-500" },
  { name: "Reservas online", uptime: "100%", status: "operational" as const, color: "text-green-500" },
]
const incidents = [
  { date: "2026-06-01", title: "Mantenimiento programado", status: "resolved" as const },
  { date: "2026-05-28", title: "Intermitencia en WhatsApp", status: "resolved" as const },
]

export default async function EstadoPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const l = lang as "es" | "en"
  if (!isFeatureEnabled("support", l)) return null
  return (
    <>
      <Header lang={l} />
      <section className="bg-primary py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-heading text-4xl font-bold text-white">Estado del sistema</h1>
          <p className="text-white/70 mt-2">Todos los servicios operando normalmente</p>
        </div>
      </section>
      <section className="py-12 px-4 max-w-3xl mx-auto">
        <div className="bg-surface rounded-2xl p-6 mb-8">
          {services.map((svc) => (
            <div key={svc.name} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <span className="font-medium text-foreground">{svc.name}</span>
              <div className="flex items-center gap-2">
                <span className={`font-bold ${svc.color}`}>{svc.uptime}</span>
                <span className="text-xs text-foreground-light">({svc.status})</span>
              </div>
            </div>
          ))}
        </div>
        <h2 className="font-heading text-xl font-bold text-primary mb-4">Incidentes recientes</h2>
        <div className="space-y-3">
          {incidents.map((inc) => (
            <div key={inc.title} className="flex items-center gap-3 p-4 bg-surface rounded-xl">
              <span className="text-xs text-foreground-light">{inc.date}</span>
              <span className="flex-1 text-foreground">{inc.title}</span>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">{inc.status}</span>
            </div>
          ))}
        </div>
      </section>
      <Footer lang={l} />
      <WhatsAppFloat lang={l} />
    </>
  )
}
