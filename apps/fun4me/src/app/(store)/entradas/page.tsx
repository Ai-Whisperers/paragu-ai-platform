'use client';

import { useCallback, useEffect, useState } from 'react';
import { Ticket, Calendar, MapPin, User, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { createClient } from '@/lib/supabase/client';

interface TicketEvent {
  title: string;
  slug: string;
  date: string;
  venue?: string | null;
}

interface UserTicket {
  id: string;
  qr_code?: string | null;
  holder_name?: string | null;
  holder_ci?: string | null;
  status: 'valid' | 'used' | 'cancelled' | string;
  events?: TicketEvent | null;
}

// Simple QR generation using a canvas-based approach
function generateQR(text: string, size = 200): string {
  // Simple QR-like visual — for production use a library like qrcode
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  
  // Draw QR-like pattern
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = 'black';
  
  const moduleSize = size / 25;
  const pattern = generateQRPattern(text);
  
  for (let row = 0; row < 25; row++) {
    for (let col = 0; col < 25; col++) {
      if (pattern[row * 25 + col]) {
        ctx.fillRect(col * moduleSize, row * moduleSize, moduleSize, moduleSize);
      }
    }
  }
  
  return canvas.toDataURL('image/png');
}

function generateQRPattern(text: string): boolean[] {
  const pattern: boolean[] = [];
  const hash = text.split('').reduce((acc, char) => acc * 31 + char.charCodeAt(0), 0);
  
  // Fixed finder patterns (corners)
  for (let row = 0; row < 25; row++) {
    for (let col = 0; col < 25; col++) {
      const inTopLeft = row < 7 && col < 7;
      const inTopRight = row < 7 && col > 17;
      const inBottomLeft = row > 17 && col < 7;
      
      if (inTopLeft || inTopRight || inBottomLeft) {
        const isOuter = (row === 0 || row === 6 || col === 0 || col === 6) && !(row === 0 && col === 6);
        const isInner = row >= 2 && row <= 4 && col >= 2 && col <= 4;
        pattern.push(isOuter || isInner);
      } else {
        // Data area — pseudo-random based on hash
        const idx = row * 25 + col;
        pattern.push(((hash >> (idx % 31)) & 1) === 1);
      }
    }
  }
  return pattern;
}

export default function MisEntradasPage() {
  const [tickets, setTickets] = useState<UserTicket[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTickets = useCallback(async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setLoading(false); return; }

    // @ts-expect-error tickets.customer_id / events join not fully typed in generated Database types yet
    const { data } = await supabase
      .from('tickets')
      .select('*, events!inner(title, slug, date, venue)')
      .eq('customer_id', user.id)
      .order('created_at', { ascending: false });
    setTickets((data as UserTicket[] | null) || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial fetch on mount; memoized via useCallback
    loadTickets();
  }, [loadTickets]);

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-rose-500" /></div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <Ticket className="h-7 w-7" /> Mis Entradas
      </h1>

      {tickets.length === 0 ? (
        <Card><CardContent className="text-center py-16 text-muted-foreground">
          <Ticket className="mx-auto h-12 w-12 mb-3 opacity-30" />
          <p className="text-lg font-medium mb-1">No tenés entradas</p>
          <p className="text-sm">Comprá entradas en la sección Eventos.</p>
        </CardContent></Card>
      ) : (
        <div className="space-y-6">
          {tickets.map(t => {
            const qrDataUrl = generateQR(t.qr_code || t.id);
            return (
              <Card key={t.id} className="overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  <div className="p-6 flex items-center justify-center bg-gradient-to-br from-rose-400 to-purple-600">
                    <img src={qrDataUrl} alt="QR Code" className="w-32 h-32 bg-white p-1 rounded" />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{t.events?.title}</h3>
                        <p className="text-sm text-muted-foreground">{t.holder_name}</p>
                      </div>
                      <Badge className={t.status === 'valid' ? 'bg-green-100 text-green-800' : t.status === 'used' ? 'bg-gray-100 text-gray-800' : 'bg-red-100 text-red-800'}>
                        {t.status === 'valid' ? 'Válida' : t.status === 'used' ? 'Usada' : t.status === 'cancelled' ? 'Cancelada' : t.status}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(t.events?.date).toLocaleDateString('es-PY', { weekday: 'long', day: 'numeric', month: 'long' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {t.events?.venue}
                      </span>
                      {t.holder_ci && (
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          CI: {t.holder_ci}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
