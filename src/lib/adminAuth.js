const ADMIN_AUTH_KEY = 'sshge_admin_auth'

export const adminCredentials = {
  email: 'admin@sshge.org',
  password: 'SSHGE2026',
}

export function isAdminAuthenticated() {
  return sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true'
}

export function loginAdmin() {
  sessionStorage.setItem(ADMIN_AUTH_KEY, 'true')
}

export function logoutAdmin() {
  sessionStorage.removeItem(ADMIN_AUTH_KEY)
}
