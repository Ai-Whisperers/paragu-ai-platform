import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className='min-h-[60vh] flex items-center justify-center px-4'>
        <div className='text-center'>
          <span className='text-6xl block mb-4'>🧇</span>
          <h1 className='font-serif text-4xl font-bold text-foreground mb-3'>Página no encontrada</h1>
          <p className='text-muted-foreground mb-6'>Parece que esta página no existe o se enfrió como un stroopwafel sin café.</p>
          <Link href='/' className='bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-all'>
            Volver al inicio
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
