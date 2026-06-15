import Link from "next/link"

const LANGS = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
]

export function Navbar({ locale, content }: { locale: string; content: any }) {
  const c = content
  const nav = c.navigation?.main || []
  const base = `/${locale}`
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={base} className="flex items-center gap-2 font-bold text-lg">
            <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] flex items-center justify-center text-white text-sm font-bold">Dra</span>
            <span className="hidden sm:inline">{c.site?.name?.split(" ").slice(0, 2).join(" ")}</span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {nav.slice(0, 5).map((it: any) => (
              <Link key={it.href} href={`${base}${it.href}`} className="px-3 py-2 text-sm text-gray-700 hover:text-[var(--accent)] rounded-md">
                {it.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1 text-xs">
              {LANGS.map(l => (
                <Link
                  key={l.code}
                  href={`/${l.code}`}
                  className={`px-2 py-1 rounded font-mono uppercase ${l.code === locale ? "bg-[var(--accent)] text-white" : "text-gray-500 hover:text-gray-700"}`}
                >{l.label}</Link>
              ))}
            </div>
            <a href={c.business?.whatsapp ? `https://wa.me/${String(c.business.whatsapp).replace(/\D/g, "")}?text=${encodeURIComponent(c.business.whatsappMessage || "")}` : `${base}/contacto`} className="hidden sm:inline-flex items-center gap-1 px-3 py-2 bg-[var(--accent)] text-white text-sm font-medium rounded-md hover:bg-[var(--accent-2)]">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
