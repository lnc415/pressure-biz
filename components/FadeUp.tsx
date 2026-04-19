'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function FadeUp({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(el, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )

    gsap.set(el, { opacity: 0, y: 30 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
