import { readData, writeData } from './data'

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  addresses: string[]
  notes: string
  firstContact: string
  lastActivity: string
  totalCompleted: number
}

export async function upsertCustomer(fields: {
  name: string
  email: string
  phone: string
  address?: string
}): Promise<Customer> {
  const customers = await readData<Customer>('customers')
  const existing = customers.find(c => c.email.toLowerCase() === fields.email.toLowerCase())
  if (existing) {
    existing.name = fields.name
    existing.phone = fields.phone
    if (fields.address && !existing.addresses.includes(fields.address)) {
      existing.addresses.push(fields.address)
    }
    existing.lastActivity = new Date().toISOString()
    await writeData('customers', customers)
    return existing
  }
  const customer: Customer = {
    id: crypto.randomUUID(),
    name: fields.name,
    email: fields.email,
    phone: fields.phone,
    addresses: fields.address ? [fields.address] : [],
    notes: '',
    firstContact: new Date().toISOString(),
    lastActivity: new Date().toISOString(),
    totalCompleted: 0,
  }
  customers.push(customer)
  await writeData('customers', customers)
  return customer
}
