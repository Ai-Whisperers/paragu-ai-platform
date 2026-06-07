'use client';

export default function ClubClient() {
  const cl = {
    hero: {
      eyebrow: "Exclusivo para fanáticos",
      title: "Club Trentina",
      subtitle: "Únete a la comunidad más exclusiva de amantes de la cerveza artesanal en Paraguay."
    },
    howItWorks: {
      title: "¿Cómo funciona?",
      subtitle: "3 simples pasos para empezar a disfrutar beneficios exclusivos",
      steps: [
        { number: "1", title: "Regístrate", description: "Completa el formulario con tus datos de contacto" },
        { number: "2", title: "Activa tu cuenta", description: "Recibe confirmación por WhatsApp con tu número de miembro" },
        { number: "3", title: "Disfruta", description: "Accede a descuentos, ediciones limitadas y eventos exclusivos" }
      ]
    },
    benefits: {
      title: "Beneficios exclusivos",
      subtitle: "Como miembro del Club Trentina recibes:",
      items: [
        { icon: "🎁", title: "Descuentos", description: "15% de descuento en todas las compras" },
        { icon: "🍺", title: "Ediciones limitadas", description: "Acceso prioritario a lanzamientos especiales" },
        { icon: "🎉", title: "Eventos", description: "Invitaciones a catas y eventos privados" },
        { icon: "💬", title: "Comunidad", description: "Grupo de WhatsApp exclusivo para miembros" }
      ]
    },
    levels: {
      title: "Niveles de membresía",
      subtitle: "Elige el nivel que mejor se adapte a ti",
      tiers: [
        {
          name: "Bronce",
          price: "Gratis",
          period: "por siempre",
          popular: false,
          features: ["Descuento del 10%", "Newsletter mensual", "Acceso a eventos públicos"],
          cta: "Únete ahora"
        },
        {
          name: "Plata",
          price: "Gs 50.000",
          period: "/año",
          popular: true,
          badge: "Más popular",
          features: ["Descuento del 15%", "Acceso prioritario a nuevos lanzamientos", "1 edición limitada exclusiva", "Invitaciones a eventos privados"],
          cta: "Únete a Plata"
        },
        {
          name: "Oro",
          price: "Gs 150.000",
          period: "/año",
          popular: false,
          features: ["Descuento del 20%", "Acceso VIP a todos los eventos", "3 ediciones limitadas exclusivas", "Chopp gratis en el local", "Merchandising exclusivo"],
          cta: "Únete a Oro"
        }
      ]
    },
    ctaBottom: {
      title: "¿Listo para unirte?",
      subtitle: "Completa el formulario y recibe tu bienvenida por WhatsApp",
      buttonText: "Unirse al Club",
      buttonHref: "https://wa.me/595983224473"
    }
  };

  const handleJoin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const msg = `Hola! Quiero anotarme al Club Trentina.
Nombre: ${fd.get("name") || ""}
WhatsApp: ${fd.get("phone") || ""}
Email: ${fd.get("email") || ""}`;
    window.open(`https://wa.me/595983224473?text=${encodeURIComponent(msg)}`, "_blank");
    form.reset();
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-[var(--color-background)] relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a14] via-[#0f0f24] to-[#14141a]" />
          <div className="absolute inset-0 opacity-30">
            <div className="stars-bg" />
          </div>
        </div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="container-page text-center relative z-10">
          <span className="inline-block px-4 py-1 rounded-full bg-gold/20 text-gold text-sm font-medium uppercase tracking-wider mb-6 border border-gold/30">
            ★ {cl.hero.eyebrow}
          </span>
          <h1 className="text-4xl md:text-6xl font-[var(--font-heading)] font-bold text-white mb-4">
            {cl.hero.title}
          </h1>
          <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto text-lg leading-relaxed">
            {cl.hero.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href={cl.ctaBottom.buttonHref} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold hover:bg-gold/90 text-[var(--color-background)] font-semibold transition-all">
              <span>🍺</span> {cl.ctaBottom.buttonText}
            </a>
            <a href="/mayoristas"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--color-border)] text-[var(--color-text)] hover:border-gold/50 hover:bg-gold/10 transition-all">
              Conocer más →
            </a>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-[var(--color-surface)]">
        <div className="container-page">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-[var(--font-heading)] font-bold text-white mb-4">
              {cl.howItWorks.title}
            </h2>
            <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto">
              {cl.howItWorks.subtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {cl.howItWorks.steps.map((step: any, idx: number) => (
              <div key={idx} className="relative group">
                <div className="absolute -inset-px bg-gradient-to-r from-gold to-amber-600 rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                <div className="relative bg-[var(--color-background)] p-8 rounded-2xl border border-[var(--color-border)] h-full">
                  <div className="text-5xl font-bold text-gold mb-4">{step.number}</div>
                  <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-[var(--color-text-muted)]">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-[var(--color-background)]">
        <div className="container-page">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-[var(--font-heading)] font-bold text-white mb-4">
              {cl.benefits.title}
            </h2>
            <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto">
              {cl.benefits.subtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cl.benefits.items.map((item: any, idx: number) => (
              <div key={idx} className="bg-[var(--color-surface)] p-6 rounded-xl border border-[var(--color-border)] hover:border-gold/50 transition-all">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-[var(--color-text-muted)] text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Levels */}
      <section className="py-20 bg-[var(--color-surface)]">
        <div className="container-page">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-[var(--font-heading)] font-bold text-white mb-4">
              {cl.levels.title}
            </h2>
            <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto">
              {cl.levels.subtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {cl.levels.tiers.map((tier: any, idx: number) => (
              <div key={idx} className={`relative ${tier.popular ? 'md:-mt-4 md:scale-105' : ''}`}>
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gold text-[var(--color-background)] font-semibold rounded-full text-sm">
                    {tier.badge}
                  </div>
                )}
                <div className={`h-full bg-[var(--color-background)] rounded-2xl border-2 p-8 ${tier.popular ? 'border-gold' : 'border-[var(--color-border)]'}`}>
                  <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                  <div className="text-4xl font-bold text-gold mb-1">{tier.price}</div>
                  <div className="text-[var(--color-text-muted)] text-sm mb-6">{tier.period}</div>
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((f: string, fidx: number) => (
                      <li key={fidx} className="flex items-start gap-2 text-[var(--color-text)] text-sm">
                        <span className="text-gold mt-0.5">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <form onSubmit={handleJoin} className="space-y-3">
                    <input type="text" name="name" placeholder="Tu nombre" required
                      className="w-full px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-white placeholder:text-[var(--color-text-muted)] focus:border-gold focus:outline-none" />
                    <input type="tel" name="phone" placeholder="WhatsApp" required
                      className="w-full px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-white placeholder:text-[var(--color-text-muted)] focus:border-gold focus:outline-none" />
                    <input type="email" name="email" placeholder="Email" required
                      className="w-full px-4 py-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg text-white placeholder:text-[var(--color-text-muted)] focus:border-gold focus:outline-none" />
                    <button type="submit"
                      className={`w-full py-3 rounded-lg font-semibold transition-all ${tier.popular ? 'bg-gold hover:bg-gold/90 text-[var(--color-background)]' : 'border border-gold text-gold hover:bg-gold/10'}`}>
                      {tier.cta}
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-b from-[var(--color-surface)] to-[var(--color-background)]">
        <div className="container-page text-center">
          <h2 className="text-3xl md:text-4xl font-[var(--font-heading)] font-bold text-white mb-4">
            {cl.ctaBottom.title}
          </h2>
          <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto mb-8">
            {cl.ctaBottom.subtitle}
          </p>
          <a href={cl.ctaBottom.buttonHref} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gold hover:bg-gold/90 text-[var(--color-background)] font-semibold text-lg transition-all">
            <span>🍺</span> {cl.ctaBottom.buttonText}
          </a>
        </div>
      </section>
    </>
  );
}