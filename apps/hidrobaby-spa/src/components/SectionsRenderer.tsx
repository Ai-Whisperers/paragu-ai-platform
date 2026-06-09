'use client';

import type { Metadata } from 'next';
import { Header } from '@/components/Header';

const BRAND = {
  green: '#25D366',
  primary: '#2E8B82',
  accent: '#4ECDC4',
  yellow: '#FFE66D',
  text: '#1a1a2e',
  muted: '#6b7280',
};

type SectionContent = Record<string, unknown>;

export function getHomepageMetadata(source: SectionContent): Metadata {
  const hero = (source.hero || {}) as Record<string, unknown>;
  const site = (source.site || {}) as Record<string, unknown>;
  const title = String(hero.headline || site.businessName || site.name || 'HidroBaby Spa');
  const description = String(site.description || hero.subheadline || title);
  return {
    title,
    description,
    keywords: 'baby spa Paraguay, hidroterapia bebés, spa anticólicos, masajes infantiles, natación temprana',
    robots: 'index, follow',
    openGraph: {
      title,
      description,
      url: 'https://hidrobaby-spa.paragu-ai.com',
      siteName: String(site.name || 'HidroBaby Spa'),
      locale: 'es_PY',
      type: 'website',
    },
  };
}

function getContent(contentRaw: string) {
  try { return JSON.parse(contentRaw) as SectionContent; }
  catch (e) { console.error('Invalid content JSON', e); return null; }
}

export default function SectionsRenderer({ source }: { source: SectionContent }) {
  const hero = (source.hero || {}) as Record<string, unknown>;
  const site = (source.site || {}) as Record<string, unknown>;
  const nav = (source.navigation || {}) as { items?: { label: string; href: string }[] };
  const trustBadges = (source.trustBadges || {}) as { title?: string; items?: Array<Record<string, unknown>> };
  const services = (source.services || {}) as { title?: string; items?: Array<Record<string, unknown>> };
  const gallery = (source.gallery || {}) as { title?: string; items?: Array<{ src?: string; caption?: string }> };
  const faq = (source.faq || {}) as { title?: string; items?: Array<{ question?: string; answer?: string }> };
  const contact = (source.contact || {}) as { title?: string; subtitle?: string; locations?: Array<{ name?: string; address?: string; hours?: string; phone?: string; whatsapp?: string }> };
  const about = (source.about || {}) as { title?: string; body?: string };

  const wa = () => String(site.whatsapp || '595993444222').replace(/[^0-9]/g, '');
  const waHref = (text = 'Hola! Quiero reservar en HidroBaby Spa') => `https://wa.me/${wa()}?text=${encodeURIComponent(text)}`;

  return (
    <main>
      <Header navigation={nav} />

      <section className="relative overflow-hidden bg-slate-950 py-20 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <p className="mb-3 text-sm font-semibold tracking-wide text-emerald-400">{String(site.tagline || '')}</p>
          <h1 className="text-4xl font-bold text-white md:text-5xl">{String(hero.headline || site.businessName || '')}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-100 md:text-lg">{String(hero.subheadline || '')}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a href={waHref()} className="rounded-full bg-emerald-500 px-6 py-3 font-semibold text-white hover:bg-emerald-600">Reservar por WhatsApp</a>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Stat label="5.0 ⭐" value="Google Reviews" />
            <Stat label="377+" value="Reseñas" />
            <Stat label="3" value="Sucursales" />
          </div>
        </div>
      </section>

      {(trustBadges.items?.length || 0) > 0 && (
        <section className="border-b border-slate-100 bg-white py-10">
          <div className="mx-auto max-w-6xl px-4">
            {trustBadges.title && <h2 className="mb-6 text-center text-lg font-semibold text-slate-900">{String(trustBadges.title)}</h2>}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
              {(trustBadges.items || []).map((badge, i) => (
                <div key={i} className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
                  <p className="font-semibold text-slate-900">{String((badge as Record<string, unknown>).label || `Diferencial ${i + 1}`)}</p>
                  <p className="mt-1 text-sm text-slate-600">{String((badge as Record<string, unknown>).description || '')}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {about && about.title && about.body && (
        <section id="nosotros" className="bg-slate-50 py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold text-slate-900">{String(about.title)}</h2>
                <p className="mt-4 leading-relaxed text-slate-700">{String(about.body)}</p>
              </div>
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <img src="/images/gallery/473731325_626447129784681_6899640668464868779_n.jpg" alt="HidroBaby Spa" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </section>
      )}

      {services.items && services.items.length > 0 && services.title && (
        <section id="servicios" className="bg-white py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-slate-900">{String(services.title)}</h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {(services.items as Array<Record<string, unknown>>).map((item, i) => (
                <div key={i} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-slate-900">{String(item.title || '')}</h3>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">{String(item.price || 'Consultar')}</span>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">{String(item.description || '')}</p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-700">
                    <span className="rounded-full bg-slate-100 px-2 py-1">{String(item.ageRange || '')}</span>
                    <span className="rounded-full bg-slate-100 px-2 py-1">{String(item.duration || '')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {faq.items && faq.items.length > 0 && faq.title && (
        <section id="faq" className="bg-white py-16">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="mb-8 text-center text-3xl font-bold text-slate-900">{String(faq.title)}</h2>
            <div className="space-y-4">
              {(faq.items as Array<Record<string, unknown>>).map((item, i) => (
                <details key={i} className="rounded-xl border border-slate-200 bg-slate-50">
                  <summary className="cursor-pointer px-5 py-4 text-left font-semibold text-slate-900">{String(item.question || item.q || item.title || 'Pregunta')}</summary>
                  <div className="border-t border-slate-200 px-5 py-4 text-sm text-slate-700">
                    {String(item.answer || item.a || item.description || '')}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {contact && contact.locations && (
        <section id="contacto" className="bg-slate-950 py-16 text-white">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold">{String(contact.title || 'Contacto')}</h2>
              <p className="mt-2 text-slate-300">{String(contact.subtitle || '')}</p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {(contact.locations as Array<Record<string, unknown>>).map((loc, i) => {
                const phone = String(loc.phone || site.phone || '').replace(/[^0-9]/g, '');
                return (
                  <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-6">
                    <p className="font-semibold">{String(loc.name || 'Sucursal')}</p>
                    <p className="mt-2 text-sm text-slate-300">{String(loc.address || '')}</p>
                    <p className="text-sm text-slate-300">{String(loc.hours || '')}</p>
                    <a href={`https://wa.me/${phone}`} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600">
                      Reservar por WhatsApp
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="bg-slate-100 py-14 text-center">
        <h2 className="text-2xl font-bold text-slate-900">¿Querés regalar una experiencia única?</h2>
        <p className="mt-2 text-slate-700">Escribinos y te confirmamos disponibilidad.</p>
        <a href={waHref()} className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 font-semibold text-white hover:bg-emerald-600">Reservar por WhatsApp</a>
      </section>

      <footer className="bg-slate-950 py-10 text-center text-sm text-slate-400">
        © 2026 HidroBaby Spa · Fernando de la Mora, Paraguay
      </footer>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-5 text-center">
      <div className="text-2xl font-bold text-yellow-300">{label}</div>
      <div className="mt-1 text-slate-200">{value}</div>
    </div>
  );
}
