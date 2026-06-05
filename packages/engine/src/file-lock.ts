import * as fs from "fs"

export const LOCK_EX = "LOCK_EX"
export const LOCK_UN = "LOCK_UN"

export function flockSync(fd: number, cmd: "LOCK_EX" | "LOCK_UN"): void {
  try {
    const fn = (fs as unknown as { flockSync: (fd: number, op: string) => void }).flockSync
    fn(fd, cmd === "LOCK_EX" ? "exclusive" : "unlock")
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error(`[file-lock] flockSync failed: ${msg}`)
  }
}