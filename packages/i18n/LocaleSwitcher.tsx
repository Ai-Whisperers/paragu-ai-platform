'use client';

import { useState, useTransition } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { locales, localeNames, localeFlags, isLocale, type Locale } from './index';

export function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  // Extract current locale from pathname
  const segments = pathname.split('/').filter(Boolean);
  const currentLocale: Locale = isLocale(segments[0] || '') ? (segments[0] as Locale) : 'es';

  function switchLocale(newLocale: Locale) {
    // Remove current locale from path
    const rest = segments[0] && isLocale(segments[0]) ? segments.slice(1) : segments;
    const newPath = `/${newLocale}${rest.length > 0 ? '/' + rest.join('/') : ''}`;

    startTransition(() => {
      router.push(newPath);
      setIsOpen(false);
    });
  }

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className="flex items-center gap-2 px-3 py-2 rounded-md border border-gray-300 hover:border-gray-400 bg-white text-sm font-medium text-gray-700 transition-colors"
        aria-label="Change language"
      >
        <span>{localeFlags[currentLocale]}</span>
        <span className="hidden sm:inline">{localeNames[currentLocale]}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
            <div className="py-1" role="menu">
              {locales.map((locale) => (
                <button
                  key={locale}
                  onClick={() => switchLocale(locale)}
                  disabled={isPending || locale === currentLocale}
                  className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 ${
                    locale === currentLocale
                      ? 'bg-gray-100 text-gray-900 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  } disabled:opacity-50`}
                  role="menuitem"
                >
                  <span>{localeFlags[locale]}</span>
                  <span>{localeNames[locale]}</span>
                  {locale === currentLocale && (
                    <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
