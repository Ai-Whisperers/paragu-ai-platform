import content from "@/content/es.json"
import Link from "next/link"

export default function Servicios() {
  return (
    <>
      <section className="text-white py-20 px-6 text-center bg-[linear-gradient(135deg,#1B2A4A,#0F1A30)]">
        <div className="max-w-[800px] mx-auto">
          <span className="text-secondary text-[0.8125rem] font-semibold tracking-[0.08em] uppercase">Nuestros Servicios</span>
          <h1 className="serif font-bold mt-3 mb-4 text-[clamp(1.75rem,4vw,2.5rem)]">
            {content.services.title}
          </h1>
          <p className="text-[1.0625rem] opacity-85 max-w-[600px] mx-auto">
            {content.services.subtitle}
          </p>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid gap-8 grid-cols-[repeat(auto-fill,minmax(320px,1fr))]">
            {content.services.items.map((svc, i) => (
              <div key={i} className="hover-lift bg-surface-alt rounded-xl p-8 border border-border">
                <div className="w-11 h-11 rounded-[10px] bg-primary flex items-center justify-center text-secondary mb-4">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h2 className="font-bold text-[1.125rem] text-primary mb-3">{svc.title}</h2>
                <p className="text-sm text-text-muted leading-[1.7] mb-4">{svc.description}</p>
                <ul className="m-0 p-0 list-none">
                  {svc.features.map((f, j) => (
                    <li key={j} className="text-[0.8125rem] text-gray-600 py-1 flex items-center gap-2">
                      <span className="text-secondary">✦</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 text-white text-center bg-[linear-gradient(135deg,#1B2A4A,#0F1A30)]">
        <div className="max-w-[500px] mx-auto">
          <h2 className="serif text-2xl font-bold mb-4">¿Necesitás asesoría legal?</h2>
          <p className="opacity-85 mb-6">Agendá tu consulta sin costo</p>
          <a href={content.hero.ctaLink} target="_blank" rel="noopener noreferrer"
            className="bg-secondary text-primary py-[0.85rem] px-8 rounded-lg font-bold no-underline text-[0.9375rem] inline-block">
            {content.hero.ctaText}
          </a>
        </div>
      </section>
    </>
  )
}
