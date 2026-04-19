import { isAuthenticated } from '@/lib/admin-auth'
import { getBrand, saveBrand } from '@/lib/brand'

export async function GET() {
  if (!await isAuthenticated()) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  return Response.json(await getBrand())
}

export async function PUT(request: Request) {
  if (!await isAuthenticated()) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const data = await request.json()
  await saveBrand(data)
  return Response.json({ ok: true })
}
