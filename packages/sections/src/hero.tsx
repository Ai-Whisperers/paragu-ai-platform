// Hero Section — dark overlay, configurable background
import { Button } from "@ai-whisperers/ui/button"
import { cn } from "@ai-whisperers/ui/lib/utils"

export interface HeroProps {
  headline: string
  subheadline?: string
  ctaPrimary?: { text: string; href: string }
  ctaSecondary?: { text: string; href: string }
  backgroundImage?: string
  overlayColor?: string
  variant?: "image" | "minimal" | "split"
}

export function Hero({
  headline,
  subheadline,
  ctaPrimary,
  ctaSecondary,
  backgroundImage,
  overlayColor = "rgba(10,10,20,0.85)",
  variant = "image",
}: HeroProps) {
  if (variant === "minimal") {
    return (
      <section className="relative flex min-h-[40vh] items-center justify-center bg-background px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {headline}
          </h1>
          {subheadline && (
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">{subheadline}</p>
          )}
        </div>
      </section>
    )
  }

  const bgStyle = backgroundImage
    ? { backgroundImage: `linear-gradient(${overlayColor}, ${overlayColor}), url(${backgroundImage})`,
        backgroundSize: "cover", backgroundPosition: "center" }
    : {}

  return (
    <section
      className="relative flex min-h-[70vh] items-center justify-center overflow-hidden"
      style={bgStyle}
    >
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl sm:p-12">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {headline}
          </h1>
          {subheadline && (
            <p className="mx-auto mb-8 max-w-2xl text-lg text-white/80">{subheadline}</p>
          )}
          {(ctaPrimary || ctaSecondary) && (
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              {ctaPrimary && (
                <Button asChild size="lg">
                  <a href={ctaPrimary.href}>{ctaPrimary.text}</a>
                </Button>
              )}
              {ctaSecondary && (
                <Button variant="secondary" size="lg" asChild>
                  <a href={ctaSecondary.href}>{ctaSecondary.text}</a>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
