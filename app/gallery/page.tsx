import { readData } from '@/lib/data'
import FadeUp from '@/components/FadeUp'
import GalleryGrid from '@/components/GalleryGrid'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Gallery' }

export interface GalleryPhoto {
  id: string
  url: string
  tag: string
  caption: string
  pairedWith?: string
}

export default async function GalleryPage() {
  const photos = await readData<GalleryPhoto>('gallery')

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <FadeUp>
        <p className="text-[#9B7A2F] text-xs font-semibold tracking-[0.2em] uppercase mb-3">Our Work</p>
        <h1
          className="text-[#1C1C1C] mb-3"
          style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: 'clamp(2rem, 5vw, 3rem)' }}
        >
          The Mist and Main Standard
        </h1>
        <p className="text-[#5C6B5C] mb-12 max-w-xl">
          Before and after — the results speak for themselves. Every job treated with care, every surface restored.
        </p>
      </FadeUp>
      <GalleryGrid photos={photos} />
    </div>
  )
}
