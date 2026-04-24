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
      <div className="text-center py-24 text-[#5C6B5C] border border-[#D4C9B8] rounded bg-[#FDFAF6]">
        <div className="text-5xl mb-4">📸</div>
        <p
          className="mb-2"
          style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '1.2rem', color: '#1C1C1C' }}
        >
          Gallery coming soon
        </p>
        <p className="text-sm">Job photos will be added as the crew gets to work.</p>
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
              className={`px-4 py-1.5 text-sm font-semibold border transition-colors rounded ${
                active === tag
                  ? 'bg-[#2D4A2D] text-[#F5F0E8] border-[#2D4A2D]'
                  : 'bg-transparent text-[#5C6B5C] border-[#D4C9B8] hover:border-[#2D4A2D] hover:text-[#2D4A2D]'
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
            <div className="rounded overflow-hidden bg-[#D4C9B8] aspect-video relative border border-[#D4C9B8]">
              <Image src={photo.url} alt={photo.caption || photo.tag} fill className="object-cover" />
              {photo.caption && (
                <div
                  className="absolute bottom-0 inset-x-0 px-3 py-2 text-xs text-[#F5F0E8]"
                  style={{ background: 'rgba(45, 74, 45, 0.85)' }}
                >
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
