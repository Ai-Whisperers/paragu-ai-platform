// LocaleSwitcher.tsx — minimal dropdown para ES/EN/Guaraní
'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { LOCALES, LOCALE_NAMES, LOCALE_FLAGS, isValidLocale } from '@/lib/locales';

export default function LocaleSwitcher({ currentLocale }: { currentLocale: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function switchLocale(newLocale: string) {
    if (!isValidLocale(newLocale)) return;
    // Strip current locale prefix and add new one
    const segments = pathname.split('/').filter(Boolean);
    const rest = isValidLocale(segments[0] || '') ? segments.slice(1) : segments;
    const newPath = `/${newLocale}${rest.length > 0 ? '/' + rest.join('/') : ''}`;
    router.push(newPath);
    setOpen(false);
  }

  const currentFlag = isValidLocale(currentLocale) ? LOCALE_FLAGS[currentLocale] : '🇵🇾';
  const currentName = isValidLocale(currentLocale) ? LOCALE_NAMES[currentLocale] : 'Español';

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Cambiar idioma"
        aria-expanded={open}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-sm font-medium text-[var(--color-text-muted)]"
      >
        <span aria-hidden="true">{currentFlag}</span>
        <span>{currentName}</span>
        <span aria-hidden="true">▾</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md shadow-lg z-40 min-w-[150px]">
          {LOCALES.map((loc) => (
            <button
              key={loc}
              type="button"
              onClick={() => switchLocale(loc)}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-[var(--color-bg-alt)] flex items-center gap-2 ${loc === currentLocale ? 'font-bold text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'}`}
            >
              <span aria-hidden="true">{LOCALE_FLAGS[loc]}</span>
              <span>{LOCALE_NAMES[loc]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
