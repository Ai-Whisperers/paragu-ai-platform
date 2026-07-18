'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { createClient } from '@/lib/supabase/client';
import { formatPrice } from '@/lib/utils/format';

interface TicketTypeRow {
  id: string;
  price: number;
  quantity: number;
  sold: number;
}

interface EventRow {
  id: string;
  slug: string;
  title: string;
  date: string;
  venue?: string | null;
  city?: string | null;
  image_url?: string | null;
  status?: string | null;
  ticket_types?: TicketTypeRow[] | null;
}

export default function EventosPage() {
  const [events, setEvents] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadEvents = useCallback(async () => {
    const supabase = createClient();
    const { data, error: err } = await supabase
      .from('events')
      .select('*, ticket_types(*)')
      .eq('status', 'published')
      .gte('date', new Date().toISOString())
      .order('date');

    if (err) { setError('Error al cargar eventos'); setLoading(false); return; }
    setEvents((data as EventRow[] | null) || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial fetch on mount; memoized via useCallback
    loadEvents();
  }, [loadEvents]);

  if (loading) return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Eventos</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1,2,3].map(i => <div key={i} className="h-72 rounded-xl bg-muted animate-pulse" />)}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Eventos</h1>
      <p className="text-muted-foreground mb-8">Próximos eventos y fiestas</p>

      {error && <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 mb-6">{error}</div>}

      {events.length === 0 ? (
        <Card><CardContent className="text-center py-16">
          <Ticket className="mx-auto h-16 w-16 text-muted-foreground/30 mb-4" />
          <p className="text-xl font-medium mb-2">No hay eventos próximos</p>
          <p className="text-muted-foreground">Seguinos en Instagram para enterarte de las próximas fechas.</p>
        </CardContent></Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map(event => {
            const prices = (event.ticket_types || []).map((t) => t.price).filter(Boolean);
            const minPrice = Math.min(...prices);
            const maxPrice = Math.max(...prices);
            const availableTickets = (event.ticket_types || []).reduce((sum, t) => sum + (t.quantity - t.sold), 0);
            const dateStr = new Date(event.date).toLocaleDateString('es-PY', { dateStyle: 'long', timeStyle: 'short' });

            return (
              <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-40 bg-gradient-to-br from-rose-500/20 to-purple-600/20 flex items-center justify-center">
                  {event.image_url ? (
                    <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
                  ) : (
                    <Ticket className="h-12 w-12 text-rose-500/40" />
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-2">{event.title}</h3>
                  <div className="space-y-1 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-2"><Calendar className="h-4 w-4" />{dateStr}</div>
                    <div className="flex items-center gap-2"><MapPin className="h-4 w-4" />{event.venue}, {event.city}</div>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold">{formatPrice(minPrice)}{prices.length > 1 && minPrice !== maxPrice ? ` - ${formatPrice(maxPrice)}` : ''}</span>
                    <Badge variant="outline" className="text-xs">{availableTickets} disponibles</Badge>
                  </div>
                  <Link href={`/eventos/${event.slug}`}>
                    <Button className="w-full bg-gradient-to-r from-rose-500 to-purple-600 text-white hover:from-rose-600 hover:to-purple-700">
                      Comprar Entradas
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
