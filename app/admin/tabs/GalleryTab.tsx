'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import type { GalleryPhoto } from '@/app/gallery/page'

export default function GalleryTab() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [tag, setTag] = useState('')
  const [caption, setCaption] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch('/api/admin/gallery').then(r => r.json()).then(d => { setPhotos(d); setLoading(false) })
  }, [])

  const upload = async () => {
    const file = fileRef.current?.files?.[0]
    if (!file) return
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    fd.append('tag', tag)
    fd.append('caption', caption)
    const res = await fetch('/api/admin/gallery', { method: 'POST', body: fd })
    if (res.ok) {
      const photo = await res.json()
      setPhotos(p => [...p, photo])
      setTag('')
      setCaption('')
      if (fileRef.current) fileRef.current.value = ''
    }
    setUploading(false)
  }

  const remove = async (id: string) => {
    await fetch('/api/admin/gallery', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    setPhotos(p => p.filter(x => x.id !== id))
  }

  if (loading) return <p className="text-[#64748B]">Loading gallery...</p>

  return (
    <div>
      {/* Upload */}
      <div className="bg-white border rounded-2xl p-5 mb-6">
        <h3 className="font-bold text-[#0C1A2E] mb-4">Upload Photo</h3>
        <div className="flex flex-col gap-3">
          <input ref={fileRef} type="file" accept="image/*" className="text-sm" />
          <div className="grid sm:grid-cols-2 gap-3">
            <input className="border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#38BDF8]" placeholder="Tag (e.g. Driveway)" value={tag} onChange={e => setTag(e.target.value)} />
            <input className="border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#38BDF8]" placeholder="Caption (optional)" value={caption} onChange={e => setCaption(e.target.value)} />
          </div>
          <button onClick={upload} disabled={uploading} className="bg-[#38BDF8] text-[#0C1A2E] font-semibold px-5 py-2 rounded-full text-sm hover:bg-[#00E5FF] transition-colors disabled:opacity-50 self-start">
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </div>

      {photos.length === 0 ? (
        <p className="text-[#64748B] text-sm">No photos yet. Upload some above.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map(p => (
            <div key={p.id} className="bg-white border rounded-2xl overflow-hidden shadow-sm">
              <div className="aspect-video relative bg-gray-100">
                <Image src={p.url} alt={p.caption || p.tag} fill className="object-cover" />
              </div>
              <div className="p-3">
                {p.tag && <span className="text-xs bg-[#38BDF8]/20 text-[#0C1A2E] px-2 py-0.5 rounded-full font-semibold">{p.tag}</span>}
                {p.caption && <p className="text-xs text-[#64748B] mt-1">{p.caption}</p>}
                <button onClick={() => remove(p.id)} className="mt-2 text-xs text-red-500 hover:text-red-700 transition-colors">Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
