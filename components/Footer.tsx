import Image from 'next/image'
import Link from 'next/link'

interface FooterProps {
  brandName: string
  phone: string
  email1: string
}

export default function Footer({ brandName, phone, email1 }: FooterProps) {
  return (
    <footer className="bg-[#2D4A2D] text-[#F5F0E8]">
      <div className="max-w-6xl mx-auto px-4 py-14 grid sm:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <Image src="/logo.png" alt={brandName} width={44} height={44} className="object-contain brightness-0 invert opacity-80" />
            <div>
              <p
                className="font-bold text-[#F5F0E8] leading-tight"
                style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '1rem' }}
              >
                {brandName}
              </p>
              <p className="text-[#9B7A2F] text-xs tracking-widest uppercase">Old Towne Clean</p>
            </div>
          </div>
          <p className="text-[#F5F0E8]/50 text-sm leading-relaxed">
            Preserving heritage. Enhancing beauty.<br />
            Jonesborough, Tennessee.
          </p>
        </div>

        {/* Contact */}
        <div>
          <p className="text-[#9B7A2F] text-xs font-semibold tracking-widest uppercase mb-4">Contact</p>
          <div className="flex flex-col gap-2 text-sm">
            <a href={`tel:${phone}`} className="text-[#F5F0E8]/70 hover:text-[#F5F0E8] transition-colors">{phone}</a>
            <a href={`mailto:${email1}`} className="text-[#F5F0E8]/70 hover:text-[#F5F0E8] transition-colors">{email1}</a>
            <div className="mt-1 text-[#F5F0E8]/50 text-xs leading-relaxed">
              <p className="font-semibold text-[#F5F0E8]/60 mb-0.5">Hours</p>
              <p>Mon – Sat &nbsp;9 am – 5 pm</p>
              <p>Sunday &nbsp;Closed</p>
            </div>
            <a
              href="https://www.google.com/search?q=Mist+and+Main&stick=H4sIAAAAAAAA_-NgU1I1qEhMMUkyTLFITko1STZNTkmzMqgwSzY3NzaxSE40MTZMNElLXMTK65tZXKKQmJei4JuYmQcAahxewDkAAAA&hl=en&mat=CVzp3z-PSbJwElYBTVDHnqCH1k4Cii9SDPbLooBk3kK7gH9h5-7Ku-LvSmb_Ow-eOqrIig7tk3qt2uhMittlVThmbtuSDVNZE4CpHDl3oDMfzAgfDp_jpT2a5-94QUEHgA&authuser=0&ved=2ahUKEwinmZ-gh5GUAxUl6ckDHdUICi4Q-MgIegQIFhAe"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#9B7A2F] hover:text-[#F5F0E8] transition-colors mt-1"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              Google Business Profile
            </a>
            <Link href="/quote" className="text-[#9B7A2F] hover:text-[#F5F0E8] transition-colors">Request a Quote →</Link>
          </div>
        </div>

        {/* Rinse Rebels teaser */}
        <div>
          <p className="text-[#9B7A2F] text-xs font-semibold tracking-widest uppercase mb-4">The Team</p>
          <Link
            href="/about#rebels"
            className="group block"
          >
            <p
              className="text-[#F5F0E8] text-lg leading-tight mb-1 group-hover:text-[#9B7A2F] transition-colors"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              Meet the Rinse Rebels
            </p>
            <p className="text-[#F5F0E8]/40 text-sm">The all-girl crew behind the clean.</p>
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#F5F0E8]/10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap justify-between gap-2 text-xs text-[#F5F0E8]/30">
          <span>&copy; {new Date().getFullYear()} {brandName}. All rights reserved.</span>
          <span>Insured &bull; Licensed &bull; Locally Owned</span>
        </div>
      </div>
    </footer>
  )
}
