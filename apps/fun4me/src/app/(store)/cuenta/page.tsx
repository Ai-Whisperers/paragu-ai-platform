'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { User, MapPin, Package, IdCard, Crown, Save, Loader2, CheckCircle2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { createClient } from '@/lib/supabase/client';
import { formatPrice } from '@/lib/utils/format';
import { MembershipPlans } from '@/components/store/membership-plans';

type Tab = 'datos' | 'direcciones' | 'pedidos' | 'ci' | 'membresia';

interface CustomerProfile {
  id: string;
  full_name?: string | null;
  phone?: string | null;
  date_of_birth?: string | null;
}

interface CustomerAddress {
  id: string;
  label: string;
  full_name: string;
  phone?: string | null;
  street: string;
  city: string;
  neighborhood?: string | null;
  is_default?: boolean;
}

interface OrderItemRow {
  id: string;
  product_name: string;
  quantity: number;
}

interface OrderRow {
  id: string;
  order_number: string;
  status: string;
  created_at: string;
  total: number;
  order_items?: OrderItemRow[];
}

interface CiDocument {
  ci_number: string;
  full_name: string;
  image_url?: string | null;
  verified?: boolean | null;
}

export default function CuentaPage() {
  const router = useRouter();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [addresses, setAddresses] = useState<CustomerAddress[]>([]);
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [ciDoc, setCiDoc] = useState<CiDocument | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('datos');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  // CI upload state
  const [ciFile, setCiFile] = useState<File | null>(null);
  const [ciNumber, setCiNumber] = useState('');
  const [ciFullName, setCiFullName] = useState('');
  const [ciUploading, setCiUploading] = useState(false);

  // New address state
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addrLabel, setAddrLabel] = useState('Principal');
  const [addrFullName, setAddrFullName] = useState('');
  const [addrPhone, setAddrPhone] = useState('');
  const [addrStreet, setAddrStreet] = useState('');
  const [addrCity, setAddrCity] = useState('');
  const [addrNeighborhood, setAddrNeighborhood] = useState('');
  const [addrDefault, setAddrDefault] = useState(false);

  const loadData = useCallback(async () => {
    const supabase = createClient();
    const { data: { user: u } } = await supabase.auth.getUser();
    if (!u) { router.push('/login?redirect=/cuenta'); return; }
    setUser(u);

    // @ts-expect-error customers table not in generated Database types yet
    const profRes = await supabase.from('customers').select('*').eq('id', u.id).single();
    // @ts-expect-error customer_addresses table not in generated Database types yet
    const addrRes = await supabase.from('customer_addresses').select('*').eq('customer_id', u.id).order('is_default', { ascending: false });
    // @ts-expect-error orders.customer_id column not in generated Database types yet
    const ordersRes = await supabase.from('orders').select('*, order_items(*)').eq('customer_id', u.id).order('created_at', { ascending: false });
    // @ts-expect-error ci_documents table not in generated Database types yet
    const ciRes = await supabase.from('ci_documents').select('*').eq('customer_id', u.id).order('created_at', { ascending: false }).limit(1);

    if (profRes.data) {
      const p = profRes.data as CustomerProfile;
      setProfile(p);
      setName(p.full_name || '');
      setPhone(p.phone || '');
      setDateOfBirth(p.date_of_birth || '');
    }
    if (addrRes.data) setAddresses(addrRes.data as CustomerAddress[]);
    if (ordersRes.data) setOrders(ordersRes.data as OrderRow[]);
    const ciData = ciRes.data as CiDocument[] | null;
    if (ciData?.length) setCiDoc(ciData[0]);
    setLoading(false);
  }, [router]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data fetch on mount; loadData is memoized via useCallback
    loadData();
  }, [loadData]);

  async function saveProfile() {
    if (!user) return;
    setSaving(true); setSaveMsg('');
    const supabase = createClient();
    // @ts-expect-error customers table not in generated Database types yet
    const { error } = await supabase.from('customers').update({
      full_name: name.trim(),
      phone: phone.trim(),
      date_of_birth: dateOfBirth || null,
    }).eq('id', user.id);
    setSaving(false);
    setSaveMsg(error ? 'Error al guardar' : 'Guardado');
    setTimeout(() => setSaveMsg(''), 3000);
  }

  async function addAddress() {
    if (!user) return;
    if (!addrStreet.trim() || !addrCity.trim()) return;
    const supabase = createClient();
    // @ts-expect-error customer_addresses table not in generated Database types yet
    const { error } = await supabase.from('customer_addresses').insert({
      customer_id: user.id,
      label: addrLabel,
      full_name: addrFullName || name,
      phone: addrPhone || phone,
      street: addrStreet.trim(),
      city: addrCity.trim(),
      neighborhood: addrNeighborhood.trim(),
      is_default: addrDefault,
    });
    if (!error) {
      setShowAddressForm(false);
      resetAddressForm();
      // @ts-expect-error customer_addresses table not in generated Database types yet
      const { data } = await supabase.from('customer_addresses').select('*').eq('customer_id', user.id);
      if (data) setAddresses(data as CustomerAddress[]);
    }
  }

  async function deleteAddress(id: string) {
    const supabase = createClient();
    // @ts-expect-error customer_addresses table not in generated Database types yet
    await supabase.from('customer_addresses').delete().eq('id', id);
    setAddresses(addresses.filter(a => a.id !== id));
  }

  async function uploadCi() {
    if (!user) return;
    if (!ciFile || !ciNumber.trim()) return;
    setCiUploading(true);
    const supabase = createClient();
    const ext = ciFile.name.split('.').pop();
    const filePath = `${user.id}/ci-${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage.from('ci-documents').upload(filePath, ciFile);
    if (uploadError) { setCiUploading(false); return; }
    const { data: { publicUrl } } = supabase.storage.from('ci-documents').getPublicUrl(filePath);
    // @ts-expect-error ci_documents table not in generated Database types yet
    const { error: insertError } = await supabase.from('ci_documents').insert({
      customer_id: user.id,
      ci_number: ciNumber.trim(),
      full_name: ciFullName || name,
      image_url: publicUrl,
    });
    if (!insertError) {
      setCiDoc({ ci_number: ciNumber, full_name: ciFullName || name, image_url: publicUrl, verified: false });
      setCiFile(null); setCiNumber(''); setCiFullName('');
    }
    setCiUploading(false);
  }

  function resetAddressForm() {
    setAddrLabel('Principal'); setAddrFullName(''); setAddrPhone('');
    setAddrStreet(''); setAddrCity(''); setAddrNeighborhood(''); setAddrDefault(false);
  }

  function statusBadge(status: string) {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      payment_pending: 'bg-orange-100 text-orange-800',
      payment_confirmed: 'bg-blue-100 text-blue-800',
      preparing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    const labels: Record<string, string> = {
      pending: 'Pendiente', payment_pending: 'Pago Pendiente', payment_confirmed: 'Pago Confirmado',
      preparing: 'Preparando', shipped: 'Enviado', delivered: 'Entregado', completed: 'Completado', cancelled: 'Cancelado',
    };
    return <Badge className={colors[status] || 'bg-gray-100'}>{labels[status] || status}</Badge>;
  }

  if (loading) return <div className="container mx-auto px-4 py-12 text-center"><Loader2 className="mx-auto h-8 w-8 animate-spin text-muted-foreground" /></div>;

  void profile;

  const tabs = [
    { key: 'datos' as Tab, label: 'Mis Datos', icon: User },
    { key: 'direcciones' as Tab, label: 'Direcciones', icon: MapPin },
    { key: 'pedidos' as Tab, label: 'Pedidos', icon: Package },
    { key: 'membresia' as Tab, label: 'Membresía', icon: Crown },
    { key: 'ci' as Tab, label: 'Verificación', icon: IdCard },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Mi Cuenta</h1>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 border-b">
        {tabs.map(t => {
          const Icon = t.icon;
          return (
            <button key={t.key} onClick={() => setActiveTab(t.key)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition ${
                activeTab === t.key ? 'border-rose-500 text-rose-600' : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab: Mis Datos */}
      {activeTab === 'datos' && (
        <Card>
          <CardHeader><CardTitle>Mis Datos</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Correo electrónico</Label>
              <Input value={user?.email || ''} disabled className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label>Nombre completo</Label>
              <Input value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Teléfono</Label>
              <Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="0981 123 456" />
            </div>
            <div className="space-y-2">
              <Label>Fecha de nacimiento</Label>
              <Input type="date" value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)} />
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={saveProfile} disabled={saving} className="bg-gradient-to-r from-rose-500 to-purple-600 text-white">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Guardar Cambios
              </Button>
              {saveMsg && <span className="text-sm text-green-600">{saveMsg}</span>}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tab: Direcciones */}
      {activeTab === 'direcciones' && (
        <div className="space-y-4">
          {addresses.map(addr => (
            <Card key={addr.id}>
              <CardContent className="flex items-start justify-between p-4">
                <div>
                  <p className="font-semibold">{addr.label} {addr.is_default && <Badge className="ml-1 bg-rose-100 text-rose-800">Principal</Badge>}</p>
                  <p className="text-sm">{addr.full_name}</p>
                  <p className="text-sm text-muted-foreground">{addr.street}, {addr.neighborhood && `${addr.neighborhood}, `}{addr.city}</p>
                  {addr.phone && <p className="text-sm text-muted-foreground">{addr.phone}</p>}
                </div>
                <Button variant="ghost" size="sm" onClick={() => deleteAddress(addr.id)} className="text-red-500 hover:text-red-700">Eliminar</Button>
              </CardContent>
            </Card>
          ))}
          {addresses.length === 0 && <p className="text-muted-foreground text-center py-8">No tenés direcciones guardadas</p>}
          <Button onClick={() => setShowAddressForm(!showAddressForm)} variant="outline">Agregar Dirección</Button>
          {showAddressForm && (
            <Card>
              <CardContent className="space-y-3 p-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1"><Label>Etiqueta</Label><select value={addrLabel} onChange={e => setAddrLabel(e.target.value)} className="w-full h-10 rounded-md border bg-background px-3 text-sm"><option>Principal</option><option>Trabajo</option><option>Otro</option></select></div>
                  <div className="space-y-1"><Label>Nombre</Label><Input value={addrFullName} onChange={e => setAddrFullName(e.target.value)} placeholder={name} /></div>
                  <div className="space-y-1"><Label>Teléfono</Label><Input value={addrPhone} onChange={e => setAddrPhone(e.target.value)} /></div>
                  <div className="space-y-1"><Label>Ciudad *</Label><Input value={addrCity} onChange={e => setAddrCity(e.target.value)} required /></div>
                  <div className="space-y-1 sm:col-span-2"><Label>Dirección *</Label><Input value={addrStreet} onChange={e => setAddrStreet(e.target.value)} required /></div>
                  <div className="space-y-1 sm:col-span-2"><Label>Barrio</Label><Input value={addrNeighborhood} onChange={e => setAddrNeighborhood(e.target.value)} /></div>
                  <div className="flex items-center gap-2"><input type="checkbox" id="addrDefault" checked={addrDefault} onChange={e => setAddrDefault(e.target.checked)} className="rounded" /><Label htmlFor="addrDefault">Dirección principal</Label></div>
                </div>
                <div className="flex gap-2"><Button onClick={addAddress}>Guardar</Button><Button variant="ghost" onClick={() => setShowAddressForm(false)}>Cancelar</Button></div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Tab: Pedidos */}
      {activeTab === 'pedidos' && (
        <div className="space-y-3">
          {orders.length === 0 ? (
            <Card><CardContent className="text-center py-12"><Package className="mx-auto h-12 w-12 text-muted-foreground/30 mb-3" /><p className="text-muted-foreground">Todavía no hiciste ninguna compra</p><Button className="mt-4 bg-gradient-to-r from-rose-500 to-purple-600 text-white" onClick={() => router.push('/')}>Ir a la Tienda</Button></CardContent></Card>
          ) : orders.map(order => (
            <Card key={order.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Pedido #{order.order_number}</span>
                  {statusBadge(order.status)}
                </div>
                <p className="text-sm text-muted-foreground">{new Date(order.created_at).toLocaleDateString('es-PY', { dateStyle: 'long' })}</p>
                <p className="text-sm">{order.order_items?.length || 0} producto(s) — <span className="font-semibold">{formatPrice(order.total)}</span></p>
                {order.order_items?.slice(0, 3).map((item) => (
                  <p key={item.id} className="text-xs text-muted-foreground">{item.product_name} x{item.quantity}</p>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Tab: CI */}
      {activeTab === 'ci' && (
        <Card>
          <CardHeader><CardTitle>Mi Cédula de Identidad</CardTitle></CardHeader>
          <CardContent>
            {ciDoc ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  {ciDoc.verified ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : ciDoc.verified === false ? <Clock className="h-5 w-5 text-yellow-500" /> : null}
                  <Badge className={ciDoc.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                    {ciDoc.verified ? 'Verificada' : 'Pendiente de verificación'}
                  </Badge>
                </div>
                <p><span className="font-medium">CI:</span> {ciDoc.ci_number}</p>
                <p><span className="font-medium">Nombre:</span> {ciDoc.full_name}</p>
                {ciDoc.image_url && <img src={ciDoc.image_url} alt="CI" className="max-w-xs rounded-lg border" />}
                {ciDoc.verified && <p className="text-sm text-green-600">Tu cédula está verificada. Podés comprar entradas para eventos.</p>}
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Subí tu cédula de identidad para poder comprar entradas a eventos.</p>
                <div className="space-y-3">
                  <div className="space-y-1"><Label>Foto de tu cédula (frente)</Label><Input type="file" accept="image/*" onChange={e => setCiFile(e.target.files?.[0] || null)} /></div>
                  <div className="space-y-1"><Label>Número de CI</Label><Input value={ciNumber} onChange={e => setCiNumber(e.target.value)} placeholder="5.123.456" /></div>
                  <div className="space-y-1"><Label>Nombre completo (como sale en la cédula)</Label><Input value={ciFullName} onChange={e => setCiFullName(e.target.value)} placeholder={name} /></div>
                  <Button onClick={uploadCi} disabled={ciUploading || !ciFile || !ciNumber} className="bg-gradient-to-r from-rose-500 to-purple-600 text-white">
                    {ciUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                    Enviar para verificación
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Tab: Membresía */}
      {activeTab === 'membresia' && (
        <MembershipPlans />
      )}
    </div>
  );
}
