import { getServerSupabase } from '@/lib/supabase/server'
import { LoginForm } from '@/components/admin/LoginForm'
import { Card } from '@/components/ui/Card'

export default async function AdminLoginPage() {
  try {
    const supabase = await getServerSupabase()
    const { data } = await supabase.auth.getUser()
    if (data?.user) {
      const { redirect } = await import('next/navigation')
      redirect('/es/admin')
    }
  } catch {
    // No Supabase configured — fall through to the "not configured" message
  }
  // Check if Supabase is even configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!supabaseUrl || supabaseUrl === 'your_supabase_url') {
    return (
      <div className="max-w-md mx-auto px-6 py-12">
        <Card padding="lg">
          <h1 className="text-2xl font-black mb-3">Panel de moderación</h1>
          <p className="text-foreground-muted mb-4">
            El panel de moderación requiere que la base de datos Supabase esté configurada.
            En el modo demo, la moderación se simula a nivel de código.
          </p>
          <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3">
            <strong>Estado:</strong> base de datos no conectada (modo demo)
          </p>
        </Card>
      </div>
    )
  }
  return <LoginForm />
}
