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
        <h1 className="text-4xl font-black text-[#08111F] mb-2">Choose Your Tip</h1>
        <p className="text-[#5A7A9A] mb-3 max-w-xl">
          Each service uses the right tip for the job — from max-power driveways to gentle roof softwash.
        </p>
        {/* Tip legend */}
        <div className="flex flex-wrap gap-3 mb-12">
          {[
            { color: '#E8231A', angle: '0°',  label: 'Max Power' },
            { color: '#FFD100', angle: '15°', label: 'High Power' },
            { color: '#00A550', angle: '25°', label: 'General' },
            { color: '#D8E8F0', angle: '40°', label: 'Light Duty' },
            { color: '#2A2A2A', angle: '65°', label: 'Soap' },
          ].map(t => (
            <div key={t.angle} className="flex items-center gap-1.5 text-xs text-[#5A7A9A]">
              <div style={{ width: 8, height: 16, background: t.color, borderRadius: 2 }} />
              <span className="font-semibold">{t.angle}</span>
              <span>{t.label}</span>
            </div>
          ))}
        </div>
      </FadeUp>

      {services.length === 0 ? (
        <p className="text-[#5A7A9A]">Services coming soon!</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <FadeUp key={s.id} className="h-full">
              <ServiceCard service={s} tipIndex={i} />
            </FadeUp>
          ))}
        </div>
      )}

      {/* ── Commercial divider ── */}
      {commercialServices.length > 0 && (
        <>
          <FadeUp>
            <div className="flex items-center gap-4 mt-20 mb-10">
              <div className="flex-1 h-px bg-gray-200" />
              <div className="text-center">
                <span className="text-xs font-bold tracking-widest uppercase text-[#5A7A9A]">Commercial &amp; Large-Scale</span>
                <h2 className="text-3xl font-black text-[#08111F] mt-1">We Scale With You</h2>
                <p className="text-[#5A7A9A] text-sm mt-1 max-w-lg mx-auto">
                  From storefronts to apartment complexes — we handle multi-crew jobs, recurring contracts, and large properties across the Tri-Cities.
                </p>
              </div>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {commercialServices.map((s, i) => (
              <FadeUp key={s.id} className="h-full">
                <ServiceCard service={s} tipIndex={i} />
              </FadeUp>
            ))}
          </div>
        </>
      )}

    </div>
  )
}
