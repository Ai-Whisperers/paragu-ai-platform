import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { WhatsAppFloat } from '@/components/whatsapp-float'
import { MobileCta } from '@/components/mobile-cta'
import type { Content } from '@/types/content'
import raw from '@/content/es.json'

const content = raw as unknown as Content
const m = content.menu
const phone = content.whatsapp.phone
const waMessage = content.whatsapp.message

export default function MenuPage() {
  return (
    <>
      <Header />
      <main className='min-h-screen'>
        <section className='py-16 px-4 bg-gradient-to-br from-primary/10 via-background to-accent/5'>
          <div className='max-w-4xl mx-auto text-center'>
            <h1 className='font-serif text-4xl md:text-5xl font-bold text-foreground mb-3'>{m.title}</h1>
            <p className='text-lg text-muted-foreground'>{m.subtitle}</p>
          </div>
        </section>
        
        <section className='py-12 px-4'>
          <div className='max-w-4xl mx-auto space-y-12'>
            {m.categories.map((cat, ci) => (
              <div key={ci}>
                <h2 className='font-serif text-2xl font-bold text-primary mb-4 border-b-2 border-primary/20 pb-2'>
                  {cat.name}
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {cat.items.map((item, ii) => (
                    <div key={ii} className='flex justify-between items-start bg-card rounded-lg p-4 border border-border hover:shadow-sm transition-shadow'>
                      <div>
                        <h3 className='font-medium text-foreground'>{item.name}</h3>
                        {item.description && (
                          <p className='text-xs text-muted-foreground mt-0.5'>{item.description}</p>
                        )}
                      </div>
                      <span className='text-primary font-bold whitespace-nowrap ml-4'>{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat phone={phone} message={waMessage} />
      <MobileCta phone={phone} message={waMessage} />
    </>
  )
}
