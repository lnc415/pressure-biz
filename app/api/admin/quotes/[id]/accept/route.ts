import { isAuthenticated } from '@/lib/admin-auth'
import { readData, writeData } from '@/lib/data'
import { sendEmail } from '@/lib/resend'
import { getBrand } from '@/lib/brand'
import type { Quote } from '@/app/api/quote/route'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!await isAuthenticated()) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const { scheduledDate } = await request.json()

  const quotes = await readData<Quote>('quotes')
  const idx = quotes.findIndex(q => q.id === id)
  if (idx === -1) return Response.json({ error: 'Not found' }, { status: 404 })

  quotes[idx].status = 'accepted'
  quotes[idx].scheduledDate = scheduledDate
  await writeData('quotes', quotes)

  const q = quotes[idx]
  const brand = await getBrand()
  const dateStr = scheduledDate
    ? new Date(scheduledDate).toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })
    : 'TBD'

  await sendEmail({
    to: [q.email],
    subject: `Your quote has been accepted — ${brand.name}`,
    html: `<h2>Great news, ${q.name}!</h2>
<p>Your quote request for <strong>${q.service}</strong> has been accepted.</p>
<p><strong>Scheduled:</strong> ${dateStr}</p>
<p>We'll arrive at ${q.address}. See you then!</p>
<p>Questions? Call us at ${brand.phone}</p>`,
  })

  return Response.json(quotes[idx])
}
