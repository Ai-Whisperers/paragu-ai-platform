import type { Metadata } from "next";
import content from "@/content/es.json";
import type { SiteContent, ContentItem } from "@/lib/content-types";
import { DividerOrnament, Skull, CrossInverted } from "@/components/ornaments";
import { whatsappUrl } from "@/lib/site-config";

const c = content as SiteContent;
const eventos = c.eventos || {};
const phone = c.contacto?.whatsapp || "595981324569";

export const metadata: Metadata = {
  title: eventos.title || "Eventos próximos",
  description: "Lanzamientos, noches de piercing, ferias y colaboraciones. Enterate de lo que se viene en Pierce Charm.",
  alternates: {
    canonical: "https://piercecharm.paragu-ai.com/eventos",
  },
};

export default function EventosPage() {
  const items: ContentItem[] = eventos.items || [];

  return (
    <div className="pt-24 md:pt-32 pb-16 min-h-screen relative">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <p className="eyebrow mb-2">{eventos.eyebrow || '𓆩 Próximos eventos 𓆪'}</p>
          <h1 className="mb-3 text-balance">{eventos.title || 'Lo que se viene'}</h1>
          <p className="text-[var(--color-muted-foreground)] max-w-2xl mx-auto">
            {eventos.subtitle || 'Lanzamientos, noches de piercing, ferias y colaboraciones. Anotate para no perderte nada.'}
          </p>
        </div>

        <DividerOrnament className="my-8" />

        {items.length === 0 ? (
          <div className="rock-card p-8 md:p-12 text-center max-w-2xl mx-auto">
            <Skull size={42} className="mx-auto mb-4 text-[var(--color-primary-light)]" />
            <h2 className="text-[1.3rem] mb-2">Calendario de eventos próximamente</h2>
            <p className="text-[var(--color-foreground)]/80 italic">
              Estamos terminando de organizar las próximas fechas. Si querés que te avisemos por WhatsApp:
            </p>
            <a
              href={whatsappUrl(phone, "Hola! Quisiera sumarme a la lista de notificaciones de eventos de Pierce Charm.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gothic-outline tap inline-flex mt-5"
            >
              <CrossInverted size={14} className="text-[var(--color-primary-light)]" />
              Sumarme a la lista
            </a>
          </div>
        ) : (
          <ul className="space-y-5">
            {items.map((it: ContentItem, i: number) => (
              <li key={i} className="rock-card p-5 md:p-6 grid md:grid-cols-[140px_1fr] gap-4">
                <div className="text-center md:text-left">
                  <p className="font-[var(--font-display)] text-[0.78rem] uppercase tracking-[0.2em] text-[var(--color-gold)]">{it.date}</p>
                  <p className="text-[var(--color-foreground)]/70 text-[0.85rem] mt-1">{it.location}</p>
                </div>
                <div>
                  <h3 className="text-[1.2rem] mb-2">{it.title}</h3>
                  <p className="text-[var(--color-foreground)]/85 text-[0.95rem] leading-relaxed">{it.description}</p>
                  {it.cta && (
                    <a
                      href={whatsappUrl(phone, it.cta)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-gothic-outline tap inline-flex mt-4"
                    >
                      <CrossInverted size={12} className="text-[var(--color-primary-light)]" />
                      Anotarme
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}

        <DividerOrnament className="my-12" />

        <div className="text-center max-w-2xl mx-auto">
          <p className="text-[var(--color-foreground)]/80 mb-4">
            {eventos.next_steps_hint || '¿Tenés un evento para sumar? Escribinos por WhatsApp.'}
          </p>
          <a
            href={whatsappUrl(phone, "Hola! Tengo un evento que podría sumar a la agenda de Pierce Charm.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gothic tap inline-flex"
          >
            <CrossInverted size={14} className="text-[var(--color-gold)]" />
            Proponer colaboración
          </a>
        </div>
      </div>
    </div>
  );
}
