import type { Metadata } from "next";
import content from "@/content/es.json";

const c = content as any;

export const metadata: Metadata = {
  title: "Noticias",
  description: "Actualizaciones, campañas y eventos de SOMOSGAY.",
  alternates: { canonical: `${c.site.url}/noticias` },
};

export default function NoticiasPage() {
  return (
    <div>
      <section className="bg-warm-deep relative">
        <div className="rainbow-bar absolute top-0 inset-x-0" aria-hidden="true" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <p className="text-xs uppercase tracking-[0.22em] text-text-muted mb-3 font-medium">{c.noticias.subtitle}</p>
          <h1 className="font-display text-4xl lg:text-6xl font-bold tracking-tight mb-4">{c.noticias.title}</h1>
          <p className="text-lg text-text-light">{c.noticias.intro}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-warm border border-[var(--color-warm-deep)] rounded-xl p-8">
            <h2 className="font-display text-xl font-bold mb-3">Próximamente</h2>
            <p className="text-text-light leading-relaxed mb-4">{c.noticias.placeholder_note}</p>
            <p className="text-sm text-text-muted">
              Mientras tanto, podés seguirnos en redes sociales (links en{" "}
              <a href="/contacto" className="text-[var(--color-primary)] underline">
                contacto
              </a>
              ) o suscribirte a nuestro RSS feed.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}