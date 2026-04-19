import { getBrand } from '@/lib/brand'
import ContactForm from '@/components/ContactForm'
import FadeUp from '@/components/FadeUp'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Contact' }

export default async function ContactPage() {
  const brand = await getBrand()

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <FadeUp>
        <h1 className="text-4xl font-black text-[#0C1A2E] mb-2">Get in Touch</h1>
        <p className="text-[#64748B] mb-12">Have a question? Drop us a line.</p>
      </FadeUp>

      <div className="grid md:grid-cols-2 gap-12">
        <FadeUp>
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1">Phone</p>
              <a href={`tel:${brand.phone}`} className="text-[#0C1A2E] font-semibold text-lg hover:text-[#38BDF8] transition-colors">{brand.phone}</a>
            </div>
            <div>
              <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1">Email</p>
              <a href={`mailto:${brand.email1}`} className="text-[#0C1A2E] font-semibold hover:text-[#38BDF8] transition-colors">{brand.email1}</a>
            </div>
            <div>
              <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1">Service Area</p>
              <p className="text-[#0C1A2E]">{brand.serviceArea}</p>
            </div>
          </div>
        </FadeUp>

        <FadeUp>
          <ContactForm />
        </FadeUp>
      </div>
    </div>
  )
}
