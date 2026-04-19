import Link from 'next/link'

export interface Service {
  id: string
  name: string
  description: string
  priceRange?: string
  icon: string
}

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3">
      <div className="text-4xl">{service.icon}</div>
      <h3 className="text-lg font-bold text-[#0C1A2E]">{service.name}</h3>
      <p className="text-[#64748B] text-sm flex-1">{service.description}</p>
      {service.priceRange && (
        <p className="text-[#38BDF8] font-semibold text-sm">{service.priceRange}</p>
      )}
      <Link
        href={`/quote?service=${encodeURIComponent(service.name)}`}
        className="btn-ripple mt-auto bg-[#0C1A2E] text-white text-sm font-semibold px-4 py-2 rounded-full text-center hover:bg-[#38BDF8] hover:text-[#0C1A2E] transition-colors"
      >
        Get a Quote
      </Link>
    </div>
  )
}
