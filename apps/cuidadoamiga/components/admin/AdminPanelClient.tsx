'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { EmptyState } from '@/components/ui/EmptyState'
import { ToastProvider, useToast } from '@/components/ui/Toast'
import { useAuth } from '@/lib/hooks/useAuth'
import { getAdmin, getCaseTypeLabels, isLang, type Lang } from '@/lib/content'
import { clsx } from 'clsx'

// =================== Types ===================
interface CaseRow {
  id: string
  nombre: string
  victima: string | null
  fecha: string
  tipo: 'femicidio' | 'abuso' | 'acoso'
  pais: string
  ciudad: string | null
  descripcion: string | null
  foto_url: string | null
  fuentes: string[] | null
  proceso_judicial: 'en_proceso' | 'cerrado' | null
  estado: 'pendiente' | 'aprobado' | 'rechazado'
  creado_at: string
  validaciones?: Array<{ id: string; decision: 'aprobado' | 'rechazado'; moderadora_id: string; motivo_rechazo: string | null }>
}

interface SolicitudRow {
  id: string
  nombre: string
  mail: string
  pais: string
  organizacion: string | null
  motivo: string
  como_se_entero: string
  estado: 'pendiente' | 'aprobada' | 'rechazada'
  creado_at: string
}

type Tab = 'validar' | 'pendiente' | 'aprobado' | 'rechazado' | 'solicitudes' | 'crear'

const TABS: Tab[] = ['validar', 'pendiente', 'aprobado', 'rechazado', 'solicitudes', 'crear']

const CASE_TYPE_COLORS: Record<CaseRow['tipo'], { bg: string; text: string; border: string }> = {
  femicidio: { bg: '#be123c18', text: '#be123c', border: '#be123c33' },
  abuso: { bg: '#7c3aed18', text: '#7c3aed', border: '#7c3aed33' },
  acoso: { bg: '#db277718', text: '#db2777', border: '#db277733' },
}

type BadgeTone = 'neutral' | 'rose' | 'pink' | 'violet' | 'emerald' | 'amber' | 'red' | 'orange'
const ESTADO_COLORS: Record<CaseRow['estado'], BadgeTone> = {
  pendiente: 'amber',
  aprobado: 'emerald',
  rechazado: 'red',
}

// =================== Main ===================
export function AdminPanelClient({ lang }: { lang: Lang }) {
  return (
    <ToastProvider>
      <AdminPanelInner lang={lang} />
    </ToastProvider>
  )
}

