import Link from 'next/link'
import { Wand2 } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Heading } from '@/components/ui/heading'

const FOOTER_GROUPS = [
  {
    title: 'Producto',
    links: [
      { href: '/p', label: 'Plantillas' },
      { href: '/precios', label: 'Precios' },
      { href: '/comparacion', label: 'Comparación' },
      { href: '/demo', label: 'Pedir demo' },
      { href: '/sobre-nosotros', label: 'Sobre nosotros' },
      { href: '/contacto', label: 'Contacto' },
    ],
  },
  {
    title: 'Casos reales',
    links: [
      { href: '/casos', label: 'Todos los casos' },
      { href: '/casos/nexa-paraguay', label: 'Nexa Paraguay' },
      { href: '/casos/magnolia-peluqueria', label: 'Magnolia Peluquería' },
      { href: '/casos/de-abasto-a-casa', label: 'De Abasto a Casa' },
    ],
  },
  {
    title: 'Recursos',
    links: [
      { href: '/blog', label: 'Blog' },
      { href: '/c', label: 'Por ciudad' },
      { href: '/changelog', label: 'Changelog' },
      { href: '/seguridad', label: 'Privacidad y datos' },
      { href: '/#faq', label: 'FAQ' },
      { href: '/admin', label: 'Acceso clientes' },
    ],
  },
] as const

export function SiteFooter() {
  return (
    <footer className="border-t border-brand-300/30 bg-deep/85 py-12">
      <Container>
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="mb-4 inline-flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-[var(--primary-foreground)]">
                <Wand2 size={20} />
              </div>
              <span className="text-xl font-bold">
                <span className="text-white">Paragu</span>
                <span className="text-accent">AI</span>
              </span>
            </Link>
            <p className="max-w-sm text-sm text-white/70">
              Sitios web profesionales para negocios paraguayos. Todo incluido, en 48 horas.
            </p>
          </div>
          {FOOTER_GROUPS.map((group) => (
            <div key={group.title}>
              <Heading level={3} className="mb-4 font-bold text-white">{group.title}</Heading>
              <ul className="space-y-2 text-white/70">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm hover:text-accent">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-brand-300/30 pt-8 text-center text-sm text-white/70">
          © {new Date().getFullYear()} ParaguAI Builder. Todos los derechos reservados.
        </div>
      </Container>
    </footer>
  )
}
