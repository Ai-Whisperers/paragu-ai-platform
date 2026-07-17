/**
 * WaterDropletDecor — stained-glass water-droplet decor overlay.
 *
 * Canonical ParaguAI aesthetic (see `apps/builder/CLAUDE.md`):
 *   mirrored droplet shapes at 5-10% opacity, low-blur inner glow.
 *   Uses --primary (#7834C0) at 8% and --brand (#AF7AC9) at 6% by default.
 *
 * Absolute-positioned inline SVG. Wrap it inside a `relative overflow-hidden`
 * container (section roots already are). It is pointer-events-none so it
 * never blocks clicks / focus.
 *
 * No gradients, no external assets — pure inline SVG.
 */
import * as React from 'react'

interface WaterDropletDecorProps {
  /** Unique id suffix so multiple instances on one page keep unique defs. */
  idSuffix?: string
  /** Optional side to bias placement: 'both' (default), 'left', 'right'. */
  side?: 'left' | 'right' | 'both'
  className?: string
}

export function WaterDropletDecor({
  idSuffix = 'default',
  side = 'both',
  className = '',
}: WaterDropletDecorProps) {
  const primaryGlowId = `wd-glow-primary-${idSuffix}`
  const brandGlowId = `wd-glow-brand-${idSuffix}`

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Low-blur inner glow — softens the droplet edges without becoming a gradient */}
          <filter id={primaryGlowId} x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <filter id={brandGlowId} x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        {/* Left-side droplet cluster (mirror pair) */}
        {(side === 'left' || side === 'both') && (
          <g>
            {/* Primary droplet (large) */}
            <path
              d="M120,80 Q80,180 120,260 Q220,240 220,160 Q220,110 180,90 Q150,75 120,80 Z"
              fill="var(--primary)"
              fillOpacity="0.08"
              filter={`url(#${primaryGlowId})`}
            />
            {/* Mirror droplet (small brand accent) */}
            <path
              d="M60,340 Q40,410 60,470 Q140,455 140,395 Q140,360 110,345 Q85,335 60,340 Z"
              fill="var(--brand)"
              fillOpacity="0.06"
              filter={`url(#${brandGlowId})`}
            />
            {/* Light-reflection detail — thin arc on droplet */}
            <path
              d="M150,110 Q160,130 155,150"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeOpacity="0.10"
              fill="none"
            />
          </g>
        )}

        {/* Right-side droplet cluster (mirror of left) */}
        {(side === 'right' || side === 'both') && (
          <g transform="translate(1200, 0) scale(-1, 1)">
            <path
              d="M180,180 Q140,280 180,360 Q280,340 280,260 Q280,210 240,190 Q210,175 180,180 Z"
              fill="var(--primary)"
              fillOpacity="0.07"
              filter={`url(#${primaryGlowId})`}
            />
            <path
              d="M100,560 Q80,630 100,690 Q180,675 180,615 Q180,580 150,565 Q125,555 100,560 Z"
              fill="var(--brand)"
              fillOpacity="0.06"
              filter={`url(#${brandGlowId})`}
            />
            <path
              d="M210,210 Q220,230 215,250"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeOpacity="0.10"
              fill="none"
            />
          </g>
        )}

        {/* Center droplet — subtle water-refract feel */}
        {side === 'both' && (
          <path
            d="M600,420 Q560,510 600,580 Q690,565 690,495 Q690,455 655,435 Q625,425 600,420 Z"
            fill="var(--primary)"
            fillOpacity="0.05"
            filter={`url(#${primaryGlowId})`}
          />
        )}
      </svg>
    </div>
  )
}

export default WaterDropletDecor
