import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/content";

export const metadata: Metadata = {
  title: "Ore — Equipo (guaraníme) · SOMOSGAY",
  alternates: { canonical: `https://somosgay.paragu-ai.com/equipo` },
};

export default function GnStubPage() {
  return (
    <div className="bg-warm-deep min-h-[60vh]">
      <div className="rainbow-bar" aria-hidden="true" />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <p className="text-xs uppercase tracking-[0.22em] text-text-muted mb-3">Ñembojoaju guaraníme</p>
        <h1 className="font-display text-3xl lg:text-4xl font-bold mb-4">
          Ore — Equipo
        </h1>
        <div className="bg-surface rounded-2xl border border-[var(--color-warm-deep)] p-6 mb-6">
          <p className="text-base text-text-light leading-relaxed mb-3">
            Ko'ápe marandu'i ko'ángagua ojehecháva castellano-pe.
          </p>
          <p className="text-sm text-text-muted leading-relaxed mb-4 italic">
            Equipo multidisciplinario de SOMOSGAY.
          </p>
          <Link
            href="/equipo"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-primary text-white font-medium hover:bg-[var(--color-purple-deep)]"
          >
            Castellano-pe ehecha →
          </Link>
        </div>
        <p className="text-xs text-text-muted">
          Marandu guaraníme katu oñembyaíta etépe Paloma (coordinadora) rehegua. Ko'ágagua roikóma castellano-pe jehechapyrépe.
        </p>
      </div>
    </div>
  );
}
