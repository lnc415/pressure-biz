import { readData } from '@/lib/data'
import type { Service } from '@/components/ServiceCard'
import ServiceCard from '@/components/ServiceCard'
import FadeUp from '@/components/FadeUp'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Services' }

export default async function ServicesPage() {
  const [services, commercialServices] = await Promise.all([
    readData<Service>('services'),
    readData<Service>('commercialServices'),
  ])

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">

      {/* ── Residential ── */}
      <FadeUp>
        <p className="text-[#9B7A2F] text-xs font-semibold tracking-[0.2em] uppercase mb-3">Residential</p>
        <h1
          className="text-[#1C1C1C] mb-3"
          style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: 'clamp(2rem, 5vw, 3rem)' }}
        >
          Restoration Services
        </h1>
        <p className="text-[#5C6B5C] mb-2 max-w-xl">
          Every service uses the right method for the surface — from high-pressure masonry to gentle soft-wash preservation.
        </p>
        <p className="text-[#9B7A2F] text-xs mb-12 italic">
          Hover any service name to see plain-English description.
        </p>
      </FadeUp>

      {services.length === 0 ? (
        <p className="text-[#5C6B5C]">Services coming soon.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map(s => (
            <FadeUp key={s.id} className="h-full">
              <ServiceCard service={s} />
            </FadeUp>
          ))}
        </div>
      )}

      {/* ── Commercial divider ── */}
      {commercialServices.length > 0 && (
        <>
          <FadeUp>
            <div className="ornament-divider mt-20 mb-10">
              <span>✦</span>
            </div>
            <div className="text-center mb-12">
              <p className="text-[#9B7A2F] text-xs font-semibold tracking-[0.2em] uppercase mb-3">Commercial & Large-Scale</p>
              <h2
                className="text-[#1C1C1C] mb-3"
                style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}
              >
                We Scale With You
              </h2>
              <p className="text-[#5C6B5C] max-w-lg mx-auto">
                From storefronts to apartment complexes and HOA communities — we handle multi-crew jobs,
                recurring contracts, and large properties across the Tri-Cities.
              </p>
            </div>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {commercialServices.map(s => (
              <FadeUp key={s.id} className="h-full">
                <ServiceCard service={s} />
              </FadeUp>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
