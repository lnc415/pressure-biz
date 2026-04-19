'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

interface NavProps {
  brandName: string
}

const links = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav({ brandName }: NavProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 shadow-lg" style={{ background: '#08111F', borderBottom: '1px solid rgba(0,212,255,0.1)' }}>
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="font-black text-lg tracking-tight" style={{ color: '#00D4FF' }}>
          {brandName}
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex gap-6 items-center">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`nav-drip text-sm font-medium transition-colors hover:text-[#00D4FF] ${
                  pathname === href ? 'text-[#00D4FF]' : 'text-white/60'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            {/* Red tip button — highest urgency */}
            <Link
              href="/quote"
              className="tip-btn tip-red text-sm"
            >
              <span className="tip-badge" />
              Get a Quote
              <span className="ml-1 text-xs opacity-50 font-normal">0°</span>
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-white/60"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span className="block w-5 h-0.5 bg-current mb-1.5" />
          <span className="block w-5 h-0.5 bg-current mb-1.5" />
          <span className="block w-5 h-0.5 bg-current" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden px-4 py-4 flex flex-col gap-3"
          style={{ borderTop: '1px solid rgba(0,212,255,0.1)', background: '#08111F' }}
        >
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`text-sm font-medium ${pathname === href ? 'text-[#00D4FF]' : 'text-white/60'}`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/quote"
            onClick={() => setOpen(false)}
            className="tip-btn tip-red text-sm self-start"
          >
            <span className="tip-badge" />
            Get a Quote
          </Link>
        </div>
      )}
    </nav>
  )
}
