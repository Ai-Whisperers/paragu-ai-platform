// @ts-nocheck
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('upcoming_events')
    .select('*')
    .order('date');
  return NextResponse.json(data || []);
}
