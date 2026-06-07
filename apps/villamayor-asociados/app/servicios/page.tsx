import content from "@/content/es.json"
import Link from "next/link"

export default function Servicios() {
  return (
    <>
      <section style={{ background: "linear-gradient(135deg, #1B2A4A, #0F1A30)", color: "white", padding: "5rem 1.5rem", textAlign: "center" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <span style={{ color: "#C9A96E", fontSize: "0.8125rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Nuestros Servicios</span>
          <h1 className="serif" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, margin: "0.75rem 0 1rem" }}>
            {content.services.title}
          </h1>
          <p style={{ fontSize: "1.0625rem", opacity: 0.85, maxWidth: "600px", margin: "0 auto" }}>
            {content.services.subtitle}
          </p>
        </div>
      </section>

      <section style={{ padding: "5rem 1.5rem", backgroundColor: "white" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "2rem" }}>
            {content.services.items.map((svc, i) => (
              <div key={i} className="hover-lift" style={{ backgroundColor: "#F8F6F2", borderRadius: "12px", padding: "2rem", border: "1px solid #E8E3DA" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "10px", backgroundColor: "#1B2A4A", display: "flex", alignItems: "center", justifyContent: "center", color: "#C9A96E", marginBottom: "1rem" }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h2 style={{ fontWeight: 700, fontSize: "1.125rem", color: "#1B2A4A", marginBottom: "0.75rem" }}>{svc.title}</h2>
                <p style={{ fontSize: "0.875rem", color: "#6B7280", lineHeight: 1.7, marginBottom: "1rem" }}>{svc.description}</p>
                <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                  {svc.features.map((f, j) => (
                    <li key={j} style={{ fontSize: "0.8125rem", color: "#4B5563", padding: "0.25rem 0", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ color: "#C9A96E" }}>✦</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "4rem 1.5rem", background: "linear-gradient(135deg, #1B2A4A, #0F1A30)", color: "white", textAlign: "center" }}>
        <div style={{ maxWidth: "500px", margin: "0 auto" }}>
          <h2 className="serif" style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>¿Necesitás asesoría legal?</h2>
          <p style={{ opacity: 0.85, marginBottom: "1.5rem" }}>Agendá tu consulta sin costo</p>
          <a href={content.hero.ctaLink} target="_blank" rel="noopener noreferrer"
            style={{ backgroundColor: "#C9A96E", color: "#1B2A4A", padding: "0.85rem 2rem", borderRadius: "8px", fontWeight: 700, textDecoration: "none", fontSize: "0.9375rem", display: "inline-block" }}>
            {content.hero.ctaText}
          </a>
        </div>
      </section>
    </>
  )
}
