"use client";

import { useEffect, useRef, useState } from "react";
import { SITE_URL } from "@/lib/content";

/**
 * Share buttons — clean popover menu.
 *
 * Single trigger button "Compartir" that opens a 4-option menu with
 * native-looking SVG icons. On mobile it overflows gracefully.
 *
 * No "WA / X / FB / in" mini-badges — that's the bad pattern the user
 * flagged. Full names with real icons.
 *
 * Social-icon SVGs are inline (no icon font, no CDN call) for OPSEC.
 */

interface ShareLink {
  name: string;
  label: string;
  href: string;
  icon: (props: { className?: string }) => React.ReactElement;
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.15h-.01a9.13 9.13 0 01-4.65-1.27l-.33-.2-3.12.82.83-3.04-.22-.34a9.13 9.13 0 01-1.4-4.86c0-5.04 4.1-9.14 9.14-9.14 5.04 0 9.14 4.1 9.14 9.14-.01 5.05-4.11 9.16-9.16 9.16zm5.04-6.85c-.28-.14-1.63-.8-1.88-.89-.25-.09-.43-.14-.62.14-.18.27-.71.89-.87 1.07-.16.18-.32.2-.6.07-.28-.14-1.16-.43-2.21-1.37-.82-.73-1.37-1.63-1.53-1.9-.16-.27-.02-.42.12-.55.13-.13.28-.32.42-.48.14-.16.18-.27.28-.46.09-.18.05-.34-.02-.48-.07-.14-.62-1.5-.85-2.05-.22-.54-.45-.46-.62-.47-.16-.01-.34-.01-.52-.01a1 1 0 00-.73.34c-.25.27-.96.94-.96 2.29s.99 2.66 1.13 2.85c.14.18 1.95 2.98 4.74 4.18 1.83.78 2.55.85 3.46.71.55-.08 1.62-.66 1.85-1.3.23-.64.23-1.18.16-1.3-.07-.11-.25-.18-.53-.32z"/>
    </svg>
  );
}
function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
    </svg>
  );
}
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  );
}
function ShareIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

export function ShareButtons({
  title,
  url,
  intro,
}: {
  title: string;
  url?: string;
  intro?: string;
}) {
  const shareUrl = url || `${SITE_URL}/`;
  const encUrl = encodeURIComponent(shareUrl);
  const encTitle = encodeURIComponent(title);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const links: ShareLink[] = [
    {
      name: "wa",
      label: "WhatsApp",
      href: `https://wa.me/?text=${encTitle}%20${encUrl}`,
      icon: WhatsAppIcon,
    },
    {
      name: "x",
      label: "X (Twitter)",
      href: `https://twitter.com/intent/tweet?text=${encTitle}&url=${encUrl}`,
      icon: TwitterIcon,
    },
    {
      name: "fb",
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encUrl}`,
      icon: FacebookIcon,
    },
    {
      name: "li",
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encUrl}`,
      icon: LinkedInIcon,
    },
  ];

  return (
    <section
      aria-label="Compartir esta página"
      className="border-t border-[var(--color-warm-deep)] pt-8 mt-12"
    >
      {intro && (
        <p className="text-sm text-text-light mb-5 max-w-prose">{intro}</p>
      )}

      <div className="relative inline-block" ref={ref}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="menu"
          aria-expanded={open}
          className="btn-secondary"
        >
          <ShareIcon className="w-4 h-4" />
          Compartir
        </button>

        {open && (
          <div
            role="menu"
            aria-label="Compartir en redes sociales"
            className="absolute z-30 left-0 bottom-full mb-2 w-56 bg-surface border border-[var(--color-warm-deep)] rounded-[var(--radius-lg)] p-1.5 shadow-soft"
          >
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  role="menuitem"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 py-2 rounded-[var(--radius-sm)] text-text hover:bg-warm transition-colors text-sm"
                  onClick={() => setOpen(false)}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </div>
        )}
      </div>

      {/* Plain URL row, outside the menu, no JS dependency */}
      <details className="mt-3 group">
        <summary className="cursor-pointer eyebrow hover:text-text-light list-none [&::-webkit-details-marker]:hidden">
          🔗 Copiar enlace directo
        </summary>
        <p className="mt-2 text-xs font-mono text-text-light break-all bg-warm rounded-[var(--radius-sm)] px-3 py-2">
          {shareUrl}
        </p>
      </details>
    </section>
  );
}
