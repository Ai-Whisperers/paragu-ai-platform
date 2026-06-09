import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase-browser'
import { Card } from '@/components/ui/Card'

// /es/admin → just redirect to the moderation panel. Middleware handles auth.
export default async function AdminIndex() {
  const supabase = createClient()
  const { data } = await supabase.auth.getUser()
  if (!data.user) {
    redirect('/es/admin/login')
  }
  // Authenticated users will be picked up by the actual moderation page.
  // For Phase 1 this just shows a placeholder; the full admin panel is in
  // Phase 1 of BUILD_PLAN.md.
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Card padding="lg">
        <h1 className="text-2xl font-bold mb-2">Panel de moderación</h1>
        <p className="text-foreground-muted text-sm">
          El panel completo de moderación (validar, pendiente, aprobado, rechazado, solicitudes, crear caso)
          se implementa en BUILD_PLAN.md Phase 1. Por ahora, esta página solo confirma el login.
        </p>
        <p className="text-xs text-foreground-subtle mt-4">Logueado como: {data.user.email}</p>
      </Card>
    </div>
  )
}
