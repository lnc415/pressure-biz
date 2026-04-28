// Vercel Cron — runs daily at 13:00 UTC (9am ET)
// Schedule defined in vercel.json

export const runtime     = 'nodejs'
export const maxDuration = 60

import { generateAndPublishPost } from '@/lib/blog-generator'

export async function GET(req: Request) {
  const cronSecret = process.env.CRON_SECRET
  const authHeader = req.headers.get('authorization')
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const result = await generateAndPublishPost()
    return Response.json(result)
  } catch (err) {
    console.error('[generate-post cron]', err)
    return Response.json({ error: String(err) }, { status: 500 })
  }
}
