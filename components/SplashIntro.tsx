'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

interface SplashIntroProps {
  brandName: string
}

const COLORS: [number, number, number][] = [
  [255, 255, 255],  // white
  [220, 245, 255],  // icy white-blue
  [180, 230, 255],  // light sky
  [100, 215, 255],  // soft cyan
  [0,   200, 248],  // water
  [0,   212, 255],  // brand cyan
]

class Drop {
  x: number; y: number
  vx: number; vy: number
  life: number; maxLife: number
  w: number
  r: number; g: number; b: number

  constructor(ox: number, oy: number) {
    // Speed calibrated so drops are visible ACROSS the full screen:
    // at 1600px wide, we want drops to take ~100 frames to cross → speed ≈ 18–28
    const speed  = 16 + Math.random() * 16       // 16–32 px/frame
    const spread = 40                              // 40° total cone
    const half   = (spread * Math.PI) / 180 / 2
    const angle  = Math.PI - half + Math.random() * half * 2  // pointing left

    this.x = ox
    this.y = oy
    this.vx = Math.cos(angle) * speed
    this.vy = Math.sin(angle) * speed

    // Long life so drops remain visible while crossing the screen
    this.maxLife = 110 + Math.random() * 70      // 110–180 frames
    this.life    = 0
    this.w       = 0.8 + Math.random() * 2.2

    const [r, g, b] = COLORS[Math.floor(Math.random() * COLORS.length)]
    this.r = r; this.g = g; this.b = b
  }

  update() {
    this.x  += this.vx
    this.y  += this.vy
    this.vy += 0.18        // gentle gravity — arc downward
    this.vx *= 0.996       // very low drag — keeps speed through full arc
    this.life++
  }

  draw(ctx: CanvasRenderingContext2D) {
    const t = this.life / this.maxLife
    const alpha = t < 0.08
      ? t / 0.08                                   // quick fade in
      : 1 - Math.pow((t - 0.08) / 0.92, 1.8)      // gentle fade out

    if (alpha <= 0.01) return

    const speed   = Math.hypot(this.vx, this.vy)
    const tailLen = Math.min(speed * 1.5, 30)

    ctx.save()
    ctx.globalAlpha = alpha * 0.75
    ctx.beginPath()
    ctx.moveTo(this.x, this.y)
    ctx.lineTo(
      this.x - (this.vx / speed) * tailLen,
      this.y - (this.vy / speed) * tailLen,
    )
    ctx.strokeStyle = `rgb(${this.r},${this.g},${this.b})`
    ctx.lineWidth   = this.w
    ctx.lineCap     = 'round'
    ctx.stroke()
    ctx.restore()
  }

  isDead(H: number) {
    return this.life >= this.maxLife || this.y > H + 100
  }
}

export default function SplashIntro({ brandName }: SplashIntroProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const logoRef    = useRef<HTMLDivElement>(null)
  const skipRef    = useRef<HTMLParagraphElement>(null)
  const [visible, setVisible] = useState(false)
  const animId   = useRef<number>(0)
  const drops    = useRef<Drop[]>([])
  const emitting = useRef(true)

  // Every visit — no sessionStorage gate
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

    // Nozzle: right edge, 40% down from top
    const ox = () => canvas.width + 8
    const oy = () => canvas.height * 0.40

    const tl = gsap.timeline({ onComplete: () => setVisible(false) })

    // Logo appears at 1.2s (spray is filling the screen by then)
    tl.fromTo(logoRef.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' },
      1.2
    )
    tl.fromTo(skipRef.current,
      { opacity: 0 }, { opacity: 1, duration: 0.4 },
      1.8
    )

    // 3.0s: overlay blasts off to the left
    tl.to(overlay, {
      xPercent: -110,
      duration: 0.55,
      ease: 'power3.inOut',
      onStart: () => { emitting.current = false },
    }, 3.0)

    let frame = 0
    const loop = () => {
      animId.current = requestAnimationFrame(loop)
      const W = canvas.width
      const H = canvas.height
      ctx.clearRect(0, 0, W, H)

      if (emitting.current) {
        frame++
        const x = ox(), y = oy()
        // Ramp up hard in first 20 frames so the blast feels instant
        const ramp  = Math.min(frame / 20, 1)
        const count = Math.round(ramp * 30)
        for (let i = 0; i < count; i++) {
          drops.current.push(new Drop(x, y))
        }
      }

      for (let i = drops.current.length - 1; i >= 0; i--) {
        const d = drops.current[i]
        d.update()
        d.draw(ctx)
        if (d.isDead(H)) drops.current.splice(i, 1)
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
      style={{ background: 'linear-gradient(160deg,#08111F 0%,#0D1B30 100%)' }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      <div ref={logoRef} className="relative z-10 text-center select-none" style={{ opacity: 0 }}>
        <div
          className="font-black tracking-tight leading-none"
          style={{
            fontSize: 'clamp(4rem, 14vw, 8.5rem)',
            color: '#00D4FF',
            textShadow: '0 0 60px rgba(0,212,255,0.55), 0 0 130px rgba(0,212,255,0.2)',
          }}
        >
          {brandName}
        </div>
        <div className="mt-4 text-white/30 tracking-[0.5em] uppercase text-sm font-light">
          We Make It Shine
        </div>
        <div className="mt-8 flex justify-center gap-3 items-end">
          {[40, 32, 26, 20, 14].map((h, i) => (
            <div key={i} style={{
              width: 8, height: h,
              background: `rgba(0,212,255,${0.25 + i * 0.06})`,
              borderRadius: '3px 3px 2px 2px',
            }} />
          ))}
        </div>
      </div>

      <p
        ref={skipRef}
        className="absolute bottom-8 text-white/20 text-xs select-none"
        style={{ opacity: 0 }}
      >
        tap anywhere to skip
      </p>
    </div>
  )
}
