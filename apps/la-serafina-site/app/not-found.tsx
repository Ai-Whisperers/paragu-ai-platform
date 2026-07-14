import type { Metadata } from "next";
import Link from "next/link";
import { content as c, SITE_URL } from "@/lib/content";

// 404 page must use a no-index robots meta so Google doesn't index broken paths.
// Without this, Google Search Console reports a soft-404 and the page competes
// with real content for SERP slots.
//
// Canonical points to the home page so any inbound links to deleted pages
// consolidate to a single authoritative URL.
export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/` },
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-xl text-center">
        <div className="rainbow-bar w-32 mx-auto mb-8 rounded-full" aria-hidden="true" />
        <p className="text-xs uppercase tracking-[0.22em] text-text-muted mb-3 font-medium">
          Error 404
        </p>
        <h1 className="font-display text-4xl lg:text-5xl font-bold mb-4">
          Página no encontrada
        </h1>
        <p className="text-text-light mb-3">
          La página que buscás no existe o fue movida.{" "}
          {/* Honest about not being a real 404 — Google detects "soft 404"
              when a 200 with "not found" copy is shown. We pass through the
              real notFound() so the response code is a true 404. */}
          Si tenés un enlace que debería funcionar,{" "}
          <a
            href={`mailto:${c.footer.email}`}
            className="text-[var(--color-primary)] underline hover:no-underline"
          >
            avisanos por email
          </a>
          .
        </p>
        <p className="text-sm text-text-muted mb-8">
          {c.site.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-primary text-white font-medium hover:bg-[var(--color-purple-deep)]"
          >
            Volver al inicio
          </Link>
          <Link
            href="/espacio"
            className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-[var(--color-warm-deep)] bg-warm text-text hover:bg-warm-deep"
          >
            Conocer el espacio
          </Link>
          <Link
            href="/festival"
            className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-[var(--color-warm-deep)] bg-warm text-text hover:bg-warm-deep"
          >
            Festival de Cine
          </Link>
        </div>
      </div>
    </div>
  );
}
