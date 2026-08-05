// Local copy of resolveImage for the dev app.
// Mirrors @ai-whisperers/sections/resolve-content without depending on the
// subpath export.

export function resolveImage(images: any, ref: string | undefined): string {
  if (!ref || !images) return ''
  const key = ref.replace('@img:', '').replace('@src:', '')
  const parts = key.split('.')
  let obj: any = images
  for (const p of parts) {
    if (obj?.[p]) obj = obj[p]
    else return ''
  }
  return obj?.src || obj || ''
}
