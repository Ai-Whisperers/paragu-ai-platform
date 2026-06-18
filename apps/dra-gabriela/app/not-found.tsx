// Custom 404 page — branded, with quick links to the most-used pages.
// Rendered when notFound() is called or when a route doesn't match.

import Link from "next/link"
import { Home, Search, MessageCircle, ArrowRight } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-6">
          <span className="inline-block text-7xl md:text-8xl font-medium gradient-text leading-none" style={{ fontFamily: "var(--font-heading)" }}>
            404
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl mb-3 text-left md:text-center">
          Page not found
        </h1>
        <p className="text-fg-muted mb-8 max-w-md mx-auto text-left md:text-center leading-relaxed">
          The page you were looking for doesn't exist or has moved. Here are some quick links to keep going.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto">
          <Link
            href="/en"
            className="card p-4 flex items-center gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-accent-soft flex items-center justify-center flex-shrink-0">
              <Home className="w-5 h-5 text-accent" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm">Home</div>
              <div className="text-xs text-fg-muted">Start from the beginning</div>
            </div>
            <ArrowRight className="w-4 h-4 text-fg-subtle flex-shrink-0" />
          </Link>
          <Link
            href="/en/services"
            className="card p-4 flex items-center gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-accent-soft flex items-center justify-center flex-shrink-0">
              <Search className="w-5 h-5 text-accent" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm">Services</div>
              <div className="text-xs text-fg-muted">See what we offer</div>
            </div>
            <ArrowRight className="w-4 h-4 text-fg-subtle flex-shrink-0" />
          </Link>
          <Link
            href="/en/contact"
            className="card p-4 flex items-center gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-accent-soft flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-5 h-5 text-accent" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm">Contact</div>
              <div className="text-xs text-fg-muted">Get in touch</div>
            </div>
            <ArrowRight className="w-4 h-4 text-fg-subtle flex-shrink-0" />
          </Link>
          <Link
            href="/en/pricing"
            className="card p-4 flex items-center gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-accent-soft flex items-center justify-center flex-shrink-0">
              <ArrowRight className="w-5 h-5 text-accent" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm">Pricing</div>
              <div className="text-xs text-fg-muted">Transparent rates</div>
            </div>
            <ArrowRight className="w-4 h-4 text-fg-subtle flex-shrink-0" />
          </Link>
        </div>
        <p className="text-xs text-fg-subtle mt-8">
          Lost? Email <a href="mailto:hola@dra-gp.com.py" className="text-accent hover:underline">hola@dra-gp.com.py</a> for help.
        </p>
      </div>
    </div>
  )
}
