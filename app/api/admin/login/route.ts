import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const { password } = await request.json()

  if (password !== process.env.ADMIN_PASSWORD) {
    return Response.json({ error: 'Incorrect password' }, { status: 401 })
  }

  const store = await cookies()
  store.set('cs_admin', password, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })

  return Response.json({ ok: true })
}
