"use client";

import { useState } from "react";
import { DividerOrnament, Skull } from "@/components/ornaments";
import { whatsappUrl } from "@/lib/site-config";

interface Testimonial {
  name?: string;
  body: string;
  rating?: number;
}

export function Testimonials({
  data,
  phone,
}: {
  data: any;
  phone: string;
}) {
  const items: Testimonial[] = data?.items || [];

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-[var(--color-background)] to-[var(--color-surface)] relative">
      <div className="max-w-5xl mx-auto text-center">
        <p className="eyebrow mb-3">{data?.eyebrow || '𓆩 Voces 𓆪'}</p>
        <h2 className="mb-3 text-balance">{data?.title || 'Lo que dicen nuestros clientes'}</h2>
        <p className="text-[var(--color-muted-foreground)] max-w-xl mx-auto mb-12">
          {data?.subtitle || 'Cuando lleguen los reviews de Google, los vamos agregando acá.'}
        </p>

        {items.length === 0 ? (
          <div className="rock-card p-8 md:p-12 max-w-2xl mx-auto">
            <Skull size={42} className="mx-auto mb-4 text-[var(--color-primary-light)]" />
            <p className="text-[var(--color-foreground)]/80 italic">
              {data?.placeholder_note || 'Testimonios pendientes: agregamos después del primer mes.'}
            </p>
            <p className="text-[0.85rem] mt-4 text-[var(--color-muted-foreground)]">
              ¿Ya fuiste cliente?{" "}
              <a
                href={whatsappUrl(phone, "Hola! Quisiera dejar un testimonio sobre mi experiencia.")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-primary-light)] underline"
              >
                Escribinos para incluir tu voz acá
              </a>
              .
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {items.map((t, i) => (
              <article key={i} className="rock-card p-6 md:p-7 text-left">
                <div className="flex gap-1 mb-3" aria-label={`Calificación ${t.rating || 5} estrellas`}>
                  {Array.from({ length: t.rating || 5 }).map((_, idx) => (
                    <span key={idx} className="text-[var(--color-gold)] text-[1.1rem]">★</span>
                  ))}
                </div>
                <blockquote className="text-[var(--color-foreground)]/90 italic leading-relaxed mb-3">
                  "{t.body}"
                </blockquote>
                <p className="text-[0.85rem] uppercase tracking-[0.18em] text-[var(--color-muted-foreground)] font-[var(--font-display)]">
                  — {t.name || 'Cliente'}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
