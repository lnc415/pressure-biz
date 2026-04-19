import { readData } from '@/lib/data'
import QuoteForm from '@/components/QuoteForm'
import { Suspense } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Get a Quote' }

export default async function QuotePage() {
  const services = await readData<{ id: string; name: string }>('services')

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-black text-[#0C1A2E] mb-2">Get a Free Quote</h1>
      <p className="text-[#64748B] mb-10">Fill out the form below and we'll be in touch within 24 hours.</p>
      <Suspense fallback={null}>
        <QuoteForm services={services} />
      </Suspense>
    </div>
  )
}
