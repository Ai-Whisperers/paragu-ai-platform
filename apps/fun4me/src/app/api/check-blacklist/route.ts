import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { ci_number } = await request.json();

    if (!ci_number?.trim()) {
      return NextResponse.json({ error: 'CI number required' }, { status: 400 });
    }

    // @ts-expect-error is_ci_blacklisted RPC not in generated Database types yet
    const { data } = await supabase.rpc('is_ci_blacklisted', { p_ci_number: ci_number.trim() });

    return NextResponse.json(data || { blacklisted: false });
  } catch (error) {
    console.error('[check-blacklist]', error);
    return NextResponse.json({ blacklisted: false });
  }
}
