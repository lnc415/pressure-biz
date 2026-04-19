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
        <h1 className="text-4xl font-black text-[#0C1A2E] mb-2">Our Work</h1>
        <p className="text-[#64748B] mb-10">See the CamSplash difference — before and after, job by job.</p>
      </FadeUp>
      <GalleryGrid photos={photos} />
    </div>
  )
}
