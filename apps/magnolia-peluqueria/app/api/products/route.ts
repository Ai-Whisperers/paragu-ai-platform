import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  
  let query = supabase
    .from('products')
    .select('*')
    .gt('stock', 0)
  
  if (category) {
    query = query.eq('category', category)
  }
  
  const { data: products, error } = await query.order('created_at', { ascending: false })
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json(products)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { data: product, error } = await supabase
      .from('products')
      .insert([{
        name: body.name,
        description: body.description,
        price: body.price,
        category: body.category,
        image_url: body.image_url,
        stock: body.stock || 0
      }])
      .select()
      .single()
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}
