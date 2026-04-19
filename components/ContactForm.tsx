'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const set = (field: string, val: string) => setForm(f => ({ ...f, [field]: val }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setDone(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-3">✅</div>
        <p className="font-semibold text-[#0C1A2E]">Message sent! We'll get back to you soon.</p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <input className="border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]" placeholder="Your Name" required value={form.name} onChange={e => set('name', e.target.value)} />
      <input type="email" className="border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]" placeholder="Email" required value={form.email} onChange={e => set('email', e.target.value)} />
      <textarea className="border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#38BDF8] resize-none" rows={4} placeholder="Your message..." required value={form.message} onChange={e => set('message', e.target.value)} />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button type="submit" disabled={submitting} className="btn-ripple bg-[#38BDF8] text-[#0C1A2E] font-semibold py-3 rounded-full hover:bg-[#00E5FF] transition-colors disabled:opacity-50">
        {submitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
