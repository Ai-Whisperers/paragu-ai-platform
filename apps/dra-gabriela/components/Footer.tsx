import Link from "next/link"

export function Footer({ locale, content }: { locale: string; content: any }) {
  const c = content
  const base = `/${locale}`
  return (
    <footer className="bg-gray-900 text-gray-300 mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-bold text-white mb-3">{c.site?.name}</h3>
            <p className="text-gray-400 leading-relaxed mb-4">{c.site?.metaDescription}</p>
            <p className="text-sm text-gray-500">{c.business?.address}</p>
            {c.business?.whatsapp && (
              <a href={`https://wa.me/${String(c.business.whatsapp).replace(/\D/g, "")}`} className="text-[var(--accent)] block mt-2">WhatsApp: {c.business.whatsapp}</a>
            )}
            {c.business?.email && <a href={`mailto:${c.business.email}`} className="text-[var(--accent)] block">{c.business.email}</a>}
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              {(c.navigation?.main || []).map((it: any) => (
                <li key={it.href}><Link href={`${base}${it.href}`} className="text-gray-400 hover:text-white">{it.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Trust</h4>
            <p className="text-sm text-gray-400 mb-2">~20 years clinical experience</p>
            <p className="text-sm text-gray-400 mb-2">Asunción, Paraguay</p>
            <p className="text-sm text-gray-400">English-speaking</p>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} {c.site?.name}. All rights reserved.</p>
          <p>San Lorenzo · Paraguay</p>
        </div>
      </div>
    </footer>
  )
}
