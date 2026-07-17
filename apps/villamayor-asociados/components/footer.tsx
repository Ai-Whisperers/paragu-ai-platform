import content from "@/content/es.json"

export default function Footer() {
  const s = content.site
  const now = new Date().getFullYear()

  return (
    <footer className="bg-[#1B2A4A] px-6 pb-8 pt-16 text-[#E8E3DA]">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-10 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
          {/* Brand */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-white">{s.name}</h3>
            <p className="mb-3 text-[13px] leading-[1.7] text-[#9CA3AF]">{s.description}</p>
            <div className="flex gap-2">
              {s.memberships.map((m, i) => (
                <span
                  key={i}
                  className="rounded bg-[rgba(201,169,110,0.15)] px-2 py-[3px] text-[10px] font-semibold text-[#C9A96E]"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-white">Enlaces</h3>
            <div className="flex flex-col gap-2">
              {[
                { label: "Inicio", href: "/" },
                { label: "Servicios", href: "/servicios" },
                { label: "Nosotros", href: "/nosotros" },
                { label: "Blog", href: "/blog" },
                { label: "Contacto", href: "/contacto" },
              ].map((l, i) => (
                <a key={i} href={l.href} className="text-[13px] text-[#9CA3AF] no-underline">
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-white">Contacto</h3>
            <p className="mb-2 text-[13px] text-[#9CA3AF]">📍 {s.address}</p>
            <p className="mb-2 text-[13px] text-[#9CA3AF]">📞 {s.phone}</p>
            <p className="mb-2 text-[13px] text-[#9CA3AF]">📧 {s.email}</p>
            <p className="text-[13px] text-[#9CA3AF]">🕐 {s.hours}</p>
          </div>

          {/* Schedule */}
          <div>
            <h3 className="mb-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-white">Agendá tu Consulta</h3>
            <p className="mb-4 text-[13px] leading-[1.6] text-[#9CA3AF]">
              Primera consulta sin costo. Respondemos consultas por WhatsApp en el día.
            </p>
            <a
              href={`https://wa.me/${s.whatsapp}?text=Hola%2C%20Estudio%20Jur%C3%ADdico%20Demo%20-%20Quiero%20agendar%20una%20consulta`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-md bg-[#25D366] px-6 py-[10px] text-[13px] font-semibold text-white no-underline"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-white/[0.08] pt-6 text-center">
          <p className="mb-2 text-xs text-[#6B7280]">
            &copy; {now} {content.footer.copyright}
          </p>
          <p className="mx-auto max-w-[700px] text-[11px] leading-[1.5] text-[#6B7280]">
            {content.footer.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  )
}
