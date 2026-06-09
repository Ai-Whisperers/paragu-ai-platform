export function PaymentMethods({ methods }: { methods: any[] }) {
  if (!methods || methods.length === 0) return null
  return (
    <div className="space-y-2">
      {methods.map((m, i) => (
        <div key={i} className="flex items-center gap-3 rounded-lg border border-border bg-surface p-3 text-sm">
          <span className="text-lg">{m.icon}</span>
          <div>
            <p className="font-medium text-foreground">{m.name}</p>
            {m.details && <p className="text-xs text-muted-foreground">{m.details}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}
