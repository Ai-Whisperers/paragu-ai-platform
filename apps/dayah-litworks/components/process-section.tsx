import type { ProcessStep } from "@/types/content"

export function ProcessSection({
  title,
  subtitle,
  steps,
  accentColor = "primary",
}: {
  title: string
  subtitle?: string
  steps: ProcessStep[]
  accentColor?: "primary" | "accent"
}) {
  const bgClass = accentColor === "accent" ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"
  return (
    <section className="bg-surface py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4">
        {title && <h2 className="mb-2 text-center text-2xl font-bold text-foreground sm:text-3xl">{title}</h2>}
        {subtitle && <p className="mb-8 text-center text-sm text-muted-foreground sm:text-base sm:mb-12">{subtitle}</p>}
        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={i} className="relative text-center">
              <div className={`mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full text-lg font-bold sm:h-16 sm:w-16 sm:text-2xl ${bgClass}`}>
                {step.step}
              </div>
              <h3 className="mb-1 text-base font-bold text-foreground sm:text-lg">{step.title}</h3>
              <p className="text-xs text-muted-foreground sm:text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
