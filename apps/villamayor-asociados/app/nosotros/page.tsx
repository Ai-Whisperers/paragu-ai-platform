import content from "@/content/es.json"

export default function Nosotros() {
  return (
    <>
      <section style={{ background: "linear-gradient(135deg, #1B2A4A, #0F1A30)", color: "white", padding: "5rem 1.5rem", textAlign: "center" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <span style={{ color: "#C9A96E", fontSize: "0.8125rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Nuestro Estudio</span>
          <h1 className="serif" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, margin: "0.75rem 0 1rem" }}>
            {content.about.title}
          </h1>
        </div>
      </section>

      <section style={{ padding: "5rem 1.5rem", backgroundColor: "white" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ marginBottom: "3rem" }}>
            <h2 className="serif" style={{ fontSize: "1.25rem", fontWeight: 700, color: "#1B2A4A", marginBottom: "1rem" }}>Nuestra Historia</h2>
            <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "#4B5563" }}>
              {content.about.intro}
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "3rem" }}>
            <div style={{ backgroundColor: "#F8F6F2", borderRadius: "12px", padding: "2rem", border: "1px solid #E8E3DA" }}>
              <h3 style={{ color: "#1B2A4A", fontWeight: 700, fontSize: "0.9375rem", marginBottom: "0.75rem" }}>Misión</h3>
              <p style={{ fontSize: "0.875rem", color: "#6B7280", lineHeight: 1.7 }}>{content.about.mission}</p>
            </div>
            <div style={{ backgroundColor: "#F8F6F2", borderRadius: "12px", padding: "2rem", border: "1px solid #E8E3DA" }}>
              <h3 style={{ color: "#1B2A4A", fontWeight: 700, fontSize: "0.9375rem", marginBottom: "0.75rem" }}>Visión</h3>
              <p style={{ fontSize: "0.875rem", color: "#6B7280", lineHeight: 1.7 }}>{content.about.vision}</p>
            </div>
          </div>

          <div>
            <h2 className="serif" style={{ fontSize: "1.25rem", fontWeight: 700, color: "#1B2A4A", marginBottom: "1.5rem" }}>Nuestros Valores</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1.25rem" }}>
              {content.about.values.map((v, i) => (
                <div key={i} className="hover-lift" style={{ backgroundColor: "#F8F6F2", borderRadius: "10px", padding: "1.5rem", border: "1px solid #E8E3DA" }}>
                  <div style={{ width: "40px", height: "3px", backgroundColor: "#C9A96E", marginBottom: "1rem" }} />
                  <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "#1B2A4A", marginBottom: "0.5rem" }}>{v.title}</h3>
                  <p style={{ fontSize: "0.8125rem", color: "#6B7280", lineHeight: 1.6 }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "4rem 1.5rem", background: "linear-gradient(135deg, #1B2A4A, #0F1A30)", color: "white", textAlign: "center" }}>
        <div style={{ maxWidth: "500px", margin: "0 auto" }}>
          <h2 className="serif" style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>Agendá tu consulta</h2>
          <a href={content.hero.ctaLink} target="_blank" rel="noopener noreferrer"
            style={{ backgroundColor: "#C9A96E", color: "#1B2A4A", padding: "0.85rem 2rem", borderRadius: "8px", fontWeight: 700, textDecoration: "none", fontSize: "0.9375rem", display: "inline-block" }}>
            {content.hero.ctaText}
          </a>
        </div>
      </section>
    </>
  )
}
