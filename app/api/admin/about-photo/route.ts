import { isAuthenticated } from '@/lib/admin-auth'
import { getBrand, saveBrand } from '@/lib/brand'
import { put } from '@vercel/blob'

export async function POST(request: Request) {
  if (!await isAuthenticated()) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const fd = await request.formData()
  const file = fd.get('file') as File

  try {
    const blob = await put(`about/${crypto.randomUUID()}-${file.name}`, file, { access: 'public' })
    const brand = await getBrand()
    await saveBrand({ ...brand, logo: blob.url })
    return Response.json({ url: blob.url })
  } catch {
    return Response.json({ error: 'Blob storage not configured' }, { status: 500 })
  }
}
