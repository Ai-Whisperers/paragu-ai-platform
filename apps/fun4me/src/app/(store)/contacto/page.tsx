import { getWhatsAppLink } from '@/lib/content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Contactanos por WhatsApp o email. Respondemos rápido.',
};

export default function ContactoPage() {
  const waLink = getWhatsAppLink('¡Hola! Quiero información sobre productos');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">Contacto</h1>
      <p className="mb-8 text-muted-foreground">Estamos acá para ayudarte</p>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border bg-surface p-6">
          <h2 className="mb-2 text-lg font-semibold">WhatsApp</h2>
          <p className="mb-4 text-sm text-muted-foreground">Respondemos en minutos</p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[#25d366] px-6 py-3 font-semibold text-white hover:bg-[#25d366]/90"
          >
            Escribinos por WhatsApp
          </a>
        </div>

        <div className="rounded-2xl border bg-surface p-6">
          <h2 className="mb-2 text-lg font-semibold">Instagram</h2>
          <p className="mb-4 text-sm text-muted-foreground">Seguinos para novedades</p>
          <a
            href="https://instagram.com/fun4me_py"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-semibold text-white hover:opacity-90"
          >
            @fun4me_py
          </a>
        </div>
      </div>
    </div>
  );
}
