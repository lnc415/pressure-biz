import Link from 'next/link'

export interface Service {
  id: string
  name: string
  plainName?: string
  description: string
  priceRange?: string
  icon: string
  tipColor?: string
}

interface ServiceCardProps {
  service: Service
  tipIndex?: number
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="heritage-card bg-[#FDFAF6] border border-[#D4C9B8] rounded flex flex-col h-full">
      <div className="p-6 flex flex-col gap-4 flex-1">

        {/* Icon */}
        <div className="text-3xl">{service.icon}</div>

        {/* Name with plain-English tooltip on hover */}
        <div className="relative group">
          <h3
            className="text-xl font-bold text-[#1C1C1C] leading-tight cursor-default"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            {service.name}
          </h3>
          {service.plainName && (
            <div
              className="absolute bottom-full left-0 mb-2 px-2.5 py-1.5 rounded text-xs whitespace-nowrap z-10 pointer-events-none
                         opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ background: '#2D4A2D', color: '#F5F0E8' }}
            >
              {service.plainName}
              <div
                className="absolute top-full left-4 w-0 h-0"
                style={{ borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: '5px solid #2D4A2D' }}
              />
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-[#5C6B5C] text-sm flex-1 leading-relaxed">{service.description}</p>

        {/* Price */}
        {service.priceRange && (
          <p className="font-semibold text-sm text-[#9B7A2F]">{service.priceRange}</p>
        )}

        {/* CTA */}
        <Link
          href={`/quote?service=${encodeURIComponent(service.name)}`}
          className="mm-btn mt-auto self-start text-sm"
        >
          Request a Quote
        </Link>
      </div>
    </div>
  )
}
