import { User } from 'lucide-react'
import content from '@/content/es.json'

interface TeamMember {
  name: string
  role: string
  bio: string
}

const defaultMembers: TeamMember[] = [
  {
    name: 'Iván Weiss van der Pol',
    role: 'Fundador & Chef de Mercado',
    bio: 'Del caos del mercado y la cocina a sistemas que funcionan.',
  },
]

export default function Team() {
  const members: TeamMember[] = content.home.team?.members ?? defaultMembers

  return (
    <section id="team" className="section-padding bg-[var(--color-surface-alt)]">
      <div className="container-max">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">
            {content.home.team.title}
          </h2>
        </div>

        {/* Team member cards */}
        <div className="flex flex-wrap justify-center gap-8">
          {members.map((member, idx) => (
            <div
              key={idx}
              className="bg-[var(--color-surface)] border border-[var(--color-crema-dark)] rounded-2xl p-6 md:p-8 max-w-sm w-full text-center transition-shadow duration-300 hover:shadow-lg"
            >
              {/* Photo placeholder */}
              <div className="w-24 h-24 mx-auto mb-5 rounded-full bg-[var(--color-mercado)]/10 flex items-center justify-center">
                <User className="w-10 h-10 text-[var(--color-mercado)]" />
              </div>

              {/* Name */}
              <h3 className="font-[var(--font-heading)] text-xl md:text-2xl font-semibold text-[var(--color-text)] mb-1">
                {member.name}
              </h3>

              {/* Role */}
              <p className="font-[var(--font-body)] text-sm font-semibold text-[var(--color-mercado)] mb-4">
                {member.role}
              </p>

              {/* Bio */}
              <p className="font-[var(--font-body)] text-sm md:text-base text-[var(--color-text-muted)] leading-relaxed">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
