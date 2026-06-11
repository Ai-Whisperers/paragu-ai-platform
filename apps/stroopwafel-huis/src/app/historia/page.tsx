import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { WhatsAppFloat } from '@/components/whatsapp-float'
import { MobileCta } from '@/components/mobile-cta'
import type { Content } from '@/types/content'
import raw from '@/content/es.json'

const content = raw as unknown as Content
const page = content.historia
const phone = content.whatsapp.phone
const waMessage = content.whatsapp.message

export default function HistoriaPage() {
  return (
    <>
      <Header />
      <main className='min-h-screen'>
        <section className='py-16 px-4 bg-gradient-to-br from-accent/10 via-background to-primary/5'>
          <div className='max-w-3xl mx-auto text-center'>
            <span className='text-6xl block mb-4'>🇳🇱</span>
            <h1 className='font-serif text-4xl md:text-5xl font-bold text-foreground mb-6'>{page.title}</h1>
          </div>
        </section>
        <section className='py-12 px-4'>
          <div className='max-w-3xl mx-auto bg-card rounded-2xl p-8 md:p-12 border border-border'>
            <p className='text-foreground/90 leading-relaxed whitespace-pre-line text-lg'>
              {page.body}
            </p>
            <div className='mt-8 text-center'>
              <a
                href={`https://wa.me/${phone.replace(/\+/g, '')}?text=${encodeURIComponent(waMessage)}`}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-all'
              >
                {page.cta || 'Contactanos'}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat phone={phone} message={waMessage} />
      <MobileCta phone={phone} message={waMessage} />
    </>
  )
}
