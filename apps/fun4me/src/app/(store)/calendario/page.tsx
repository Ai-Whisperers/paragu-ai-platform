'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Ticket, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { createClient } from '@/lib/supabase/client';
import { formatPrice } from '@/lib/utils/format';

interface TicketType {
  id: string;
  name: string;
  price: number;
}

interface EventFull {
  id: string;
  slug: string;
  title: string;
  date: string;
  venue?: string | null;
  venue_name?: string | null;
  category_id?: string | null;
  category_name?: string | null;
  category_color?: string | null;
  ticket_types?: TicketType[] | null;
}

interface EventCategory {
  id: string;
  name: string;
  sort_order?: number | null;
}

const MONTHS = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const DAYS = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];

export default function CalendarPage() {
  const [view, setView] = useState<'month' | 'list'>('month');
  const [events, setEvents] = useState<EventFull[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [categoryFilter, setCategoryFilter] = useState('');
  const [categories, setCategories] = useState<EventCategory[]>([]);

  const loadData = useCallback(async () => {
    const supabase = createClient();
    // @ts-expect-error event_categories not in generated Database types yet
    const { data: cats } = await supabase.from('event_categories').select('*').order('sort_order');
    setCategories((cats as EventCategory[] | null) || []);

    // @ts-expect-error events_full view not in generated Database types yet
    let query = supabase.from('events_full').select('*');
    if (categoryFilter) query = query.eq('category_id', categoryFilter);
    const { data } = await query;
    setEvents((data as EventFull[] | null) || []);
    setLoading(false);
  }, [categoryFilter]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- data refresh on filter/month change; memoized via useCallback
    loadData();
  }, [loadData, currentMonth, currentYear]);

  function getDaysInMonth(month: number, year: number) {
    return new Date(year, month + 1, 0).getDate();
  }

  function getFirstDayOfMonth(month: number, year: number) {
    return new Date(year, month, 1).getDay();
  }

  function getEventsForDay(day: number) {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(e => {
      const eDate = new Date(e.date).toISOString().split('T')[0];
      return eDate === dateStr;
    });
  }

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-rose-500" /></div>;

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Calendario</h1>
          <p className="text-muted-foreground">Eventos, talleres y fiestas</p>
        </div>
        <div className="flex gap-2">
          <div className="flex rounded-lg border overflow-hidden">
            <button onClick={() => setView('month')} className={`px-4 py-2 text-sm ${view === 'month' ? 'bg-rose-500 text-white' : ''}`}>Mes</button>
            <button onClick={() => setView('list')} className={`px-4 py-2 text-sm ${view === 'list' ? 'bg-rose-500 text-white' : ''}`}>Lista</button>
          </div>
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="rounded-lg border px-3 py-2 text-sm bg-background"
          >
            <option value="">Todas las categorías</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {view === 'month' ? (
        <>
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" onClick={() => { if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); } else setCurrentMonth(currentMonth - 1); }}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-xl font-semibold">{MONTHS[currentMonth]} {currentYear}</h2>
            <Button variant="ghost" onClick={() => { if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); } else setCurrentMonth(currentMonth + 1); }}>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          <Card>
            <CardContent className="p-0">
              <div className="grid grid-cols-7 border-b">
                {DAYS.map(d => (
                  <div key={d} className="p-3 text-center text-sm font-medium text-muted-foreground border-r last:border-r-0">{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7">
                {Array.from({ length: firstDay }).map((_, i) => (
                  <div key={`empty-${i}`} className="min-h-[100px] border-r border-b p-1 bg-muted/20" />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dayEvents = getEventsForDay(day);
                  const isToday = new Date().getDate() === day && new Date().getMonth() === currentMonth && new Date().getFullYear() === currentYear;
                  return (
                    <div key={day} className={`min-h-[100px] border-r border-b p-1 ${isToday ? 'bg-rose-50' : ''}`}>
                      <div className={`text-sm font-medium mb-1 ${isToday ? 'text-rose-600' : ''}`}>{day}</div>
                      {dayEvents.slice(0, 3).map(e => (
                        <Link key={e.id} href={`/eventos/${e.slug}`}
                          className="block text-xs p-1 mb-1 rounded truncate text-white"
                          style={{ backgroundColor: e.category_color || '#9333EA' }}
                        >
                          {e.title}
                        </Link>
                      ))}
                      {dayEvents.length > 3 && <div className="text-xs text-muted-foreground">+{dayEvents.length - 3} más</div>}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <div className="space-y-4">
          {events.length === 0 ? (
            <Card><CardContent className="text-center py-16">
              <Calendar className="mx-auto h-12 w-12 text-muted-foreground/30 mb-3" />
              <p className="text-lg font-medium">No hay eventos próximos</p>
              <p className="text-sm text-muted-foreground">Seguinos en Instagram para enterarte de las próximas fechas.</p>
            </CardContent></Card>
          ) : (
            events.map(e => (
              <Link key={e.id} href={`/eventos/${e.slug}`}>
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="flex items-start gap-4 p-5">
                    <div className="text-center min-w-[60px]">
                      <div className="text-2xl font-bold" style={{ color: e.category_color }}>{new Date(e.date).getDate()}</div>
                      <div className="text-xs text-muted-foreground">{MONTHS[new Date(e.date).getMonth()].slice(0, 3)}</div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold">{e.title}</h3>
                        {e.category_name && <Badge style={{ backgroundColor: e.category_color }} className="text-white text-xs">{e.category_name}</Badge>}
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground flex-wrap">
                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{e.venue_name || e.venue}</span>
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(e.date).toLocaleTimeString('es-PY', { hour: '2-digit', minute: '2-digit' })}</span>
                        {e.ticket_types?.[0] && <span className="flex items-center gap-1"><Ticket className="h-3 w-3" />Desde {formatPrice(Math.min(...e.ticket_types.map((t) => t.price)))}</span>}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
