import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qyvokpribmbrosafntqa.supabase.co';
const supabaseAnonKey = 'sb_publishable_KQ-sFNr7r6AauoG0B4nyTg_vuPHmeCm';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type TicketTier = 'early_bird' | 'general' | 'vip';
export type TicketStatus = 'pending' | 'confirmed' | 'cancelled' | 'checked_in';

export interface TicketData {
  buyer_name: string;
  buyer_email: string;
  buyer_phone: string;
  quantity: number;
  tier: TicketTier;
  total_pyg: number;
  opted_in_marketing: boolean;
  coupon_code?: string;
  discount_applied?: number;
  notes?: string;
}

export interface SiteConfig {
  whatsapp_number: string;
  whatsapp_text: string;
  event_date: string;
  event_address: string;
  max_tickets_per_person: number;
}

export const TIER_CONFIG: Record<TicketTier, { label: string; price: number; description: string }> = {
  early_bird: {
    label: 'Pre-Venta',
    price: 40000,
    description: 'Entrada anticipada — cupos limitados'
  },
  general: {
    label: 'General',
    price: 60000,
    description: 'Entrada estándar'
  },
  vip: {
    label: 'VIP',
    price: 120000,
    description: 'Entrada VIP con beneficios exclusivos'
  }
};

let _configCache: SiteConfig | null = null;

export async function getSiteConfig(): Promise<SiteConfig> {
  if (_configCache) return _configCache;
  const { data } = await supabase.from('mk_site_config').select('key, value');
  if (!data) return defaultConfig();
  const config: Record<string, unknown> = {};
  for (const row of data) {
    config[row.key] = row.value;
  }
  _configCache = config as unknown as SiteConfig;
  return config as unknown as SiteConfig;
}

function defaultConfig(): SiteConfig {
  return {
    whatsapp_number: '595981200255',
    whatsapp_text: '🎭 Hola! Quiero info sobre maškaráda',
    event_date: '2026-06-11T19:00:00-04:00',
    event_address: 'Eligio Ayala 1073, Asunción',
    max_tickets_per_person: 10
  };
}

export async function checkBlocklist(email: string, phone: string): Promise<{ blocked: boolean; reason?: string }> {
  const { data, error } = await supabase
    .from('mk_blocklist')
    .select('reason')
    .or(`email.ilike.${email},phone.eq.${phone}`)
    .limit(1);

  if (error || !data || data.length === 0) return { blocked: false };
  return { blocked: true, reason: data[0].reason };
}

export interface CapacityInfo {
  tier: string;
  max_quantity: number;
  sold_so_far: number;
}

export async function getCapacity(): Promise<CapacityInfo[]> {
  const { data } = await supabase.from('mk_capacity').select('tier, max_quantity, sold_so_far');
  return (data || []) as CapacityInfo[];
}

export async function validateCoupon(code: string, tier: string): Promise<{
  valid: boolean;
  discount_type?: string;
  discount_value?: number;
  reason?: string;
}> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await supabase.rpc('mk_validate_coupon' as any, { check_code: code, check_tier: tier });

  if (error || !data) return { valid: false, reason: 'Error al validar código' };
  return data as { valid: boolean; discount_type?: string; discount_value?: number; reason?: string };
}

