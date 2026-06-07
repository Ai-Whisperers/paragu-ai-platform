import { Metadata } from "next";
import content from "@/content/es.json";

const c = content as any;

export const revalidate = 1;
export const metadata: Metadata = {
  title: c.prensa.seo.title,
  description: c.prensa.seo.description,
};

export default function PrensaPage() {
  const p = c.prensa;
  const site = c.site;

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-[var(--color-background)] relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-background)] via-[#0a0a14] to-[var(--color-background)]" />
        </div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="container-page text-center relative z-10">
          <span className="inline-block px-3 py-1 rounded-full bg-gold/20 text-gold text-sm font-medium uppercase tracking-wider mb-4">
            Sala de Prensa
          </span>
          <h1 className="text-4xl md:text-5xl font-[var(--font-heading)] font-bold text-white mb-4">
            {p.hero.title}
          </h1>
          <p className="text-[var(--color-text-muted)] max-w-xl mx-auto text-lg">
            {p.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="section-padding bg-[var(--color-surface)]">
        <div className="container-page max-w-2xl text-center">
          <p className="text-lg text-[var(--color-text-light)] leading-relaxed">
            {p.intro}
          </p>
        </div>
      </section>

      {/* Key Stats */}
      <section className="section-padding bg-[var(--color-background)]">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl font-bold text-[var(--color-text)] text-center mb-8">Datos clave</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {p.stats.map((s: any, i: number) => (
              <div key={i} className="text-center p-5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
                <p className="text-2xl font-bold text-gold mb-1">{s.value}</p>
                <p className="text-sm text-[var(--color-text-muted)]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why news */}
      <section className="section-padding bg-[var(--color-surface)]">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl font-bold text-[var(--color-text)] text-center mb-8">{p.pitchTitle}</h2>
          <ul className="space-y-3">
            {p.pitch.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-3 p-4 rounded-lg bg-[var(--color-background)] border border-[var(--color-border)]">
                <span className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-gold text-sm font-bold">{i + 1}</span>
                </span>
                <p className="text-[var(--color-text-light)]">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Press contact */}
      <section className="section-padding bg-[var(--color-background)]">
        <div className="container-page max-w-2xl">
          <h2 className="text-2xl font-bold text-[var(--color-text)] text-center mb-8">{p.contactTitle}</h2>
          <div className="rounded-xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)]">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-muted">📞</span>
                <a href={`https://wa.me/${p.contact.phone.replace(/[^0-9]/g, "")}`} className="text-[var(--color-text)] hover:text-gold transition-colors">{p.contact.phone}</a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-muted">✉️</span>
                <a href={`mailto:${p.contact.email}`} className="text-[var(--color-text)] hover:text-gold transition-colors">{p.contact.email}</a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-muted">📸</span>
                <a href={`https://instagram.com/${p.contact.instagram}`} target="_blank" rel="noopener noreferrer" className="text-[var(--color-text)] hover:text-gold transition-colors">@{p.contact.instagram}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Materials placeholder */}
      <section className="section-padding bg-[var(--color-surface)]">
        <div className="container-page max-w-3xl">
          <h2 className="text-2xl font-bold text-[var(--color-text)] text-center mb-8">{p.materialsTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {p.materials.map((m: any, i: number) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-lg bg-[var(--color-background)] border border-dashed border-[var(--color-border)]">
                <div className="text-2xl">📄</div>
                <div>
                  <p className="font-medium text-[var(--color-text)]">{m.name}</p>
                  <p className="text-sm text-[var(--color-text-muted)]">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-[var(--color-text-muted)] mt-4">
            Escribinos al {p.contact.email} para solicitar materiales en alta resolución.
          </p>
        </div>
      </section>
    </>
  )
}
