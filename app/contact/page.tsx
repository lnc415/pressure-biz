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
        <p className="text-[#9B7A2F] text-xs font-semibold tracking-[0.2em] uppercase mb-3">Reach Out</p>
        <h1
          className="text-[#1C1C1C] mb-3"
          style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: 'clamp(2rem, 5vw, 3rem)' }}
        >
          Get in Touch
        </h1>
        <p className="text-[#5C6B5C] mb-12">Have a question or a project in mind? We&apos;d love to hear from you.</p>
      </FadeUp>

      <div className="grid md:grid-cols-2 gap-12">
        <FadeUp>
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-[#9B7A2F] text-xs font-semibold tracking-[0.18em] uppercase mb-1">Phone</p>
              <a href={`tel:${brand.phone}`} className="text-[#1C1C1C] font-semibold text-lg hover:text-[#2D4A2D] transition-colors">
                {brand.phone}
              </a>
            </div>
            <div>
              <p className="text-[#9B7A2F] text-xs font-semibold tracking-[0.18em] uppercase mb-1">Email</p>
              <a href={`mailto:${brand.email1}`} className="text-[#1C1C1C] font-semibold hover:text-[#2D4A2D] transition-colors">
                {brand.email1}
              </a>
            </div>
            <div>
              <p className="text-[#9B7A2F] text-xs font-semibold tracking-[0.18em] uppercase mb-1">Service Area</p>
              <p className="text-[#5C6B5C] leading-relaxed">{brand.serviceArea}</p>
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
