import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import raw from '@/content/es.json'
import type { Content } from '@/types/content'
const content = raw as unknown as Content
const page = content.terminos

export default function TerminosPage() {
  return (
    <>
      <Header />
      <main className='min-h-screen py-16 px-4'>
        <div className='max-w-3xl mx-auto'>
          <h1 className='font-serif text-4xl font-bold text-foreground mb-8'>{page.title}</h1>
          <p className='text-foreground/90 leading-relaxed whitespace-pre-line'>{page.body}</p>
        </div>
      </main>
      <Footer />
    </>
  )
}
