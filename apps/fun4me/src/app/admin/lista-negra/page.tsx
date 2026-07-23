'use client';

import { useEffect, useState } from 'react';
import { Loader2, Plus, Trash2, Search, Ban } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { createClient } from '@/lib/supabase/client';

interface BlacklistEntry {
  id: string;
  ci_number: string;
  full_name?: string | null;
  reason: string;
  blocked_by?: string | null;
  blocked_at: string;
  expires_at?: string | null;
  notes?: string | null;
}

export default function BlacklistPage() {
  const [entries, setEntries] = useState<BlacklistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [ciNumber, setCiNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [reason, setReason] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  async function loadBlacklist() {
    const supabase = createClient();
    const { data } = await supabase.from('blacklist').select('*').order('blocked_at', { ascending: false });
    setEntries((data as BlacklistEntry[] | null) || []);
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadBlacklist();
  }, []);

  async function addEntry() {
    if (!ciNumber.trim() || !reason.trim()) return;
    setSaving(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from('blacklist').insert({
      ci_number: ciNumber.trim(),
      full_name: fullName.trim() || null,
      reason: reason.trim(),
      blocked_by: user?.id,
      expires_at: expiresAt || null,
      notes: notes.trim() || null,
    } as never);
    if (!error) {
      setShowForm(false);
      setCiNumber(''); setFullName(''); setReason(''); setExpiresAt(''); setNotes('');
      loadBlacklist();
    }
    setSaving(false);
  }

  async function removeEntry(id: string) {
    if (!confirm('¿Eliminar esta entrada de la lista negra?')) return;
    const supabase = createClient();
    await supabase.from('blacklist').delete().eq('id', id);
    setEntries(entries.filter(e => e.id !== id));
  }

  const filtered = entries.filter(e =>
    !searchTerm || e.ci_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="p-6 text-center"><Loader2 className="mx-auto h-8 w-8 animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Lista Negra</h1>
          <p className="text-muted-foreground">{entries.length} bloqueados</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="bg-red-600 hover:bg-red-700 text-white">
          <Plus className="h-4 w-4 mr-1" /> Bloquear CI
        </Button>
      </div>

      {showForm && (
        <Card className="border-red-200">
          <CardContent className="p-4 space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1"><Label>Número de CI *</Label><Input value={ciNumber} onChange={e => setCiNumber(e.target.value)} placeholder="5.123.456" /></div>
              <div className="space-y-1"><Label>Nombre</Label><Input value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Opcional" /></div>
              <div className="sm:col-span-2 space-y-1"><Label>Motivo *</Label><Input value={reason} onChange={e => setReason(e.target.value)} placeholder="Ej: Comportamiento inapropiado en evento anterior" /></div>
              <div className="space-y-1"><Label>Vence (opcional)</Label><Input type="date" value={expiresAt} onChange={e => setExpiresAt(e.target.value)} /></div>
              <div className="space-y-1"><Label>Notas</Label><Input value={notes} onChange={e => setNotes(e.target.value)} /></div>
            </div>
            <div className="flex gap-2">
              <Button onClick={addEntry} disabled={saving || !ciNumber || !reason} className="bg-red-600 hover:bg-red-700 text-white">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Ban className="h-4 w-4" />}
                Bloquear
              </Button>
              <Button variant="ghost" onClick={() => setShowForm(false)}>Cancelar</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Buscar por CI o nombre..." className="pl-9" />
      </div>

      {filtered.length === 0 ? (
        <Card><CardContent className="text-center py-12 text-muted-foreground">Lista negra vacía</CardContent></Card>
      ) : (
        <div className="space-y-2">
          {filtered.map(entry => {
            const expired = entry.expires_at && new Date(entry.expires_at) < new Date();
            return (
              <Card key={entry.id} className={expired ? 'opacity-50' : ''}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{entry.ci_number}</span>
                      {entry.full_name && <span className="text-muted-foreground">— {entry.full_name}</span>}
                      {expired && <Badge variant="outline" className="text-xs">Vencido</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">Motivo: {entry.reason}</p>
                    <p className="text-xs text-muted-foreground">Bloqueado: {new Date(entry.blocked_at).toLocaleDateString('es-PY', { dateStyle: 'short' })}
                      {entry.expires_at && ` | Vence: ${new Date(entry.expires_at).toLocaleDateString('es-PY', { dateStyle: 'short' })}`}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => removeEntry(entry.id)} className="text-red-500 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
