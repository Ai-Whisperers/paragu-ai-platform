import { beforeEach, afterEach } from "vitest"
import * as fs from "fs"
import crypto from "crypto"

process.env.NEXT_PUBLIC_SITE_URL = "http://localhost:3000"
process.env.DATA_DIR = ""
process.env.SITE_SLUG = "test-site"
process.env.CLIENT_AUTH_SECRET = "test-secret-must-be-at-least-24-chars-long-for-tests"
process.env.ADMIN_AUTH_SECRET = "test-secret-must-be-at-least-24-chars-long-for-tests"
process.env.STRIPE_SECRET_KEY = "sk_test_mock"
process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = "pk_test_mock"
process.env.SUPABASE_URL = "https://mock.supabase.co"
process.env.SUPABASE_SERVICE_ROLE_KEY = "mock-service-role-key"

const usedDirs: string[] = []

beforeEach(() => {
  const id = crypto.randomUUID()
  const testDataDir = `/tmp/test-data-${id}`
  process.env.DATA_DIR = testDataDir
  usedDirs.push(testDataDir)
})

afterEach(() => {
  for (const dir of usedDirs) {
    try {
      if (fs.existsSync(dir)) {
        fs.rmSync(dir, { recursive: true, force: true })
      }
    } catch {}
  }
  usedDirs.length = 0
})