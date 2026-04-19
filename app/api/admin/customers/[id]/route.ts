import { isAuthenticated } from '@/lib/admin-auth'
import { readData, writeData } from '@/lib/data'
import type { Customer } from '@/lib/customers'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!await isAuthenticated()) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const updates = await request.json()
  const customers = await readData<Customer>('customers')
  const idx = customers.findIndex(c => c.id === id)
  if (idx === -1) return Response.json({ error: 'Not found' }, { status: 404 })
  customers[idx] = { ...customers[idx], ...updates }
  await writeData('customers', customers)
  return Response.json(customers[idx])
}
