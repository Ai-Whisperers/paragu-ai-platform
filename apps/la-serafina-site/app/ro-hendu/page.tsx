import type { Metadata } from "next";
import { content as c, SITE_URL } from "@/lib/content";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ro'hendu · Línea de apoyo · La Serafina",
  description: "Ro'hendu — línea gratuita, anónima y confidencial para personas LGBTIQ+ en Paraguay. Lunes a viernes de 13:00 a 20:00 hs. Activa desde 2013. 0800 110 108 / 0981 110 108.",
  alternates: { canonical: `${SITE_URL}/ro-hendu` },
};

export default function RoHenduPage() {
  const r = c.roHendu;
  return (
    <div>
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #F5F0FF 0%, #FFFFFF 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <p className="text-xs uppercase tracking-[0.22em] text-text-muted mb-4 font-medium">
            {r.eyebrow}
          </p>
          <h1 className="font-display text-5xl lg:text-7xl font-bold tracking-tight text-text mb-3">
            {r.title}
          </h1>
          <p
            className="text-2xl lg:text-3xl font-display font-bold mb-6"
            style={{ color: "var(--color-accentDeep)" }}
          >
            {r.subtitle}
          </p>
          <p className="text-lg lg:text-xl text-text-light leading-relaxed max-w-3xl">
            {r.intro}
          </p>
          <div className="text-sm text-text-muted mt-6">{r.since}</div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-8 text-center">Líneas activas</h2>
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {r.lines.map((l: { label: string; value: string }, i: number) => (
              <a
                key={i}
                href={
                  l.label === "WhatsApp"
                    ? `https://wa.me/${l.value.replace(/\D/g, "")}`
                    : `tel:${l.value.replace(/\D/g, "")}`
                }
                className="block rounded-xl p-6 bg-warm text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-xs uppercase tracking-wider font-semibold mb-2" style={{ color: "var(--color-primary)" }}>
                  {l.label}
                </div>
                <div className="font-display text-2xl font-bold text-text">{l.value}</div>
              </a>
            ))}
          </div>
          <p className="text-center text-text-light">{r.schedule}</p>
        </div>
      </section>

      <section className="py-16 bg-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-8 text-center">{r.stats.title}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {r.stats.items.map((s: { value: string; label: string; source?: string }, i: number) => (
              <div key={i} className="rounded-xl p-6 bg-surface text-center">
                <div className="font-display text-3xl lg:text-4xl font-bold mb-2" style={{ color: "var(--color-accentDeep)" }}>
                  {s.value}
                </div>
                <div className="text-sm text-text-light mb-2">{s.label}</div>
                {s.source && <div className="text-xs text-text-muted">{s.source}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-6">Para quién</h2>
            <ul className="space-y-3">
              {r.who.map((w: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-lg text-text-light">
                  <span aria-hidden="true" style={{ color: "var(--color-primary)" }}>●</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-6">{r.what.title}</h2>
            <ul className="space-y-3">
              {r.what.items.map((w: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-base text-text-light">
                  <span aria-hidden="true" style={{ color: "var(--color-primary)" }}>●</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 bg-warm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div>
            <h2 className="font-display text-2xl lg:text-3xl font-bold mb-3">{r.operators.title}</h2>
            <p className="text-lg text-text-light leading-relaxed">{r.operators.description}</p>
          </div>
          <div>
            <h2 className="font-display text-2xl lg:text-3xl font-bold mb-3">{r.protocol.title}</h2>
            <p className="text-lg text-text-light leading-relaxed">{r.protocol.description}</p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center font-medium underline underline-offset-4"
            style={{ color: "var(--color-primary)" }}
          >
            ← Volver al inicio
          </Link>
        </div>
      </section>
    </div>
  );
}