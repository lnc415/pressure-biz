import { getBrand } from '@/lib/brand'
import FadeUp from '@/components/FadeUp'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'About Us' }

export default async function AboutPage() {
  const brand = await getBrand()

  return (
    <>
      {/* ── Story section ── */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <FadeUp>
          <p className="text-[#9B7A2F] text-xs font-semibold tracking-[0.2em] uppercase mb-3">Our Story</p>
          <h1
            className="text-[#1C1C1C] mb-4"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: 'clamp(2rem, 5vw, 3rem)' }}
          >
            Rooted in Jonesborough
          </h1>
          <p className="text-[#5C6B5C] max-w-xl mb-14 leading-relaxed">
            Tennessee&apos;s oldest town has always known the value of preservation. So do we.
          </p>
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <FadeUp>
            <div>
              <p className="text-[#5C6B5C] leading-relaxed">{brand.aboutCopy}</p>
              <p className="text-[#5C6B5C] leading-relaxed mt-4">{brand.serviceArea}</p>
            </div>
          </FadeUp>

          <FadeUp>
            <div className="bg-[#2D4A2D] rounded p-8 text-[#F5F0E8]">
              <p
                className="text-[#9B7A2F] mb-6"
                style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '1.1rem' }}
              >
                Why {brand.name}?
              </p>
              <ul className="flex flex-col gap-4">
                {brand.whyUs.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className="text-[#9B7A2F] mt-0.5 shrink-0">✦</span>
                    <span className="text-[#F5F0E8]/80">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
        </div>

        {/* ── CTA ── */}
        <FadeUp>
          <div className="border border-[#D4C9B8] rounded p-10 text-center bg-[#FDFAF6]">
            <h2
              className="text-[#1C1C1C] mb-3"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '1.8rem' }}
            >
              Ready to work together?
            </h2>
            <p className="text-[#5C6B5C] mb-8 max-w-sm mx-auto">
              Get a free quote — we respond within 24 hours.
            </p>
            <Link href="/quote" className="mm-btn mm-btn-brass">
              Request a Quote
            </Link>
          </div>
        </FadeUp>
      </div>

      {/* ── Rinse Rebels section ── */}
      <section id="rebels" className="bg-[#1A2E1A] text-[#F5F0E8]">
        <div className="max-w-5xl mx-auto px-4 py-20">
          <FadeUp>
            <div className="ornament-divider mb-10" style={{ '--tw-divide-color': 'rgba(155,122,47,0.3)' } as React.CSSProperties}>
              <span className="text-[#9B7A2F] text-xl">✦</span>
            </div>
            <p className="text-[#9B7A2F] text-xs font-semibold tracking-[0.25em] uppercase mb-3 text-center">The Team</p>
            <h2
              className="text-center mb-4"
              style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                color: '#F5F0E8',
              }}
            >
              Meet the Rinse Rebels
            </h2>
            <p className="text-[#F5F0E8]/60 text-center max-w-2xl mx-auto mb-14 leading-relaxed">
              The all-girl crew behind every spotless driveway, every restored facade, every satisfied client.
              While the brand carries the heritage of Main Street, the Rebels are the ones who show up with
              the gear, the grit, and the know-how to get it done.
            </p>
          </FadeUp>

          {/* Team grid — wired for photos */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
            {[
              { name: 'Coming Soon', role: 'Lead Tech', note: 'Photo coming soon' },
              { name: 'Coming Soon', role: 'Soft-Wash Specialist', note: 'Photo coming soon' },
              { name: 'Coming Soon', role: 'Surface Restoration', note: 'Photo coming soon' },
            ].map((member, i) => (
              <FadeUp key={i}>
                <div className="border border-[#F5F0E8]/10 rounded overflow-hidden">
                  {/* Photo placeholder */}
                  <div
                    className="aspect-[4/3] flex items-center justify-center"
                    style={{ background: 'rgba(245,240,232,0.05)' }}
                  >
                    <span className="text-[#F5F0E8]/20 text-5xl">📸</span>
                  </div>
                  <div className="p-4">
                    <p
                      className="text-[#F5F0E8]"
                      style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '1.1rem' }}
                    >
                      {member.name}
                    </p>
                    <p className="text-[#9B7A2F] text-xs tracking-wider uppercase mt-0.5">{member.role}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp>
            <div className="border border-[#F5F0E8]/10 rounded p-8 text-center">
              <p
                className="text-[#F5F0E8]/80 leading-relaxed max-w-2xl mx-auto text-sm"
                style={{ fontStyle: 'italic' }}
              >
                &ldquo;We aren&apos;t just power washing — we&apos;re treating and respecting the home,
                just as this community has respected its structures for centuries. When the Rebels are on-site,
                the grime doesn&apos;t stand a chance.&rdquo;
              </p>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
