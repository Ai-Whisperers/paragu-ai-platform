// VoiceDoctor — empathy audible + visible (Insight 1).
// Audio intro with transcript fallback. Audio file may not yet exist on the
// server; if 404, the transcript becomes the primary reading path.

import { Mic, FileText } from "lucide-react"
import en from "@/content/en/voice-doctor.json"
import es from "@/content/es/voice-doctor.json"

export function VoiceDoctor({ locale }: { locale: string }) {
  const isEs = locale === "es"
  const data = isEs ? es : en
  const hasAudio = Boolean(data.audio_src)

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

        <div className={hasAudio
          ? "grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start"
          : "max-w-2xl mx-auto"}>
          {hasAudio && (
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
            </div>
          )}

          <div>
            <div className="flex items-center gap-2 mb-3 text-fg-muted">
              <FileText className="w-4 h-4" aria-hidden="true" />
              <span className="text-sm font-medium uppercase tracking-wide">
                {data.transcript_title}
              </span>
            </div>
            <blockquote
              className="voice-doctor"
            >
              {data.transcript_body}
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}