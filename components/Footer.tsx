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
            <Link href="/quote" className="text-[#9B7A2F] hover:text-[#F5F0E8] transition-colors mt-1">Request a Quote →</Link>
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
