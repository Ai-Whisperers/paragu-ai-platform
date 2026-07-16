import type { Metadata } from "next";
import { content as c, SITE_URL } from "@/lib/content";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Apoyar · La Serafina",
  description: "Tres formas de sostener La Serafina: donar, asistir, difundir. Fondos internacionales con deducibilidad fiscal. Entrada libre y gratuita los viernes.",
  alternates: { canonical: `${SITE_URL}/apoyar` },
};

export default function ApoyarPage() {
  const a = c.apoyar;
  return (
    <div>
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #F5F0FF 0%, #FFFFFF 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <p className="text-xs uppercase tracking-[0.22em] text-text-muted mb-4 font-medium">
            {a.eyebrow}
          </p>
          <h1 className="font-display text-5xl lg:text-7xl font-bold tracking-tight text-text mb-6">
            {a.title}
          </h1>
          <p className="text-lg lg:text-xl text-text-light leading-relaxed max-w-4xl">
            {a.intro}
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-8">
          {a.ways.map((way: { id: string; title: string; description: string; channels: { label: string; detail: string }[]; cta: string }) => (
            <div
              key={way.id}
              className="rounded-xl p-8 bg-surface border border-[var(--color-warm-deep)] flex flex-col"
            >
              <div
                className="w-10 h-1 rounded-full mb-4"
                aria-hidden="true"
                style={{ background: "var(--color-primary)" }}
              />
              <h2 className="font-display text-2xl font-bold mb-3">{way.title}</h2>
              <p className="text-text-light leading-relaxed mb-6">{way.description}</p>
              <ul className="space-y-3 mb-6 flex-1">
                {way.channels.map((ch: { label: string; detail: string }, i: number) => (
                  <li key={i} className="text-sm">
                    <div className="font-medium text-text">{ch.label}</div>
                    <div className="text-text-light">{ch.detail}</div>
                  </li>
                ))}
              </ul>
              <div className="pt-4 border-t border-[var(--color-warm-deep)]">
                {way.id === "donar" ? (
                  <a
                    href={`https://wa.me/${c.footer.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center font-medium underline underline-offset-4"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {way.cta} →
                  </a>
                ) : way.id === "asistir" ? (
                  <Link
                    href="/espacio"
                    className="inline-flex items-center font-medium underline underline-offset-4"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {way.cta} →
                  </Link>
                ) : (
                  <a
                    href="https://www.instagram.com/laserapy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center font-medium underline underline-offset-4"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {way.cta} →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-warm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">{a.transparency.title}</h2>
          <p className="text-lg text-text-light leading-relaxed">{a.transparency.description}</p>
        </div>
      </section>

      <section
        className="py-16 lg:py-20 text-white"
        style={{ background: "var(--color-accentDeep)" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-display text-2xl lg:text-3xl italic">{a.thanks}</p>
          <Link
            href="/"
            className="inline-flex items-center mt-8 text-white/80 hover:text-white underline underline-offset-4"
          >
            ← Volver al inicio
          </Link>
        </div>
      </section>
    </div>
  );
}