// Google Maps embed — single-map embed for /contacto page.
// Uses the standard Maps Embed API (no API key required for basic embed).

interface GoogleMapEmbedProps {
  /** Address query for the embed (will be URL-encoded) */
  query?: string
  /** Coordinates (lat,lng) — more accurate than query */
  lat?: number
  lng?: number
  /** Optional zoom level (default 15) */
  zoom?: number
  /** Optional className */
  className?: string
  /** Locale for the embed */
  locale?: "es" | "en"
}

export function GoogleMapEmbed({
  query = "Auditores de la Guerra del Chaco 617, Asunción, Paraguay",
  lat = -25.2836,
  lng = -57.4831,
  zoom = 15,
  className = "",
  locale = "es",
}: GoogleMapEmbedProps) {
  const params = new URLSearchParams({
    q: query,
    z: String(zoom),
    output: "embed",
    hl: locale,
  })
  const src = `https://maps.google.com/maps?${params.toString()}`

  return (
    <div className={`rounded-2xl overflow-hidden border border-border-light shadow-sm ${className}`}>
      <iframe
        title={locale === "es" ? "Ubicación del consultorio" : "Clinic location"}
        src={src}
        width="100%"
        height="380"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="block"
      />
      <noscript>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-4 bg-accent-soft text-center text-sm"
        >
          {locale === "es" ? "Ver en Google Maps →" : "View on Google Maps →"}
        </a>
      </noscript>
    </div>
  )
}
