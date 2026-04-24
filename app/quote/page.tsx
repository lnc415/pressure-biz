import { readData } from '@/lib/data'
import QuoteForm from '@/components/QuoteForm'
import { Suspense } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Request a Quote' }

export default async function QuotePage() {
  const services = await readData<{ id: string; name: string; plainName?: string }>('services')

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <p className="text-[#9B7A2F] text-xs font-semibold tracking-[0.2em] uppercase mb-3">Free Estimate</p>
      <h1
        className="text-[#1C1C1C] mb-3"
        style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}
      >
        Request a Quote
      </h1>
      <p className="text-[#5C6B5C] mb-10">Fill out the form below and we&apos;ll be in touch within 24 hours.</p>
      <Suspense fallback={null}>
        <QuoteForm services={services.map(s => ({ id: s.id, name: s.plainName || s.name }))} />
      </Suspense>
    </div>
  )
}
