import { readData, writeData } from '@/lib/data'
import { upsertCustomer } from '@/lib/customers'
import { sendEmail } from '@/lib/resend'
import { getBrand } from '@/lib/brand'

interface Message {
  id: string
  customerId: string
  name: string
  email: string
  message: string
  createdAt: string
}

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

    const customer = await upsertCustomer({ name, email, phone: '' })

    const msg: Message = {
      id: crypto.randomUUID(),
      customerId: customer.id,
      name, email, message,
      createdAt: new Date().toISOString(),
    }

    const messages = await readData<Message>('messages')
    messages.unshift(msg)
    await writeData('messages', messages)

    const brand = await getBrand()
    await sendEmail({
      to: [brand.email1, brand.email2].filter(Boolean),
      subject: `New message from ${name}`,
      html: `<h2>New contact message</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Message:</strong> ${message}</p>`,
    })

    return Response.json({ ok: true })
  } catch (err) {
    console.error(err)
    return Response.json({ error: 'Internal error' }, { status: 500 })
  }
}
