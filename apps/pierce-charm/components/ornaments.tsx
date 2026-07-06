"use client";

// Ornamental SVG primitives for gothic aesthetic.
// Non-interactive, decorative only.

import type { CSSProperties } from "react";

export function ChainVertical({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 600"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="chainGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b1a31" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#8b1a31" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#8b1a31" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      {Array.from({ length: 30 }).map((_, i) => (
        <g key={i} transform={`translate(${i % 2 === 0 ? 0 : 12}, ${i * 20})`}>
          <ellipse cx="12" cy="10" rx="11" ry="6" fill="none" stroke="url(#chainGrad)" strokeWidth="2" />
          <ellipse cx="12" cy="10" rx="6" ry="4" fill="none" stroke="url(#chainGrad)" strokeWidth="1" opacity="0.6" />
        </g>
      ))}
    </svg>
  );
}

export function Bat({
  size = 32,
  mirrored = false,
  className = "",
  style,
}: {
  size?: number;
  mirrored?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size * 0.55}
      viewBox="0 0 64 36"
      fill="none"
      aria-hidden="true"
      className={className}
      style={{ transform: mirrored ? "scaleX(-1)" : undefined, ...style }}
    >
      <path
        d="M32 6 L30 8 C18 4 6 8 2 16 C6 12 12 12 18 16 C16 12 22 10 28 14 L30 12 L32 14 L34 12 L36 14 C42 10 48 12 46 16 C52 12 58 12 62 16 C58 8 46 4 34 8 Z"
        fill="currentColor"
        opacity="0.85"
      />
    </svg>
  );
}

export function Skull({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M5 8 C5 4.5 8.5 2 12 2 C15.5 2 19 4.5 19 8 V14 L17 16 V20 H14 V18 H10 V20 H7 V16 L5 14 Z"
        fill="currentColor"
      />
      <circle cx="9" cy="9" r="1.8" fill="#0a0612" />
      <circle cx="15" cy="9" r="1.8" fill="#0a0612" />
      <path d="M11 12 H13 L12.5 14 Z" fill="#0a0612" />
    </svg>
  );
}

export function CrossInverted({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M9 2 H15 V8 H21 V14 H15 V20 H9 V14 H3 V8 H9 Z" />
    </svg>
  );
}

export function CrescentMoon({ size = 22, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M21 13 A9 9 0 1 1 11 3 A7 7 0 0 0 21 13 Z" />
    </svg>
  );
}

export function Candle({ size = 60, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size * 0.4} height={size} viewBox="0 0 24 60" fill="none" aria-hidden="true" className={className}>
      <path d="M9 18 H15 V54 H9 Z" fill="#8b1a31" stroke="#3a040f" strokeWidth="1" />
      <ellipse cx="12" cy="18" rx="4" ry="2" fill="#520b4e" />
      <path d="M12 6 C 13 10 11 12 12 16 C 13 12 11 10 12 6 Z" fill="#c89b3c" className="animate-flicker" />
      <path d="M12 16 Q11 17 12 18 Q13 17 12 16 Z" fill="#ffd97a" opacity="0.9" />
    </svg>
  );
}

export function Spider({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size * 0.8} viewBox="0 0 40 32" fill="none" aria-hidden="true" className={className}>
      <path d="M20 0 V6" stroke="#8b1a31" strokeWidth="0.6" opacity="0.6" />
      <ellipse cx="20" cy="20" rx="7" ry="8" fill="currentColor" />
      <circle cx="20" cy="12" r="4" fill="currentColor" />
      {[8, 12, 16].map((y) => (
        <g key={y}>
          <path d={`M13 ${20 - y / 2} L4 ${y - 4} M27 ${20 - y / 2} L36 ${y - 4}`} stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          <path d={`M13 ${20 - y / 2} L4 ${y} M27 ${20 - y / 2} L36 ${y}`} stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.6" />
        </g>
      ))}
      <circle cx="18" cy="11" r="0.7" fill="#c0392b" />
      <circle cx="22" cy="11" r="0.7" fill="#c0392b" />
    </svg>
  );
}

export function DividerOrnament({ className = "" }: { className?: string }) {
  return (
    <div className={`divider-gothic ${className}`}>
      <CrossInverted size={14} />
      <span className="script text-[var(--color-gold)]" style={{ fontSize: "1.6rem" }}>
        ⚜ ✦ ⚜
      </span>
      <CrossInverted size={14} />
    </div>
  );
}

export function OrnamentalBorder({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 16" preserveAspectRatio="none" className={className} aria-hidden="true">
      <path
        d="M0 8 H80 M120 8 H200 M85 8 a4 4 0 1 1 0.001 0 M115 8 a4 4 0 1 1 0.001 0 M100 8 m-2 0 a2 2 0 1 0 4 0 a2 2 0 1 0 -4 0"
        stroke="#8b1a31"
        strokeWidth="1"
        fill="#8b1a31"
        opacity="0.7"
      />
      <path d="M95 8 L100 3 L105 8 L100 13 Z" fill="#b08838" opacity="0.7" />
    </svg>
  );
}