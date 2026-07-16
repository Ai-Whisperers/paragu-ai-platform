"use client";

interface IconProps {
  type: string;
  size?: number;
  className?: string;
  active?: boolean;
}

/**
 * Iconos SVG de las joyas más comunes en piercings.
 * Línea simple, monocromo (usa currentColor).
 * Cada uno representa la pieza real que se inserta.
 */
export function JewelryIcon({ type, size = 28, className = "", active = false }: IconProps) {
  const color = active ? "var(--color-gold)" : "currentColor";
  const sw = active ? 2.2 : 1.4;

  switch (type) {
    case "stud":
      return (
        <svg viewBox="0 0 40 40" width={size} height={size} className={className} aria-hidden="true">
          <circle cx="20" cy="14" r="6" fill={color} opacity="0.85" />
          <line x1="20" y1="20" x2="20" y2="30" stroke={color} strokeWidth={sw} strokeLinecap="round" />
          <circle cx="20" cy="30" r="2" fill={color} />
        </svg>
      );
    case "labret-stud":
      return (
        <svg viewBox="0 0 40 40" width={size} height={size} className={className} aria-hidden="true">
          <rect x="14" y="11" width="12" height="6" rx="3" fill={color} opacity="0.9" />
          <line x1="20" y1="17" x2="20" y2="32" stroke={color} strokeWidth={sw} strokeLinecap="round" />
          <circle cx="20" cy="32" r="3" fill={color} />
        </svg>
      );
    case "hoop":
      return (
        <svg viewBox="0 0 40 40" width={size} height={size} className={className} aria-hidden="true">
          <circle cx="20" cy="20" r="12" fill="none" stroke={color} strokeWidth={sw} />
          <circle cx="32" cy="20" r="2" fill={color} />
        </svg>
      );
    case "clicker":
      return (
        <svg viewBox="0 0 40 40" width={size} height={size} className={className} aria-hidden="true">
          <path d="M 8 20 A 12 12 0 0 1 32 20" fill="none" stroke={color} strokeWidth={sw} />
          <circle cx="20" cy="20" r="3" fill={color} />
          <circle cx="32" cy="20" r="2.5" fill={color} />
        </svg>
      );
    case "captive":
      return (
        <svg viewBox="0 0 40 40" width={size} height={size} className={className} aria-hidden="true">
          <circle cx="20" cy="20" r="13" fill="none" stroke={color} strokeWidth={sw} />
          <circle cx="20" cy="20" r="5" fill={color} />
        </svg>
      );
    case "straight-barbell":
      return (
        <svg viewBox="0 0 60 30" width={size} height={(size * 30) / 60} className={className} aria-hidden="true">
          <line x1="6" y1="15" x2="54" y2="15" stroke={color} strokeWidth={sw} />
          <circle cx="6" cy="15" r="4" fill={color} />
          <circle cx="54" cy="15" r="4" fill={color} />
        </svg>
      );
    case "curved-barbell":
      return (
        <svg viewBox="0 0 60 30" width={size} height={(size * 30) / 60} className={className} aria-hidden="true">
          <path d="M 6 22 Q 30 6 54 22" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" />
          <circle cx="6" cy="22" r="4" fill={color} />
          <circle cx="54" cy="22" r="4" fill={color} />
        </svg>
      );
    case "surface-bar":
      return (
        <svg viewBox="0 0 60 30" width={size} height={(size * 30) / 60} className={className} aria-hidden="true">
          <line x1="6" y1="15" x2="54" y2="15" stroke={color} strokeWidth={sw} />
          <circle cx="6" cy="15" r="3" fill={color} />
          <circle cx="54" cy="15" r="3" fill={color} />
          <line x1="14" y1="15" x2="46" y2="15" stroke={color} strokeWidth={0.6} opacity="0.4" />
        </svg>
      );
    case "nostril-screw":
      return (
        <svg viewBox="0 0 40 40" width={size} height={size} className={className} aria-hidden="true">
          <rect x="10" y="10" width="14" height="6" rx="3" fill={color} opacity="0.9" />
          <path
            d="M 17 16 Q 14 20 14 25"
            fill="none"
            stroke={color}
            strokeWidth={sw}
            strokeLinecap="round"
          />
          <circle cx="14" cy="26" r="2" fill={color} />
        </svg>
      );
    case "plug":
      return (
        <svg viewBox="0 0 40 40" width={size} height={size} className={className} aria-hidden="true">
          <ellipse cx="20" cy="20" rx="10" ry="6" fill={color} opacity="0.9" />
          <ellipse cx="20" cy="20" rx="6" ry="4" fill="none" stroke={color} strokeWidth={sw} />
        </svg>
      );
    case "tunnel":
      return (
        <svg viewBox="0 0 40 40" width={size} height={size} className={className} aria-hidden="true">
          <ellipse cx="20" cy="20" rx="12" ry="7" fill="none" stroke={color} strokeWidth={sw} />
          <ellipse cx="20" cy="20" rx="7" ry="4" fill="none" stroke={color} strokeWidth="0.6" />
        </svg>
      );
    case "chain":
      return (
        <svg viewBox="0 0 40 60" width={size} height={(size * 60) / 40} className={className} aria-hidden="true">
          <g fill="none" stroke={color} strokeWidth={sw}>
            <ellipse cx="20" cy="8" rx="6" ry="3" />
            <ellipse cx="20" cy="16" rx="6" ry="3" />
            <ellipse cx="20" cy="24" rx="6" ry="3" />
            <ellipse cx="20" cy="32" rx="6" ry="3" />
            <ellipse cx="20" cy="40" rx="6" ry="3" />
            <ellipse cx="20" cy="48" rx="6" ry="3" />
          </g>
        </svg>
      );
    case "dangle":
      return (
        <svg viewBox="0 0 40 60" width={size} height={(size * 60) / 40} className={className} aria-hidden="true">
          <circle cx="20" cy="8" r="3" fill={color} />
          <line x1="20" y1="11" x2="20" y2="22" stroke={color} strokeWidth={sw} />
          <path d="M 14 22 Q 20 30 26 22" fill={color} opacity="0.9" />
          <line x1="20" y1="30" x2="20" y2="42" stroke={color} strokeWidth={sw} />
          <circle cx="20" cy="48" r="5" fill="none" stroke={color} strokeWidth={sw} />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 40 40" width={size} height={size} className={className} aria-hidden="true">
          <circle cx="20" cy="20" r="8" fill="none" stroke={color} strokeWidth={sw} />
        </svg>
      );
  }
}
