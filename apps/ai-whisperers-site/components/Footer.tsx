import Link from "next/link"

export function Footer({ lang, content }: { lang: string; content: any }) {
  const f = content.footer
  return (
    <footer className="bg-bg-elev border-t border-border mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-3">{content.site.name}</h2>
            <p className="text-fg-muted mb-4 max-w-md">{f.tagline}</p>
            <p className="text-sm text-fg-muted">{content.site.basedIn}</p>
            <p className="text-sm text-fg-muted">{content.site.serviceArea}</p>
            <div className="flex gap-4 mt-4 text-sm">
              <a href={content.site.github} className="text-fg-muted hover:text-fg underline">GitHub</a>
              <a href={content.site.linkedin} className="text-fg-muted hover:text-fg underline">LinkedIn</a>
              <a href={`https://wa.me/${content.site.whatsapp}`} className="text-fg-muted hover:text-fg underline">WhatsApp</a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-fg uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              {f.links.company.map((l: any) => (
                <li key={l.href}><Link href={l.href} className="text-fg-muted hover:text-fg">{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-fg uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              {f.links.resources.map((l: any) => (
                <li key={l.href}><a href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="text-fg-muted hover:text-fg">{l.label}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-fg-muted">
          <p>{f.copyright}</p>
          <p>San Lorenzo, Paraguay · +595 991 501444 · ai.whisperer.wvdp@gmail.com</p>
        </div>
      </div>
    </footer>
  )
}