function AdminPanelInner({ lang }: { lang: Lang }) {
  const safeLang: Lang = isLang(lang) ? lang : 'es'
  const admin = getAdmin(safeLang)
  const typeLabels = getCaseTypeLabels(safeLang) as Record<CaseRow['tipo'], string>
  const { user, profile, loading, isOwner, signOut } = useAuth()
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('validar')
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<CaseRow['tipo'] | 'all'>('all')

  // Data fetching
  const [cases, setCases] = useState<CaseRow[]>([])
  const [solicitudes, setSolicitudes] = useState<SolicitudRow[]>([])
  const [dataLoading, setDataLoading] = useState(true)

  async function fetchData() {
    setDataLoading(true)
    try {
      // Fetch all cases (mods see all) + solicitudes
      const res = await fetch('/api/admin/list', { cache: 'no-store' })
      if (res.ok) {
        const data = (await res.json()) as { cases: CaseRow[]; solicitudes: SolicitudRow[] }
        setCases(data.cases)
        setSolicitudes(data.solicitudes)
      }
    } finally {
      setDataLoading(false)
    }
  }

  useEffect(() => {
    if (!user) return
    void (async () => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDataLoading(true)
      try {
        const res = await fetch('/api/admin/list', { cache: 'no-store' })
        if (res.ok) {
          const data = (await res.json()) as { cases: CaseRow[]; solicitudes: SolicitudRow[] }
          setCases(data.cases)
          setSolicitudes(data.solicitudes)
        }
      } finally {
        setDataLoading(false)
      }
    })()
  }, [user])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-sm text-foreground-muted">Cargando...</div>
      </div>
    )
  }
  if (!user || !profile) {
    return (
      <div className="max-w-md mx-auto px-6 py-16">
        <Card padding="lg" className="text-center">
          <p className="text-foreground-muted">No estás autenticada.</p>
          <Link href={`/${safeLang}/admin/login`} className="mt-4 inline-block">
            <Button variant="primary">Iniciar sesión</Button>
          </Link>
        </Card>
      </div>
    )
  }

  const visibleCases = cases.filter((c) => {
    if (typeFilter !== 'all' && c.tipo !== typeFilter) return false
    if (search) {
      const q = search.toLowerCase()
      if (
        !c.nombre.toLowerCase().includes(q) &&
        !c.pais.toLowerCase().includes(q) &&
        !(c.ciudad?.toLowerCase().includes(q) ?? false)
      ) return false
    }
    return true
  })

  const byTab: Record<Tab, CaseRow[]> = {
    validar: visibleCases.filter((c) => {
      if (c.estado !== 'pendiente') return false
      // "Validar" = pendiente AND I haven't voted yet
      return !(c.validaciones ?? []).some((v) => v.moderadora_id === user.id)
    }),
    pendiente: visibleCases.filter((c) => c.estado === 'pendiente'),
    aprobado: visibleCases.filter((c) => c.estado === 'aprobado'),
    rechazado: visibleCases.filter((c) => c.estado === 'rechazado'),
    solicitudes: [],
    crear: [],
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-black text-foreground m-0">{admin.panel.title}</h1>
          <p className="text-sm text-foreground-muted mt-1 max-w-2xl m-0">{admin.panel.subtitle}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-xs text-foreground-muted">{admin.panel.loggedInAs}</div>
          <div className="text-sm font-semibold flex items-center gap-2 justify-end">
            {profile.email}
            <Badge tone={isOwner ? 'rose' : 'violet'} size="sm">
              {isOwner ? admin.panel.owner : admin.panel.mod}
            </Badge>
          </div>
          <button
            type="button"
            onClick={async () => {
              await signOut()
              router.push(`/${safeLang}/admin/login`)
            }}
            className="text-xs text-foreground-muted hover:text-foreground mt-1 underline"
          >
            {admin.panel.logout}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto border-b border-border mb-6" role="tablist">
        {TABS.map((t) => {
          const count = t === 'solicitudes' ? solicitudes.length : byTab[t].length
          return (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={clsx(
                'px-4 py-2.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors',
                tab === t
                  ? 'border-rose-700 text-rose-700'
                  : 'border-transparent text-foreground-muted hover:text-foreground',
              )}
            >
              {admin.tabs[t]}
              {count > 0 ? (
                <span className="ml-1.5 inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-rose-700 text-white text-[10px] font-bold">
                  {count}
                </span>
              ) : null}
            </button>
          )
        })}
      </div>

      {/* Filters — only for case tabs */}
      {tab !== 'solicitudes' && tab !== 'crear' ? (
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            type="button"
            onClick={() => setTypeFilter('all')}
            className={clsx(
              'px-3 py-1.5 text-xs font-semibold rounded-full border transition-colors',
              typeFilter === 'all'
                ? 'bg-foreground text-background border-foreground'
                : 'bg-surface text-foreground-muted border-border hover:bg-surface-3',
            )}
          >
            {admin.filters.all}
          </button>
          {(['femicidio', 'abuso', 'acoso'] as const).map((t) => {
            const c = CASE_TYPE_COLORS[t]
            return (
              <button
                key={t}
                type="button"
                onClick={() => setTypeFilter(t)}
                className={clsx(
                  'px-3 py-1.5 text-xs font-semibold rounded-full border transition-colors',
                  typeFilter === t
                    ? 'border-transparent'
                    : 'border-border hover:opacity-80',
                )}
                style={
                  typeFilter === t
                    ? { background: c.bg, color: c.text, borderColor: c.border }
                    : { background: 'transparent', color: c.text }
                }
              >
                {typeLabels[t]}
              </button>
            )
          })}
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={admin.filters.search}
            className="ml-auto px-3 py-1.5 text-xs rounded-full bg-surface-2 border border-border text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-input-focus min-w-[240px]"
          />
        </div>
      ) : null}

      {/* Tab content */}
      {dataLoading ? (
        <Card padding="lg" className="text-center text-foreground-muted text-sm">Cargando datos...</Card>
      ) : tab === 'solicitudes' ? (
        <SolicitudesTab solicitudes={solicitudes} lang={safeLang} onChange={fetchData} />
      ) : tab === 'crear' ? (
        <CreateCaseTab lang={safeLang} onCreated={fetchData} />
      ) : (
        <CasesTab
          tab={tab}
          cases={byTab[tab]}
          typeLabels={typeLabels}
          userId={user.id}
          isOwner={isOwner}
          onVote={fetchData}
          lang={safeLang}
        />
      )}
    </div>
  )
}

