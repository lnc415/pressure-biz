'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const contentRef = useRef<HTMLDivElement>(null)
  const wipRef = useRef<HTMLDivElement>(null)
  const prevPath = useRef<string>(pathname)

  useEffect(() => {
    if (prevPath.current === pathname) return
    prevPath.current = pathname

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      gsap.fromTo(contentRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 })
      return
    }

    // Spray wipe in then out
    const tl = gsap.timeline()
    tl.set(wipRef.current, { clipPath: 'inset(0 100% 0 0)', display: 'block' })
    tl.to(wipRef.current, { clipPath: 'inset(0 0% 0 0)', duration: 0.25, ease: 'power2.in' })
    tl.fromTo(contentRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 }, '>')
    tl.to(wipRef.current, { clipPath: 'inset(0 0% 0 100%)', duration: 0.25, ease: 'power2.out' }, '>')
    tl.set(wipRef.current, { display: 'none' })
  }, [pathname])

  return (
    <>
      {/* Spray overlay */}
      <div
        ref={wipRef}
        className="fixed inset-0 z-[999] bg-[#38BDF8] pointer-events-none hidden"
        style={{ clipPath: 'inset(0 100% 0 0)' }}
      />
      <div ref={contentRef}>{children}</div>
    </>
  )
}
