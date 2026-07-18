import Link from "next/link";
import { content as c } from "@/lib/content";

export function Footer() {
  return (
    <footer
      className="text-white mt-24"
      style={{ background: "var(--color-accentDeep)" }}
    >
      <div
        className="h-1 w-full"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(90deg,#7B2CBF 0%,#3C096C 50%,#7B2CBF 100%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-1">
            <div className="font-display text-2xl font-bold mb-1">
              {c.siteName}
            </div>
            <div className="text-xs text-white/70 mb-3">{c.orgName}</div>
            <p className="text-sm text-white/80 leading-relaxed mb-4">
              {c.footer.tagline}
            </p>
            <div className="text-xs text-white/60 space-y-1">
              <div>{c.footer.address}</div>
              <div>{c.footer.hours}</div>
              <div>
                <a
                  href={`tel:${c.footer.phone.replace(/\s/g, "")}`}
                  className="hover:text-white"
                >
                  {c.footer.phone}
                </a>
                {" · "}
                <a
                  href={`https://wa.me/${c.site.whatsappBase}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  WhatsApp
                </a>
              </div>
              <div>
                <a
                  href={`mailto:${c.footer.email}`}
                  className="hover:text-white"
                >
                  {c.footer.email}
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider mb-4 text-white/90">
              Explorar
            </h3>
            <ul className="space-y-2">
              {c.footer.links.map((link) => (
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

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider mb-4 text-white/90">
              Coaliciones
            </h3>
            <ul className="space-y-2">
              {c.footer.orgs.map((org: string) => (
                <li
                  key={org}
                  className="text-sm text-white/70"
                >
                  {org}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider mb-4 text-white/90">
              {c.footer.donorsLabel}
            </h3>
            <ul className="space-y-2">
              {c.footer.donors.map((d: string) => (
                <li key={d} className="text-sm text-white/70">
                  {d}
                </li>
              ))}
            </ul>
            <p className="text-[11px] text-white/50 mt-3">
              {c.footer.note}
            </p>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-white/50">
            © {new Date().getFullYear()} La Serafina · Demo interno Ai-Whisperers
          </div>
          <Link
            href="/privacidad"
            className="text-xs text-white/70 hover:text-white underline underline-offset-2"
          >
            Privacidad
          </Link>
        </div>
      </div>
    </footer>
  );
}
