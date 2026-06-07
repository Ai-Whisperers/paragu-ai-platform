import Link from 'next/link'
import es from '@/content/es.json'
import type { SiteContent } from '@/types/content'

const content = es as unknown as SiteContent

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center px-6">
        <div className="text-5xl sm:text-7xl font-serif font-bold text-amber-500 mb-4 sm:mb-6">404</div>
        <h1 className="text-xl sm:text-3xl font-serif font-bold mb-3 sm:mb-4">{content.not_found.title}</h1>
        <p className="text-zinc-400 text-sm sm:text-base mb-2">{content.not_found.message}</p>
        <p className="text-zinc-600 text-xs sm:text-sm mb-6 sm:mb-8">{content.not_found.subtext}</p>
        <Link href="/" className="btn-primary text-sm sm:text-base">{content.not_found.cta}</Link>
      </div>
    </section>
  )
}
