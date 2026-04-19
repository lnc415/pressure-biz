'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

interface SplashIntroProps {
  brandName: string
}

export default function SplashIntro({ brandName }: SplashIntroProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('splash_seen')) return
    sessionStorage.setItem('splash_seen', '1')
    setVisible(true)

    const tl = gsap.timeline({
      onComplete: () => setVisible(false),
    })

    // Logo fade in
    tl.fromTo(logoRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' })
    // Hold
    tl.to(logoRef.current, { duration: 0.4 })
    // Spray wipe: clip-path sweeps right-to-left revealing page underneath
    tl.to(overlayRef.current, {
      clipPath: 'inset(0 100% 0 0)',
      duration: 0.7,
      ease: 'power3.inOut',
    })
  }, [])

  const skip = () => {
    gsap.killTweensOf([overlayRef.current, logoRef.current])
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      ref={overlayRef}
      onClick={skip}
      className="fixed inset-0 z-[9999] bg-[#0C1A2E] flex items-center justify-center cursor-pointer"
      style={{ clipPath: 'inset(0 0% 0 0)' }}
    >
      <div ref={logoRef} className="text-center select-none" style={{ opacity: 0 }}>
        <div className="text-[#38BDF8] text-6xl font-black tracking-tight mb-2">{brandName}</div>
        <div className="text-[#00E5FF] text-lg tracking-widest uppercase">We Make It Shine</div>
        <div className="mt-6 flex justify-center gap-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-6 bg-[#38BDF8] rounded-full opacity-70"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>
      <p className="absolute bottom-8 text-white/30 text-xs">Tap anywhere to skip</p>
    </div>
  )
}
