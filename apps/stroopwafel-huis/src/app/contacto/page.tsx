import { MessageCircle } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { WhatsAppFloat } from '@/components/whatsapp-float'
import { MobileCta } from '@/components/mobile-cta'
import type { Content } from '@/types/content'
import raw from '@/content/es.json'

const content = raw as unknown as Content
const page = content.contacto
const phone = content.whatsapp.phone
const waMessage = content.whatsapp.message

export default function ContactoPage() {
  const waUrl = `https://wa.me/${phone.replace(/\+/g, '')}?text=${encodeURIComponent(waMessage)}`
  return (
    <>
      <Header />
      <main className='min-h-screen'>
        <section className='py-16 px-4 bg-gradient-to-br from-primary/10 via-background to-accent/5'>
          <div className='max-w-3xl mx-auto text-center'>
            <h1 className='font-serif text-4xl md:text-5xl font-bold text-foreground mb-4'>{page.title}</h1>
            <p className='text-lg text-muted-foreground mb-8'>{page.subtitle}</p>
            <a
              href={waUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-[#22C35E] transition-all shadow-lg'
            >
              <MessageCircle size={24} fill='white' stroke='none' />
              {page.cta}
            </a>
          </div>
        </section>
        <section className='py-12 px-4'>
          <div className='max-w-3xl mx-auto bg-card rounded-2xl p-8 md:p-10 border border-border'>
            <h2 className='font-serif text-2xl font-bold text-foreground mb-6'>Información de Contacto</h2>
            <div className='space-y-4'>
              <div><p className='font-medium text-foreground'>📍 Dirección</p><p className='text-muted-foreground'>Villa Morra, Asunción, Paraguay</p></div>
              <div><p className='font-medium text-foreground'>📞 Teléfono</p><p className='text-muted-foreground'>+595 XXX XXX XXX</p></div>
              <div><p className='font-medium text-foreground'>✉️ Email</p><p className='text-muted-foreground'>hola@stroopwafelhuis.com</p></div>
              <div>
                <p className='font-medium text-foreground'>🕐 Horarios</p>
                <div className='text-muted-foreground'>
                  <p>Lunes - Sábado: 8:00 - 20:00</p>
                  <p>Domingo: 9:00 - 18:00</p>
                </div>
              </div>
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
