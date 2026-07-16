"use client";

import { useState } from "react";
import Link from "next/link";
import content from "@/content/es.json";
import { ChainVertical, Skull, CrossInverted, CrescentMoon, DividerOrnament } from "@/components/ornaments";
import { whatsappUrl } from "@/lib/site-config";

const c = content as any;
const f = c.faq || {};
const items = f.items || [];

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it: any) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.a,
      },
    })),
  };

  return (
    <div className="pt-24 md:pt-32 relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="hidden lg:block chain-side chain-side-left">
        <ChainVertical className="w-full h-full text-[var(--color-primary-light)]" />
      </div>
      <div className="hidden lg:block chain-side chain-side-right">
        <ChainVertical className="w-full h-full text-[var(--color-primary-light)]" />
      </div>

      <section className="max-w-4xl mx-auto px-4 md:px-6 pb-10">
        <div className="text-center max-w-2xl mx-auto">
          <Skull size={32} className="mx-auto text-[var(--color-primary-light)] mb-3" />
          <p className="eyebrow mb-2">𓆩 ☆ 𓆪</p>
          <h1 className="mb-3 text-balance">{f.title}</h1>
          <p className="text-[var(--color-muted-foreground)]">{f.subtitle}</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 md:px-6 pb-16">
        <div className="space-y-3" role="list">
          {items.map((item: any, i: number) => {
            const isOpen = open === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-button-${i}`;
            return (
              <div key={i} className="rock-card overflow-hidden" role="listitem">
                <button
                  id={buttonId}
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="w-full tap flex items-start justify-between gap-3 p-5 md:p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-light)]"
                >
                  <div className="flex items-start gap-3 flex-1">
                    <span className="font-[var(--font-display)] text-[var(--color-primary-light)] text-[0.78rem] tracking-[0.18em] mt-0.5 flex-shrink-0">
                      0{i + 1}
                    </span>
                    <span className="text-[1.02rem] font-[var(--font-display)]">{item.q}</span>
                  </div>
                  <span
                    aria-hidden="true"
                    className={`flex-shrink-0 w-7 h-7 flex items-center justify-center border border-[var(--color-primary-light)] text-[var(--color-primary-light)] text-[1.2rem] transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96" : "max-h-0"}`}
                >
                  <div className="px-5 md:px-6 pb-5 md:pb-6 pl-[3.2rem] md:pl-[3.5rem]">
                    <p className="text-[var(--color-muted-foreground)] text-[0.95rem] leading-relaxed border-l-2 border-[var(--color-primary-light)] pl-4">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <DividerOrnament />

      <section className="py-14 md:py-16 px-4 md:px-6 bg-[var(--color-surface)] border-t border-[var(--color-border)]">
        <div className="max-w-3xl mx-auto text-center">
          <CrescentMoon size={28} className="mx-auto text-[var(--color-gold)] mb-3 animate-flicker" />
          <h2 className="text-[1.6rem] md:text-[2rem] mb-3">¿No encontraste tu duda?</h2>
          <p className="text-[var(--color-muted-foreground)] mb-6">Escribinos por WhatsApp y te respondemos cualquier consulta.</p>
          <Link
            href={whatsappUrl(c.contacto?.whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gothic tap"
          >
            <CrossInverted size={14} className="text-[var(--color-gold)]" />
            Preguntar por WhatsApp
          </Link>
        </div>
      </section>
    </div>
  );
}