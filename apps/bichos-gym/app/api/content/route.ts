import { NextRequest, NextResponse } from 'next/server'
import { writeFileSync, readFileSync } from 'fs'
import { join } from 'path'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { content } = body
    
    // Simple auth check - in production use proper auth
    const authHeader = req.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.ADMIN_SECRET || process.env.ADMIN_SECRET || ""}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const contentPath = join(process.cwd(), 'content', 'es.json')
    writeFileSync(contentPath, JSON.stringify(content, null, 2), 'utf-8')
    
    return NextResponse.json({ success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function GET() {
  try {
    const contentPath = join(process.cwd(), 'content', 'es.json')
    const raw = readFileSync(contentPath, 'utf-8')
    return NextResponse.json(JSON.parse(raw))
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
