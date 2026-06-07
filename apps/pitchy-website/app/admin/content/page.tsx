"use client"

import { useState, useEffect } from "react"

const ADMIN_SECRET = process.env.NEXT_PUBLIC_ADMIN_SECRET || process.env.ADMIN_SECRET || ""

export default function AdminContentPage() {
  const [content, setContent] = useState<Record<string, any> | null>(null)
  const [editingKey, setEditingKey] = useState<string | null>(null)
  const [editValue, setEditValue] = useState("")
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState("")

  useEffect(() => {
    fetch("/api/content")
      .then(r => r.json())
      .then(data => setContent(data))
      .catch(() => setMsg("Error cargando contenido"))
  }, [])

  const save = async () => {
    if (!content) return
    setSaving(true)
    setMsg("")
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${ADMIN_SECRET}`,
        },
        body: JSON.stringify({ content }),
      })
      const data = await res.json()
      setMsg(data.success ? "Guardado" : `Error: ${data.error}`)
    } catch (e: any) {
      setMsg(`Error: ${e.message}`)
    }
    setSaving(false)
  }

  const flatten = (obj: any, prefix = ""): [string, string][] => {
    const result: [string, string][] = []
    for (const [k, v] of Object.entries(obj || {})) {
      const key = prefix ? `${prefix}.${k}` : k
      if (typeof v === "string" || typeof v === "number") {
        result.push([key, String(v)])
      } else if (typeof v === "object" && v !== null) {
        result.push(...flatten(v, key))
      }
    }
    return result
  }

  const deepSet = (obj: any, path: string, value: string) => {
    const parts = path.split(".")
    const clone = JSON.parse(JSON.stringify(obj))
    let cur: any = clone
    for (let i = 0; i < parts.length - 1; i++) {
      if (!cur[parts[i]]) cur[parts[i]] = {}
      cur = cur[parts[i]]
    }
    cur[parts[parts.length - 1]] = value
    return clone
  }

  if (!content) return <div className="p-8 text-center">Cargando...</div>

  const fields = flatten(content)

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Editar Contenido</h1>
        <button
          onClick={save}
          disabled={saving}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? "Guardando..." : "Guardar todo"}
        </button>
      </div>
      {msg && (
        <div className={`mb-4 p-3 rounded ${msg.startsWith("Error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
          {msg}
        </div>
      )}
      <div className="space-y-2">
        {fields.map(([key, value]) => (
          <div key={key} className="flex items-start gap-2 border-b pb-2">
            <label className="w-1/3 text-xs font-mono text-gray-500 pt-2 break-all">{key}</label>
            {editingKey === key ? (
              <div className="flex-1 flex gap-1">
                <input
                  className="flex-1 border rounded px-2 py-1 text-sm"
                  value={editValue}
                  onChange={e => setEditValue(e.target.value)}
                  autoFocus
                />
                <button
                  className="text-green-600 text-sm px-2"
                  onClick={() => {
                    setContent(deepSet(content, key, editValue))
                    setEditingKey(null)
                  }}
                >OK</button>
                <button className="text-gray-400 text-sm px-2" onClick={() => setEditingKey(null)}>X</button>
              </div>
            ) : (
              <div
                className="flex-1 text-sm cursor-pointer hover:bg-yellow-50 px-2 py-1 rounded"
                onClick={() => { setEditingKey(key); setEditValue(value) }}
                title="Click para editar"
              >
                {value || <span className="text-gray-300 italic">vacío</span>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
