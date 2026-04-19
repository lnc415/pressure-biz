'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { GalleryPhoto } from '@/app/gallery/page'
import FadeUp from './FadeUp'

export default function GalleryGrid({ photos }: { photos: GalleryPhoto[] }) {
  const tags = ['All', ...Array.from(new Set(photos.map(p => p.tag).filter(Boolean)))]
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? photos : photos.filter(p => p.tag === active)

  if (photos.length === 0) {
    return (
      <div className="text-center py-20 text-[#64748B]">
        <div className="text-6xl mb-4">📸</div>
        <p>Gallery photos coming soon — check back after our first jobs!</p>
      </div>
    )
  }

  return (
    <div>
      {tags.length > 2 && (
        <div className="flex gap-2 flex-wrap mb-8">
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => setActive(tag)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                active === tag
                  ? 'bg-[#38BDF8] text-[#0C1A2E]'
                  : 'bg-gray-100 text-[#64748B] hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(photo => (
          <FadeUp key={photo.id}>
            <div className="rounded-2xl overflow-hidden bg-gray-100 aspect-video relative">
              <Image src={photo.url} alt={photo.caption || photo.tag} fill className="object-cover" />
              {photo.caption && (
                <div className="absolute bottom-0 inset-x-0 bg-[#0C1A2E]/70 text-white text-xs p-2">
                  {photo.caption}
                </div>
              )}
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  )
}