export async function purchaseTicket(ticket: TicketData): Promise<{ success: boolean; error?: string }> {
  const cap = await getCapacity();
  const totalCap = cap.find(c => c.tier === 'total');
  const tierCap = cap.find(c => c.tier === ticket.tier);

  if (totalCap && totalCap.sold_so_far + ticket.quantity > totalCap.max_quantity) {
    return { success: false, error: '🌊 ¡Cupo general completo! No quedan más entradas.' };
  }
  if (tierCap && tierCap.sold_so_far + ticket.quantity > tierCap.max_quantity) {
    return { success: false, error: `🌊 ¡Cupos de ${TIER_CONFIG[ticket.tier].label} agotados! Probá otra categoría.` };
  }

  const blocked = await checkBlocklist(ticket.buyer_email, ticket.buyer_phone);
  if (blocked.blocked) {
    return { success: false, error: 'Lo sentimos, no podemos procesar tu compra.' };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const payload: Record<string, any> = {
    buyer_name: ticket.buyer_name,
    buyer_email: ticket.buyer_email.toLowerCase(),
    buyer_phone: ticket.buyer_phone,
    quantity: ticket.quantity,
    tier: ticket.tier,
    total_pyg: ticket.total_pyg,
    opted_in_marketing: ticket.opted_in_marketing,
    notes: ticket.notes || ''
  };

  if (ticket.coupon_code) payload.coupon_code = ticket.coupon_code;
  if (ticket.discount_applied) payload.discount_applied = ticket.discount_applied;

  const { error } = await supabase.from('mk_tickets').insert(payload);

  if (error) {
    const msg = error.message || '';
    if (msg.includes('INVITADO_NO_BIENVENIDO')) {
      return { success: false, error: 'Lo sentimos, no podemos procesar tu compra.' };
    }
    if (msg.includes('CAPACIDAD_COMPLETA') || msg.includes('cap_available')) {
      return { success: false, error: '🌊 Cupos agotados para esta categoría.' };
    }
    return { success: false, error: `Error: ${msg}` };
  }

  return { success: true };
}

// =========== ADMIN: TICKETS ===========

export interface TicketRow {
  id: string;
  buyer_name: string;
  buyer_email: string;
  buyer_phone: string;
  quantity: number;
  tier: string;
  total_pyg: number;
  status: TicketStatus;
  opted_in_marketing: boolean;
  coupon_code?: string;
  discount_applied?: number;
  created_at: string;
}

export async function getTickets(): Promise<TicketRow[]> {
  const { data, error } = await supabase
    .from('mk_tickets')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return [];
  return (data || []) as TicketRow[];
}

export async function updateTicketStatus(id: string, status: TicketStatus): Promise<boolean> {
  const { error } = await supabase.from('mk_tickets').update({ status }).eq('id', id);
  return !error;
}

// =========== ADMIN: BLOCKLIST ===========

export interface BlocklistEntry {
  id: string;
  email?: string;
  phone?: string;
  name?: string;
  reason: string;
  created_at: string;
}

export async function getBlocklist(): Promise<BlocklistEntry[]> {
  const { data, error } = await supabase
    .from('mk_blocklist')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return [];
  return (data || []) as BlocklistEntry[];
}

export async function addToBlocklist(entry: Partial<BlocklistEntry>): Promise<boolean> {
  const { error } = await supabase.from('mk_blocklist').insert(entry);
  return !error;
}

export async function removeFromBlocklist(id: string): Promise<boolean> {
  const { error } = await supabase.from('mk_blocklist').delete().eq('id', id);
  return !error;
}

// =========== ADMIN: MARKETING ===========

export interface MarketingEntry {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  created_at: string;
}

export async function getMarketingList(): Promise<MarketingEntry[]> {
  const { data, error } = await supabase
    .from('mk_marketing_list')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return [];
  return (data || []) as MarketingEntry[];
}

// =========== ADMIN: STATS ===========

export interface DashboardStats {
  total_tickets: number;
  total_revenue: number;
  confirmed: number;
  pending: number;
  cancelled: number;
  checked_in: number;
  capacity_total: number;
  capacity_sold: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const [tickets, cap] = await Promise.all([getTickets(), getCapacity()]);
  const totalCap = cap.find(c => c.tier === 'total');
  return {
    total_tickets: tickets.length,
    total_revenue: tickets.reduce((s, t) => s + (t.total_pyg || 0), 0),
    confirmed: tickets.filter(t => t.status === 'confirmed').length,
    pending: tickets.filter(t => t.status === 'pending').length,
    cancelled: tickets.filter(t => t.status === 'cancelled').length,
    checked_in: tickets.filter(t => t.status === 'checked_in').length,
    capacity_total: totalCap?.max_quantity || 0,
    capacity_sold: totalCap?.sold_so_far || 0,
  };
}

export const WHATSAPP_NUMBER = '595981200255';
export const ADMIN_PASSCODE = 'maskarada2026';
