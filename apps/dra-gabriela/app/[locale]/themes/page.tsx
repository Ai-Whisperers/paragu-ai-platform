import type { Metadata } from "next";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Theme Preview — Ometz Dental",
  description: "Elegí el tema visual para el sitio. Cambiá entre 4 paletas.",
  robots: "noindex, nofollow", // preview interno, no indexar
};

export default function ThemesPage() {
  return (
    <main className="min-h-screen bg-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-fg-muted hover:text-accent mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al sitio
          </Link>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Elegí tu tema
          </h1>
          <p className="text-lg text-fg-muted max-w-2xl">
            Probá las 4 paletas. Hacé click en una para aplicarla a toda la página.
            Tu elección queda guardada. Cuando te guste una, decime cuál y la dejamos fija.
          </p>
        </div>

        {/* Theme picker */}
        <section className="mb-16">
          <h2
            className="text-2xl font-bold mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Selector
          </h2>
          <ThemeSwitcher variant="inline" />
        </section>

        {/* Live preview of all 4 themes side by side */}
        <section>
          <h2
            className="text-2xl font-bold mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Vista previa (4 paletas simultáneas)
          </h2>
          <p className="text-sm text-fg-muted mb-6">
            Cada caja muestra la misma pantalla con una paleta distinta. Comparalas.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ThemeCard
              themeId="warm-classic"
              title="Warm Classic"
              subtitle="Verde teal + gold"
            />
            <ThemeCard
              themeId="warm-colorful"
              title="Warm Colorful"
              subtitle="Coral + gold vibrante"
            />
            <ThemeCard
              themeId="serio-elegante"
              title="Serio Elegante"
              subtitle="Navy + champagne"
            />
            <ThemeCard
              themeId="minimal-white"
              title="Minimal White"
              subtitle="Negro + gris"
            />
          </div>
        </section>

        {/* Save instruction */}
        <section className="mt-16 p-6 bg-surface-muted rounded-2xl border border-border">
          <h3
            className="text-xl font-bold mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            ¿Cómo se aplica?
          </h3>
          <ul className="space-y-2 text-sm text-fg-muted">
            <li>✅ El theme que elijas se guarda en tu navegador (localStorage)</li>
            <li>✅ Aplica a TODAS las páginas del sitio al instante</li>
            <li>✅ Cuando decidas cuál querés, decime y la pongo como default para todos los visitantes</li>
            <li>✅ Si no te gusta ninguna, podemos crear más paletas</li>
          </ul>
        </section>
      </div>
    </main>
  );
}

function ThemeCard({ themeId, title, subtitle }: { themeId: string; title: string; subtitle: string }) {
  return (
    <div
      data-theme={themeId}
      className="rounded-2xl overflow-hidden border-2 border-border bg-bg shadow-lg"
    >
      {/* Mini preview header */}
      <div className="bg-surface p-6 border-b border-border-light">
        <div className="text-xs uppercase tracking-wider text-fg-muted font-bold mb-1">
          Tema
        </div>
        <h3
          className="text-2xl font-bold text-fg mb-1"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {title}
        </h3>
        <p className="text-sm text-fg-muted">{subtitle}</p>
      </div>

      {/* Sample content */}
      <div className="p-6 space-y-4 bg-bg">
        {/* Hero sample */}
        <div className="rounded-xl bg-surface border border-border-light p-4">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
              <span className="text-white text-lg font-bold">★</span>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-fg text-lg">Te escucho.</h4>
              <p className="text-sm text-fg-muted leading-relaxed">
                Soy la Dra. Gaby. Llevo dos décadas siendo odontóloga.
              </p>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <span className="px-3 py-1 rounded-full bg-gold-soft text-xs font-bold text-fg">
              Rehabilitación oral
            </span>
            <span className="px-3 py-1 rounded-full bg-accent-soft text-xs font-bold text-accent-2">
              Segunda opinión
            </span>
          </div>
        </div>

        {/* Button sample */}
        <div className="flex gap-2">
          <button className="flex-1 px-4 py-2 rounded-lg bg-accent text-white text-sm font-bold">
            Agendar consulta
          </button>
          <button className="flex-1 px-4 py-2 rounded-lg border-2 border-accent text-accent text-sm font-bold">
            WhatsApp
          </button>
        </div>

        {/* Card sample */}
        <div className="rounded-xl border-2 border-border p-4 bg-surface">
          <div className="text-xs text-gold font-bold uppercase tracking-wider mb-1">
            20+ años
          </div>
          <div className="text-sm text-fg font-semibold mb-1">Experiencia clínica</div>
          <div className="text-xs text-fg-muted">
            Criterio, no prisa. Segunda opinión formal por escrito.
          </div>
        </div>

        {/* Gold accent line */}
        <div className="w-20 h-0.5 bg-gold rounded-full" />
      </div>
    </div>
  );
}