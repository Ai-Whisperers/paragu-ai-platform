import { createClient } from '@/lib/supabase/server';
import { CouponForm } from '@/components/admin/coupon-form';
import { notFound } from 'next/navigation';

interface Coupon {
  id: string;
  code: string;
  type: string;
  value: number;
  min_order?: number | null;
  max_uses?: number | null;
  uses_count?: number | null;
  expires_at?: string | null;
  is_active: boolean;
  created_at?: string;
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CuponEditPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const isNew = id === 'nuevo';

  let coupon: Coupon | null = null;

  if (!isNew) {
    const { data, error } = await supabase
      .from('coupons')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      notFound();
    }
    coupon = data as Coupon;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          {isNew ? 'Nuevo Cupón' : 'Editar Cupón'}
        </h2>
        <p className="text-muted-foreground">
          {isNew
            ? 'Crea un nuevo cupón de descuento'
            : `Editando cupón: ${coupon?.code}`}
        </p>
      </div>

      <CouponForm coupon={coupon} isNew={isNew} />
    </div>
  );
}
