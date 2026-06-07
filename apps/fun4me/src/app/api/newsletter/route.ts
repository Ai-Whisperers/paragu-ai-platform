import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json();

    if (!email?.trim()) {
      return NextResponse.json({ error: 'Email requerido' }, { status: 400 });
    }

    // For now, return success - Supabase integration comes later
    console.log('[Newsletter] New subscriber:', { email: email.trim(), name: name?.trim() || null });

    return NextResponse.json({ success: true, message: '¡Gracias por suscribirte!' });
  } catch {
    return NextResponse.json({ error: 'Error inesperado' }, { status: 500 });
  }
}
