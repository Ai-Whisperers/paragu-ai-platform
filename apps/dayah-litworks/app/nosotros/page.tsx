import { PageLayout } from "@/components/page-layout"
import { CtaBanner } from "@/components/cta-banner"
import { ProcessSection } from "@/components/process-section"
import type { Content } from "@/types/content"
import raw from "@/content/es.json"

const content = raw as unknown as Content
const about = content.about
const story = about.story.paragraphs
const values = about.values
const processSteps = content.home.process.steps
const cta = content.home.finalCta
const phone = content.whatsapp.phone

export default function NosotrosPage() {
  return (
    <PageLayout phone={phone}>
      <section className="flex min-h-[25vh] items-center justify-center bg-surface px-4 py-14 sm:min-h-[30vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground sm:text-4xl">Nosotros</h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-lg sm:mt-3">Conocé mi historia</p>
        </div>
      </section>
      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4">
          <div className="grid gap-8 sm:gap-10 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-xl font-bold text-foreground sm:text-2xl">Mi Historia</h2>
              {story.map((p, i) => (
                <p key={i} className="mb-3 text-sm text-muted-foreground leading-relaxed sm:text-base sm:mb-4">{p}</p>
              ))}
            </div>
            <div className="flex items-center justify-center">
              <img src="/dayah/hero.jpg" alt="Dayah LitWorks" className="h-48 w-48 rounded-2xl object-cover shadow-lg sm:h-80 sm:w-80" />
            </div>
          </div>
        </div>
      </section>

      {values.length > 0 && (
        <section className="bg-surface py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="mb-8 text-center text-xl font-bold text-foreground sm:mb-10 sm:text-3xl">Mis Valores</h2>
            <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((v, i) => (
                <div key={i} className="rounded-xl border border-border bg-white p-5 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md sm:p-6">
                  <h3 className="mb-2 text-base font-bold text-primary sm:text-lg">{v.title}</h3>
                  <p className="text-xs text-muted-foreground sm:text-sm">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <ProcessSection title="¿Cómo Trabajo?" subtitle="De la idea a tu portada lista para publicar" steps={processSteps} accentColor="accent" />

      <CtaBanner title={cta.title} subtitle={cta.subtitle} buttonText={cta.buttonText} buttonHref={cta.buttonHref} phone={phone} />
    </PageLayout>
  )
}
