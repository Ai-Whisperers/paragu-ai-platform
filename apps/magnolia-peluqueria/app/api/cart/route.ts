import { NextRequest, NextResponse } from 'next/server'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// See /api/products/route.ts for the rationale — Next 16's build-time page-data
// collection evaluates module-scope code and crashes without live Supabase env.
export const dynamic = 'force-dynamic'

let _supabase: SupabaseClient | null = null
function getSupabase(): SupabaseClient {
  if (_supabase) return _supabase
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    throw new Error(
      'Supabase env missing: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set at runtime.',
    )
  }
  _supabase = createClient(url, key)
  return _supabase
}

export async function GET(request: NextRequest) {
  const supabase = getSupabase()
  const customer_id = request.headers.get('x-customer-id')

  if (!customer_id) {
    return NextResponse.json({ error: 'Customer ID required' }, { status: 401 })
  }

  const { data: cart, error } = await supabase
    .from('cart')
    .select(`
      *,
      products (*)
    `)
    .eq('customer_id', customer_id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(cart)
}

export async function POST(request: NextRequest) {
  const supabase = getSupabase()
  try {
    const body = await request.json()
    const customer_id = request.headers.get('x-customer-id')

    if (!customer_id) {
      return NextResponse.json({ error: 'Customer ID required' }, { status: 401 })
    }

    const { data: cartItem, error } = await supabase
      .from('cart')
      .upsert([
        {
          customer_id,
          product_id: body.product_id,
          quantity: body.quantity,
        },
      ])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(cartItem, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}

export async function DELETE(request: NextRequest) {
  const supabase = getSupabase()
  const customer_id = request.headers.get('x-customer-id')
  const { searchParams } = new URL(request.url)
  const product_id = searchParams.get('product_id')

  if (!customer_id || !product_id) {
    return NextResponse.json({ error: 'Customer ID and Product ID required' }, { status: 400 })
  }

  const { error } = await supabase
    .from('cart')
    .delete()
    .eq('customer_id', customer_id)
    .eq('product_id', product_id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
