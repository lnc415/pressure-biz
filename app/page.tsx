import Link from 'next/link'
import { getBrand } from '@/lib/brand'
import { readData } from '@/lib/data'
import type { Service } from '@/components/ServiceCard'
import ServiceCard from '@/components/ServiceCard'
import FadeUp from '@/components/FadeUp'
import TipButton from '@/components/TipButton'

// Tip selector visual for hero
function TipDisplay({ angle, color, label }: { angle: string; color: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
      <div style={{
        width: 12,
        height: 36,
        background: color,
        borderRadius: '4px 4px 2px 2px',
        boxShadow: `0 0 10px ${color}66`,
      }} />
      <span className="text-white text-[9px] font-bold tracking-wider">{angle}</span>
      <span className="text-white/40 text-[8px]">{label}</span>
    </div>
  )
}

const BADGES = [
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
      <section
        className="relative text-white py-28 px-4 text-center overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #08111F 0%, #0E1E35 60%, #0a1828 100%)' }}
      >
        {/* Background spray streaks */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                right: `${5 + i * 11}%`,
                top: 0,
                bottom: 0,
                width: 1,
                background: 'linear-gradient(180deg, transparent 0%, rgba(0,212,255,0.06) 40%, rgba(0,212,255,0.06) 60%, transparent 100%)',
                transform: 'skewX(-12deg)',
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Tip row */}
          <div className="flex justify-center gap-4 mb-10">
            <TipDisplay angle="0°"  color="#E8231A" label="Red" />
            <TipDisplay angle="15°" color="#FFD100" label="Yellow" />
            <TipDisplay angle="25°" color="#00A550" label="Green" />
            <TipDisplay angle="40°" color="#D8E8F0" label="White" />
            <TipDisplay angle="65°" color="#555"    label="Black" />
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-3 leading-none">
            <span style={{ color: '#00D4FF', textShadow: '0 0 40px rgba(0,212,255,0.3)' }}>
              {brand.name}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/50 mb-10 font-light">{brand.tagline}</p>

          {/* Tip-button CTAs */}
          <div className="flex flex-wrap gap-4 justify-center">
            <TipButton tip="red" href="/quote" showAngle>
              Get a Free Quote
            </TipButton>
            <TipButton tip="yellow" href="/services" showAngle>
              View Services
            </TipButton>
            <TipButton tip="green" href="/gallery" showAngle>
              See Our Work
            </TipButton>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section
        style={{ background: '#00D4FF' }}
        className="py-5 px-4"
      >
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-6">
          {BADGES.map(b => (
            <div key={b.label} className="flex items-center gap-2 text-[#08111F] font-bold text-sm">
              <span>{b.icon}</span>
              <span>{b.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Services preview */}
      {services.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-20">
          <FadeUp>
            <h2 className="text-4xl font-black text-[#08111F] mb-2">Choose Your Tip</h2>
            <p className="text-[#5A7A9A] mb-10">The right tool for every surface — professional results every time.</p>
          </FadeUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map(s => (
              <FadeUp key={s.id}>
                <ServiceCard service={s} />
              </FadeUp>
            ))}
          </div>
          <div className="mt-8">
            <TipButton tip="black" href="/services" showAngle>
              All Services
            </TipButton>
          </div>
        </section>
      )}

      {/* CTA band */}
      <section
        className="py-20 px-4 text-center text-white"
        style={{ background: 'linear-gradient(135deg, #08111F 0%, #0E1E35 100%)' }}
      >
        <FadeUp>
          <h2 className="text-4xl font-black mb-4">Ready to make it shine?</h2>
          <p className="text-white/40 mb-10 max-w-md mx-auto">
            Tell us about your project and we&apos;ll get back to you within 24 hours.
          </p>
          <TipButton tip="red" href="/quote" showAngle>
            Request a Quote
          </TipButton>
        </FadeUp>
      </section>
    </>
  )
}
