import { NextRequest, NextResponse } from 'next/server'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Force runtime evaluation so build-time page-data collection does not read
// process.env at module scope (Supabase URL is not present in build env).
export const dynamic = 'force-dynamic'

let cachedClient: SupabaseClient | null = null

function getSupabase(): SupabaseClient {
  if (cachedClient) return cachedClient
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    throw new Error('Supabase env not configured: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required')
  }
  cachedClient = createClient(url, key)
  return cachedClient
}

export async function GET(request: NextRequest) {
  const supabase = getSupabase()
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
    const supabase = getSupabase()
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
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}
