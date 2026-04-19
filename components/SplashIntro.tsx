'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

interface SplashIntroProps {
  brandName: string
}

// Tip colors for multi-color spray
const TIP_COLORS = [
  'rgba(232, 35, 26, 0.85)',   // red
  'rgba(255, 209, 0, 0.85)',   // yellow
  'rgba(0, 165, 80, 0.85)',    // green
  'rgba(216, 232, 240, 0.85)', // white
  'rgba(0, 212, 255, 0.9)',    // water/cyan (dominant)
  'rgba(0, 212, 255, 0.75)',
  'rgba(0, 212, 255, 0.6)',
]

class Particle {
  x: number; y: number
  vx: number; vy: number
  life: number; maxLife: number
  size: number; color: string

  constructor(ox: number, oy: number, angle: number, spread: number) {
    const a = angle + (Math.random() - 0.5) * spread
    const speed = 10 + Math.random() * 18
    this.x = ox
    this.y = oy
    this.vx = Math.cos(a) * speed
    this.vy = Math.sin(a) * speed
    this.life = 0
    this.maxLife = 35 + Math.random() * 40
    this.size = 0.8 + Math.random() * 2.2
    this.color = TIP_COLORS[Math.floor(Math.random() * TIP_COLORS.length)]
  }

  update() {
    this.x += this.vx
    this.y += this.vy
    this.vy += 0.25
    this.vx *= 0.97
    this.life++
  }

  draw(ctx: CanvasRenderingContext2D) {
    const alpha = Math.max(0, 1 - this.life / this.maxLife)
    ctx.save()
    ctx.globalAlpha = alpha
    ctx.beginPath()
    // Draw a short line instead of dot for more spray-like feel
    ctx.moveTo(this.x, this.y)
    ctx.lineTo(this.x - this.vx * 0.5, this.y - this.vy * 0.5)
    ctx.strokeStyle = this.color
    ctx.lineWidth = this.size
    ctx.lineCap = 'round'
    ctx.stroke()
    ctx.restore()
  }

  isDead() { return this.life >= this.maxLife }
}

export default function SplashIntro({ brandName }: SplashIntroProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const skipRef = useRef<HTMLParagraphElement>(null)
  const [visible, setVisible] = useState(false)
  const animRef = useRef<number>(0)
  const particles = useRef<Particle[]>([])
  const emitting = useRef(true)

  useEffect(() => {
    if (sessionStorage.getItem('splash_seen')) return
    sessionStorage.setItem('splash_seen', '1')
    setVisible(true)
  }, [])

  useEffect(() => {
    if (!visible) return

    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const overlay = overlayRef.current!
    const logo = logoRef.current!

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Nozzle origin: right side, center height — pointing left
    const getOrigin = () => ({
      x: canvas.width + 20,
      y: canvas.height * 0.5,
    })
    const ANGLE = Math.PI        // pointing left
    const SPREAD = Math.PI / 6  // 30° cone

    // Phase 1: spray for 1.4s, then logo fades in
    // Phase 2: logo hold 0.6s
    // Phase 3: big blast wipe right-to-left

    const tl = gsap.timeline({ onComplete: () => setVisible(false) })

    // Logo appears at 0.8s
    tl.fromTo(logo,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      0.8
    )

    // Skip hint fades in
    tl.fromTo(skipRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4 },
      1.2
    )

    // Phase 3: wipe overlay away (clip-path from right)
    tl.to(overlay,
      {
        clipPath: 'inset(0 0 0 110%)',
        duration: 0.65,
        ease: 'power3.inOut',
        onStart: () => { emitting.current = false },
      },
      2.2
    )

    // Canvas spray loop
    let frame = 0
    const loop = () => {
      animRef.current = requestAnimationFrame(loop)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Emit new particles while spraying
      if (emitting.current) {
        frame++
        const batchSize = frame < 20 ? Math.min(frame * 2, 25) : 25
        const { x, y } = getOrigin()
        for (let i = 0; i < batchSize; i++) {
          particles.current.push(new Particle(x, y, ANGLE, SPREAD))
        }
      }

      // Draw & update
      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i]
        p.update()
        p.draw(ctx)
        if (p.isDead()) particles.current.splice(i, 1)
      }
    }
    animRef.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [visible])

  const skip = () => {
    emitting.current = false
    gsap.killTweensOf([overlayRef.current, logoRef.current])
    cancelAnimationFrame(animRef.current)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      ref={overlayRef}
      onClick={skip}
      className="fixed inset-0 z-[9999] bg-[#08111F] flex items-center justify-center cursor-pointer overflow-hidden"
      style={{ clipPath: 'inset(0 0 0 0%)' }}
    >
      {/* Canvas spray */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Logo */}
      <div ref={logoRef} className="relative z-10 text-center select-none" style={{ opacity: 0 }}>
        <div
          className="font-black tracking-tight mb-3 leading-none"
          style={{
            fontSize: 'clamp(3rem, 10vw, 6rem)',
            color: '#00D4FF',
            textShadow: '0 0 40px rgba(0,212,255,0.5), 0 0 80px rgba(0,212,255,0.2)',
          }}
        >
          {brandName}
        </div>
        <div className="text-white/50 text-sm tracking-[0.4em] uppercase">We Make It Shine</div>

        {/* Tip row */}
        <div className="mt-6 flex justify-center gap-3 items-end">
          {[
            { color: '#E8231A', angle: '0°',  h: 32 },
            { color: '#FFD100', angle: '15°', h: 28 },
            { color: '#00A550', angle: '25°', h: 24 },
            { color: '#D8E8F0', angle: '40°', h: 20 },
            { color: '#2A2A2A', angle: '65°', h: 16 },
          ].map(t => (
            <div key={t.angle} className="flex flex-col items-center gap-1">
              <div
                style={{
                  width: 10,
                  height: t.h,
                  background: t.color,
                  borderRadius: '3px 3px 2px 2px',
                  boxShadow: `0 0 8px ${t.color}88`,
                }}
              />
              <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>{t.angle}</span>
            </div>
          ))}
        </div>
      </div>

      <p ref={skipRef} className="absolute bottom-8 text-white/20 text-xs select-none" style={{ opacity: 0 }}>
        tap to skip
      </p>
    </div>
  )
}
