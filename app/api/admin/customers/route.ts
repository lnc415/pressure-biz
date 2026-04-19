import { isAuthenticated } from '@/lib/admin-auth'
import { readData, writeData } from '@/lib/data'
import type { Customer } from '@/lib/customers'

export async function GET() {
  if (!await isAuthenticated()) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  return Response.json(await readData<Customer>('customers'))
}

export async function POST(request: Request) {
  if (!await isAuthenticated()) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await request.json()
  const customers = await readData<Customer>('customers')
  const customer: Customer = {
    id: crypto.randomUUID(),
    name: body.name,
    email: body.email,
    phone: body.phone,
    addresses: body.address ? [body.address] : [],
    notes: '',
    firstContact: new Date().toISOString(),
    lastActivity: new Date().toISOString(),
    totalCompleted: 0,
  }
  customers.push(customer)
  await writeData('customers', customers)
  return Response.json(customer)
}
