import { canAccessAdmin } from './admin-auth'
export const AdminAuthGuard = {
  check() { return canAccessAdmin() }
}
