'use client'

import { useEffect, useState } from 'react'
import type { Customer } from '@/lib/customers'

export default function CustomersTab() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '', phone: '', address: '' })

  useEffect(() => {
    fetch('/api/admin/customers').then(r => r.json()).then(d => { setCustomers(d); setLoading(false) })
  }, [])

  const filtered = customers.filter(c => {
    const q = search.toLowerCase()
    return c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.phone.includes(q) || c.addresses.some(a => a.toLowerCase().includes(q))
  })

  const saveNotes = async (id: string, notes: string) => {
    await fetch(`/api/admin/customers/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes }),
    })
  }

  const addCustomer = async () => {
    const res = await fetch('/api/admin/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCustomer),
    })
    const c = await res.json()
    setCustomers(prev => [...prev, c])
    setAdding(false)
    setNewCustomer({ name: '', email: '', phone: '', address: '' })
  }

  if (loading) return <p className="text-[#64748B]">Loading customers...</p>

  return (
    <div>
      <div className="flex gap-3 mb-6">
        <input
          className="border rounded-xl px-4 py-2.5 flex-1 focus:outline-none focus:ring-2 focus:ring-[#38BDF8] text-sm"
          placeholder="Search by name, email, phone, or address..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button onClick={() => setAdding(true)} className="bg-[#38BDF8] text-[#0C1A2E] font-semibold px-4 py-2 rounded-full text-sm hover:bg-[#00E5FF] transition-colors whitespace-nowrap">
          + Add Customer
        </button>
      </div>

      {adding && (
        <div className="bg-white border rounded-2xl p-5 mb-5 flex flex-col gap-3">
          <h3 className="font-bold text-[#0C1A2E]">New Customer</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <input className="border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#38BDF8]" placeholder="Name" value={newCustomer.name} onChange={e => setNewCustomer(n => ({ ...n, name: e.target.value }))} />
            <input className="border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#38BDF8]" placeholder="Email" value={newCustomer.email} onChange={e => setNewCustomer(n => ({ ...n, email: e.target.value }))} />
            <input className="border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#38BDF8]" placeholder="Phone" value={newCustomer.phone} onChange={e => setNewCustomer(n => ({ ...n, phone: e.target.value }))} />
            <input className="border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#38BDF8]" placeholder="Address" value={newCustomer.address} onChange={e => setNewCustomer(n => ({ ...n, address: e.target.value }))} />
          </div>
          <div className="flex gap-2">
            <button onClick={addCustomer} disabled={!newCustomer.name || !newCustomer.email} className="bg-[#0C1A2E] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#38BDF8] hover:text-[#0C1A2E] transition-colors disabled:opacity-40">Save</button>
            <button onClick={() => setAdding(false)} className="border px-4 py-2 rounded-full text-sm text-[#64748B] hover:bg-gray-50 transition-colors">Cancel</button>
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-[#64748B] text-sm">{search ? 'No matches found.' : 'No customers yet.'}</p>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map(c => (
            <div key={c.id} className="bg-white border rounded-2xl p-5 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-bold text-[#0C1A2E]">{c.name}</p>
                  <p className="text-sm text-[#64748B]">{c.email} · {c.phone}</p>
                  {c.addresses.length > 0 && <p className="text-xs text-[#64748B] mt-0.5">{c.addresses.join(', ')}</p>}
                </div>
                <div className="text-right text-xs text-[#64748B]">
                  <p>First contact: {new Date(c.firstContact).toLocaleDateString()}</p>
                  <p>Jobs completed: {c.totalCompleted}</p>
                </div>
              </div>
              <textarea
                className="border rounded-xl px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#38BDF8] resize-none"
                rows={2}
                placeholder="Internal notes..."
                defaultValue={c.notes}
                onBlur={e => saveNotes(c.id, e.target.value)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
