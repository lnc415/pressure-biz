'use client'

import { useEffect, useRef, useState } from 'react'
import type { Brand } from '@/lib/brand'

export default function BrandTab() {
  const [brand, setBrand] = useState<Brand | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch('/api/admin/brand').then(r => r.json()).then(setBrand)
  }, [])

  const set = (field: keyof Brand, val: string) => setBrand(b => b ? { ...b, [field]: val } : b)
  const setWhyUs = (i: number, val: string) => setBrand(b => {
    if (!b) return b
    const arr = [...b.whyUs]
    arr[i] = val
    return { ...b, whyUs: arr }
  })
  const addWhyUs = () => setBrand(b => b ? { ...b, whyUs: [...b.whyUs, ''] } : b)
  const removeWhyUs = (i: number) => setBrand(b => b ? { ...b, whyUs: b.whyUs.filter((_, j) => j !== i) } : b)

  const save = async () => {
    setSaving(true)
    await fetch('/api/admin/brand', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(brand) })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const uploadLogo = async () => {
    const file = fileRef.current?.files?.[0]
    if (!file) return
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/admin/about-photo', { method: 'POST', body: fd })
    if (res.ok) {
      const { url } = await res.json()
      setBrand(b => b ? { ...b, logo: url } : b)
    }
    setUploading(false)
  }

  if (!brand) return <p className="text-[#64748B]">Loading brand settings...</p>

  return (
    <div className="max-w-2xl flex flex-col gap-6">
      <div className="bg-white border rounded-2xl p-5">
        <h3 className="font-bold text-[#0C1A2E] mb-4">Business Identity</h3>
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-xs font-semibold text-[#64748B] uppercase tracking-wider block mb-1">Business Name</label>
            <input className="border rounded-xl px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#38BDF8]" value={brand.name} onChange={e => set('name', e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#64748B] uppercase tracking-wider block mb-1">Tagline</label>
            <input className="border rounded-xl px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#38BDF8]" value={brand.tagline} onChange={e => set('tagline', e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#64748B] uppercase tracking-wider block mb-1">Logo / Team Photo</label>
            <input ref={fileRef} type="file" accept="image/*" className="text-sm" />
            <button onClick={uploadLogo} disabled={uploading} className="mt-2 text-xs bg-gray-100 px-3 py-1.5 rounded-full text-[#0C1A2E] hover:bg-gray-200 transition-colors disabled:opacity-50">{uploading ? 'Uploading...' : 'Upload'}</button>
            {brand.logo && <p className="text-xs text-[#64748B] mt-1">Current logo set ✓</p>}
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-2xl p-5">
        <h3 className="font-bold text-[#0C1A2E] mb-4">Contact</h3>
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-xs font-semibold text-[#64748B] uppercase tracking-wider block mb-1">Phone</label>
            <input className="border rounded-xl px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#38BDF8]" value={brand.phone} onChange={e => set('phone', e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#64748B] uppercase tracking-wider block mb-1">Owner Email</label>
            <input className="border rounded-xl px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#38BDF8]" value={brand.email1} onChange={e => set('email1', e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#64748B] uppercase tracking-wider block mb-1">Second Email</label>
            <input className="border rounded-xl px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#38BDF8]" value={brand.email2} onChange={e => set('email2', e.target.value)} />
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-2xl p-5">
        <h3 className="font-bold text-[#0C1A2E] mb-4">About Page</h3>
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-xs font-semibold text-[#64748B] uppercase tracking-wider block mb-1">Brand Story</label>
            <textarea className="border rounded-xl px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#38BDF8] resize-none" rows={3} value={brand.aboutCopy} onChange={e => set('aboutCopy', e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#64748B] uppercase tracking-wider block mb-1">Service Area</label>
            <input className="border rounded-xl px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#38BDF8]" value={brand.serviceArea} onChange={e => set('serviceArea', e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#64748B] uppercase tracking-wider block mb-1">Why Us — Bullet Points</label>
            <div className="flex flex-col gap-2">
              {brand.whyUs.map((point, i) => (
                <div key={i} className="flex gap-2">
                  <input className="border rounded-xl px-3 py-2 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]" value={point} onChange={e => setWhyUs(i, e.target.value)} />
                  <button onClick={() => removeWhyUs(i)} className="text-red-400 hover:text-red-600 text-sm px-2">✕</button>
                </div>
              ))}
              <button onClick={addWhyUs} className="text-xs text-[#38BDF8] font-semibold self-start hover:text-[#00E5FF] transition-colors">+ Add point</button>
            </div>
          </div>
        </div>
      </div>

      <button onClick={save} disabled={saving} className="bg-[#0C1A2E] text-white font-bold px-8 py-3 rounded-full hover:bg-[#38BDF8] hover:text-[#0C1A2E] transition-colors disabled:opacity-50 self-start">
        {saved ? 'Saved ✓' : saving ? 'Saving...' : 'Save Brand Settings'}
      </button>
    </div>
  )
}
