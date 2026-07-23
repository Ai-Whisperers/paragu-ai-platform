import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = await createClient();
  const { data } = await supabase
    // @ts-expect-error upcoming_events view not in generated Database types yet
    .from('upcoming_events')
    .select('*')
    .order('date');
  return NextResponse.json(data || []);
}
