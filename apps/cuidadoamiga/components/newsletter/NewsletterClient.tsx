'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { type NewsletterContent } from '@/lib/content-types'

interface NewsletterClientProps {
  content: NewsletterContent
}

export function NewsletterClient({ content }: NewsletterClientProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error')

      setStatus('success')
      setMessage(content.form.success)
      setEmail('')
    } catch (err) {
      setStatus('error')
      setMessage(content.form.error)
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
        {message}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={content.form.emailPlaceholder}
        required
        className="flex-1 rounded-lg border border-neutral-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 dark:border-neutral-600 dark:bg-neutral-800"
      />
      <Button type="submit" variant="primary" size="md" loading={status === 'loading'}>
        {content.form.subscribeButton}
      </Button>
      {status === 'error' && <p className="text-sm text-red-600">{message}</p>}
      <p className="text-xs text-neutral-500">{content.form.privacyNote}</p>
    </form>
  )
}