// =================== Cases tab ===================
function CasesTab({
  tab,
  cases,
  typeLabels,
  userId,
  isOwner,
  onVote,
  lang,
}: {
  tab: Tab
  cases: CaseRow[]
  typeLabels: Record<CaseRow['tipo'], string>
  userId: string
  isOwner: boolean
  onVote: () => Promise<void>
  lang: Lang
}) {
  const admin = getAdmin(lang)
  const { toast } = useToast()
  const [editing, setEditing] = useState<CaseRow | null>(null)
  const [deleting, setDeleting] = useState<CaseRow | null>(null)

  if (cases.length === 0) {
    return (
      <Card padding="lg">
        <EmptyState
          icon={tab === 'aprobado' ? '✅' : tab === 'rechazado' ? '❌' : '🗂️'}
          title={admin.empty[tab]}
        />
      </Card>
    )
  }

  return (
    <div className="grid gap-3">
      {cases.map((c) => (
        <CaseRowCard
          key={c.id}
          case_={c}
          typeLabels={typeLabels}
          userId={userId}
          isOwner={isOwner}
          onVote={onVote}
          onEdit={() => setEditing(c)}
          onDelete={() => setDeleting(c)}
          lang={lang}
        />
      ))}

      {editing ? (
        <EditCaseModal
          case_={editing}
          onClose={() => setEditing(null)}
          onSaved={async () => {
            setEditing(null)
            await onVote()
            toast({ tone: 'success', title: admin.edit.saved })
          }}
          lang={lang}
        />
      ) : null}
      {deleting ? (
        <DeleteCaseModal
          case_={deleting}
          onClose={() => setDeleting(null)}
          onDeleted={async () => {
            setDeleting(null)
            await onVote()
            toast({ tone: 'success', title: admin.delete.deleted })
          }}
          lang={lang}
        />
      ) : null}
    </div>
  )
}

