import { Calendar, MapPin, Clock, Ticket, ArrowRight } from "lucide-react";
import MainLayout from "../../components/MainLayout";

const shows = [
  { id: 1, date: "2026", time: "Agenda abierta", city: "Paraguay", venue: "Teatros, clubes y festivales", address: "Fechas a confirmar por producción", tickets: "/contacto", status: "soon" },
  { id: 2, date: "2026", time: "Referente reciente", city: "Posadas", venue: "Sala Tempo", address: "Show Esposadas — registrado en entrevista con Radio Up", tickets: "/contacto", status: "past" },
  { id: 3, date: "2023", time: "Histórico", city: "Asunción", venue: "Absoluto Rock", address: "Stand up con humor negro y crítica social — publicado por ABC Color", tickets: "/contacto", status: "past" },
];

const statusConfig: Record<string, { label: string; class: string }> = {
  soon: { label: "Consultar booking", class: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
  past: { label: "Referencia", class: "bg-white/5 text-white/50 border-white/10" },
};

export default function ShowsPage() {
  return (
    <MainLayout>
      <section className="relative py-24 bg-gradient-to-b from-black to-gray-950">
        <img src="/images/gato/stage-microphone.webp" alt="El Gato Siamés en vivo" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              SHOWS <span style={{ color: "#E63946" }}>EN VIVO</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Stand up de humor negro, one-liners y doble sentido para teatros, bares, festivales, ciclos de comedia y eventos privados.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {shows.map((show) => {
              const status = statusConfig[show.status];
              return (
                <div key={show.id} className="group p-6 sm:p-8 bg-black/50 border border-white/10 rounded-2xl hover:border-red-600/30 transition-all">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    <div className="hidden sm:flex flex-col items-center justify-center min-w-[80px] p-4 bg-white/5 rounded-xl border border-white/10">
                      <Calendar className="w-6 h-6 mb-2" style={{ color: "#E63946" }} />
                      <div className="text-sm font-bold text-white leading-tight text-center">{show.date}</div>
                    </div>
                    <div className="sm:hidden flex items-center gap-2">
                      <Calendar className="w-5 h-5" style={{ color: "#E63946" }} />
                      <span className="font-bold text-white">{show.date}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white">{show.city}</h3>
                        <span className={`px-2 py-0.5 text-xs font-medium border rounded-full ${status.class}`}>
                          {status.label}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-white/50 mb-2">
                        <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{show.venue}</span>
                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{show.time}</span>
                      </div>
                      <p className="text-sm text-white/40">{show.address}</p>
                    </div>
                    <div className="lg:min-w-[180px]">
                      <a href={show.tickets} className="group/btn flex items-center justify-center gap-2 w-full lg:w-auto px-6 py-3 text-white font-semibold rounded-lg transition-all" style={{ backgroundColor: "#E63946" }}>
                        <Ticket className="w-4 h-4" />
                        Consultar
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-black text-center px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center text-left">
          <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-white/5">
            <img src="/images/gato/live-performance.webp" alt="Show de El Gato Siamés" className="w-full h-full object-cover" />
          </div>
          <div>
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">¿Querés que El Gato Siamés se presente en tu ciudad?</h2>
        <p className="text-white/60 mb-8 max-w-2xl mx-auto md:mx-0">Eventos corporativos, teatros, ciclos de stand up, bares y festivales — escribinos para coordinar disponibilidad.</p>
        <a href="/contacto" className="inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-lg transition-all" style={{ backgroundColor: "#E63946" }}>
          Contactar para booking →
        </a>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
