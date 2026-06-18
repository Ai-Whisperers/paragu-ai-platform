// Skip-to-content link — visible only when focused (keyboard a11y).
// Targets the #main-content element rendered by the layout.

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-gold"
    >
      Skip to main content
    </a>
  )
}
