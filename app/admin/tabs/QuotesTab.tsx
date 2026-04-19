'use client'

import { useEffect, useState } from 'react'
import type { Quote } from '@/app/api/quote/route'

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700',
  accepted: 'bg-green-100 text-green-700',
  completed: 'bg-gray-100 text-gray-600',
  declined: 'bg-red-100 text-red-700',
}

export default function QuotesTab() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [expanded, setExpanded] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [scheduleDates, setScheduleDates] = useState<Record<string, string>>({})

  useEffect(() => {
    fetch('/api/admin/quotes').then(r => r.json()).then(d => { setQuotes(d); setLoading(false) })
  }, [])

  const patch = async (id: string, updates: Partial<Quote>) => {
    const res = await fetch('/api/admin/quotes', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...updates }),
    })
    const updated = await res.json()
    setQuotes(q => q.map(x => x.id === id ? updated : x))
  }

  const accept = async (id: string) => {
    const scheduledDate = scheduleDates[id] || ''
    const res = await fetch(`/api/admin/quotes/${id}/accept`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scheduledDate }),
    })
    const updated = await res.json()
    setQuotes(q => q.map(x => x.id === id ? updated : x))
  }

  if (loading) return <p className="text-[#64748B]">Loading quotes...</p>
  if (quotes.length === 0) return (
    <div className="text-center py-16 text-[#64748B]">
      <div className="text-5xl mb-3">📋</div>
      <p>No quotes yet. They'll appear here when customers submit requests.</p>
    </div>
  )

  return (
    <div className="flex flex-col gap-3">
      {quotes.map(q => (
        <div key={q.id} className="bg-white rounded-2xl border shadow-sm overflow-hidden">
          <button
            onClick={() => setExpanded(e => e === q.id ? null : q.id)}
            className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_COLORS[q.status]}`}>{q.status}</span>
              <div>
                <p className="font-semibold text-[#0C1A2E]">{q.name}</p>
                <p className="text-xs text-[#64748B]">{q.service} · {q.address}</p>
              </div>
            </div>
            <span className="text-xs text-[#64748B]">{new Date(q.createdAt).toLocaleDateString()}</span>
          </button>

          {expanded === q.id && (
            <div className="border-t px-5 py-4 bg-gray-50 flex flex-col gap-4">
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <p><span className="font-semibold">Email:</span> <a href={`mailto:${q.email}`} className="text-[#38BDF8]">{q.email}</a></p>
                <p><span className="font-semibold">Phone:</span> <a href={`tel:${q.phone}`} className="text-[#38BDF8]">{q.phone}</a></p>
                <p><span className="font-semibold">Address:</span> {q.address}</p>
                {q.scheduledDate && <p><span className="font-semibold">Scheduled:</span> {new Date(q.scheduledDate).toLocaleString()}</p>}
              </div>
              {q.details && <p className="text-sm"><span className="font-semibold">Details:</span> {q.details}</p>}
              {q.photos?.length > 0 && (
                <div>
                  <p className="text-sm font-semibold mb-2">Photos:</p>
                  <div className="flex gap-2 flex-wrap">
                    {q.photos.map((url, i) => (
                      <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="text-xs text-[#38BDF8] underline">Photo {i + 1}</a>
                    ))}
                  </div>
                </div>
              )}

              <textarea
                className="border rounded-xl px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#38BDF8] resize-none"
                rows={2}
                placeholder="Internal notes..."
                defaultValue={q.notes}
                onBlur={e => patch(q.id, { notes: e.target.value })}
              />

              <div className="flex flex-wrap gap-2 items-center">
                {q.status === 'new' && (
                  <>
                    <input
                      type="datetime-local"
                      className="border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
                      onChange={e => setScheduleDates(d => ({ ...d, [q.id]: e.target.value }))}
                    />
                    <button onClick={() => accept(q.id)} className="bg-green-500 text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-green-600 transition-colors">Accept</button>
                    <button onClick={() => patch(q.id, { status: 'declined' })} className="bg-red-100 text-red-600 text-sm font-semibold px-4 py-2 rounded-full hover:bg-red-200 transition-colors">Decline</button>
                  </>
                )}
                {q.status === 'accepted' && (
                  <button onClick={() => patch(q.id, { status: 'completed' })} className="bg-[#0C1A2E] text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-[#38BDF8] hover:text-[#0C1A2E] transition-colors">Mark Complete</button>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
