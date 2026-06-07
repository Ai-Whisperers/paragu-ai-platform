import content from "@/content/es.json"
import Link from "next/link"

export default function Home() {
  const s = content.site
  const h = content.hero
  const about = content.about

  return (
    <>
      {/* HERO */}
      <section style={{ backgroundImage: "linear-gradient(rgba(27,42,74,0.85), rgba(15,26,48,0.9)), url(/images/hero-main.webp)", backgroundSize: "cover", backgroundPosition: "center", color: "white", padding: "6rem 1.5rem", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "3rem", alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                <span style={{ width: "2px", height: "24px", backgroundColor: "#C9A96E", display: "block" }} />
                <span style={{ color: "#C9A96E", fontSize: "0.8125rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>{s.tagline}</span>
              </div>
              <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.15, marginBottom: "1.25rem", fontFamily: "Georgia, serif" }}>
                {h.title}
              </h1>
              <p style={{ fontSize: "1.0625rem", opacity: 0.85, lineHeight: 1.7, marginBottom: "2rem" }}>
                {h.subtitle}
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <a href={h.ctaLink} target="_blank" rel="noopener noreferrer"
                  style={{ backgroundColor: "#C9A96E", color: "#1B2A4A", padding: "0.85rem 2rem", borderRadius: "8px", fontWeight: 700, textDecoration: "none", fontSize: "0.9375rem" }}>
                  {h.ctaText}
                </a>
                <Link href={h.secondaryCtaLink}
                  style={{ backgroundColor: "transparent", color: "white", padding: "0.85rem 2rem", borderRadius: "8px", fontWeight: 600, textDecoration: "none", fontSize: "0.9375rem", border: "1px solid rgba(255,255,255,0.3)" }}>
                  {h.secondaryCta}
                </Link>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {h.stats.map((st, i) => (
                <div key={i} style={{ backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "12px", padding: "1.5rem", textAlign: "center", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "#C9A96E", marginBottom: "0.25rem" }}>{st.value}</div>
                  <div style={{ fontSize: "0.75rem", opacity: 0.7 }}>{st.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section style={{ padding: "5rem 1.5rem", backgroundColor: "#F8F6F2" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <h2 className="serif gold-underline" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, color: "#1B2A4A", marginBottom: "2rem" }}>
            {about.title}
          </h2>
          <p style={{ fontSize: "1.0625rem", lineHeight: 1.8, color: "#4B5563", marginBottom: "1.5rem" }}>
            {about.intro}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.5rem", marginTop: "2.5rem" }}>
            {about.values.map((v, i) => (
              <div key={i} className="hover-lift" style={{ backgroundColor: "white", borderRadius: "10px", padding: "1.5rem", border: "1px solid #E8E3DA" }}>
                <div style={{ width: "40px", height: "3px", backgroundColor: "#C9A96E", marginBottom: "1rem" }} />
                <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "#1B2A4A", marginBottom: "0.5rem" }}>{v.title}</h3>
                <p style={{ fontSize: "0.8125rem", color: "#6B7280", lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ padding: "5rem 1.5rem", backgroundColor: "white" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 className="serif gold-underline" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, color: "#1B2A4A", textAlign: "center", marginBottom: "0.75rem" }}>
            {content.services.title}
          </h2>
          <p style={{ textAlign: "center", color: "#6B7280", fontSize: "0.9375rem", marginBottom: "3rem" }}>{content.services.subtitle}</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {content.services.items.slice(0, 6).map((svc, i) => (
              <div key={i} className="hover-lift" style={{ backgroundColor: "#F8F6F2", borderRadius: "12px", padding: "1.75rem", border: "1px solid #E8E3DA" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "8px", backgroundColor: "#1B2A4A", display: "flex", alignItems: "center", justifyContent: "center", color: "#C9A96E", fontSize: "0.75rem", fontWeight: 700 }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "#1B2A4A", margin: 0 }}>{svc.title}</h3>
                </div>
                <p style={{ fontSize: "0.8125rem", color: "#6B7280", lineHeight: 1.7, marginBottom: "0.75rem" }}>{svc.description}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {svc.features.slice(0, 3).map((f, j) => (
                    <span key={j} style={{ backgroundColor: "rgba(201,169,110,0.12)", color: "#8B7355", padding: "0.15rem 0.5rem", borderRadius: "4px", fontSize: "0.6875rem", fontWeight: 500 }}>
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <Link href="/servicios"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "#C9A96E", fontWeight: 600, textDecoration: "none", fontSize: "0.9375rem" }}>
              Ver todos los servicios →
            </Link>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section style={{ padding: "5rem 1.5rem", backgroundColor: "#F8F6F2" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2 className="serif gold-underline" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, color: "#1B2A4A", textAlign: "center", marginBottom: "0.75rem" }}>
            {content.process.title}
          </h2>
          <p style={{ textAlign: "center", color: "#6B7280", fontSize: "0.9375rem", marginBottom: "3rem" }}>{content.process.subtitle}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "2rem" }}>
            {content.process.steps.map((p, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ width: "64px", height: "64px", borderRadius: "50%", backgroundColor: "#1B2A4A", color: "#C9A96E", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "1.125rem", margin: "0 auto 1rem", fontFamily: "Georgia, serif" }}>
                  {p.step}
                </div>
                <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "#1B2A4A", marginBottom: "0.5rem" }}>{p.title}</h3>
                <p style={{ fontSize: "0.8125rem", color: "#6B7280", lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "5rem 1.5rem", backgroundColor: "white" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2 className="serif gold-underline" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, color: "#1B2A4A", textAlign: "center", marginBottom: "3rem" }}>
            Lo Que Dicen Nuestros Clientes
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: "1.5rem" }}>
            {content.testimonials.map((t, i) => (
              <div key={i} className="gallery-card" style={{ backgroundColor: "#F8F6F2", borderRadius: "12px", padding: "1.5rem", border: "1px solid #E8E3DA" }}>
                <div style={{ display: "flex", gap: "0.25rem", marginBottom: "0.75rem" }}>
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j} style={{ color: "#C9A96E" }}>★</span>
                  ))}
                </div>
                <p style={{ fontSize: "0.9375rem", lineHeight: 1.7, color: "#4B5563", marginBottom: "1rem", fontStyle: "italic" }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <p style={{ fontWeight: 600, fontSize: "0.8125rem", color: "#1B2A4A" }}>{t.name}</p>
                {(t as any).role && <p style={{ fontSize: "0.75rem", color: "#8B7355" }}>{(t as any).role}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "5rem 1.5rem", backgroundColor: "#F8F6F2" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <h2 className="serif gold-underline" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, color: "#1B2A4A", textAlign: "center", marginBottom: "3rem" }}>
            Preguntas Frecuentes
          </h2>
          {content.faq.map((item, i) => (
            <details key={i} style={{ marginBottom: "0.75rem", border: "1px solid #E8E3DA", borderRadius: "8px", overflow: "hidden" }}>
              <summary style={{ padding: "1rem 1.25rem", fontWeight: 600, fontSize: "0.9375rem", color: "#1B2A4A", cursor: "pointer", backgroundColor: "white" }}>
                {item.q}
              </summary>
              <p style={{ padding: "1rem 1.25rem", fontSize: "0.875rem", lineHeight: 1.7, color: "#4B5563", borderTop: "1px solid #E8E3DA", backgroundColor: "white" }}>
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "5rem 1.5rem", background: "linear-gradient(135deg, #1B2A4A, #0F1A30)", color: "white", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 className="serif" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, marginBottom: "1rem" }}>
            ¿Listo para una asesoría legal con resultados?
          </h2>
          <p style={{ fontSize: "1rem", opacity: 0.85, marginBottom: "2rem", lineHeight: 1.7 }}>
            Primera consulta sin costo. Contanos tu caso y te explicamos cómo podemos ayudarte.
          </p>
          <a href={h.ctaLink} target="_blank" rel="noopener noreferrer"
            style={{ backgroundColor: "#C9A96E", color: "#1B2A4A", padding: "0.85rem 2.5rem", borderRadius: "8px", fontWeight: 700, textDecoration: "none", fontSize: "0.9375rem", display: "inline-block" }}>
            {h.ctaText}
          </a>
        </div>
      </section>
    </>
  )
}
