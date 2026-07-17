/**
 * Shared prop-shapes for section components consumed by the builder engine.
 *
 * Path alias `@/types/sections` resolves here per `tsconfig.paths`.
 * Calculator sections extend `BaseCalculatorSectionProps` so the engine can
 * forward locale-aware content overrides + WhatsApp/CTA config uniformly.
 */

/** Locale codes supported across builder sections. */
export type SectionLocale = 'es' | 'en' | 'pt'

/**
 * Common props shared by every calculator section under
 * `apps/builder/components/sections/calculators/*`.
 *
 * All fields optional — each calculator falls back to internal LABELS defaults
 * when overrides are absent (see e.g. calc-aguinaldo-section.tsx).
 */
export interface BaseCalculatorSectionProps {
  eyebrow?: string
  title?: string
  subtitle?: string
  disclaimer?: string
  ctaLabel?: string
  ctaHref?: string
  whatsapp?: string
  /** Injected by the engine at render time; picks which LABELS locale to use. */
  __locale?: SectionLocale
}

/** Common props for content/marketing sections that don't need calculator behavior. */
export interface BaseContentSectionProps {
  eyebrow?: string
  title?: string
  subtitle?: string
  __locale?: SectionLocale
}
