import { NextRequest, NextResponse } from 'next/server'
import { getServiceSupabase } from '@/lib/supabase/service'

// Given a username, returns the email so the client can sign in with password.
export async function POST(req: NextRequest) {
  const { username } = await req.json()
  if (!username) return NextResponse.json({ error: 'Falta username' }, { status: 400 })

  const client = getServiceSupabase()
  const { data, error } = await client.auth.admin.listUsers()

  if (error || !data) {
    return NextResponse.json({ error: 'Error buscando usuario' }, { status: 500 })
  }

  const user = data.users.find(
    (u: { user_metadata?: { username?: string } }) => u.user_metadata?.username === username,
  )

  if (!user) {
    return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
  }

  return NextResponse.json({ email: user.email })
}