// =================== Case row card ===================
function CaseRowCard({
  case_,
  typeLabels,
  userId,
  isOwner,
  onVote,
  onEdit,
  onDelete,
  lang,
}: {
  case_: CaseRow
  typeLabels: Record<CaseRow['tipo'], string>
  userId: string
  isOwner: boolean
  onVote: () => Promise<void>
  onEdit: () => void
  onDelete: () => void
  lang: Lang
}) {
  const admin = getAdmin(lang)
  const { toast } = useToast()
  const [voting, setVoting] = useState<'aprobado' | 'rechazado' | null>(null)
  const [rejectReason, setRejectReason] = useState('')
  const [showRejectInput, setShowRejectInput] = useState(false)

  const c = CASE_TYPE_COLORS[case_.tipo]
  const validaciones = case_.validaciones ?? []
  const approvals = validaciones.filter((v) => v.decision === 'aprobado').length
  const rejections = validaciones.filter((v) => v.decision === 'rechazado').length
  const myVote = validaciones.find((v) => v.moderadora_id === userId)

  async function vote(decision: 'aprobado' | 'rechazado', motivo_rechazo?: string) {
    setVoting(decision)
    const res = await fetch('/api/admin/vote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ caso_id: case_.id, decision, motivo_rechazo: motivo_rechazo ?? null }),
    })
    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { error?: string }
      const errorKey = res.status === 409 && data.error?.includes('Ya votaste')
        ? 'alreadyVoted'
        : res.status === 409 && data.error?.includes('ya no está pendiente')
        ? 'noLongerPending'
        : null
      const params: { tone: 'error'; title: string; description?: string } = {
        tone: 'error',
        title: errorKey ? admin.vote[errorKey] : admin.vote.error,
      }
      if (data.error) params.description = data.error
      toast(params)
    } else {
      toast({ tone: decision === 'aprobado' ? 'success' : 'info', title: decision === 'aprobado' ? admin.vote.approved : admin.vote.rejected })
      await onVote()
    }
    setVoting(null)
    setShowRejectInput(false)
    setRejectReason('')
  }

  return (
    <Card padding="md" className="hover:border-border-strong transition-colors">
      <div className="flex items-start gap-4">
        <div
          className="flex items-center justify-center rounded-full text-xl flex-shrink-0"
          style={{ width: 48, height: 48, background: c.bg, border: `1px solid ${c.border}` }}
          aria-hidden
        >
          {case_.tipo === 'femicidio' ? '🌸' : case_.tipo === 'abuso' ? '⚠️' : '💢'}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 flex-wrap mb-1">
            <Badge tone={(ESTADO_COLORS[case_.estado as keyof typeof ESTADO_COLORS] ?? 'neutral') as BadgeTone} size="sm">{case_.estado}</Badge>
            <span
              className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
              style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}
            >
              {typeLabels[case_.tipo]}
            </span>
            {case_.proceso_judicial ? (
              <Badge tone={case_.proceso_judicial === 'cerrado' ? 'emerald' : 'orange'} size="sm">
                {case_.proceso_judicial === 'cerrado' ? 'Proceso cerrado' : 'En proceso'}
              </Badge>
            ) : null}
          </div>

          <h3 className="text-base font-bold text-foreground m-0 mb-0.5">{case_.nombre}</h3>
          {case_.victima ? <p className="text-xs text-violet-700 m-0">Víctima: {case_.victima}</p> : null}
          <p className="text-xs text-foreground-muted m-0 mt-0.5">
            {case_.fecha} · {case_.pais}{case_.ciudad ? `, ${case_.ciudad}` : ''}
          </p>

          {validaciones.length > 0 ? (
            <p className="text-xs text-foreground-muted mt-2 m-0">
              {admin.case.votesCast}: {approvals} ✅ / {rejections} ❌
            </p>
          ) : null}

          {myVote ? (
            <Badge tone="violet" className="mt-2">{admin.case.alreadyVoted}</Badge>
          ) : case_.estado === 'pendiente' ? (
            <div className="flex flex-wrap gap-2 mt-3">
              <Button
                variant="primary"
                size="sm"
                loading={voting === 'aprobado'}
                onClick={() => void vote('aprobado')}
              >
                {admin.case.approve}
              </Button>
              {!showRejectInput ? (
                <Button
                  variant="danger"
                  size="sm"
                  loading={voting === 'rechazado'}
                  onClick={() => setShowRejectInput(true)}
                >
                  {admin.case.reject}
                </Button>
              ) : (
                <div className="flex-1 flex flex-col gap-2 min-w-[200px]">
                  <input
                    type="text"
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder={admin.case.rejectionReason}
                    className="px-3 py-1.5 text-xs rounded-md bg-surface-2 border border-input text-foreground focus:outline-none focus:border-input-focus"
                  />
                  <div className="flex gap-2">
                    <Button
                      variant="danger"
                      size="sm"
                      loading={voting === 'rechazado'}
                      onClick={() => void vote('rechazado', rejectReason)}
                    >
                      {admin.case.reject}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => { setShowRejectInput(false); setRejectReason('') }}>
                      ✕
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5 flex-shrink-0">
          <Link href={`/${lang}/casos/${case_.id}`} target="_blank" className="text-xs text-pink-600 hover:underline whitespace-nowrap">
            {admin.case.viewDetail} →
          </Link>
          {isOwner ? (
            <>
              <button
                type="button"
                onClick={onEdit}
                className="text-xs text-violet-600 hover:underline text-left"
              >
                {admin.case.edit}
              </button>
              <button
                type="button"
                onClick={onDelete}
                className="text-xs text-red-600 hover:underline text-left"
              >
                {admin.case.delete}
              </button>
            </>
          ) : null}
        </div>
      </div>
    </Card>
  )
}

// =================== Edit modal ===================
function EditCaseModal({ case_, onClose, onSaved, lang }: { case_: CaseRow; onClose: () => void; onSaved: () => Promise<void>; lang: Lang }) {
  const admin = getAdmin(lang)
  const { toast } = useToast()
  const [form, setForm] = useState({
    nombre: case_.nombre,
    victima: case_.victima ?? '',
    fecha: case_.fecha,
    tipo: case_.tipo,
    pais: case_.pais,
    ciudad: case_.ciudad ?? '',
    descripcion: case_.descripcion ?? '',
    estado: case_.estado,
  })
  const [saving, setSaving] = useState(false)

  async function save() {
    setSaving(true)
    const res = await fetch(`/api/admin/cases/${case_.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { error?: string }
      const p: { tone: 'error'; title: string; description?: string } = { tone: 'error', title: admin.edit.error }
      if (data.error) p.description = data.error
      toast(p)
    } else {
      await onSaved()
    }
    setSaving(false)
  }

  return (
    <Modal
      open
      onClose={onClose}
      title={admin.edit.title}
      size="lg"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button variant="primary" onClick={() => void save()} loading={saving}>
            {saving ? admin.edit.saving : admin.edit.save}
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-3">
        <input className="input" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} placeholder="Nombre" />
        <input className="input" value={form.victima} onChange={(e) => setForm({ ...form, victima: e.target.value })} placeholder="Víctima" />
        <input className="input" type="date" value={form.fecha} onChange={(e) => setForm({ ...form, fecha: e.target.value })} />
        <select className="input" value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value as CaseRow['tipo'] })}>
          <option value="femicidio">Femicidio</option>
          <option value="abuso">Abuso</option>
          <option value="acoso">Acoso</option>
        </select>
        <input className="input" value={form.pais} onChange={(e) => setForm({ ...form, pais: e.target.value })} placeholder="País" />
        <input className="input" value={form.ciudad} onChange={(e) => setForm({ ...form, ciudad: e.target.value })} placeholder="Ciudad" />
        <textarea className="input" rows={3} value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} placeholder="Descripción" />
        <select className="input" value={form.estado} onChange={(e) => setForm({ ...form, estado: e.target.value as CaseRow['estado'] })}>
          <option value="pendiente">Pendiente</option>
          <option value="aprobado">Aprobado</option>
          <option value="rechazado">Rechazado</option>
        </select>
      </div>
      <style jsx>{`
        .input {
          padding: 0.5rem 0.75rem;
          border-radius: 0.5rem;
          background: var(--color-surface-2);
          border: 1px solid var(--color-input);
          font-size: 0.875rem;
          color: var(--color-foreground);
          width: 100%;
        }
        .input:focus {
          outline: none;
          border-color: var(--color-input-focus);
        }
      `}</style>
    </Modal>
  )
}

// =================== Delete modal ===================
function DeleteCaseModal({ case_, onClose, onDeleted, lang }: { case_: CaseRow; onClose: () => void; onDeleted: () => Promise<void>; lang: Lang }) {
  const admin = getAdmin(lang)
  const { toast } = useToast()
  const [deleting, setDeleting] = useState(false)

  async function confirm() {
    setDeleting(true)
    const res = await fetch(`/api/admin/cases/${case_.id}`, { method: 'DELETE' })
    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { error?: string }
      const p: { tone: 'error'; title: string; description?: string } = { tone: 'error', title: 'Error' }
      if (data.error) p.description = data.error
      toast(p)
    } else {
      await onDeleted()
    }
    setDeleting(false)
  }

  return (
    <Modal
      open
      onClose={onClose}
      title={admin.delete.title}
      size="sm"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button variant="danger" onClick={() => void confirm()} loading={deleting}>
            {admin.delete.yes}
          </Button>
        </>
      }
    >
      <p className="text-sm text-foreground m-0">{admin.delete.confirm}</p>
      <p className="text-xs text-amber-700 mt-2 m-0 bg-amber-50 border border-amber-200 rounded p-2">
        ⚠️ {admin.delete.warning}
      </p>
    </Modal>
  )
}

// =================== Solicitudes tab ===================
function SolicitudesTab({ solicitudes, lang, onChange }: { solicitudes: SolicitudRow[]; lang: Lang; onChange: () => Promise<void> }) {
  const admin = getAdmin(lang)
  const { toast } = useToast()
  const [filter, setFilter] = useState<'pendiente' | 'aprobada' | 'rechazada' | 'all'>('pendiente')
  const isOwner = useAuth().isOwner

  if (!isOwner) {
    return (
      <Card padding="lg" className="text-center">
        <EmptyState icon="🔒" title="Acceso restringido" description="Solo owners pueden ver solicitudes de moderación." />
      </Card>
    )
  }

  const filtered = filter === 'all' ? solicitudes : solicitudes.filter((s) => s.estado === filter)

  async function decide(id: string, decision: 'aprobada' | 'rechazada') {
    const res = await fetch(`/api/admin/solicitud/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ decision }),
    })
    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { error?: string }
      const p: { tone: 'error'; title: string; description?: string } = { tone: 'error', title: 'Error' }
      if (data.error) p.description = data.error
      toast(p)
    } else {
      toast({ tone: 'success', title: decision === 'aprobada' ? admin.solicitud.approved_ok : admin.solicitud.rejected_ok })
      await onChange()
    }
  }

  return (
    <div>
      <div className="flex gap-2 mb-3">
        {(['pendiente', 'aprobada', 'rechazada', 'all'] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={clsx(
              'px-3 py-1.5 text-xs font-semibold rounded-full border transition-colors',
              filter === f
                ? 'bg-foreground text-background border-foreground'
                : 'bg-surface text-foreground-muted border-border hover:bg-surface-3',
            )}
          >
            {f === 'all' ? 'Todas' : f === 'pendiente' ? admin.solicitud.pending : f === 'aprobada' ? admin.solicitud.approved : admin.solicitud.rejected}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <Card padding="lg"><EmptyState icon="📬" title={admin.empty.solicitudes} /></Card>
      ) : (
        <div className="grid gap-3">
          {filtered.map((s) => (
            <Card key={s.id} padding="md">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-foreground m-0">{s.nombre}</h3>
                  <p className="text-xs text-foreground-muted m-0">{s.mail} · {s.pais}{s.organizacion ? ` · ${s.organizacion}` : ''}</p>
                  <p className="text-xs text-foreground-muted m-0 mt-0.5">Cómo se enteró: {s.como_se_entero}</p>
                  <p className="text-sm text-foreground mt-2 m-0 italic">&ldquo;{s.motivo}&rdquo;</p>
                </div>
                {s.estado === 'pendiente' ? (
                  <div className="flex gap-2 flex-shrink-0">
                    <Button variant="primary" size="sm" onClick={() => void decide(s.id, 'aprobada')}>
                      {admin.solicitud.approve}
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => void decide(s.id, 'rechazada')}>
                      {admin.solicitud.reject}
                    </Button>
                  </div>
                ) : (
                  <Badge tone={(s.estado === 'aprobada' ? 'emerald' : 'red') as BadgeTone} size="md">{s.estado}</Badge>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

// =================== Create tab (mod-created case) ===================
function CreateCaseTab({ lang, onCreated }: { lang: Lang; onCreated: () => Promise<void> }) {
  const admin = getAdmin(lang)
  const { toast } = useToast()
  const [form, setForm] = useState({
    nombre: '',
    victima: '',
    fecha: '',
    tipo: 'femicidio' as CaseRow['tipo'],
    pais: '',
    ciudad: '',
    descripcion: '',
    lat: 0,
    lng: 0,
    fuentes: '',
  })
  const [submitting, setSubmitting] = useState(false)

  async function submit() {
    setSubmitting(true)
    const res = await fetch('/api/admin/cases', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        victima: form.victima || null,
        fuentes: form.fuentes.split('\n').map((s) => s.trim()).filter(Boolean),
      }),
    })
    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { error?: string }
      const p: { tone: 'error'; title: string; description?: string } = { tone: 'error', title: admin.create.error }
      if (data.error) p.description = data.error
      toast(p)
    } else {
      toast({ tone: 'success', title: admin.create.created })
      setForm({ nombre: '', victima: '', fecha: '', tipo: 'femicidio', pais: '', ciudad: '', descripcion: '', lat: 0, lng: 0, fuentes: '' })
      await onCreated()
    }
    setSubmitting(false)
  }

  return (
    <Card padding="lg">
      <h2 className="text-lg font-bold text-foreground mb-1">{admin.create.title}</h2>
      <p className="text-sm text-foreground-muted mb-6">{admin.create.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input className="input-admin" placeholder="Nombre del agresor" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
        <input className="input-admin" placeholder="Víctima" value={form.victima} onChange={(e) => setForm({ ...form, victima: e.target.value })} />
        <input className="input-admin" type="date" value={form.fecha} onChange={(e) => setForm({ ...form, fecha: e.target.value })} />
        <select className="input-admin" value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value as CaseRow['tipo'] })}>
          <option value="femicidio">Femicidio</option>
          <option value="abuso">Abuso</option>
          <option value="acoso">Acoso</option>
        </select>
        <input className="input-admin" placeholder="País" value={form.pais} onChange={(e) => setForm({ ...form, pais: e.target.value })} />
        <input className="input-admin" placeholder="Ciudad" value={form.ciudad} onChange={(e) => setForm({ ...form, ciudad: e.target.value })} />
        <input className="input-admin" type="number" step="0.0001" placeholder="Latitud" value={form.lat} onChange={(e) => setForm({ ...form, lat: parseFloat(e.target.value) || 0 })} />
        <input className="input-admin" type="number" step="0.0001" placeholder="Longitud" value={form.lng} onChange={(e) => setForm({ ...form, lng: parseFloat(e.target.value) || 0 })} />
        <textarea className="input-admin md:col-span-2" rows={3} placeholder="Descripción" value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} />
        <textarea className="input-admin md:col-span-2" rows={2} placeholder="Fuentes (una por línea)" value={form.fuentes} onChange={(e) => setForm({ ...form, fuentes: e.target.value })} />
      </div>
      <div className="mt-6">
        <Button variant="primary" size="md" loading={submitting} onClick={() => void submit()}>
          {submitting ? admin.create.submitting : admin.create.submit}
        </Button>
      </div>
      <style jsx>{`
        .input-admin {
          padding: 0.5rem 0.75rem;
          border-radius: 0.5rem;
          background: var(--color-surface-2);
          border: 1px solid var(--color-input);
          font-size: 0.875rem;
          color: var(--color-foreground);
          width: 100%;
        }
        .input-admin:focus {
          outline: none;
          border-color: var(--color-input-focus);
        }
      `}</style>
    </Card>
  )
}

// =================== Utils ===================
