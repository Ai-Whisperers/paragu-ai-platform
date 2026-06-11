import { MapPin, Phone, Mail, Clock } from 'lucide-react'

interface LocationProps {
  title: string
  address: string
  phone: string
  email: string
  hours: { days: string; time: string }[]
  cta: string
}

export function LocationSection({ title, address, phone, email, hours, cta }: LocationProps) {
  return (
    <section className="py-20 px-4 bg-surface">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
          {title}
        </h2>
        
        <div className="bg-card rounded-2xl p-8 md:p-10 shadow-sm border border-border">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin size={20} className="text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Dirección</p>
                  <p className="text-sm text-muted-foreground">{address}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone size={20} className="text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Teléfono</p>
                  <p className="text-sm text-muted-foreground">{phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail size={20} className="text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Email</p>
                  <p className="text-sm text-muted-foreground">{email}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock size={20} className="text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Horarios</p>
                  <div className="text-sm text-muted-foreground space-y-1">
                    {hours.map((h, i) => (
                      <p key={i}>{h.days}: {h.time}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-primary/10 to-accent/5 rounded-xl h-64 flex items-center justify-center border border-border">
              <div className="text-center">
                <MapPin size={40} className="text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Mapa próximo</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
