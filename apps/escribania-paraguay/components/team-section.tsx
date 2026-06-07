import { User } from 'lucide-react'
import ScrollReveal from '@/components/animations/scroll-reveal'

interface TeamMember {
  name: string
  role: string
  description: string
  education: string
  image: string
}

interface TeamSectionProps {
  title: string
  items: TeamMember[]
}

export default function TeamSection({ title, items }: TeamSectionProps) {
  return (
    <section className="bg-surface-alt section-padding">
      <div className="container-page">
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {items.map((member, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="bg-surface border border-border rounded-xl p-6 md:p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-5">
                  <User size={40} className="text-accent" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-accent font-accent font-medium text-sm mb-4">
                  {member.role}
                </p>
                <p className="text-muted text-sm leading-relaxed mb-4">
                  {member.description}
                </p>
                <div className="text-muted text-xs border-t border-border pt-4">
                  <span className="font-medium text-foreground/70">
                    {member.education}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
