import Link from "next/link";
import { content as c } from "@/lib/content";
import { SearchBar } from "@/components/SearchBar";

export function Footer() {
  return (
    <footer className="bg-[var(--color-purple-deep)] text-white mt-24">
      {/* Rainbow accent bar at top */}
      <div className="rainbow-bar" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top: org info */}
        <div className="grid lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-1">
            <div className="font-display text-2xl font-bold mb-3">SOMOSGAY</div>
            <p className="text-sm text-white/80 leading-relaxed mb-4">
              {c.site.description}
            </p>
            <div className="text-xs text-white/60 space-y-1">
              <div>{c.contacto.address}</div>
              <div>
                <a href={`tel:${c.contacto.phone.replace(/\s/g, "")}`} className="hover:text-white">
                  {c.contacto.phone}
                </a>
              </div>
              <div>
                <a href={`mailto:${c.contacto.email}`} className="hover:text-white">
                  {c.contacto.email}
                </a>
              </div>
            </div>
          </div>

          {c.footer.columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-display text-sm font-bold uppercase tracking-wider mb-4 text-white/90">
                {col.title}
              </h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social */}
        <div className="border-t border-white/20 pt-8 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-3 flex-wrap">
            {c.footer.social.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-white/70 hover:text-white px-3 py-1 rounded-full border border-white/20 hover:border-white/40 transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <div className="text-xs text-white/50">{c.footer.copy}</div>
            <a
              href="#main"
              className="ml-auto text-xs text-white/70 hover:text-white underline underline-offset-2"
            >
              Volver arriba ↑
            </a>
          </div>
        </div>

        {/* Search */}
        <div className="border-t border-white/20 pt-8 mt-8 max-w-md">
          <h3 className="font-display text-sm font-bold uppercase tracking-wider mb-3 text-white/90">
            Buscar
          </h3>
          <SearchBar />
        </div>
      </div>
    </footer>
  );
}