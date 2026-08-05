// ── Paraguay DNA motifs ──
// Centralised access to the 12 custom SVG assets. Components should import
// the constant they need rather than hardcoding paths.

export const MOTIFS = {
  nandutiLaceDivider: '/motifs/nanduti-lace-divider.svg',
  lapachoFlowerCluster: '/motifs/lapacho-flower-cluster.svg',
  terereGuaa: '/motifs/terere-guaa.svg',
  cobblestonePattern: '/motifs/cobblestone-pattern.svg',
  monogramLapachoN: '/motifs/monogram-lapacho-N.svg',
  sealCircular: '/motifs/seal-circular.svg',
  jesuitMissionArch: '/motifs/jesuit-mission-arch.svg',
  itaipuDamLine: '/motifs/itaipu-dam-line.svg',
  paranaRiverLine: '/motifs/parana-river-line.svg',
  asuncionSkylineLine: '/motifs/asuncion-skyline-line.svg',
  lengaEmbroideredPattern: '/motifs/lenga-embroidered-pattern.svg',
  jaguarPawPrint: '/motifs/jaguar-paw-print.svg',
} as const

export type MotifKey = keyof typeof MOTIFS

// ── Expanded Paraguay palette ──
// Adds 3 supporting colors to the existing Navy + Champagne system
export const PALETTE = {
  primary: '#1B2A4A',     // deep navy (existing)
  champagne: '#C9A96E',  // warm gold (existing)
  champagneLight: '#D4B97A',
  champagneDark: '#B8964E',
  jade: '#2D5F3F',       // Atlantic Forest
  terra: '#A04A2C',      // Jesuit ruins / colonial tile
  cream: '#F5EFE0',      // warm cream
  lapacho: '#D88BAB',    // pink lapacho flower (used sparingly)
  lapachoDeep: '#A64778',
} as const

// ── Section divider helper ──
// Renders the ñandutí lace between sections. Use as <SectionDivider />
// or as <SectionDivider variant="lenga" /> for the lenga variant.
export function SectionDivider({
  variant = 'nanduti',
  className = '',
  opacity = 0.4,
}: {
  variant?: 'nanduti' | 'lenga'
  className?: string
  opacity?: number
}) {
  const src = variant === 'lenga' ? MOTIFS.lengaEmbroideredPattern : MOTIFS.nandutiLaceDivider
  return (
    <div className={`flex justify-center w-full ${className}`} style={{ opacity }}>
      <img src={src} alt="" className="h-4 md:h-5 w-auto" aria-hidden="true" />
    </div>
  )
}

// ── Section eyebrow ornament ──
// Renders a small lapacho cluster above a section title.
export function EyebrowOrnament({ className = '' }: { className?: string }) {
  return (
    <div className={`flex justify-center ${className}`}>
      <img src={MOTIFS.lapachoFlowerCluster} alt="" className="h-6 md:h-8 w-auto" aria-hidden="true" />
    </div>
  )
}

// ── Hero background overlay ──
// Lays the Asunción skyline line at the bottom of a hero, low opacity.
export function HeroSkylineOverlay({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute bottom-0 left-0 right-0 pointer-events-none ${className}`} style={{ opacity: 0.15 }}>
      <img src={MOTIFS.asuncionSkylineLine} alt="" className="w-full h-auto" aria-hidden="true" />
    </div>
  )
}

// ── Cobblestone texture ──
// Renders a tiled cobblestone pattern as a section background.
export function CobblestoneTexture({
  opacity = 0.08,
  className = '',
}: {
  opacity?: number
  className?: string
}) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `url(${MOTIFS.cobblestonePattern})`,
        backgroundRepeat: 'repeat',
        backgroundSize: '80px 80px',
        opacity,
      }}
      aria-hidden="true"
    />
  )
}
