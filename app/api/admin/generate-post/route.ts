// Admin-triggered blog post generation

import { NextRequest, NextResponse } from 'next/server'
import { timingSafeEqual } from 'crypto'
import { generateAndPublishPost } from '@/lib/blog-generator'

export const runtime     = 'nodejs'
export const maxDuration = 60

function checkPassword(input: string): boolean {
  const pw = process.env.ADMIN_PASSWORD
  if (!pw) return false
  try {
    return timingSafeEqual(Buffer.from(input), Buffer.from(pw))
  } catch {
    return false
  }
}

export async function POST(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET
  const authHeader = req.headers.get('authorization')
  const isBotCall  = cronSecret && authHeader === `Bearer ${cronSecret}`

  if (!isBotCall) {
    let password = ''
    try {
      const body = await req.json()
      password = body?.password ?? ''
    } catch {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }
    if (!checkPassword(password)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  try {
    const result = await generateAndPublishPost()
    return NextResponse.json(result)
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
