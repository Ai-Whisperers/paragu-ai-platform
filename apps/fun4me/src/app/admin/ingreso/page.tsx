'use client';

import { useEffect, useState } from 'react';
import { Search, CheckCircle2, XCircle, Loader2, ScanLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { createClient } from '@/lib/supabase/client';

interface EventLite {
  id: string;
  title: string;
  date: string;
}

interface TicketLite {
  id: string;
  status: string;
  holder_name: string;
  holder_ci: string;
  checked_in_at?: string | null;
  qr_code?: string;
  event_id?: string;
  events?: { title: string; date: string; venue: string } | null;
  ticket_types?: { name: string } | null;
}

interface CheckResult {
  valid: boolean;
  error?: string | null;
  ticket?: TicketLite;
}

export default function IngresoPage() {
  const [events, setEvents] = useState<EventLite[]>([]);
  const [selectedEventId, setSelectedEventId] = useState('');
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<CheckResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState('');
  const [recent, setRecent] = useState<TicketLite[]>([]);
  const [message, setMessage] = useState('');

  async function loadEvents() {
    const supabase = createClient();
    const { data } = await supabase.from('events').select('id, title, date').eq('status', 'published').order('date');
    const list = (data as EventLite[] | null) || [];
    if (list.length) {
      setEvents(list);
      setSelectedEventId(list[0].id);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadEvents();
  }, []);

  async function handleSearch() {
    if (!query.trim()) return;
    setLoading(true); setResult(null); setMessage('');

    const supabase = createClient();
    const q = query.trim();

    // Try as QR code first
    let ticket = await supabase.from('tickets').select('*, events(title, date, venue), ticket_types(name)').eq('qr_code', q).maybeSingle();

    // If not QR, try as CI number
    if (!ticket.data) {
      const baseQuery = supabase.from('tickets').select('*, events(title, date, venue), ticket_types(name)');
      if (selectedEventId) {
        ticket = await baseQuery.eq('event_id', selectedEventId).eq('holder_ci', q).maybeSingle();
      } else {
        ticket = await baseQuery.eq('holder_ci', q).maybeSingle();
      }
    }

    if (ticket.error || !ticket.data) {
      setResult({ valid: false, error: 'Entrada no encontrada' });
    } else {
      const t = ticket.data as TicketLite;
      setResult({
        valid: t.status === 'valid',
        error: t.status === 'used' ? 'Ya ingresó' : t.status === 'cancelled' ? 'Cancelada' : t.status === 'valid' ? null : 'Estado inválido',
        ticket: t,
      });
    }
    setLoading(false);
  }

  async function confirmEntry() {
    if (!result?.ticket?.id) return;
    const currentTicket = result.ticket;
    setConfirming(currentTicket.id);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from('tickets').update({
      status: 'used',
      checked_in_at: new Date().toISOString(),
      checked_in_by: user?.id,
    } as never).eq('id', currentTicket.id);

    if (!error) {
      const now = new Date().toISOString();
      setRecent(prev => [{ ...currentTicket, checked_in_at: now }, ...prev].slice(0, 10));
      setResult({ valid: false, error: 'Ya ingresó ✓', ticket: { ...currentTicket, status: 'used' } });
      setMessage('✓ Ingreso confirmado');
      setQuery('');
    }
    setConfirming('');
  }

  async function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleSearch();
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 max-w-lg mx-auto">
      <h1 className="text-xl font-bold text-center mb-2">Control de Ingreso</h1>
      <p className="text-center text-sm text-gray-400 mb-6">Escaneá el QR o buscá por número de CI</p>

      {/* Event selector */}
      <select value={selectedEventId} onChange={e => setSelectedEventId(e.target.value)}
        className="w-full mb-4 bg-gray-900 text-white border border-gray-700 rounded-lg px-3 py-2.5 text-sm">
        {events.map(e => (
          <option key={e.id} value={e.id}>{e.title} — {new Date(e.date).toLocaleDateString('es-PY')}</option>
        ))}
      </select>

      {/* Search input */}
      <div className="relative mb-4">
        <ScanLine className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={handleKeyDown}
          placeholder="Código QR o número de CI..."
          className="pl-10 bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 h-12 text-base"
        />
        <Button onClick={handleSearch} disabled={loading} size="sm" className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-rose-600 hover:bg-rose-700 text-white">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
        </Button>
      </div>

      {/* Result */}
      {result && (
        <Card className={`mb-4 ${result.valid ? 'bg-green-900/50 border-green-500' : 'bg-red-900/50 border-red-500'}`}>
          <CardContent className="p-4 text-center">
            {result.valid ? (
              <>
                <CheckCircle2 className="mx-auto h-12 w-12 text-green-400 mb-2" />
                <p className="text-lg font-bold text-green-400 mb-2">VÁLIDO</p>
                <div className="text-sm space-y-1 text-gray-200">
                  <p><span className="text-gray-400">Evento:</span> {result.ticket.events?.title}</p>
                  <p><span className="text-gray-400">Titular:</span> {result.ticket.holder_name}</p>
                  <p><span className="text-gray-400">CI:</span> {result.ticket.holder_ci}</p>
                  <p><span className="text-gray-400">Tipo:</span> {result.ticket.ticket_types?.name}</p>
                </div>
                <Button onClick={confirmEntry} disabled={!!confirming} className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white text-lg py-6">
                  {confirming ? <Loader2 className="h-5 w-5 animate-spin" /> : '✓ Confirmar Ingreso'}
                </Button>
              </>
            ) : (
              <>
                <XCircle className="mx-auto h-12 w-12 text-red-400 mb-2" />
                <p className="text-lg font-bold text-red-400">{result.error || 'NO VÁLIDO'}</p>
                {result.ticket && (
                  <div className="text-sm mt-2 text-gray-400">
                    <p>{result.ticket.holder_name} — {result.ticket.holder_ci}</p>
                    <p>{result.ticket.events?.title}</p>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      )}

      {message && <p className="text-green-400 text-center text-sm mb-4">{message}</p>}

      {/* Recent check-ins */}
      {recent.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-gray-400 mb-2">Últimos ingresos</h2>
          <div className="space-y-1">
            {recent.map((t, i) => (
              <div key={i} className="flex items-center justify-between text-xs bg-gray-900 rounded-lg px-3 py-2">
                <span className="text-green-400 font-medium">{t.holder_name}</span>
                <span className="text-gray-500">{new Date(t.checked_in_at).toLocaleTimeString('es-PY', { timeStyle: 'short' })}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
