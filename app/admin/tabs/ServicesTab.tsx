'use client'

import { useEffect, useState } from 'react'
import type { Service } from '@/components/ServiceCard'

const BLANK: Omit<Service, 'id'> = { name: '', description: '', priceRange: '', icon: '🔧' }

export default function ServicesTab() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Service | null>(null)
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState<Omit<Service, 'id'>>(BLANK)

  useEffect(() => {
    fetch('/api/admin/services').then(r => r.json()).then(d => { setServices(d); setLoading(false) })
  }, [])

  const set = (field: string, val: string) => setForm(f => ({ ...f, [field]: val }))

  const save = async () => {
    if (editing) {
      const updated: Service[] = services.map(s => s.id === editing.id ? { ...s, ...form } : s)
      await fetch('/api/admin/services', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updated) })
      setServices(updated)
      setEditing(null)
    } else {
      const res = await fetch('/api/admin/services', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const s = await res.json()
      setServices(prev => [...prev, s])
      setAdding(false)
    }
    setForm(BLANK)
  }

  const remove = async (id: string) => {
    await fetch('/api/admin/services', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    setServices(s => s.filter(x => x.id !== id))
  }

  const startEdit = (s: Service) => {
    setEditing(s)
    setAdding(false)
    setForm({ name: s.name, description: s.description, priceRange: s.priceRange || '', icon: s.icon })
  }

  const cancel = () => { setEditing(null); setAdding(false); setForm(BLANK) }

  if (loading) return <p className="text-[#64748B]">Loading services...</p>

  return (
    <div>
      <button onClick={() => { setAdding(true); setEditing(null); setForm(BLANK) }} className="mb-5 bg-[#38BDF8] text-[#0C1A2E] font-semibold px-5 py-2 rounded-full text-sm hover:bg-[#00E5FF] transition-colors">
        + Add Service
      </button>

      {(adding || editing) && (
        <div className="bg-white border rounded-2xl p-5 mb-5 flex flex-col gap-3">
          <h3 className="font-bold text-[#0C1A2E]">{editing ? 'Edit Service' : 'New Service'}</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <input className="border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#38BDF8]" placeholder="Service Name" value={form.name} onChange={e => set('name', e.target.value)} />
            <input className="border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#38BDF8]" placeholder="Icon (emoji)" value={form.icon} onChange={e => set('icon', e.target.value)} />
          </div>
          <textarea className="border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#38BDF8] resize-none" rows={2} placeholder="Description" value={form.description} onChange={e => set('description', e.target.value)} />
          <input className="border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#38BDF8]" placeholder="Price range (e.g. $100–$300, optional)" value={form.priceRange} onChange={e => set('priceRange', e.target.value)} />
          <div className="flex gap-2">
            <button onClick={save} disabled={!form.name} className="bg-[#0C1A2E] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#38BDF8] hover:text-[#0C1A2E] transition-colors disabled:opacity-40">Save</button>
            <button onClick={cancel} className="border px-4 py-2 rounded-full text-sm text-[#64748B] hover:bg-gray-50 transition-colors">Cancel</button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {services.map(s => (
          <div key={s.id} className="bg-white border rounded-2xl p-4 shadow-sm flex items-center gap-4">
            <span className="text-3xl">{s.icon}</span>
            <div className="flex-1">
              <p className="font-bold text-[#0C1A2E]">{s.name}</p>
              <p className="text-sm text-[#64748B]">{s.description}</p>
              {s.priceRange && <p className="text-xs text-[#38BDF8] font-semibold mt-0.5">{s.priceRange}</p>}
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(s)} className="text-xs text-[#38BDF8] font-semibold hover:text-[#00E5FF] transition-colors">Edit</button>
              <button onClick={() => remove(s.id)} className="text-xs text-red-500 hover:text-red-700 transition-colors">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
