import { Resend } from 'resend'

let client: Resend | null = null

function getClient() {
  if (!client && process.env.RESEND_API_KEY) {
    client = new Resend(process.env.RESEND_API_KEY)
  }
  return client
}

export async function sendEmail(opts: {
  to: string[]
  subject: string
  html: string
}) {
  const resend = getClient()
  if (!resend) {
    console.warn('Resend not configured — skipping email')
    return
  }
  await resend.emails.send({
    from: 'CamSplash <noreply@camsplash.com>',
    ...opts,
  })
}
