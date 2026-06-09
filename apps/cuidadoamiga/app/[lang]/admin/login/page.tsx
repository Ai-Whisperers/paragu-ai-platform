import { redirect } from 'next/navigation'
import { getServerSupabase } from '@/lib/supabase/server'
import { LoginForm } from '@/components/admin/LoginForm'

export default async function AdminLoginPage() {
  const supabase = await getServerSupabase()
  const { data } = await supabase.auth.getUser()
  if (data.user) {
    redirect('/es/admin')
  }
  return <LoginForm />
}
