'use client';

import { useState } from 'react';
import { QrCode, Search, CheckCircle2, XCircle, Loader2, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { createClient } from '@/lib/supabase/client';

interface TicketResult {
  id: string;
  holder_name?: string | null;
  holder_ci?: string | null;
  events?: { title?: string | null } | null;
  ticket_types?: { name?: string | null } | null;
}

interface CheckinResult {
  valid: boolean;
  ticket?: TicketResult;
  event_title?: string | null;
  holder_name?: string | null;
  error?: string;
}

export default function CheckinPage() {
  const [mode, setMode] = useState<'qr' | 'manual'>('manual');
  const [qrInput, setQrInput] = useState('');
  const [ciInput, setCiInput] = useState('');
  const [result, setResult] = useState<CheckinResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [, setError] = useState('');
  const [checkedIn, setCheckedIn] = useState(false);

  async function validateQR() {
    if (!qrInput.trim()) return;
    setLoading(true);
    setError('');
    setCheckedIn(false);
    const supabase = createClient();
    const { data } = await supabase.rpc('validate_ticket_qr', { p_qr_code: qrInput.trim() } as never);
    setResult(data as CheckinResult | null);
    setLoading(false);
  }

  async function validateCI() {
    if (!ciInput.trim()) return;
    setLoading(true);
    setError('');
    setCheckedIn(false);
    const supabase = createClient();
    const { data } = await supabase
      .from('tickets')
      .select('*, events(*), ticket_types(name)')
      .eq('holder_ci', ciInput.trim())
      .eq('status', 'valid');

    const tickets = data as TicketResult[] | null;
    if (tickets && tickets.length > 0) {
      const ticket = tickets[0];
      setResult({ valid: true, ticket, event_title: ticket.events?.title, holder_name: ticket.holder_name });
    } else {
      setResult({ valid: false, error: 'No se encontró entrada válida para esa CI' });
    }
    setLoading(false);
  }

  async function markUsed() {
    if (!result?.ticket?.id) return;
    setLoading(true);
    const supabase = createClient();
    await supabase
      .from('tickets')
      .update({ status: 'used', checked_in_at: new Date().toISOString() } as never)
      .eq('id', result.ticket.id);
    setCheckedIn(true);
    setLoading(false);
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <QrCode className="h-5 w-5 text-rose-500" /> Check-In
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex rounded-lg border overflow-hidden">
            <button onClick={() => setMode('qr')} className={`flex-1 py-2 text-sm font-medium ${mode === 'qr' ? 'bg-rose-500 text-white' : ''}`}>
              <QrCode className="h-4 w-4 inline mr-1" /> QR
            </button>
            <button onClick={() => setMode('manual')} className={`flex-1 py-2 text-sm font-medium ${mode === 'manual' ? 'bg-rose-500 text-white' : ''}`}>
              <User className="h-4 w-4 inline mr-1" /> CI Manual
            </button>
          </div>

          {mode === 'qr' ? (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Escaneá el código QR o ingresalo manualmente</p>
              <Input
                value={qrInput}
                onChange={e => setQrInput(e.target.value)}
                placeholder="Código QR..."
                onKeyDown={e => e.key === 'Enter' && validateQR()}
              />
              <Button className="w-full bg-gradient-to-r from-rose-500 to-purple-600 text-white" onClick={validateQR} disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4 mr-2" />}
                Validar QR
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Ingresá el número de CI del asistente</p>
              <Input
                value={ciInput}
                onChange={e => setCiInput(e.target.value)}
                placeholder="CI (ej: 5.123.456)"
                onKeyDown={e => e.key === 'Enter' && validateCI()}
              />
              <Button className="w-full bg-gradient-to-r from-rose-500 to-purple-600 text-white" onClick={validateCI} disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4 mr-2" />}
                Buscar por CI
              </Button>
            </div>
          )}

          <Separator />

          {result && (
            <div className="text-center space-y-4">
              {result.valid ? (
                <>
                  <div className="flex justify-center">
                    {checkedIn ? (
                      <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle2 className="h-10 w-10 text-green-600" />
                      </div>
                    ) : (
                      <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center">
                        <CheckCircle2 className="h-10 w-10 text-blue-600" />
                      </div>
                    )}
                  </div>
                  <p className="text-lg font-semibold">{result.event_title}</p>
                  <p className="text-muted-foreground">{result.holder_name}</p>
                  {!checkedIn ? (
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white" onClick={markUsed} disabled={loading}>
                      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4 mr-2" />}
                      Marcar como Ingresado
                    </Button>
                  ) : (
                    <Badge className="bg-green-100 text-green-800 text-base py-2 px-6">
                      <CheckCircle2 className="h-4 w-4 mr-2" /> Ingreso registrado
                    </Badge>
                  )}
                </>
              ) : (
                <>
                  <div className="flex justify-center">
                    <div className="h-20 w-20 rounded-full bg-red-100 flex items-center justify-center">
                      <XCircle className="h-10 w-10 text-red-600" />
                    </div>
                  </div>
                  <p className="text-lg text-red-600 font-medium">{result.error}</p>
                  <Button variant="outline" onClick={() => { setResult(null); setQrInput(''); setCiInput(''); }}>
                    Intentar de nuevo
                  </Button>
                </>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
