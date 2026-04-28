import { getBrand } from '@/lib/brand'
import ContactForm from '@/components/ContactForm'
import FadeUp from '@/components/FadeUp'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Contact' }

export default async function ContactPage() {
  const brand = await getBrand()

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <FadeUp>
        <p className="text-[#9B7A2F] text-xs font-semibold tracking-[0.2em] uppercase mb-3">Reach Out</p>
        <h1
          className="text-[#1C1C1C] mb-3"
          style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: 'clamp(2rem, 5vw, 3rem)' }}
        >
          Get in Touch
        </h1>
        <p className="text-[#5C6B5C] mb-12">Have a question or a project in mind? We&apos;d love to hear from you.</p>
      </FadeUp>

      <div className="grid md:grid-cols-2 gap-12">
        <FadeUp>
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-[#9B7A2F] text-xs font-semibold tracking-[0.18em] uppercase mb-1">Phone</p>
              <a href={`tel:${brand.phone}`} className="text-[#1C1C1C] font-semibold text-lg hover:text-[#2D4A2D] transition-colors">
                {brand.phone}
              </a>
            </div>
            <div>
              <p className="text-[#9B7A2F] text-xs font-semibold tracking-[0.18em] uppercase mb-1">Email</p>
              <a href={`mailto:${brand.email1}`} className="text-[#1C1C1C] font-semibold hover:text-[#2D4A2D] transition-colors">
                {brand.email1}
              </a>
            </div>
            <div>
              <p className="text-[#9B7A2F] text-xs font-semibold tracking-[0.18em] uppercase mb-1">Hours</p>
              <p className="text-[#1C1C1C] font-semibold">Mon – Sat &nbsp;9 am – 5 pm</p>
              <p className="text-[#5C6B5C] text-sm">Sunday closed</p>
            </div>
            <div>
              <p className="text-[#9B7A2F] text-xs font-semibold tracking-[0.18em] uppercase mb-1">Service Area</p>
              <p className="text-[#5C6B5C] leading-relaxed">{brand.serviceArea}</p>
            </div>
            <div>
              <p className="text-[#9B7A2F] text-xs font-semibold tracking-[0.18em] uppercase mb-2">Find Us Online</p>
              <a
                href="https://www.google.com/search?q=Mist+and+Main&stick=H4sIAAAAAAAA_-NgU1I1qEhMMUkyTLFITko1STZNTkmzMqgwSzY3NzaxSE40MTZMNElLXMTK65tZXKKQmJei4JuYmQcAahxewDkAAAA&hl=en&mat=CVzp3z-PSbJwElYBTVDHnqCH1k4Cii9SDPbLooBk3kK7gH9h5-7Ku-LvSmb_Ow-eOqrIig7tk3qt2uhMittlVThmbtuSDVNZE4CpHDl3oDMfzAgfDp_jpT2a5-94QUEHgA&authuser=0&ved=2ahUKEwinmZ-gh5GUAxUl6ckDHdUICi4Q-MgIegQIFhAe"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mm-btn mm-btn-outline text-sm"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                View on Google
              </a>
            </div>
          </div>
        </FadeUp>

        <FadeUp>
          <ContactForm />
        </FadeUp>
      </div>
    </div>
  )
}
