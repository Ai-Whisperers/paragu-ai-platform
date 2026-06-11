import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { WhatsAppFloat } from '@/components/whatsapp-float'
import { MobileCta } from '@/components/mobile-cta'
import type { Content } from '@/types/content'
import raw from '@/content/es.json'

const content = raw as unknown as Content
const page = content.ubicacion
const phone = content.whatsapp.phone
const waMessage = content.whatsapp.message

export default function UbicacionPage() {
  return (
    <>
      <Header />
      <main className='min-h-screen'>
        <section className='py-16 px-4 bg-gradient-to-br from-primary/10 via-background to-accent/5'>
          <div className='max-w-3xl mx-auto text-center'>
            <h1 className='font-serif text-4xl md:text-5xl font-bold text-foreground mb-4'>{page.title}</h1>
            <p className='text-lg text-muted-foreground'>{page.body}</p>
          </div>
        </section>
        <section className='py-12 px-4'>
          <div className='max-w-3xl mx-auto bg-card rounded-2xl p-8 md:p-10 border border-border'>
            <div className='grid md:grid-cols-2 gap-8'>
              <div className='space-y-6'>
                <div className='flex items-start gap-4'>
                  <MapPin size={20} className='text-primary shrink-0 mt-0.5' />
                  <div><p className='font-medium text-foreground'>Dirección</p><p className='text-sm text-muted-foreground'>{page.address}</p></div>
                </div>
                <div className='flex items-start gap-4'>
                  <Phone size={20} className='text-primary shrink-0 mt-0.5' />
                  <div><p className='font-medium text-foreground'>Teléfono</p><p className='text-sm text-muted-foreground'>{page.phone}</p></div>
                </div>
                <div className='flex items-start gap-4'>
                  <Mail size={20} className='text-primary shrink-0 mt-0.5' />
                  <div><p className='font-medium text-foreground'>Email</p><p className='text-sm text-muted-foreground'>{page.email}</p></div>
                </div>
                <div className='flex items-start gap-4'>
                  <Clock size={20} className='text-primary shrink-0 mt-0.5' />
                  <div>
                    <p className='font-medium text-foreground'>Horarios</p>
                    <div className='text-sm text-muted-foreground space-y-1'>
                      {page.hours.map((h, i) => <p key={i}>{h.days}: {h.time}</p>)}
                    </div>
                  </div>
                </div>
              </div>
              <div className='bg-gradient-to-br from-primary/10 to-accent/5 rounded-xl h-64 flex items-center justify-center border border-border'>
                <div className='text-center'>
                  <MapPin size={40} className='text-primary mx-auto mb-2' />
                  <p className='text-sm text-muted-foreground'>Mapa interactivo próximo</p>
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
