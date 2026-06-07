"use client";

import Link from "next/link";

interface PromoBannerProps {
  eyebrow?: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
}

export default function PromoBanner({
  eyebrow = "¡Atención!",
  title,
  subtitle,
  ctaText,
  ctaHref,
}: PromoBannerProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-32 h-32 rounded-full bg-gold blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-40 h-40 rounded-full bg-gold blur-3xl" />
      </div>

      {/* Gold accent lines */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />

      <div className="relative container-page py-10 md:py-14">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
          {/* Icon / Badge */}
          <div className="shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full bg-gold/20 border-2 border-gold/40 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-gold"
            >
              <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z" />
            </svg>
          </div>

          {/* Text */}
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block text-xs uppercase tracking-[0.25em] text-gold mb-2 font-semibold">
              {eyebrow}
            </span>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 leading-tight">
              {title}
            </h2>
            <p className="text-amber-200/80 text-sm md:text-base max-w-xl">
              {subtitle}
            </p>
          </div>

          {/* CTA */}
          <div className="shrink-0">
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-[var(--color-background)] font-bold rounded-lg hover:bg-amber-300 transition-all duration-300 shadow-lg shadow-gold/30 text-sm md:text-base"
            >
              {ctaText}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
