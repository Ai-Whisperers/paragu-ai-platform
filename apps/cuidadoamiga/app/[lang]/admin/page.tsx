import { redirect } from 'next/navigation'
import { getServerSupabase } from '@/lib/supabase/server'
import { Card } from '@/components/ui/Card'

// /es/admin → check auth, redirect to login if not authenticated, otherwise show panel stub.
export default async function AdminIndex() {
  const supabase = await getServerSupabase()
  const { data } = await supabase.auth.getUser()
  if (!data.user) {
    redirect('/es/admin/login')
  }
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Card padding="lg">
        <h1 className="text-2xl font-bold mb-2">Panel de moderación</h1>
        <p className="text-foreground-muted text-sm">
          El panel completo (validar, pendiente, aprobado, rechazado, solicitudes, crear caso) se implementa
          en Phase 1 de BUILD_PLAN.md. Esta página solo confirma el login.
        </p>
        <p className="text-xs text-foreground-subtle mt-4">Logueado como: {data.user.email}</p>
      </Card>
    </div>
  )
}
