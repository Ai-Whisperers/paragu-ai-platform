import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: NextRequest) {
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
  try {
    const body = await request.json()
    const customer_id = request.headers.get('x-customer-id')
    
    if (!customer_id) {
      return NextResponse.json({ error: 'Customer ID required' }, { status: 401 })
    }
    
    const { data: cartItem, error } = await supabase
      .from('cart')
      .upsert([{
        customer_id,
        product_id: body.product_id,
        quantity: body.quantity
      }])
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
