'use client'

import React from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { resolveContent, DEFAULT_SECTIONS } from '@ai-whisperers/sections'
import { isSectionEnabled } from '@ai-whisperers/sections/renderer'
import { ProcessSection } from './ProcessSection'
import { DevHeroSection } from './dev/DevHeroSection'
import { DevWhyCountrySection } from './dev/DevWhyCountrySection'
import { DevCtaBanner } from './dev/DevCtaBanner'
import { DevComplianceSection } from './dev/DevComplianceSection'
import { MotionSection } from './dev/MotionSection'

const SECTION_OVERRIDES: Record<string, any> = {
  'hero': DevHeroSection,
  'why-destination': DevWhyCountrySection,
  'why-country': DevWhyCountrySection,
  'pillars': DevWhyCountrySection,
  'cta-banner': DevCtaBanner,
  'cta': DevCtaBanner,
  'compliance': DevComplianceSection,
  'compliance-disclaimer': DevComplianceSection,
  'process-timeline': ProcessSection,
  'process': ProcessSection,
}

const SKIP_REVEAL = new Set(['hero', 'compliance', 'compliance-disclaimer', 'cta-banner', 'cta'])

export default function SectionsRenderer({ pageConfig, content, images, locale }: any) {
  const sections = pageConfig?.sections || []
  const mergedMap = { ...DEFAULT_SECTIONS, ...SECTION_OVERRIDES }

  return (
    <div className="font-inter text-text-primary">
      {content?.navigation && <Header navigation={content.navigation} locale={locale} />}
      <main>
        {sections.map((section: any, idx: number) => {
          if (section.enabledWhen && !isSectionEnabled(section.enabledWhen, content)) return null
          const Comp = mergedMap[section.id]
          if (!Comp) return null
          const sectionData = resolveContent(content, section.content || section.id)
          const element = (
            <Comp
              key={section.id || idx}
              pageContent={sectionData || content}
              data={sectionData}
              images={images}
              locale={locale}
            />
          )

          if (SKIP_REVEAL.has(section.id)) {
            return <React.Fragment key={section.id || idx}>{element}</React.Fragment>
          }

          return (
            <MotionSection key={section.id || idx} sectionId={section.id}>
              {element}
            </MotionSection>
          )
        })}
      </main>
      {content?.footer && <Footer footer={content.footer} />}
    </div>
  )
}
