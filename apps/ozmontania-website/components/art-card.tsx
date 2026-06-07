'use client'

import type { ObraItem } from '@/types/content'
import { useState } from 'react'

interface ArtCardProps {
  piece: ObraItem
  priority?: boolean
}

// Generate a unique art pattern for each piece based on its id
function ArtPattern({ id, title, category }: { id: string; title: string; category: string }) {
  // Deterministic but visually distinct backgrounds for each piece
  const seed = id.length + title.length + category.length
  const hue1 = (seed * 47) % 360
  const hue2 = (hue1 + 40 + (seed % 60)) % 360
  const hue3 = (hue1 + 140 + (seed % 30)) % 360
  const shapes = (seed % 5) + 3
  const lines = (seed % 4) + 2

  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id={`bg-${id}`} cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor={`hsl(${hue1}, 30%, 20%)`} />
          <stop offset="100%" stopColor={`hsl(${hue2}, 40%, 8%)`} />
        </radialGradient>
        {Array.from({length: shapes}).map((_, i) => (
          <radialGradient key={i} id={`g-${id}-${i}`} cx={`${30 + (i * 17) % 40}%`} cy={`${20 + (i * 23) % 60}%`} r={`${15 + (i * 5) % 25}%`}>
            <stop offset="0%" stopColor={`hsla(${(hue1 + i * 30) % 360}, 50%, ${25 + i * 5}%, 0.3)`} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        ))}
      </defs>
      <rect width="800" height="600" fill={`url(#bg-${id})`} />

      {/* Organic blobs */}
      {Array.from({length: shapes}).map((_, i) => (
        <g key={i}>
          <circle
            cx={120 + (i * 127 + seed) % 500}
            cy={80 + (i * 89 + seed * 3) % 400}
            r={60 + (i * 37 + seed) % 120}
            fill={`url(#g-${id}-${i})`}
            opacity={0.6}
          />
        </g>
      ))}

      {/* Lines/scribbles */}
      {Array.from({length: lines}).map((_, i) => (
        <path
          key={`line-${i}`}
          d={`M${(i * 200 + seed) % 600},${(i * 150 + seed * 2) % 400}
              Q${(i * 180 + seed * 3) % 700},${(i * 100 + seed * 5) % 300}
                ${(i * 220 + seed * 7) % 500},${(i * 200 + seed * 11) % 350}`}
          stroke={`hsl(${hue3}, 40%, 35%)`}
          strokeWidth={2 + i}
          fill="none"
          opacity={0.4 + i * 0.1}
        />
      ))}

      {/* Cross-hatch overlay */}
      <g opacity="0.03">
        {Array.from({length: 20}).map((_, i) => (
          <line key={`h-${i}`}
            x1={i * 40} y1="0" x2={i * 40 + 100} y2="600"
            stroke="white" strokeWidth="1"
          />
        ))}
      </g>
    </svg>
  )
}

export default function ArtCard({ piece, priority = false }: ArtCardProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800/40 group">
      {/* Art placeholder */}
      <div className={`absolute inset-0 transition-opacity duration-700 ${loaded ? 'opacity-0' : 'opacity-100'}`}>
        <ArtPattern id={piece.id} title={piece.title} category={piece.category} />
      </div>

      {/* Image overlay */}
      <img
        src={piece.images[0]}
        alt={piece.title}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          // Keep the art pattern visible on error
          setLoaded(false)
        }}
      />

      {/* Gradient overlay at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/10 to-transparent z-[1]" />

      {/* Category badge */}
      <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-10">
        <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-black/60 backdrop-blur-sm text-amber-500 text-[9px] sm:text-xs font-semibold rounded-full border border-zinc-700/50">
          {piece.category}
        </span>
      </div>

      {/* Title */}
      <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 z-[3]">
        <h3 className="text-xs sm:text-base md:text-lg font-serif font-semibold text-white leading-tight drop-shadow-lg">
          {piece.title}
        </h3>
        <p className="text-[9px] sm:text-xs text-zinc-300 mt-0.5 drop-shadow-md">
          {piece.location} · {piece.year}
        </p>
      </div>

      {/* Hover arrow */}
      <div className="absolute top-2 sm:top-3 right-2 sm:right-3 z-[3] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-4px] group-hover:translate-x-0">
        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
    </div>
  )
}
