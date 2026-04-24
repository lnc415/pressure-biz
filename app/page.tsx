import Link from 'next/link'
import Image from 'next/image'
import { getBrand } from '@/lib/brand'
import { readData } from '@/lib/data'
import type { Service } from '@/components/ServiceCard'
import ServiceCard from '@/components/ServiceCard'
import FadeUp from '@/components/FadeUp'

const BADGES = [
  { icon: '🛡️', label: 'Fully Insured' },
  { icon: '📍', label: 'Jonesborough, TN' },
  { icon: '💧', label: 'Soft-Wash Specialists' },
  { icon: '✅', label: 'Satisfaction Guaranteed' },
]

export default async function Home() {
  const brand = await getBrand()
  const services = (await readData<Service>('services')).slice(0, 4)

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(155deg, #1A2E1A 0%, #2D4A2D 55%, #3d6b3d 100%)' }}
      >
        {/* Subtle texture lines */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-y-0"
              style={{
                left: `${10 + i * 16}%`,
                width: 1,
                background: 'linear-gradient(180deg, transparent 0%, rgba(245,240,232,0.04) 40%, rgba(245,240,232,0.04) 60%, transparent 100%)',
                transform: 'skewX(-8deg)',
              }}
            />
          ))}
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-24 md:py-36 flex flex-col md:flex-row items-center gap-14">
          {/* Text */}
          <div className="flex-1 text-center md:text-left">
            <p className="text-[#9B7A2F] text-xs font-semibold tracking-[0.25em] uppercase mb-4">
              Jonesborough, Tennessee
            </p>
            <h1
              className="text-[#F5F0E8] leading-[1.1] mb-5"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: 'clamp(2.4rem, 6vw, 4.2rem)' }}
            >
              Preserving Heritage.<br />
              <span className="text-[#9B7A2F]">Enhancing Beauty.</span>
            </h1>
            <p className="text-[#F5F0E8]/60 text-lg mb-10 max-w-lg mx-auto md:mx-0 leading-relaxed">
              {brand.tagline} Soft-wash exterior cleaning rooted in the standard of care
              that Tennessee&apos;s oldest town deserves.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link href="/quote" className="mm-btn mm-btn-brass">
                Request a Quote
              </Link>
              <Link href="/services" className="mm-btn mm-btn-outline-light">
                Our Services
              </Link>
            </div>
          </div>

          {/* Logo mark — inverted to cream so it reads on dark green */}
          <div className="shrink-0 opacity-90">
            <Image
              src="/logo.png"
              alt="Mist and Main"
              width={240}
              height={240}
              className="object-contain drop-shadow-2xl"
priority
            />
          </div>
        </div>
      </section>

      {/* ── Trust badges ── */}
      <section className="bg-[#9B7A2F] py-4 px-4">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-6 md:gap-10">
          {BADGES.map(b => (
            <div key={b.label} className="flex items-center gap-2 text-[#F5F0E8] font-semibold text-sm">
              <span>{b.icon}</span>
              <span>{b.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services preview ── */}
      {services.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-20">
          <FadeUp>
            <div className="ornament-divider mb-3">
              <span>✦</span>
            </div>
            <h2
              className="text-center text-[#1C1C1C] mb-2"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
            >
              Restoration Services
            </h2>
            <p className="text-center text-[#5C6B5C] mb-12 max-w-lg mx-auto">
              Every surface treated with the right method — preserving what makes your property worth protecting.
            </p>
          </FadeUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map(s => (
              <FadeUp key={s.id} className="h-full">
                <ServiceCard service={s} />
              </FadeUp>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Link href="/services" className="mm-btn mm-btn-outline">
              View All Services
            </Link>
          </div>
        </section>
      )}

      {/* ── Why Mist and Main ── */}
      <section className="bg-[#FDFAF6] border-y border-[#D4C9B8] py-20 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <FadeUp>
            <p className="text-[#9B7A2F] text-xs font-semibold tracking-[0.2em] uppercase mb-3">Rooted in Jonesborough</p>
            <h2
              className="text-[#1C1C1C] mb-5"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)' }}
            >
              The Mist and Main Standard
            </h2>
            <p className="text-[#5C6B5C] leading-relaxed mb-4">
              When you walk the historic district of Jonesborough, you see buildings that have been cared for across
              generations. That same level of attention is what we bring to every driveway, facade, and roofline we touch.
            </p>
            <p className="text-[#5C6B5C] leading-relaxed">
              We don&apos;t just pressure wash — we treat, restore, and respect the character of your property.
            </p>
            <div className="mt-8">
              <Link href="/about" className="mm-btn">
                Our Story
              </Link>
            </div>
          </FadeUp>

          <FadeUp>
            <div className="bg-[#2D4A2D] rounded p-8 text-[#F5F0E8]">
              <p
                className="text-[#9B7A2F] mb-6"
                style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '1.2rem' }}
              >
                Why choose us?
              </p>
              <ul className="flex flex-col gap-4">
                {[
                  'Fully insured and licensed',
                  'Soft-wash technology that protects historic surfaces',
                  'Eco-friendly cleaning solutions',
                  'All-crew professionals — no day laborers',
                  'Satisfaction guaranteed on every job',
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className="text-[#9B7A2F] mt-0.5 shrink-0">✦</span>
                    <span className="text-[#F5F0E8]/80">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CTA band ── */}
      <section className="py-20 px-4 text-center bg-[#F5F0E8]">
        <FadeUp>
          <div className="ornament-divider mb-6 max-w-lg mx-auto">
            <span>✦</span>
          </div>
          <h2
            className="text-[#1C1C1C] mb-4"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
          >
            Ready to restore your property?
          </h2>
          <p className="text-[#5C6B5C] mb-10 max-w-md mx-auto">
            Tell us about your project and we&apos;ll respond within 24 hours.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/quote" className="mm-btn mm-btn-brass">
              Request a Free Quote
            </Link>
            <Link href="/contact" className="mm-btn mm-btn-outline">
              Get in Touch
            </Link>
          </div>
        </FadeUp>
      </section>
    </>
  )
}
