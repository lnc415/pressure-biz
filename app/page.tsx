import Link from 'next/link'
import { getBrand } from '@/lib/brand'
import { readData } from '@/lib/data'
import type { Service } from '@/components/ServiceCard'
import ServiceCard from '@/components/ServiceCard'
import FadeUp from '@/components/FadeUp'

const badges = [
  { icon: '🛡️', label: 'Fully Insured' },
  { icon: '📍', label: 'Locally Owned' },
  { icon: '👨‍👩‍👧', label: 'Family-Run' },
  { icon: '✅', label: 'Satisfaction Guaranteed' },
]

export default async function Home() {
  const brand = await getBrand()
  const services = (await readData<Service>('services')).slice(0, 4)

  return (
    <>
      {/* Hero */}
      <section className="bg-[#0C1A2E] text-white py-24 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
          <span className="text-[#38BDF8]">{brand.name}</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/70 mb-8 max-w-xl mx-auto">{brand.tagline}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/quote" className="btn-ripple bg-[#38BDF8] text-[#0C1A2E] font-bold px-8 py-4 rounded-full text-lg hover:bg-[#00E5FF] transition-colors">
            Get a Free Quote
          </Link>
          <Link href="/services" className="border-2 border-white/30 text-white font-bold px-8 py-4 rounded-full text-lg hover:border-[#38BDF8] hover:text-[#38BDF8] transition-colors">
            View Services
          </Link>
        </div>
      </section>

      {/* Trust badges */}
      <section className="bg-[#38BDF8] py-6 px-4">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-6">
          {badges.map(b => (
            <div key={b.label} className="flex items-center gap-2 text-[#0C1A2E] font-semibold">
              <span className="text-xl">{b.icon}</span>
              <span>{b.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Services preview */}
      {services.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-16">
          <FadeUp>
            <h2 className="text-3xl font-black text-[#0C1A2E] mb-2">Our Services</h2>
            <p className="text-[#64748B] mb-8">Professional results for every surface.</p>
          </FadeUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map(s => (
              <FadeUp key={s.id}>
                <ServiceCard service={s} />
              </FadeUp>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/services" className="text-[#38BDF8] font-semibold hover:text-[#00E5FF] transition-colors">
              View all services →
            </Link>
          </div>
        </section>
      )}

      {/* CTA band */}
      <section className="bg-[#0C1A2E] py-16 px-4 text-center text-white">
        <FadeUp>
          <h2 className="text-3xl font-black mb-4">Ready to make it shine?</h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto">Tell us about your project and we'll get back to you within 24 hours.</p>
          <Link href="/quote" className="btn-ripple bg-[#38BDF8] text-[#0C1A2E] font-bold px-8 py-4 rounded-full text-lg hover:bg-[#00E5FF] transition-colors">
            Request a Quote
          </Link>
        </FadeUp>
      </section>
    </>
  )
}
