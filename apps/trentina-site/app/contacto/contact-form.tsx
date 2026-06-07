"use client";

export default function ContactForm({
  whatsapp,
}: {
  whatsapp: string;
}) {
  return (
    <section className="section-padding bg-[var(--color-background)]">
      <div className="container-page max-w-xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-[var(--font-heading)] font-bold text-center text-[var(--color-text)] mb-8">
          Enviános un mensaje
        </h2>
        <form
          action={`https://wa.me/${whatsapp}`}
          method="GET"
          target="_blank"
          className="space-y-5"
          onSubmit={(e) => {
            const form = e.currentTarget;
            const name = (form.elements.namedItem("name") as HTMLInputElement)?.value || "";
            const message = (form.elements.namedItem("message") as HTMLTextAreaElement)?.value || "";
            const email = (form.elements.namedItem("email") as HTMLInputElement)?.value || "";
            const parts: string[] = [];
            if (name) parts.push(`*Nombre:* ${encodeURIComponent(name)}`);
            if (email) parts.push(`*Email:* ${encodeURIComponent(email)}`);
            if (message) parts.push(`*Mensaje:* ${encodeURIComponent(message)}`);
            const fullMsg = parts.join("%0A");
            form.action = `https://wa.me/${whatsapp}?text=${fullMsg || encodeURIComponent("Hola!%20Quiero%20consultar")}`;
          }}
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[var(--color-text)] mb-1.5"
            >
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Tu nombre"
              className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/30 transition-all text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[var(--color-text)] mb-1.5"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="tu@email.com"
              className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/30 transition-all text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-[var(--color-text)] mb-1.5"
            >
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Contanos cómo podemos ayudarte..."
              className="w-full px-4 py-3 rounded-lg bg-[var(--color-surface-alt)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/30 transition-all text-sm resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Enviar por WhatsApp
          </button>
        </form>
      </div>
    </section>
  );
}
