import content from "@/content/es.json"

export default function Footer() {
  const s = content.site
  const now = new Date().getFullYear()

  return (
    <footer className="bg-primary text-border pt-16 pb-8 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid gap-10 grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
          {/* Brand */}
          <div>
            <h3 className="text-white font-bold text-[1.125rem] mb-4">{s.name}</h3>
            <p className="text-[0.8125rem] leading-[1.7] text-gray-400 mb-3">{s.description}</p>
            <div className="flex gap-2">
              {s.memberships.map((m, i) => (
                <span key={i} className="bg-secondary/15 text-secondary py-[0.2rem] px-2 rounded text-[0.625rem] font-semibold">
                  {m}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-[0.8125rem] uppercase tracking-[0.08em] mb-4">Enlaces</h3>
            <div className="flex flex-col gap-2">
              {[
                { label: "Inicio", href: "/" },
                { label: "Servicios", href: "/servicios" },
                { label: "Nosotros", href: "/nosotros" },
                { label: "Blog", href: "/blog" },
                { label: "Contacto", href: "/contacto" },
              ].map((l, i) => (
                <a key={i} href={l.href} className="text-gray-400 no-underline text-[0.8125rem]">{l.label}</a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-[0.8125rem] uppercase tracking-[0.08em] mb-4">Contacto</h3>
            <p className="text-[0.8125rem] text-gray-400 mb-2">📍 {s.address}</p>
            <p className="text-[0.8125rem] text-gray-400 mb-2">📞 {s.phone}</p>
            <p className="text-[0.8125rem] text-gray-400 mb-2">📧 {s.email}</p>
            <p className="text-[0.8125rem] text-gray-400">🕐 {s.hours}</p>
          </div>

          {/* Schedule */}
          <div>
            <h3 className="text-white font-semibold text-[0.8125rem] uppercase tracking-[0.08em] mb-4">Agendá tu Consulta</h3>
            <p className="text-[0.8125rem] text-gray-400 mb-4 leading-[1.6]">
              Primera consulta sin costo. Respondemos consultas por WhatsApp en el día.
            </p>
            <a href={`https://wa.me/${s.whatsapp}?text=Hola%2C%20Villamayor%20%26%20Asociados%20-%20Quiero%20agendar%20una%20consulta`} target="_blank" rel="noopener noreferrer"
              className="inline-block bg-whatsapp text-white py-[0.6rem] px-6 rounded-md font-semibold no-underline text-[0.8125rem]">
              WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/[0.08] text-center">
          <p className="text-xs text-text-muted mb-2">
            &copy; {now} {content.footer.copyright}
          </p>
          <p className="text-[0.6875rem] text-text-muted leading-[1.5] max-w-[700px] mx-auto">
            {content.footer.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  )
}
