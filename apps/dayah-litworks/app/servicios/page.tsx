import { PageLayout } from "@/components/page-layout"
import type { Content } from "@/types/content"
import raw from "@/content/es.json"

const content = raw as unknown as Content
const services = content.home.services.items
const phone = content.whatsapp.phone

export default function ServiciosPage() {
  return (
    <PageLayout phone={phone}>
      <section className="flex min-h-[25vh] items-center justify-center bg-surface px-4 py-14 sm:min-h-[30vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground sm:text-4xl">Servicios</h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-lg sm:mt-3">Todo lo que necesitás para que tu libro luzca profesional</p>
        </div>
      </section>
      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-8 text-center sm:mb-10">
            <h2 className="mb-2 text-xl font-bold text-foreground sm:text-3xl">Servicios de Diseño</h2>
            <p className="text-xs text-muted-foreground sm:text-sm">Precios en guaraníes (Gs.) y dólares (USD). Consultame por combos y paquetes.</p>
          </div>
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <div key={i} className="rounded-xl border border-border bg-surface p-5 transition-all hover:-translate-y-1 hover:shadow-md relative flex flex-col sm:p-6">
                <div className="mb-1">
                  <span className="text-lg font-bold text-primary sm:text-2xl">{s.price}</span>
                  {s.priceUsd && <span className="ml-2 text-xs text-muted-foreground sm:text-sm">({s.priceUsd})</span>}
                </div>
                <h3 className="mb-2 text-sm font-semibold text-foreground sm:text-lg">{s.name}</h3>
                <p className="mb-3 text-xs text-muted-foreground flex-1 sm:text-sm">{s.description}</p>
                <p className="text-[10px] text-muted-foreground mb-3 sm:text-xs">Entrega estimada: {s.delivery}</p>
                {s.crossSell && (
                  <p className="mb-3 text-[10px] text-muted-foreground border-t border-border pt-2 sm:text-xs">
                    ✦ Sugerencia: combiná con <span className="text-accent font-medium">{s.crossSell}</span>
                  </p>
                )}
                <a
                  href={`https://wa.me/${phone}?text=${encodeURIComponent(s.whatsappCta || "Hola! Quiero cotizar " + s.name)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-block w-full rounded-lg bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground text-center transition-all hover:bg-primary/90 active:scale-[0.98] sm:w-auto sm:py-2 sm:text-sm"
                >
                  Cotizar
                </a>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center sm:mt-10">
            <p className="mb-3 text-xs text-muted-foreground sm:text-sm sm:mb-4">Consultá por combos, paquetes o servicios adicionales</p>
            <a href={`https://wa.me/${phone}?text=Hola!%20Quiero%20cotizar%20un%20servicio`} target="_blank" rel="noopener noreferrer"
              className="inline-block w-full rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98] sm:w-auto sm:px-8">
              Cotizar por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
