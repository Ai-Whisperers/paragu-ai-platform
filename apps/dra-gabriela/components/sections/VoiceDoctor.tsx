// VoiceDoctor — empathy audible + visible (Insight 1).
// Audio intro with transcript fallback. Audio file may not yet exist on the
// server; if 404, the transcript becomes the primary reading path.
//
// Robust to placeholder-vs-real MP3:
// - If audio_src is empty → skip the audio card entirely (transcript only).
// - If audio_src points to a real file → render <audio> + graceful fallback
//   when the file 404s (hide the audio card, surface a one-line note).
// - The same component handles three states: real MP3, placeholder MP3, and
//   no MP3 at all. State is declared in the JSON, not hardcoded here.

"use client"

import { useEffect, useState } from "react"
import { Mic, FileText, AlertCircle } from "lucide-react"
import en from "@/content/en/voice-doctor.json"
import es from "@/content/es/voice-doctor.json"

type VoiceData = {
  eyebrow: string
  title: string
  audio_label: string
  audio_src: string
  transcript_title: string
  transcript_body: string
  audio_note: { es: string; en: string }
}

export function VoiceDoctor({ locale }: { locale: string }) {
  const isEs = locale === "es"
  const data: VoiceData = isEs ? es : en
  const declaredAudio = Boolean(data.audio_src)

  // Verify the audio actually loads. If HEAD returns 404 or the file is
  // missing, we hide the audio card rather than showing a broken player.
  const [audioAvailable, setAudioAvailable] = useState<boolean | null>(null)
  useEffect(() => {
    if (!declaredAudio) {
      setAudioAvailable(false)
      return
    }
    let cancelled = false
    fetch(data.audio_src, { method: "HEAD" })
      .then((r) => {
        if (!cancelled) setAudioAvailable(r.ok)
      })
      .catch(() => {
        if (!cancelled) setAudioAvailable(false)
      })
    return () => {
      cancelled = true
    }
  }, [declaredAudio, data.audio_src])

  const showAudio = declaredAudio && audioAvailable !== false
  const showPlaceholder = declaredAudio && audioAvailable === false

  return (
    <section
      className="tone-ocean-1"
      aria-labelledby="voice-doctor-heading"
      role="region"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="eyebrow inline-flex items-center gap-2">
            <Mic className="w-4 h-4" aria-hidden="true" />
            {data.eyebrow}
          </span>
          <h2
            id="voice-doctor-heading"
            className="text-3xl md:text-4xl font-heading font-semibold mt-3"
            style={{ color: "var(--navy)" }}
          >
            {data.title}
          </h2>
        </div>

        <div className={showAudio
          ? "grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start"
          : "max-w-2xl mx-auto"}>
          {showAudio && (
            <div className="bg-bg rounded-2xl border border-border p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-accent text-white"
                  aria-hidden="true"
                >
                  <Mic className="w-5 h-5" />
                </div>
                <p className="text-sm font-medium">{data.audio_label}</p>
              </div>
              <audio
                controls
                preload="metadata"
                className="w-full"
                aria-label={data.audio_label}
              >
                <source src={data.audio_src} type="audio/mpeg" />
              </audio>
              <p className="mt-3 text-xs text-fg-muted leading-relaxed">
                {data.audio_note[isEs ? "es" : "en"]}
              </p>
            </div>
          )}

          {showPlaceholder && (
            <div className="hidden md:flex bg-bg rounded-2xl border border-border-light p-5 text-xs text-fg-muted items-start gap-2">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
              <p>{data.audio_note[isEs ? "es" : "en"]}</p>
            </div>
          )}

          <div>
            <div className="flex items-center gap-2 mb-3 text-fg-muted">
              <FileText className="w-4 h-4" aria-hidden="true" />
              <span className="text-sm font-medium uppercase tracking-wide">
                {data.transcript_title}
              </span>
            </div>
            <blockquote className="voice-doctor">
              {data.transcript_body}
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}