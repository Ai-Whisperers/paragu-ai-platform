'use client';

import { useCallback, useEffect, useState } from 'react';
import { useSearchParams, useParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, QrCode, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { createClient } from '@/lib/supabase/client';

interface OrderRow {
  id: string;
  order_number: string;
  payment_method?: string | null;
}

interface TicketEventRef {
  title: string;
  date: string;
  venue?: string | null;
  city?: string | null;
}

interface TicketTypeRef {
  name: string;
}

interface TicketRow {
  id: string;
  holder_name?: string | null;
  holder_ci?: string | null;
  ticket_types?: TicketTypeRef | null;
  events?: TicketEventRef | null;
}

export default function ConfirmacionPage() {
  const searchParams = useSearchParams();
  useParams();
  const orderId = searchParams.get('order_id');

  const [order, setOrder] = useState<OrderRow | null>(null);
  const [tickets, setTickets] = useState<TicketRow[]>([]);
  const [loading, setLoading] = useState(true);

  const loadOrder = useCallback(async () => {
    if (!orderId) { setLoading(false); return; }
    const supabase = createClient();
    // @ts-expect-error orders.order_number not in generated Database types yet
    const { data: ord } = await supabase.from('orders').select('*').eq('id', orderId).single();
    if (!ord) { setLoading(false); return; }
    setOrder(ord as OrderRow);

    // @ts-expect-error tickets join with events/ticket_types not fully typed in generated Database types yet
    const { data: tix } = await supabase
      .from('tickets')
      .select('*, ticket_types(name), events(title, date, venue, city)')
      .eq('order_id', orderId);

    setTickets((tix as TicketRow[] | null) || []);
    setLoading(false);
  }, [orderId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial fetch on mount; memoized via useCallback
    loadOrder();
  }, [loadOrder]);

  if (loading) return <div className="container mx-auto px-4 py-12 text-center"><Loader2 className="mx-auto h-8 w-8 animate-spin text-muted-foreground" /></div>;
  if (!order) return (
    <div className="container mx-auto px-4 py-12 text-center">
      <AlertCircle className="mx-auto h-12 w-12 text-red-400 mb-3" />
      <p className="text-xl font-medium">Entrada no encontrada</p>
      <p className="text-muted-foreground mt-1">Verificá el código de tu pedido.</p>
      <Link href="/eventos"><Button className="mt-4">Ver Eventos</Button></Link>
    </div>
  );

  const event = tickets[0]?.events;
  const dateStr = event?.date ? new Date(event.date).toLocaleDateString('es-PY', { dateStyle: 'long', timeStyle: 'short' }) : '';

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Success header */}
      <div className="text-center mb-8">
        <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-3" />
        <h1 className="text-2xl font-bold">¡Compra exitosa!</h1>
        <p className="text-muted-foreground">Pedido #{order.order_number}</p>
      </div>

      {/* Event info */}
      {event && (
        <Card className="mb-6">
          <CardContent className="p-4">
            <p className="font-semibold text-lg">{event.title}</p>
            <p className="text-sm text-muted-foreground">{dateStr}</p>
            <p className="text-sm text-muted-foreground">{event.venue}, {event.city}</p>
          </CardContent>
        </Card>
      )}

      {/* Ticket list */}
      <h2 className="font-bold text-lg mb-3">Tus entradas</h2>
      <div className="space-y-3 mb-6">
        {tickets.map(ticket => (
          <Card key={ticket.id} className="overflow-hidden border-2 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="font-semibold">{ticket.holder_name}</p>
                  <p className="text-sm text-muted-foreground">{ticket.ticket_types?.name}</p>
                  {ticket.holder_ci && <p className="text-xs text-muted-foreground">CI: {ticket.holder_ci}</p>}
                  <Badge className="bg-green-100 text-green-800 mt-1">Válida</Badge>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-white border-2 border-gray-200 rounded-lg p-2 w-24 h-24 flex items-center justify-center">
                    <QrCode className="h-16 w-16 text-gray-800" />
                  </div>
                  <span className="text-[8px] text-muted-foreground mt-1">Escaneá al ingresar</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Instructions */}
      <Card className="mb-6 bg-gradient-to-r from-rose-50 to-purple-50 border-rose-200">
        <CardContent className="p-4 text-sm space-y-1">
          <p className="font-semibold">📌 Importante</p>
          <p>Mostrá el código QR al ingresar al evento. También podés buscarte por tu número de CI.</p>
          {tickets.length > 1 && <p>Cada asistente debe tener su propia entrada.</p>}
          {order.payment_method === 'cod' && <p className="font-medium">Pagás en efectivo en la entrada del evento.</p>}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-3">
        <Link href="/eventos" className="flex-1">
          <Button variant="outline" className="w-full">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Eventos
          </Button>
        </Link>
      </div>
    </div>
  );
}
