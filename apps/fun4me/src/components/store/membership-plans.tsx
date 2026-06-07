'use client';

import { useEffect, useState } from 'react';
import { Crown, Loader2, Shield, Zap, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { createClient } from '@/lib/supabase/client';
import { formatPrice } from '@/lib/utils/format';

type Plan = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  duration_days: number;
  color: string;
  sort_order: number;
  features: Record<string, any>;
};

type Membership = Record<string, any>;

const FEATURE_ICONS: Record<string, any> = {
  profile: Shield,
  directory: Crown,
  messaging: Zap,
  free_shipping: Gift,
};

export function MembershipPlans() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [membership, setMembership] = useState<Membership | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const supabase = createClient();
    const { data: plans } = await supabase
      .from('membership_plans')
      .select('*')
      .eq('is_active', true)
      .order('sort_order');
    setPlans(plans || []);

    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: membership } = await supabase
        .rpc('get_active_membership', { p_customer_id: user.id } as any);
      setMembership(membership);
    }
    setLoading(false);
  }

  async function buyPlan(plan: Plan) {
    setPurchasing(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      window.location.href = '/login?redirect=/cuenta';
      return;
    }

    const now = new Date();
    const end = new Date(now.getTime() + plan.duration_days * 24 * 60 * 60 * 1000);

    const { error } = await supabase.from('customer_memberships').insert({
      customer_id: user.id,
      plan_id: plan.id,
      start_date: now.toISOString(),
      end_date: end.toISOString(),
      status: 'active',
      auto_renew: true,
      payment_method: 'bank_transfer',
    } as any);

    if (error) {
      alert('Error al activar membresía. Probá de nuevo.');
    } else {
      await loadData();
    }
    setPurchasing(false);
  }

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-rose-500" /></div>;

  return (
    <div className="space-y-8">
      {membership?.has_active && (
        <Card className="border-2" style={{ borderColor: membership.plan_color }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tu membresía activa</p>
                <p className="text-xl font-bold" style={{ color: membership.plan_color }}>
                  {membership.plan_name}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Vence: {new Date(membership.end_date).toLocaleDateString('es-PY')}
                </p>
              </div>
              <Badge className="text-lg px-4 py-2" style={{ backgroundColor: membership.plan_color }}>
                <Crown className="h-4 w-4 mr-1" />
                Activo
              </Badge>
            </div>
            {membership.features && (
              <div className="flex gap-4 mt-4 flex-wrap">
                {Object.entries(membership.features).map(([key, val]) => {
                  if (!val) return null;
                  const Icon = FEATURE_ICONS[key] || Shield;
                  return (
                    <Badge key={key} variant="secondary" className="text-xs">
                      <Icon className="h-3 w-3 mr-1" />
                      {key.replace('_', ' ')}
                    </Badge>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => {
          const isActive = membership?.plan_slug === plan.slug;
          return (
            <Card key={plan.id} className={`relative ${isActive ? 'ring-2 ring-offset-2' : ''}`} style={{ ['--tw-ring-color' as string]: plan.color }}>
              {isActive && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge style={{ backgroundColor: plan.color }}>Activo</Badge>
                </div>
              )}
              <CardHeader className="text-center pb-4" style={{ borderTopWidth: 3, borderTopStyle: 'solid', borderTopColor: plan.color }}>
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold" style={{ color: plan.color }}>
                    {formatPrice(plan.price)}
                  </span>
                  <span className="text-sm text-muted-foreground ml-1">/mes</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {plan.features && Object.entries(plan.features).map(([key, val]) => {
                  const Icon = FEATURE_ICONS[key] || Shield;
                  const enabled = val && (typeof val === 'boolean' ? val : true);
                  return (
                    <div key={key} className={`flex items-center gap-2 text-sm ${enabled ? '' : 'text-muted-foreground/50 line-through'}`}>
                      <Icon className={`h-4 w-4 ${enabled ? 'text-green-500' : ''}`} />
                      <span>
                        {key === 'profile' && 'Perfil público'}
                        {key === 'directory' && 'Directorio de miembros'}
                        {key === 'messaging' && 'Mensajería privada'}
                        {key === 'event_discount' && `${val}% descuento en eventos`}
                        {key === 'free_shipping' && 'Envío gratis'}
                        {key === 'priority_support' && 'Soporte prioritario'}
                      </span>
                    </div>
                  );
                })}
                <Button
                  className="w-full mt-4"
                  style={{ backgroundColor: plan.color }}
                  onClick={() => buyPlan(plan)}
                  disabled={isActive || purchasing}
                >
                  {purchasing ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  {isActive ? 'Plan activo' : 'Activar plan'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
