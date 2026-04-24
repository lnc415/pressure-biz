import { isAuthenticated } from '@/lib/admin-auth'
import { getBrand, saveBrand } from '@/lib/brand'
import { revalidatePath } from 'next/cache'

export async function GET() {
  if (!await isAuthenticated()) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  return Response.json(await getBrand())
}

export async function PUT(request: Request) {
  if (!await isAuthenticated()) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const data = await request.json()
  try {
    await saveBrand(data)
    revalidatePath('/', 'layout')
    return Response.json({ ok: true })
  } catch (err) {
    console.error('saveBrand failed:', err)
    return Response.json({ error: String(err) }, { status: 500 })
  }
}
