'use client'
import { PageLayout } from "@/components/page-layout"
import type { Content } from "@/types/content"
import raw from "@/content/es.json"

const c = raw as unknown as Content
const content = c
const phone = c.whatsapp.phone

export default function Clientes() {
  const clients = content.home?.clients
  const books = content.home?.books
  const portfolio = content.home?.portfolio?.items || []

  return (
    <PageLayout phone={phone}>
      <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 16px" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: 8 }}>Clientes y Obras</h1>
        <p style={{ color: "var(--color-muted-foreground)", marginBottom: 40 }}>Autoras y editoriales que confiaron en mi trabajo</p>

        {/* Author highlights */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: 20 }}>Autoras Destacadas</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 16 }}>
            {clients?.authors?.map((author: string, i: number) => (
              <div key={i} style={{
                background: "var(--surface)", borderRadius: 12, padding: 20,
                border: "1px solid var(--border)"
              }}>
                <span style={{ fontSize: "0.9rem", color: "var(--foreground)", lineHeight: 1.5 }}>{author}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Editoriales */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: 16 }}>Editoriales</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center" }}>
            {(() => {
              const logoMap: Record<string, string> = {
                "Editorial Blanco y Negro SAS (Colombia)": "/dayah/logos/editorial-blanco-negro.png",
                "Castell Ediciones (Paraguay)": "/dayah/logos/castell-ediciones.png",
                "Arandura Editorial (Paraguay)": "/dayah/logos/arandura.png",
                "El Lector (Paraguay)": "/dayah/logos/el-lector.png",
              }
              return clients?.editorials?.map((e: string, i: number) => {
                const logo = logoMap[e]
                return logo ? (
                  <div key={i} style={{
                    background: "white", borderRadius: 12, padding: 16,
                    width: 160, height: 80,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                  }}>
                    <img src={logo} alt={e} style={{ maxHeight: 48, maxWidth: 140, objectFit: "contain" }} />
                  </div>
                ) : (
                  <span key={i} style={{
                    background: "var(--primary)", color: "var(--primary-foreground)",
                    padding: "8px 20px", borderRadius: 8, fontSize: "0.9rem", fontWeight: 500
                  }}>{e}</span>
                )
              })
            })()}
          </div>
        </section>

        {/* Portafolio with real covers */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: 20 }}>Portadas Recientes</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
            {portfolio.map((item: any, i: number) => (
              <div key={i} style={{
                background: "var(--surface)", borderRadius: 12, overflow: "hidden",
                border: "1px solid var(--border)"
              }}>
                {item.image ? (
                  <div style={{ height: 260, overflow: "hidden", background: "var(--surface)" }}>
                    <img src={item.image} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                ) : (
                  <div style={{
                    height: 260, background: "linear-gradient(135deg, var(--surface-light), var(--surface))",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--primary)", fontSize: "3rem", opacity: 0.3
                  }}>📖</div>
                )}
                <div style={{ padding: 16 }}>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 600, margin: "0 0 4px" }}>{item.title}</h3>
                  <p style={{ fontSize: "0.8rem", color: "var(--muted-foreground)", marginBottom: 8 }}>by {item.author}</p>
                  <a
                    href={item.amazonUrl || books?.authorPageUrl || "#"}
                    target="_blank" rel="noopener noreferrer"
                    style={{
                      display: "inline-block", fontSize: "0.8rem", color: "var(--primary)",
                      fontWeight: 600, textDecoration: "none"
                    }}
                  >Ver en Amazon →</a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Author page link */}
        <div style={{ textAlign: "center", padding: 32, background: "var(--surface)", borderRadius: 16, border: "1px solid var(--border)" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 600, marginBottom: 8 }}>Página de Autora</h2>
          <p style={{ color: "var(--muted-foreground)", marginBottom: 16, fontSize: "0.9rem" }}>Todos mis libros publicados en Amazon</p>
          <a href={books?.authorPageUrl} target="_blank" rel="noopener noreferrer" style={{
            background: "var(--primary)", color: "var(--primary-foreground)",
            padding: "12px 28px", borderRadius: 8, fontWeight: 600, textDecoration: "none", display: "inline-block"
          }}>Ver en Amazon →</a>
        </div>
      </main>
    </PageLayout>
  )
}
