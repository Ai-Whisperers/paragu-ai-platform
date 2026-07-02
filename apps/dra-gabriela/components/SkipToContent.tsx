// Skip-to-content link — visible only when focused (keyboard a11y).
// Targets the #main-content element rendered by the layout.
// Bilingual: adapts to the locale prop passed in.

export function SkipToContent({ locale = "en" }: { locale?: string }) {
  const isEs = locale === "es"
  return (
    <a
      href="#main-content"
      className="skip-to-content"
    >
      {isEs ? "Saltar al contenido principal" : "Skip to main content"}
    </a>
  )
}