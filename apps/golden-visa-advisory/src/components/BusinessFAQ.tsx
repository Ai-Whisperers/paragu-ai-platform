'use client'

import { useState } from 'react'
import { useLocale } from '@/lib/locale-context'

export function BusinessFAQ() {
  const { t } = useLocale()
  const [activeTab, setActiveTab] = useState<'developers' | 'lawfirms' | 'banks'>('developers')

  const tabs = [
    { id: 'developers' as const, label: t.faq.forDevelopers.title },
    { id: 'lawfirms' as const, label: t.faq.forLawFirms.title },
    { id: 'banks' as const, label: t.faq.forBanks.title },
  ]

  const faqData = {
    developers: t.faq.forDevelopers,
    lawfirms: t.faq.forLawFirms,
    banks: t.faq.forBanks,
  }

  const current = faqData[activeTab]

  return (
    <div className="max-w-3xl mx-auto px-6">
      <h2 className="section-title gradient-gold">{t.faq.title}</h2>

      {/* Tabs */}
      <div className="flex border-b border-border mb-8 mt-10">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-muted hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {current.items.map((item, i) => (
          <details key={i} className="glass-panel rounded-xl [&[open]]:border-primary/30 transition-all">
            <summary className="px-6 py-4 cursor-pointer font-medium text-sm hover:text-primary transition-colors list-none flex items-center justify-between">
              <span>{item.q}</span>
              <span className="text-primary text-lg ml-4">+</span>
            </summary>
            <div className="px-6 pb-4 text-sm text-muted leading-relaxed border-t border-border pt-4">
              {item.a}
            </div>
          </details>
        ))}
      </div>
    </div>
  )
}
