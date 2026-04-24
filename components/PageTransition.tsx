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
      gsap.fromTo(contentRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 })
      return
    }

    const tl = gsap.timeline()
    tl.set(wipeRef.current, { display: 'block', scaleX: 0, transformOrigin: 'left center' })
    tl.to(wipeRef.current, { scaleX: 1, duration: 0.3, ease: 'power3.in' })
    tl.set(contentRef.current, { opacity: 0 })
    tl.set(wipeRef.current, { transformOrigin: 'right center' })
    tl.to(wipeRef.current, { scaleX: 0, duration: 0.3, ease: 'power2.out' }, '+=0.02')
    tl.to(contentRef.current, { opacity: 1, duration: 0.2 }, '<0.1')
    tl.set(wipeRef.current, { display: 'none' })
  }, [pathname])

  return (
    <>
      <div
        ref={wipeRef}
        className="fixed inset-0 z-[999] pointer-events-none hidden"
        style={{ background: 'linear-gradient(105deg, #2D4A2D 0%, #3d6b3d 50%, #2D4A2D 100%)' }}
      />
      <div ref={contentRef}>{children}</div>
    </>
  )
}
