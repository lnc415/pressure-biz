import { isAuthenticated } from '@/lib/admin-auth'
import { readData, writeData } from '@/lib/data'
import { put, del } from '@vercel/blob'
import type { GalleryPhoto } from '@/app/gallery/page'

export async function GET() {
  if (!await isAuthenticated()) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  return Response.json(await readData<GalleryPhoto>('gallery'))
}

export async function POST(request: Request) {
  if (!await isAuthenticated()) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const fd = await request.formData()
  const file = fd.get('file') as File
  const tag = fd.get('tag') as string
  const caption = fd.get('caption') as string

  let url = ''
  try {
    const blob = await put(`gallery/${crypto.randomUUID()}-${file.name}`, file, { access: 'public' })
    url = blob.url
  } catch {
    return Response.json({ error: 'Blob storage not configured' }, { status: 500 })
  }

  const photo: GalleryPhoto = { id: crypto.randomUUID(), url, tag, caption }
  const photos = await readData<GalleryPhoto>('gallery')
  photos.push(photo)
  await writeData('gallery', photos)
  return Response.json(photo)
}

export async function DELETE(request: Request) {
  if (!await isAuthenticated()) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await request.json()
  const photos = await readData<GalleryPhoto>('gallery')
  const photo = photos.find(p => p.id === id)
  if (photo?.url) {
    try { await del(photo.url) } catch { /* ignore */ }
  }
  await writeData('gallery', photos.filter(p => p.id !== id))
  return Response.json({ ok: true })
}
