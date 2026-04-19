import { getBrand } from '@/lib/brand'
import FadeUp from '@/components/FadeUp'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'About Us' }

export default async function AboutPage() {
  const brand = await getBrand()

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <FadeUp>
        <h1 className="text-4xl font-black text-[#0C1A2E] mb-2">About {brand.name}</h1>
        <p className="text-[#64748B] mb-10 max-w-xl">We're not just a pressure washing business — we're your neighbors.</p>
      </FadeUp>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <FadeUp>
          <div>
            <h2 className="text-2xl font-bold text-[#0C1A2E] mb-4">Our Story</h2>
            <p className="text-[#64748B] leading-relaxed">{brand.aboutCopy}</p>
            <p className="text-[#64748B] leading-relaxed mt-4">{brand.serviceArea}</p>
          </div>
        </FadeUp>

        <FadeUp>
          <div className="bg-[#0C1A2E] rounded-2xl p-8 text-white">
            <h2 className="text-xl font-bold mb-6 text-[#38BDF8]">Why {brand.name}?</h2>
            <ul className="flex flex-col gap-4">
              {brand.whyUs.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-[#00E5FF] mt-0.5">✓</span>
                  <span className="text-white/80">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeUp>
      </div>

      <FadeUp>
        <div className="bg-[#38BDF8] rounded-2xl p-8 text-[#0C1A2E] text-center">
          <h2 className="text-2xl font-black mb-3">Ready to work together?</h2>
          <p className="mb-6 opacity-80">Get a free quote — no pressure (well, maybe a little).</p>
          <Link href="/quote" className="btn-ripple bg-[#0C1A2E] text-white font-bold px-8 py-3 rounded-full hover:bg-[#0C1A2E]/80 transition-colors inline-block">
            Get a Quote
          </Link>
        </div>
      </FadeUp>
    </div>
  )
}
