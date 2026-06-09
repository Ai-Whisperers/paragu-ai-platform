'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserSupabase } from '@/lib/supabase'
import { Card } from '@/components/ui/Card'
import { TextField } from '@/components/ui/Field'
import { Button } from '@/components/ui/Button'
import { getErrors } from '@/lib/content'

export function LoginForm() {
  const errs = getErrors('es')
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const email = identifier.trim()
    const supabase = createBrowserSupabase()
    const { error: err } = await supabase.auth.signInWithPassword({ email, password })

    if (err) {
      setError(errs.loginInvalid)
      setLoading(false)
    } else {
      router.push('/es/admin')
      router.refresh()
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <Card padding="lg" className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-1 bg-gradient-to-br from-pink-500 to-violet-600 bg-clip-text text-transparent">
          cuidado amiga
        </h1>
        <p className="text-foreground-muted text-sm text-center mb-8">Panel de moderación</p>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <TextField type="email" placeholder="Email" value={identifier} onChange={(e) => setIdentifier(e.target.value)} autoComplete="email" required fullWidth />
          <TextField type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required fullWidth />
          {error ? <p className="text-sm text-red-600 m-0">{error}</p> : null}
          <Button type="submit" variant="primary" size="md" fullWidth loading={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
      </Card>
    </div>
  )
}
