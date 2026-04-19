'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const contentRef = useRef<HTMLDivElement>(null)
  const wipeRef = useRef<HTMLDivElement>(null)
  const prevPath = useRef<string>(pathname)

  useEffect(() => {
    if (prevPath.current === pathname) return
    prevPath.current = pathname

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      gsap.fromTo(contentRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 })
      return
    }

    // Spray-fan wipe: a gradient that looks like water sweeping across
    const tl = gsap.timeline()
    tl.set(wipeRef.current, { display: 'block', scaleX: 0, transformOrigin: 'left center' })
    tl.to(wipeRef.current, { scaleX: 1, duration: 0.28, ease: 'power3.in' })
    tl.set(contentRef.current, { opacity: 0 })
    tl.set(wipeRef.current, { transformOrigin: 'right center' })
    tl.to(wipeRef.current, { scaleX: 0, duration: 0.28, ease: 'power2.out' }, '+=0.02')
    tl.to(contentRef.current, { opacity: 1, duration: 0.18 }, '<0.1')
    tl.set(wipeRef.current, { display: 'none' })
  }, [pathname])

  return (
    <>
      {/* Spray wipe overlay — gradient looks like a pressure stream */}
      <div
        ref={wipeRef}
        className="fixed inset-0 z-[999] pointer-events-none hidden"
        style={{
          background: 'linear-gradient(105deg, #00D4FF 0%, #0090cc 40%, #00D4FF 70%, #a0f0ff 100%)',
          boxShadow: 'inset -4px 0 20px rgba(255,255,255,0.3)',
        }}
      />
      <div ref={contentRef}>{children}</div>
    </>
  )
}
