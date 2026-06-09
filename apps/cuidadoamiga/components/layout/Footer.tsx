import Link from 'next/link'
import { getFooter, getSite, type Lang } from '@/lib/content'

export function Footer({ lang }: { lang: Lang }) {
  const footer = getFooter(lang)
  const site = getSite(lang)

  return (
    <footer className="px-6 py-12 border-t border-border bg-surface-2">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-8">
          <div>
            <span className="block text-xl font-black mb-2 bg-gradient-to-br from-rose-700 to-violet-600 bg-clip-text text-transparent">
              {site._meta.site.toLowerCase().replace(/\s+/g, '')}
            </span>
            <p className="text-sm text-foreground-muted leading-relaxed max-w-sm mb-3">
              {footer.tagline}
            </p>
            <p className="text-xs text-violet-700 leading-relaxed max-w-sm bg-violet-600/10 border border-violet-600/20 rounded-lg p-3">
              {footer.disclaimer}
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3" aria-label="Footer">
            {footer.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-foreground-muted hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`mailto:${footer.contact.email}`}
              className="text-sm text-foreground-muted hover:text-foreground transition-colors"
            >
              {footer.contact.label}
            </a>
          </nav>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-6 border-t border-border">
          <a href={`mailto:${footer.contact.email}`} className="text-sm text-pink-600 hover:underline">
            {footer.contact.email}
          </a>
          <a
            href="https://github.com/Ai-Whisperers/cuidadoamiga-fork"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-foreground-muted hover:text-foreground inline-flex items-center gap-2"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
