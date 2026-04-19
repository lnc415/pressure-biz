import { readData, writeData } from '@/lib/data'
import { upsertCustomer } from '@/lib/customers'
import { sendEmail } from '@/lib/resend'
import { getBrand } from '@/lib/brand'
import { put } from '@vercel/blob'

export interface Quote {
  id: string
  customerId: string
  name: string
  email: string
  phone: string
  service: string
  address: string
  details: string
  photos: string[]
  status: 'new' | 'accepted' | 'completed' | 'declined'
  scheduledDate?: string
  notes: string
  createdAt: string
}

export async function POST(request: Request) {
  try {
    const fd = await request.formData()
    const name = fd.get('name') as string
    const email = fd.get('email') as string
    const phone = fd.get('phone') as string
    const service = fd.get('service') as string
    const address = fd.get('address') as string
    const details = fd.get('details') as string
    const photoFiles = fd.getAll('photos') as File[]

    const photoUrls: string[] = []
    for (const file of photoFiles) {
      if (file.size === 0) continue
      try {
        const blob = await put(`quotes/${crypto.randomUUID()}-${file.name}`, file, { access: 'public' })
        photoUrls.push(blob.url)
      } catch {
        // Blob not configured — skip photos
      }
    }

    const customer = await upsertCustomer({ name, email, phone, address })

    const quote: Quote = {
      id: crypto.randomUUID(),
      customerId: customer.id,
      name, email, phone, service, address, details,
      photos: photoUrls,
      status: 'new',
      notes: '',
      createdAt: new Date().toISOString(),
    }

    const quotes = await readData<Quote>('quotes')
    quotes.unshift(quote)
    await writeData('quotes', quotes)

    const brand = await getBrand()
    const adminUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/admin`
    await sendEmail({
      to: [brand.email1, brand.email2].filter(Boolean),
      subject: `New Quote Request from ${name}`,
      html: `<h2>New quote request</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Phone:</strong> ${phone}</p>
<p><strong>Service:</strong> ${service}</p>
<p><strong>Address:</strong> ${address}</p>
<p><strong>Details:</strong> ${details || 'None'}</p>
<p><strong>Photos:</strong> ${photoUrls.length}</p>
<p><a href="${adminUrl}">View in Admin Panel</a></p>`,
    })

    return Response.json({ ok: true })
  } catch (err) {
    console.error(err)
    return Response.json({ error: 'Internal error' }, { status: 500 })
  }
}
