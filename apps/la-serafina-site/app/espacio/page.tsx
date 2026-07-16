import type { Metadata } from "next";
import { content as c, SITE_URL } from "@/lib/content";
import Link from "next/link";

export const metadata: Metadata = {
  title: "El espacio · La Serafina",
  description: "La Serafina — sede operativa de AIREANA en Eligio Ayala 907, Asunción. Bar cultural, sala principal, patio. Alquiler para talleres, ensayos, presentaciones, celebraciones.",
  alternates: { canonical: `${SITE_URL}/espacio` },
};

export default function EspacioPage() {
  const e = c.espacio;
  return (
    <div>
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #F5F0FF 0%, #FFFFFF 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <p className="text-xs uppercase tracking-[0.22em] text-text-muted mb-4 font-medium">
            {e.eyebrow}
          </p>
          <h1 className="font-display text-5xl lg:text-7xl font-bold tracking-tight text-text mb-6">
            {e.title}
          </h1>
          <p className="text-xl lg:text-2xl text-text-light leading-relaxed max-w-3xl">
            {e.intro}
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6 mb-12">
            <div className="lg:col-span-2 bg-warm rounded-xl p-6 lg:p-8">
              <h2 className="font-display text-2xl font-bold mb-3">Dirección</h2>
              <p className="text-text-light text-lg">{e.address}</p>
              <div className="mt-6 space-y-2 text-text-light">
                <div><strong className="text-text">Público:</strong> {e.schedulePublic}</div>
                <div><strong className="text-text">Privado:</strong> {e.schedulePrivate}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {e.facts.map((f: { label: string; value: string }, i: number) => (
                <div key={i} className="rounded-xl p-4 bg-warm text-center">
                  <div className="font-display text-2xl font-bold mb-1" style={{ color: "var(--color-primary)" }}>
                    {f.value}
                  </div>
                  <div className="text-xs text-text-muted">{f.label}</div>
                </div>
              ))}
            </div>
          </div>

          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-8">{e.useCases.title}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {e.useCases.items.map((u: { title: string; description: string }, i: number) => (
              <div key={i} className="bg-surface border border-[var(--color-warm-deep)] rounded-xl p-6">
                <div
                  className="w-10 h-1 rounded-full mb-4"
                  aria-hidden="true"
                  style={{ background: "var(--color-primary)" }}
                />
                <h3 className="font-display text-xl font-bold mb-2">{u.title}</h3>
                <p className="text-sm text-text-light leading-relaxed">{u.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-warm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">{e.bar.title}</h2>
          <p className="text-lg text-text-light leading-relaxed">{e.bar.description}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-6">{e.noGo.title}</h2>
          <ul className="space-y-3">
            {e.noGo.items.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-3 text-lg text-text-light">
                <span aria-hidden="true" style={{ color: "var(--color-accentDeep)" }}>✕</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="py-16 lg:py-20 text-white"
        style={{ background: "var(--color-accentDeep)" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl lg:text-5xl font-bold mb-4">{e.contact.title}</h2>
          <p className="text-lg text-white/85 leading-relaxed mb-8">{e.contact.lead}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`https://wa.me/${e.contact.phone.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-white text-[var(--color-accentDeep)] font-medium hover:opacity-90"
            >
              WhatsApp · {e.contact.phone}
            </a>
            <a
              href={`mailto:${e.contact.email}`}
              className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-white/30 text-white font-medium hover:bg-white/10"
            >
              {e.contact.email}
            </a>
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