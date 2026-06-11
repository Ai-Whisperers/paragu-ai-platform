import Link from 'next/link'
import { Quote } from 'lucide-react'

interface StoryProps {
  title: string
  body: string
  author: string
}

export function StorySection({ title, body, author }: StoryProps) {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-card rounded-2xl p-8 md:p-12 shadow-sm border border-border relative">
          <Quote size={32} className="text-primary/20 absolute top-6 left-6" />
          <div className="relative z-10 pl-8">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6 leading-tight">
              {title}
            </h2>
            <p className="text-foreground/90 leading-relaxed mb-6 whitespace-pre-line">
              {body}
            </p>
            <p className="font-serif italic text-primary font-medium">— {author}</p>
          </div>
        </div>
        <div className="text-center mt-8">
          <Link href="/historia" className="text-primary font-medium hover:underline">
            Conoce más de nuestra historia →
          </Link>
        </div>
      </div>
    </section>
  )
}
