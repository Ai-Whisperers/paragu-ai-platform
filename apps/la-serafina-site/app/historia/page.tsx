import type { Metadata } from "next";
import { content as c, SITE_URL } from "@/lib/content";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Historia · La Serafina",
  description: "Línea de tiempo del activismo LBT en Paraguay desde 1985 hasta 2026. AIREANA, La Serafina, Ro'hendu, Festival LesBiGayTrans y la lucha por las visitas íntimas en el Buen Pastor.",
  alternates: { canonical: `${SITE_URL}/historia` },
};

export default function HistoriaPage() {
  const h = c.historia;
  return (
    <div>
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #F5F0FF 0%, #FFFFFF 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <p className="text-xs uppercase tracking-[0.22em] text-text-muted mb-4 font-medium">
            {h.eyebrow}
          </p>
          <h1 className="font-display text-5xl lg:text-7xl font-bold tracking-tight text-text mb-6">
            {h.title}
          </h1>
          <p className="text-lg lg:text-xl text-text-light leading-relaxed max-w-4xl">
            {h.intro}
          </p>
        </div>
      </section>

      {h.decades.map((decade: { title: string; items: { year: string; text: string }[] }, di: number) => (
        <section key={di} className={`py-16 lg:py-20 ${di % 2 === 1 ? "bg-warm" : ""}`}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-10">{decade.title}</h2>
            <ol className="relative border-l-2 border-[var(--color-warm-deep)] ml-4 space-y-8">
              {decade.items.map((it: { year: string; text: string }, i: number) => (
                <li key={i} className="pl-8 relative">
                  <span
                    className="absolute -left-[11px] flex items-center justify-center w-6 h-6 rounded-full font-bold text-xs text-white"
                    style={{ background: "var(--color-primary)" }}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <div
                    className="font-display text-2xl font-bold"
                    style={{ color: "var(--color-accentDeep)" }}
                  >
                    {it.year}
                  </div>
                  <div className="text-text-light mt-1 leading-relaxed">{it.text}</div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ))}

      <section className="py-12 bg-warm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-text-muted italic">{h.credits}</p>
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