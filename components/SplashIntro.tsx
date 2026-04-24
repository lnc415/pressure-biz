'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'

interface SplashIntroProps {
  brandName: string
  logoSrc: string
}

class MistParticle {
  x: number; y: number
  vx: number; vy: number
  life: number; maxLife: number
  size: number

  constructor(W: number, H: number) {
    this.x = Math.random() * W
    this.y = H * 0.5 + Math.random() * H * 0.5
    this.vx = (Math.random() - 0.5) * 0.4
    this.vy = -(0.15 + Math.random() * 0.35)
    this.size = 40 + Math.random() * 80
    this.maxLife = 200 + Math.random() * 150
    this.life = 0
  }

  update() {
    this.x += this.vx
    this.y += this.vy
    this.life++
  }

  draw(ctx: CanvasRenderingContext2D) {
    const t = this.life / this.maxLife
    const alpha = t < 0.25
      ? (t / 0.25) * 0.13
      : (1 - t) * 0.13

    if (alpha <= 0.005) return

    const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size)
    grad.addColorStop(0, `rgba(245, 240, 232, ${alpha})`)
    grad.addColorStop(1, `rgba(245, 240, 232, 0)`)

    ctx.save()
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = grad
    ctx.fill()
    ctx.restore()
  }

  isDead() { return this.life >= this.maxLife }
}

export default function SplashIntro({ brandName, logoSrc }: SplashIntroProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const logoRef    = useRef<HTMLDivElement>(null)
  const skipRef    = useRef<HTMLParagraphElement>(null)
  const [visible, setVisible] = useState(false)
  const animId    = useRef<number>(0)
  const particles = useRef<MistParticle[]>([])
  const emitting  = useRef(true)

  useEffect(() => { setVisible(true) }, [])

  useEffect(() => {
    if (!visible) return

    const canvas  = canvasRef.current!
    const ctx     = canvas.getContext('2d')!
    const overlay = overlayRef.current!

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const tl = gsap.timeline({ onComplete: () => setVisible(false) })

    tl.fromTo(logoRef.current,
      { opacity: 0, y: 20, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power2.out' },
      0.6
    )
    tl.fromTo(skipRef.current,
      { opacity: 0 }, { opacity: 1, duration: 0.4 },
      1.4
    )
    tl.to(overlay, {
      opacity: 0,
      duration: 0.7,
      ease: 'power2.inOut',
      onStart: () => { emitting.current = false },
    }, 3.2)

    let frame = 0
    const loop = () => {
      animId.current = requestAnimationFrame(loop)
      const W = canvas.width
      const H = canvas.height
      ctx.clearRect(0, 0, W, H)

      if (emitting.current) {
        frame++
        const count = frame < 30 ? Math.round((frame / 30) * 3) : 2
        for (let i = 0; i < count; i++) {
          particles.current.push(new MistParticle(W, H))
        }
      }

      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i]
        p.update()
        p.draw(ctx)
        if (p.isDead()) particles.current.splice(i, 1)
      }
    }
    animId.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(animId.current)
      window.removeEventListener('resize', resize)
    }
  }, [visible])

  const skip = () => {
    emitting.current = false
    gsap.killTweensOf([overlayRef.current, logoRef.current, skipRef.current])
    cancelAnimationFrame(animId.current)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      ref={overlayRef}
      onClick={skip}
      className="fixed inset-0 z-[9999] flex items-center justify-center cursor-pointer overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #1A2E1A 0%, #2D4A2D 100%)' }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      <div ref={logoRef} className="relative z-10 text-center select-none px-6" style={{ opacity: 0 }}>
        <div className="flex justify-center mb-6">
          <Image
            src={logoSrc}
            alt={brandName}
            width={260}
            height={260}
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>
        <div
          className="text-[#F5F0E8] tracking-[0.18em] uppercase text-xs font-light mt-2 opacity-60"
        >
          Old Towne Clean
        </div>
      </div>

      <p
        ref={skipRef}
        className="absolute bottom-8 text-[#F5F0E8]/25 text-xs select-none"
        style={{ opacity: 0 }}
      >
        tap anywhere to skip
      </p>
    </div>
  )
}
