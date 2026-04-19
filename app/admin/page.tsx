import { isAuthenticated } from '@/lib/admin-auth'
import AdminLogin from './AdminLogin'
import AdminPanel from './AdminPanel'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin',
  robots: 'noindex, nofollow',
}

export default async function AdminPage() {
  const authed = await isAuthenticated()
  if (!authed) return <AdminLogin />
  return <AdminPanel />
}
