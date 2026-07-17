"use client"
import content from "@/content/es.json"

const c = content as Record<string, any>

export default function Nosotros() {
  return (
    <div>
      <section className="py-20 px-4 text-center"
        style={{ background: "linear-gradient(180deg, #000000 0%, #0a0a0a 100%)" }}>
        <h1 className="text-4xl sm:text-5xl font-black mb-4">Sobre <span className="text-accent">Jota Ink</span></h1>
        <p className="text-foreground/60 max-w-xl mx-auto">Tatuajes personalizados en Asunción, Paraguay. Ink 🇵🇾</p>
      </section>

      <section className="py-16 px-4 max-w-3xl mx-auto">
        <div className="rounded-xl border border-border bg-surface p-8 text-center mb-10">
          <div className="w-20 h-20 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-4 text-3xl">
            💉
          </div>
          <p className="text-foreground/70 leading-relaxed max-w-xl mx-auto">
            Soy Jota, tatuador en Asunción. Me especializo en realismo, sombras y grises.
            Cada tatuaje que hago es único, diseñado desde cero con cada persona.
            Mi objetivo es que te lleves una obra de arte que te represente.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-surface p-6 text-center">
            <div className="text-2xl mb-2">🎯</div>
            <h3 className="font-semibold text-foreground mb-2">Diseño personalizado</h3>
            <p className="text-sm text-foreground/50">Cada idea es única y merece un diseño a medida.</p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-6 text-center">
            <div className="text-2xl mb-2">🧼</div>
            <h3 className="font-semibold text-foreground mb-2">Higiene y seguridad</h3>
            <p className="text-sm text-foreground/50">Materiales descartables y equipo esterilizado en cada sesión.</p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-6 text-center">
            <div className="text-2xl mb-2">💬</div>
            <h3 className="font-semibold text-foreground mb-2">Consulta sin costo</h3>
            <p className="text-sm text-foreground/50">Escribime y conversamos tu idea sin compromiso.</p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-6 text-center">
            <div className="text-2xl mb-2">📍</div>
            <h3 className="font-semibold text-foreground mb-2">Asunción</h3>
            <p className="text-sm text-foreground/50">Te paso la dirección al coordinar tu turno.</p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <a href="https://wa.me/595971679370?text=Hola%20Jota!%20Quiero%20consultarte%20sobre%20un%20tatuaje" target="_blank" rel="noopener noreferrer"
            className="inline-block rounded-lg bg-accent text-accent-foreground px-8 py-4 font-semibold hover:bg-accent/90 transition-all">
            Escribime por WhatsApp
          </a>
        </div>
      </section>
    </div>
  )
}
