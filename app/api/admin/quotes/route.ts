import { isAuthenticated } from '@/lib/admin-auth'
import { readData, writeData } from '@/lib/data'
import type { Quote } from '@/app/api/quote/route'

export async function GET() {
  if (!await isAuthenticated()) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  return Response.json(await readData<Quote>('quotes'))
}

export async function PATCH(request: Request) {
  if (!await isAuthenticated()) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const { id, ...updates } = await request.json()
  const quotes = await readData<Quote>('quotes')
  const idx = quotes.findIndex(q => q.id === id)
  if (idx === -1) return Response.json({ error: 'Not found' }, { status: 404 })
  quotes[idx] = { ...quotes[idx], ...updates }
  await writeData('quotes', quotes)
  return Response.json(quotes[idx])
}
