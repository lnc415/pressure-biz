import { cookies } from 'next/headers'

export async function POST() {
  const store = await cookies()
  store.delete('cs_admin')
  return Response.json({ ok: true })
}
