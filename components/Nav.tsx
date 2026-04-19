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
    <nav className="bg-[#0C1A2E] text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="text-xl font-bold text-[#38BDF8] tracking-tight">
          {brandName}
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex gap-6 items-center">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`nav-drip text-sm font-medium transition-colors hover:text-[#00E5FF] ${
                  pathname === href ? 'text-[#00E5FF]' : 'text-white/80'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/quote"
              className="btn-ripple bg-[#38BDF8] text-[#0C1A2E] px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#00E5FF] transition-colors"
            >
              Get a Quote
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-0.5 bg-white mb-1.5" />
          <span className="block w-6 h-0.5 bg-white mb-1.5" />
          <span className="block w-6 h-0.5 bg-white" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0C1A2E] border-t border-white/10 px-4 py-4 flex flex-col gap-3">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`text-sm font-medium ${pathname === href ? 'text-[#00E5FF]' : 'text-white/80'}`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/quote"
            onClick={() => setOpen(false)}
            className="btn-ripple bg-[#38BDF8] text-[#0C1A2E] px-4 py-2 rounded-full text-sm font-semibold text-center hover:bg-[#00E5FF] transition-colors"
          >
            Get a Quote
          </Link>
        </div>
      )}
    </nav>
  )
}
