import type { Metadata } from "next";
import Link from "next/link";
import { getContent, SITE_URL } from "@/lib/content";

const c = getContent("gn");

export const metadata: Metadata = {
  title: "SOMOSGAY — Ñepyrũ guaraníme",
  description: c.metaDescription,
  alternates: { canonical: `${SITE_URL}/gn` },
};

// /gn is a bilingual landing — explains that the org's full site is in
// Spanish, lists the most important translated sections (these mirror
// /clinica-kunuu and /donar with gn-side copy), and invites readers to
// browse the full site in es.
//
// We don't clone every page to guarani because maintaining a full mirror
// is unsustainable. The Spanish site is the canonical one — guarani here is
// an honor-language layer for community-facing communication.
export default function GnLandingPage() {
  return (
    <div className="bg-warm-deep min-h-[70vh]">
      <div className="rainbow-bar" aria-hidden="true" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <p className="text-xs uppercase tracking-[0.22em] text-text-muted mb-4 font-medium">
          {c.home.hero.eyebrow}
        </p>
        <h1 className="font-display text-5xl lg:text-6xl font-bold tracking-tight mb-4">
          {c.home.hero.title}
        </h1>
        <p className="text-2xl rainbow-text font-display font-bold mb-6">
          {c.home.hero.subtitle}
        </p>
        <p className="text-lg text-text-light leading-relaxed mb-8 max-w-2xl">
          {c.home.hero.lead}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mb-12">
          <a
            href="/gn/clinica-kunuu"
            className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-primary text-white font-medium hover:bg-[var(--color-purple-deep)]"
          >
            {c.clinica.title}
          </a>
          <a
            href="/gn/donar"
            className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-warm border border-[var(--color-warm-deep)] text-text font-medium"
          >
            {c.donar.title}
          </a>
        </div>

        <div className="bg-surface rounded-2xl p-6 border border-[var(--color-warm-deep)] mb-8">
          <p className="text-sm text-text-light mb-3">{c.home.funders.title}</p>
          <div className="flex flex-wrap gap-2">
            {(c.home.funders.items ?? []).map((f: string) => (
              <span
                key={f}
                className="text-xs font-medium px-3 py-1 bg-warm rounded-full border border-[var(--color-warm-deep)] text-text"
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        <p className="text-sm text-text-muted leading-relaxed">
          {c.home.impact.note}{" "}
          <Link href="/" className="underline hover:no-underline font-medium">
            Castellano-pe ehecha →
          </Link>
        </p>
      </div>
    </div>
  );
}
