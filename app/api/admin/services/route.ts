import { isAuthenticated } from '@/lib/admin-auth'
import { readData, writeData } from '@/lib/data'
import type { Service } from '@/components/ServiceCard'

export async function GET() {
  if (!await isAuthenticated()) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  return Response.json(await readData<Service>('services'))
}

export async function POST(request: Request) {
  if (!await isAuthenticated()) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await request.json()
  const services = await readData<Service>('services')
  const service: Service = { id: crypto.randomUUID(), ...body }
  services.push(service)
  await writeData('services', services)
  return Response.json(service)
}

export async function PUT(request: Request) {
  if (!await isAuthenticated()) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const services: Service[] = await request.json()
  await writeData('services', services)
  return Response.json({ ok: true })
}

export async function DELETE(request: Request) {
  if (!await isAuthenticated()) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await request.json()
  const services = (await readData<Service>('services')).filter(s => s.id !== id)
  await writeData('services', services)
  return Response.json({ ok: true })
}
