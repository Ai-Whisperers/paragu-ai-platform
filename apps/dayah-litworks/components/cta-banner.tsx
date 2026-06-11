export function CtaBanner({
  title,
  subtitle,
  buttonText,
  buttonHref,
  phone,
}: {
  title: string
  subtitle?: string
  buttonText?: string
  buttonHref?: string
  phone: string
}) {
  return (
    <section className="relative overflow-hidden py-12 sm:py-16" style={{ background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)" }}>
      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
        <h2 className="mb-3 text-2xl font-bold text-white sm:mb-4 sm:text-3xl">{title}</h2>
        {subtitle && <p className="mx-auto mb-6 max-w-xl text-sm text-white/80 sm:text-lg sm:mb-8">{subtitle}</p>}
        {buttonText && (
          <a
            href={buttonHref || `https://wa.me/${phone}`}
            className="inline-block w-full rounded-lg bg-secondary px-6 py-3 font-semibold text-secondary-foreground transition-all hover:scale-[1.03] active:scale-[0.98] sm:w-auto sm:px-8 sm:py-4"
          >
            {buttonText}
          </a>
        )}
      </div>
    </section>
  )
}
