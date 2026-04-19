import { readData } from '@/lib/data'
import type { Service } from '@/components/ServiceCard'
import ServiceCard from '@/components/ServiceCard'
import FadeUp from '@/components/FadeUp'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Services' }

export default async function ServicesPage() {
  const services = await readData<Service>('services')

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <FadeUp>
        <h1 className="text-4xl font-black text-[#0C1A2E] mb-2">Our Services</h1>
        <p className="text-[#64748B] mb-12 max-w-xl">
          From driveways to roofs — we handle it all with professional-grade equipment and eco-friendly solutions.
        </p>
      </FadeUp>

      {services.length === 0 ? (
        <p className="text-[#64748B]">Services coming soon. Check back shortly!</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(s => (
            <FadeUp key={s.id}>
              <ServiceCard service={s} />
            </FadeUp>
          ))}
        </div>
      )}
    </div>
  )
}
