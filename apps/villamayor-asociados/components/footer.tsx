import content from "@/content/es.json"

export default function Footer() {
  const s = content.site
  const now = new Date().getFullYear()

  return (
    <footer style={{ backgroundColor: "#1B2A4A", color: "#E8E3DA", padding: "4rem 1.5rem 2rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2.5rem" }}>
          {/* Brand */}
          <div>
            <h3 style={{ color: "white", fontWeight: 700, fontSize: "1.125rem", marginBottom: "1rem" }}>{s.name}</h3>
            <p style={{ fontSize: "0.8125rem", lineHeight: 1.7, color: "#9CA3AF", marginBottom: "0.75rem" }}>{s.description}</p>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {s.memberships.map((m, i) => (
                <span key={i} style={{ backgroundColor: "rgba(201,169,110,0.15)", color: "#C9A96E", padding: "0.2rem 0.5rem", borderRadius: "4px", fontSize: "0.625rem", fontWeight: 600 }}>
                  {m}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ color: "white", fontWeight: 600, fontSize: "0.8125rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem" }}>Enlaces</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                { label: "Inicio", href: "/" },
                { label: "Servicios", href: "/servicios" },
                { label: "Nosotros", href: "/nosotros" },
                { label: "Blog", href: "/blog" },
                { label: "Contacto", href: "/contacto" },
              ].map((l, i) => (
                <a key={i} href={l.href} style={{ color: "#9CA3AF", textDecoration: "none", fontSize: "0.8125rem" }}>{l.label}</a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 style={{ color: "white", fontWeight: 600, fontSize: "0.8125rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem" }}>Contacto</h3>
            <p style={{ fontSize: "0.8125rem", color: "#9CA3AF", marginBottom: "0.5rem" }}>📍 {s.address}</p>
            <p style={{ fontSize: "0.8125rem", color: "#9CA3AF", marginBottom: "0.5rem" }}>📞 {s.phone}</p>
            <p style={{ fontSize: "0.8125rem", color: "#9CA3AF", marginBottom: "0.5rem" }}>📧 {s.email}</p>
            <p style={{ fontSize: "0.8125rem", color: "#9CA3AF" }}>🕐 {s.hours}</p>
          </div>

          {/* Schedule */}
          <div>
            <h3 style={{ color: "white", fontWeight: 600, fontSize: "0.8125rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem" }}>Agendá tu Consulta</h3>
            <p style={{ fontSize: "0.8125rem", color: "#9CA3AF", marginBottom: "1rem", lineHeight: 1.6 }}>
              Primera consulta sin costo. Respondemos consultas por WhatsApp en el día.
            </p>
            <a href={`https://wa.me/${s.whatsapp}?text=Hola%2C%20Villamayor%20%26%20Asociados%20-%20Quiero%20agendar%20una%20consulta`} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-block", backgroundColor: "#25D366", color: "white", padding: "0.6rem 1.5rem", borderRadius: "6px", fontWeight: 600, textDecoration: "none", fontSize: "0.8125rem" }}>
              WhatsApp
            </a>
          </div>
        </div>

        <div style={{ marginTop: "3rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.08)", textAlign: "center" }}>
          <p style={{ fontSize: "0.75rem", color: "#6B7280", marginBottom: "0.5rem" }}>
            &copy; {now} {content.footer.copyright}
          </p>
          <p style={{ fontSize: "0.6875rem", color: "#6B7280", lineHeight: 1.5, maxWidth: "700px", margin: "0 auto" }}>
            {content.footer.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  )
}
