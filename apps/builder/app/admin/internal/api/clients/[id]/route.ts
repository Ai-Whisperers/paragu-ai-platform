import { NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const DATA_DIR = '/app/data'
const CLIENTS_FILE = join(DATA_DIR, 'clients.json')

interface ClientRecord {
  id: string
  status?: string
  [k: string]: unknown
}

interface ClientsFile {
  clients: ClientRecord[]
}

function loadData(): ClientsFile {
  return JSON.parse(readFileSync(CLIENTS_FILE, 'utf8')) as ClientsFile
}
function saveData(data: ClientsFile) {
  writeFileSync(CLIENTS_FILE, JSON.stringify(data, null, 2))
}

// Next.js 16: dynamic route segment `params` is a Promise.
type Ctx = { params: Promise<{ id: string }> }

export async function GET(_req: Request, { params }: Ctx) {
  const { id } = await params
  const raw = loadData()
  const client = raw.clients.find((c) => String(c.id) === String(id))
  if (!client) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ client })
}

export async function PUT(req: Request, { params }: Ctx) {
  try {
    const { id } = await params
    const body = (await req.json()) as Record<string, unknown>
    const raw = loadData()
    const idx = raw.clients.findIndex((c) => String(c.id) === String(id))
    if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    raw.clients[idx] = { ...raw.clients[idx], ...body } as ClientRecord
    saveData(raw)
    return NextResponse.json({ success: true, client: raw.clients[idx] })
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function DELETE(_req: Request, { params }: Ctx) {
  try {
    const { id } = await params
    const raw = loadData()
    const idx = raw.clients.findIndex((c) => String(c.id) === String(id))
    if (idx !== -1) {
      raw.clients[idx].status = 'deleted'
      saveData(raw)
    }
    return NextResponse.json({ success: true })
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
