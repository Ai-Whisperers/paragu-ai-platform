export const featureRegistry: Record<string, boolean> = {}
export const enableFeature = (key: string) => { featureRegistry[key] = true }
export const disableFeature = (key: string) => { featureRegistry[key] = false }
export const hasFeature = (key: string) => !!featureRegistry[key]
