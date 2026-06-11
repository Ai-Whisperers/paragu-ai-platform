'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { WhatsAppFloat } from '@/components/whatsapp-float'
import { MobileCta } from '@/components/mobile-cta'
import type { Content } from '@/types/content'
import raw from '@/content/es.json'

const content = raw as unknown as Content
const page = content.faq
const phone = content.whatsapp.phone
const waMessage = content.whatsapp.message

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className='border border-border rounded-lg overflow-hidden'>
      <button
        className='w-full flex items-center justify-between p-4 text-left bg-card hover:bg-surface transition-colors'
        onClick={() => setOpen(!open)}
      >
        <span className='font-medium text-foreground pr-4'>{q}</span>
        {open ? <ChevronUp size={18} className='text-primary shrink-0' /> : <ChevronDown size={18} className='text-primary shrink-0' />}
      </button>
      {open && <div className='px-4 pb-4 text-sm text-muted-foreground leading-relaxed'>{a}</div>}
    </div>
  )
}

export default function FaqPage() {
  return (
    <>
      <Header />
      <main className='min-h-screen'>
        <section className='py-16 px-4 bg-gradient-to-br from-primary/10 via-background to-accent/5'>
          <div className='max-w-3xl mx-auto text-center'>
            <h1 className='font-serif text-4xl md:text-5xl font-bold text-foreground mb-4'>{page.title}</h1>
          </div>
        </section>
        <section className='py-12 px-4'>
          <div className='max-w-3xl mx-auto space-y-3'>
            {page.items.map((item, i) => (
              <FaqItem key={i} q={item.question} a={item.answer} />
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
