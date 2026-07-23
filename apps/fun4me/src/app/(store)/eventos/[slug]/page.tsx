'use client';

import { useCallback, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Calendar, MapPin, Minus, Plus, Loader2, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { createClient } from '@/lib/supabase/client';
import { formatPrice } from '@/lib/utils/format';
import type { User } from '@supabase/supabase-js';

interface TicketTypeRow {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  quantity: number;
  sold: number;
  max_per_order?: number | null;
}

interface EventRow {
  id: string;
  slug: string;
  title: string;
  date: string;
  venue?: string | null;
  venue_address?: string | null;
  city?: string | null;
  image_url?: string | null;
  organizer_name?: string | null;
  description?: string | null;
  rules?: string | null;
  entry_requires_ci?: boolean | null;
  ticket_types?: TicketTypeRow[] | null;
}

interface CustomerProfile {
  id: string;
  full_name?: string | null;
}

interface CiDocument {
  ci_number: string;
  verified?: boolean | null;
}

interface OrderCreatedRow {
  id: string;
  order_number: string;
}

interface OrderInsertPayload {
  status: string;
  subtotal: number;
  shipping_cost: number;
  discount_amount: number;
  total: number;
  payment_method: string;
  shipping_address: { city: string; address: string };
  notes: string;
  customer_id?: string;
}

interface TicketInsertPayload {
  order_id: string;
  event_id: string;
  ticket_type_id: string;
  customer_id: string;
  holder_name: string;
  holder_ci: string;
  qr_code: string;
  status: string;
}

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [event, setEvent] = useState<EventRow | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [ciDoc, setCiDoc] = useState<CiDocument | null>(null);
  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [attendees, setAttendees] = useState<Record<string, { name: string; ci: string }[]>>({});
  const [step, setStep] = useState<'select' | 'attendees' | 'payment' | 'processing'>('select');
  const [paymentMethod, setPaymentMethod] = useState<'transfer' | 'cod' | null>(null);
  const [error, setError] = useState('');
  const [purchasing, setPurchasing] = useState(false);

  const loadData = useCallback(async () => {
    const supabase = createClient();

    const { data: evt, error: err } = await supabase
      .from('events')
      .select('*, ticket_types(*)')
      .eq('slug', slug)
      .single();

    if (err || !evt) { setLoading(false); return; }
    const evtTyped = evt as EventRow;
    setEvent(evtTyped);

    const initialQtys: Record<string, number> = {};
    (evtTyped.ticket_types || []).forEach((t) => { initialQtys[t.id] = 0; });
    setQuantities(initialQtys);

    // Check auth
    const { data: { user: u } } = await supabase.auth.getUser();
    if (u) {
      setUser(u);
      // @ts-expect-error customers table not in generated Database types yet
      const { data: p } = await supabase.from('customers').select('*').eq('id', u.id).single();
      if (p) setProfile(p as CustomerProfile);
      // @ts-expect-error ci_documents not in generated Database types yet
      const { data: ci } = await supabase.from('ci_documents').select('*').eq('customer_id', u.id).eq('verified', true).maybeSingle();
      if (ci) setCiDoc(ci as CiDocument);
    }

    setLoading(false);
  }, [slug]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial fetch on slug change; memoized via useCallback
    loadData();
  }, [loadData]);

  const totalTickets = Object.values(quantities).reduce((a, b) => a + b, 0);
  const totalPrice = (event?.ticket_types || []).reduce((sum, t) => sum + (quantities[t.id] || 0) * t.price, 0);

  function updateQty(ticketTypeId: string, delta: number) {
    const tt = event?.ticket_types?.find((t) => t.id === ticketTypeId);
    if (!tt) return;
    const max = tt.max_per_order || 5;
    setQuantities(prev => ({
      ...prev,
      [ticketTypeId]: Math.max(0, Math.min(max, (prev[ticketTypeId] || 0) + delta)),
    }));
  }

  function goToAttendees() {
    if (totalTickets === 0) { setError('Seleccioná al menos una entrada'); return; }
    setError('');

    // Init attendee fields
    const newAttendees: Record<string, { name: string; ci: string }[]> = {};
    for (const ttId of Object.keys(quantities)) {
      const qty = quantities[ttId];
      if (qty > 0) {
        newAttendees[ttId] = Array.from({ length: qty }, (_, i) => ({
          name: attendees[ttId]?.[i]?.name || profile?.full_name || '',
          ci: attendees[ttId]?.[i]?.ci || ciDoc?.ci_number || '',
        }));
      }
    }
    setAttendees(newAttendees);
    setStep('attendees');
  }

  function updateAttendee(ttId: string, idx: number, field: 'name' | 'ci', value: string) {
    setAttendees(prev => {
      const updated = { ...prev };
      const list = [...(updated[ttId] || [])];
      list[idx] = { ...list[idx], [field]: value };
      updated[ttId] = list;
      return updated;
    });
  }

  async function goToPayment() {
    // Validate all attendee fields filled
    for (const ttId of Object.keys(attendees)) {
      for (const [idx, a] of attendees[ttId].entries()) {
        if (!a.name.trim()) { setError(`Completá el nombre del asistente #${idx + 1}`); return; }
        if (!a.ci.trim()) { setError(`Completá la CI del asistente #${idx + 1}`); return; }
      }
    }

    // Check blacklist for each CI
    setError('');
    setPurchasing(true);
    const supabase = createClient();

    for (const ttId of Object.keys(attendees)) {
      for (const a of attendees[ttId]) {
        const { data: blResult } = await supabase.rpc('is_ci_blacklisted', { p_ci_number: a.ci.trim() });
        if ((blResult as { blacklisted?: boolean } | null)?.blacklisted) {
          setError(`La CI ${a.ci} está bloqueada. No puede comprar entradas.`);
          setPurchasing(false);
          return;
        }
      }
    }

    setStep('payment');
    setPurchasing(false);
  }

  async function confirmPurchase() {
    if (!paymentMethod) { setError('Seleccioná un método de pago'); return; }
    if (!event) return;
    setPurchasing(true); setError('');
    const supabase = createClient();

    try {
      // Create order
      const orderPayload: OrderInsertPayload = {
        status: 'pending',
        subtotal: totalPrice,
        shipping_cost: 0,
        discount_amount: 0,
        total: totalPrice,
        payment_method: paymentMethod,
        shipping_address: { city: 'Asunción', address: 'Evento' },
        notes: `Entradas para: ${event.title}`,
      };

      if (user) orderPayload.customer_id = user.id;
      else { setError('Necesitás iniciar sesión para comprar entradas'); setPurchasing(false); return; }

      // @ts-expect-error orders.customer_id / order_number not in generated Database types yet
      const { data: order, error: orderErr } = await supabase.from('orders').insert(orderPayload).select('id, order_number').single();
      if (orderErr || !order) { setError('Error al crear el pedido'); setPurchasing(false); return; }
      const orderTyped = order as OrderCreatedRow;

      // Create tickets
      const ticketInserts: TicketInsertPayload[] = [];
      // eslint-disable-next-line react-hooks/purity -- Date.now() used for QR uniqueness in an async event-handler call (not render)
      const nowMs = Date.now();
      for (const ttId of Object.keys(attendees)) {
        for (const a of attendees[ttId]) {
          const qrCode = `${orderTyped.id}-${event.id}-${ttId}-${a.ci.replace(/[^0-9]/g, '')}-${nowMs}`;
          ticketInserts.push({
            order_id: orderTyped.id,
            event_id: event.id,
            ticket_type_id: ttId,
            customer_id: user.id,
            holder_name: a.name.trim(),
            holder_ci: a.ci.trim(),
            qr_code: qrCode,
            status: 'valid',
          });
        }
      }

      // @ts-expect-error tickets.customer_id not in generated Database types yet
      const { error: ticketsErr } = await supabase.from('tickets').insert(ticketInserts);
      if (ticketsErr) { setError('Error al generar las entradas'); setPurchasing(false); return; }

      // Update ticket_types.sold
      for (const ttId of Object.keys(attendees)) {
        const qty = attendees[ttId].length;
        const tt = event.ticket_types?.find((t) => t.id === ttId);
        if (tt) {
          await supabase.from('ticket_types').update({ sold: (tt.sold || 0) + qty }).eq('id', ttId);
        }
      }

      router.push(`/eventos/${slug}/confirmacion?order_id=${orderTyped.id}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(`Error inesperado: ${message}`);
    }
    setPurchasing(false);
  }

  if (loading) return <div className="container mx-auto px-4 py-12 text-center"><Loader2 className="mx-auto h-8 w-8 animate-spin text-muted-foreground" /></div>;
  if (!event) return <div className="container mx-auto px-4 py-12 text-center"><p className="text-xl">Evento no encontrado</p><Link href="/eventos"><Button className="mt-4">Ver Eventos</Button></Link></div>;

  const dateStr = new Date(event.date).toLocaleDateString('es-PY', { dateStyle: 'long', timeStyle: 'short' });
  const needsCi = event.entry_requires_ci !== false;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Event header */}
      <div className="h-48 sm:h-64 rounded-xl bg-gradient-to-br from-rose-500/20 to-purple-600/20 mb-6 flex items-center justify-center overflow-hidden">
        {event.image_url ? <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" /> : null}
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
        <div className="space-y-2 text-muted-foreground mb-4">
          <div className="flex items-center gap-2"><Calendar className="h-4 w-4" />{dateStr}</div>
          <div className="flex items-center gap-2"><MapPin className="h-4 w-4" />{event.venue}{event.venue_address ? ` — ${event.venue_address}` : ''}, {event.city}</div>
          {event.organizer_name && <div className="flex items-center gap-2"><Info className="h-4 w-4" />Organiza: {event.organizer_name}</div>}
        </div>

        {event.description && <p className="text-sm leading-relaxed whitespace-pre-line">{event.description}</p>}
        {event.rules && (
          <div className="mt-4 p-4 bg-muted rounded-lg text-sm">
            <p className="font-semibold mb-1">Reglas del evento:</p>
            <p className="whitespace-pre-line text-muted-foreground">{event.rules}</p>
          </div>
        )}
      </div>

      <Separator className="mb-8" />

      {/* CI Check */}
      {needsCi && !ciDoc && (
        <Card className="mb-6 border-yellow-300 bg-yellow-50">
          <CardContent className="p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="font-semibold text-yellow-800">Cédula requerida</p>
              <p className="text-sm text-yellow-700">Necesitás tener tu cédula verificada para comprar entradas.</p>
              {user ? (
                <Link href="/cuenta/ci"><Button variant="outline" size="sm" className="mt-2">Cargar Cédula</Button></Link>
              ) : (
                <Link href="/login?redirect=/eventos/{slug}"><Button variant="outline" size="sm" className="mt-2">Iniciar Sesión</Button></Link>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {ciDoc && (
        <div className="mb-6 flex items-center gap-2 text-sm text-green-700 bg-green-50 rounded-lg p-3">
          <CheckCircle2 className="h-5 w-5" />
          Cédula verificada: {ciDoc.ci_number}
        </div>
      )}

      {/* Step: Select tickets */}
      {step === 'select' && (
        <>
          <h2 className="text-xl font-bold mb-4">Seleccioná tus entradas</h2>

          {error && <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 mb-4">{error}</div>}

          <div className="space-y-3 mb-6">
            {(event.ticket_types || []).map((tt) => {
              const available = tt.quantity - tt.sold;
              const qty = quantities[tt.id] || 0;
              return (
                <Card key={tt.id} className={qty > 0 ? 'border-rose-300' : ''}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-semibold">{tt.name}</p>
                        {tt.description && <p className="text-xs text-muted-foreground">{tt.description}</p>}
                      </div>
                      <p className="font-bold text-lg">{formatPrice(tt.price)}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{available} disponibles</span>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQty(tt.id, -1)} disabled={qty === 0}><Minus className="h-3 w-3" /></Button>
                        <span className="w-8 text-center font-semibold">{qty}</span>
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQty(tt.id, 1)} disabled={qty >= (tt.max_per_order || 5) || available <= 0}><Plus className="h-3 w-3" /></Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {totalTickets > 0 && (
            <Card className="mb-6">
              <CardContent className="p-4 flex items-center justify-between">
                <span className="font-semibold">{totalTickets} entrada(s)</span>
                <span className="text-xl font-bold text-rose-600">{formatPrice(totalPrice)}</span>
              </CardContent>
            </Card>
          )}

          <Button onClick={goToAttendees} disabled={totalTickets === 0 || (needsCi && !ciDoc)}
            className="w-full bg-gradient-to-r from-rose-500 to-purple-600 text-white hover:from-rose-600 hover:to-purple-700 py-6 text-lg">
            Continuar
          </Button>
        </>
      )}

      {/* Step: Attendee info */}
      {step === 'attendees' && (
        <>
          <h2 className="text-xl font-bold mb-4">Datos de los asistentes</h2>
          {error && <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 mb-4">{error}</div>}

          {Object.entries(attendees).map(([ttId, list]) => {
            const tt = event.ticket_types?.find((t) => t.id === ttId);
            return list.map((a, idx) => (
              <Card key={`${ttId}-${idx}`} className="mb-4">
                <CardContent className="p-4 space-y-3">
                  <p className="text-sm font-semibold text-muted-foreground">{tt?.name} — Asistente #{idx + 1}</p>
                  <div className="space-y-2">
                    <Label>Nombre completo</Label>
                    <Input value={a.name} onChange={e => updateAttendee(ttId, idx, 'name', e.target.value)} placeholder="Nombre del asistente" />
                  </div>
                  <div className="space-y-2">
                    <Label>Número de CI</Label>
                    <Input value={a.ci} onChange={e => updateAttendee(ttId, idx, 'ci', e.target.value)} placeholder="5.123.456" />
                  </div>
                </CardContent>
              </Card>
            ));
          })}

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setStep('select')}>Volver</Button>
            <Button onClick={goToPayment} disabled={purchasing} className="flex-1 bg-gradient-to-r from-rose-500 to-purple-600 text-white">
              {purchasing ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Continuar al pago'}
            </Button>
          </div>
        </>
      )}

      {/* Step: Payment */}
      {step === 'payment' && (
        <>
          <h2 className="text-xl font-bold mb-4">Método de pago</h2>
          {error && <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 mb-4">{error}</div>}

          <div className="space-y-3 mb-6">
            <Card className={`cursor-pointer ${paymentMethod === 'transfer' ? 'border-rose-500 ring-2 ring-rose-500/20' : ''}`} onClick={() => setPaymentMethod('transfer')}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'transfer' ? 'border-rose-500' : 'border-gray-300'}`}>
                  {paymentMethod === 'transfer' && <div className="w-3 h-3 rounded-full bg-rose-500" />}
                </div>
                <div>
                  <p className="font-semibold">Transferencia Bancaria</p>
                  <p className="text-sm text-muted-foreground">Transferí a nuestra cuenta y subí el comprobante</p>
                </div>
              </CardContent>
            </Card>

            <Card className={`cursor-pointer ${paymentMethod === 'cod' ? 'border-rose-500 ring-2 ring-rose-500/20' : ''}`} onClick={() => setPaymentMethod('cod')}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'cod' ? 'border-rose-500' : 'border-gray-300'}`}>
                  {paymentMethod === 'cod' && <div className="w-3 h-3 rounded-full bg-rose-500" />}
                </div>
                <div>
                  <p className="font-semibold">Efectivo en la entrada</p>
                  <p className="text-sm text-muted-foreground">Pagás en efectivo al llegar al evento</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>{totalTickets} entrada(s)</span><span>{formatPrice(totalPrice)}</span></div>
                <Separator />
                <div className="flex justify-between font-bold text-lg"><span>Total</span><span className="text-rose-600">{formatPrice(totalPrice)}</span></div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setStep('attendees')}>Volver</Button>
            <Button onClick={confirmPurchase} disabled={!paymentMethod || purchasing} className="flex-1 bg-gradient-to-r from-rose-500 to-purple-600 text-white">
              {purchasing ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Confirmar Compra'}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
