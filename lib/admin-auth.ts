import { cookies } from 'next/headers'

const COOKIE_NAME = 'cs_admin'
const MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies()
  const token = store.get(COOKIE_NAME)
  return token?.value === process.env.ADMIN_PASSWORD
}

export async function setAuthCookie(res: Response): Promise<Response> {
  const store = await cookies()
  store.set(COOKIE_NAME, process.env.ADMIN_PASSWORD!, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: MAX_AGE,
  })
  return res
}

export async function clearAuthCookie(): Promise<void> {
  const store = await cookies()
  store.delete(COOKIE_NAME)
}
