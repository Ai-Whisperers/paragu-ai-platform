import { NextRequest, NextResponse } from 'next/server'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Next 16 collects page data at build time and evaluates module-scope code.
// Instantiating Supabase at module load with `NEXT_PUBLIC_SUPABASE_URL!` throws
// when env vars are missing (build machines don't need real credentials), so we
// lazy-init on first request instead. This route is fully server-driven — mark
// it dynamic to skip static page-data collection entirely.
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
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')

  let query = supabase.from('products').select('*').gt('stock', 0)

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
  const supabase = getSupabase()
  try {
    const body = await request.json()

    const { data: product, error } = await supabase
      .from('products')
      .insert([
        {
          name: body.name,
          description: body.description,
          price: body.price,
          category: body.category,
          image_url: body.image_url,
          stock: body.stock || 0,
        },
      ])
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
