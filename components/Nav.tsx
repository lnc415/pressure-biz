'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

interface NavProps {
  brandName: string
}

const links = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/blog', label: 'Blog' },
  { href: '/faq', label: 'FAQ' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav({ brandName }: NavProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-[#FDFAF6] border-b border-[#D4C9B8] shadow-sm">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Image src="/logo.png" alt={brandName} width={38} height={38} className="object-contain" />
          <span
            className="font-serif font-bold text-[#2D4A2D] tracking-wide leading-none hidden sm:block"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '1.1rem' }}
          >
            {brandName}
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-7 items-center">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`nav-underline text-sm tracking-wide transition-colors ${
                  pathname === href
                    ? 'text-[#2D4A2D] font-semibold active'
                    : 'text-[#5C6B5C] hover:text-[#2D4A2D]'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/quote" className="mm-btn text-sm">
              Request a Quote
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-[#2D4A2D]"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span className="block w-5 h-0.5 bg-current mb-1.5 transition-all" />
          <span className="block w-5 h-0.5 bg-current mb-1.5" />
          <span className="block w-5 h-0.5 bg-current" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-4 py-5 flex flex-col gap-4 border-t border-[#D4C9B8] bg-[#FDFAF6]">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`text-sm tracking-wide ${pathname === href ? 'text-[#2D4A2D] font-semibold' : 'text-[#5C6B5C]'}`}
            >
              {label}
            </Link>
          ))}
          <Link href="/quote" onClick={() => setOpen(false)} className="mm-btn self-start text-sm">
            Request a Quote
          </Link>
        </div>
      )}
    </nav>
  )
}
