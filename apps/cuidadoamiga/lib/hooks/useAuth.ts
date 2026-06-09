'use client'

import { useEffect, useState } from 'react'
import { createBrowserSupabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

export interface ModeratorProfile {
  id: string
  email: string
  displayName: string | null
  role: 'mod' | 'owner'
}

interface UseAuthResult {
  user: User | null
  profile: ModeratorProfile | null
  loading: boolean
  isOwner: boolean
  signOut: () => Promise<void>
}

export function useAuth(): UseAuthResult {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<ModeratorProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createBrowserSupabase()

    let mounted = true

    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!mounted) return
      setUser(user)

      if (user) {
        const { data } = await supabase
          .from('moderators')
          .select('user_id, role, display_name')
          .eq('user_id', user.id)
          .single()
        if (data && mounted) {
          setProfile({
            id: data.user_id as string,
            email: user.email ?? '',
            displayName: (data.display_name as string | null) ?? null,
            role: (data.role as 'mod' | 'owner') ?? 'mod',
          })
        } else if (mounted) {
          // No moderator row = check OWNER_EMAILS env (server-side check anyway)
          setProfile({ id: user.id, email: user.email ?? '', displayName: null, role: 'mod' })
        }
      }

      if (mounted) setLoading(false)
    }
    void load()

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) setUser(session?.user ?? null)
    })

    return () => {
      mounted = false
      sub.subscription.unsubscribe()
    }
  }, [])

  const isOwner =
    profile?.role === 'owner' ||
    (!!user?.email && (process.env.NEXT_PUBLIC_OWNER_EMAILS ?? '').split(',').map((s) => s.trim()).includes(user.email))

  async function signOut() {
    const supabase = createBrowserSupabase()
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
  }

  return { user, profile, loading, isOwner, signOut }
}
