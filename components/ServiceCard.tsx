import Link from 'next/link'

export interface Service {
  id: string
  name: string
  description: string
  priceRange?: string
  icon: string
  tipColor?: string // 'red' | 'yellow' | 'green' | 'white' | 'black'
}

// Default tip colors by position
const DEFAULT_TIPS = ['red', 'yellow', 'green', 'white', 'black']

const TIP_HEX: Record<string, { bg: string; label: string; angle: string }> = {
  red:    { bg: '#E8231A', label: 'Max Power',  angle: '0°'  },
  yellow: { bg: '#FFD100', label: 'High Power', angle: '15°' },
  green:  { bg: '#00A550', label: 'General',    angle: '25°' },
  white:  { bg: '#D8E8F0', label: 'Light Duty', angle: '40°' },
  black:  { bg: '#2A2A2A', label: 'Soap',       angle: '65°' },
}

interface ServiceCardProps {
  service: Service
  tipIndex?: number
}

export default function ServiceCard({ service, tipIndex = 0 }: ServiceCardProps) {
  const tipKey = service.tipColor || DEFAULT_TIPS[tipIndex % DEFAULT_TIPS.length]
  const tip = TIP_HEX[tipKey]

  return (
    <div className="pressure-card bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col">
      {/* Tip header bar */}
      <div
        className="flex items-center gap-2 px-4 py-2"
        style={{ background: tip.bg }}
      >
        <div
          className="w-2.5 h-2.5 rounded-full"
          style={{ background: 'rgba(255,255,255,0.5)', boxShadow: '0 0 4px rgba(255,255,255,0.4)' }}
        />
        <span
          className="text-xs font-bold tracking-wider uppercase"
          style={{ color: tipKey === 'yellow' || tipKey === 'white' ? '#08111F' : '#fff' }}
        >
          {tip.label} · {tip.angle}
        </span>
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="text-3xl">{service.icon}</div>
        <h3 className="text-base font-bold text-[#08111F] leading-tight">{service.name}</h3>
        <p className="text-[#5A7A9A] text-sm flex-1 leading-relaxed">{service.description}</p>
        {service.priceRange && (
          <p className="font-bold text-sm" style={{ color: tip.bg === '#D8E8F0' ? '#08111F' : tip.bg }}>
            {service.priceRange}
          </p>
        )}
        <Link
          href={`/quote?service=${encodeURIComponent(service.name)}`}
          className="tip-btn tip-red mt-auto self-start text-sm"
        >
          <span className="tip-badge" />
          Quote This
        </Link>
      </div>
    </div>
  )
}
