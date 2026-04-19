'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

interface Service {
  id: string
  name: string
}

export default function QuoteForm({ services }: { services: Service[] }) {
  const params = useSearchParams()
  const [step, setStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: params.get('service') || '',
    address: '',
    details: '',
    photos: [] as File[],
  })

  const set = (field: string, val: string) => setForm(f => ({ ...f, [field]: val }))

  const nextStep = () => setStep(s => s + 1)
  const prevStep = () => setStep(s => s - 1)

  const handlePhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, 5)
    setForm(f => ({ ...f, photos: files }))
  }

  const submit = async () => {
    setSubmitting(true)
    setError('')
    try {
      const fd = new FormData()
      fd.append('name', form.name)
      fd.append('email', form.email)
      fd.append('phone', form.phone)
      fd.append('service', form.service)
      fd.append('address', form.address)
      fd.append('details', form.details)
      form.photos.forEach(f => fd.append('photos', f))

      const res = await fetch('/api/quote', { method: 'POST', body: fd })
      if (!res.ok) throw new Error('Submission failed')
      setDone(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-[#0C1A2E] mb-2">Quote Request Received!</h2>
        <p className="text-[#64748B]">We'll be in touch within 24 hours.</p>
      </div>
    )
  }

  const stepLabel = ['Contact Info', 'Service Details', 'Job Details', 'Review']

  return (
    <div className="max-w-xl mx-auto">
      {/* Progress */}
      <div className="flex gap-2 mb-8">
        {stepLabel.map((label, i) => (
          <div key={i} className="flex-1 text-center">
            <div className={`h-1 rounded-full mb-1 ${i + 1 <= step ? 'bg-[#38BDF8]' : 'bg-gray-200'}`} />
            <span className={`text-xs ${i + 1 === step ? 'text-[#38BDF8] font-semibold' : 'text-[#64748B]'}`}>{label}</span>
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-[#0C1A2E]">Your Contact Info</h2>
          <input className="border rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#38BDF8]" placeholder="Full Name" value={form.name} onChange={e => set('name', e.target.value)} />
          <input className="border rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#38BDF8]" placeholder="Email" type="email" value={form.email} onChange={e => set('email', e.target.value)} />
          <input className="border rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#38BDF8]" placeholder="Phone" type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} />
          <button disabled={!form.name || !form.email || !form.phone} onClick={nextStep} className="btn-ripple bg-[#38BDF8] text-[#0C1A2E] font-semibold py-3 rounded-full hover:bg-[#00E5FF] transition-colors disabled:opacity-40">Next</button>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-[#0C1A2E]">Service & Location</h2>
          <select className="border rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#38BDF8]" value={form.service} onChange={e => set('service', e.target.value)}>
            <option value="">Select a service...</option>
            {services.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
          </select>
          <input className="border rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#38BDF8]" placeholder="Property Address" value={form.address} onChange={e => set('address', e.target.value)} />
          <div className="flex gap-3">
            <button onClick={prevStep} className="flex-1 border border-[#0C1A2E] text-[#0C1A2E] font-semibold py-3 rounded-full hover:bg-gray-50 transition-colors">Back</button>
            <button disabled={!form.service || !form.address} onClick={nextStep} className="flex-1 btn-ripple bg-[#38BDF8] text-[#0C1A2E] font-semibold py-3 rounded-full hover:bg-[#00E5FF] transition-colors disabled:opacity-40">Next</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-[#0C1A2E]">Job Details</h2>
          <textarea className="border rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#38BDF8] resize-none" rows={4} placeholder="Describe the job — size, conditions, anything we should know..." value={form.details} onChange={e => set('details', e.target.value)} />
          <div>
            <label className="text-sm text-[#64748B] mb-1 block">Photos (up to 5, optional)</label>
            <input type="file" accept="image/*" multiple onChange={handlePhotos} className="text-sm" />
            {form.photos.length > 0 && <p className="text-xs text-[#64748B] mt-1">{form.photos.length} photo(s) selected</p>}
          </div>
          <div className="flex gap-3">
            <button onClick={prevStep} className="flex-1 border border-[#0C1A2E] text-[#0C1A2E] font-semibold py-3 rounded-full hover:bg-gray-50 transition-colors">Back</button>
            <button onClick={nextStep} className="flex-1 btn-ripple bg-[#38BDF8] text-[#0C1A2E] font-semibold py-3 rounded-full hover:bg-[#00E5FF] transition-colors">Next</button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-[#0C1A2E]">Review & Submit</h2>
          <div className="bg-gray-50 rounded-2xl p-4 text-sm flex flex-col gap-2 text-[#0C1A2E]">
            <p><span className="font-semibold">Name:</span> {form.name}</p>
            <p><span className="font-semibold">Email:</span> {form.email}</p>
            <p><span className="font-semibold">Phone:</span> {form.phone}</p>
            <p><span className="font-semibold">Service:</span> {form.service}</p>
            <p><span className="font-semibold">Address:</span> {form.address}</p>
            {form.details && <p><span className="font-semibold">Details:</span> {form.details}</p>}
            {form.photos.length > 0 && <p><span className="font-semibold">Photos:</span> {form.photos.length} attached</p>}
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex gap-3">
            <button onClick={prevStep} className="flex-1 border border-[#0C1A2E] text-[#0C1A2E] font-semibold py-3 rounded-full hover:bg-gray-50 transition-colors">Back</button>
            <button onClick={submit} disabled={submitting} className="flex-1 btn-ripple bg-[#0C1A2E] text-white font-semibold py-3 rounded-full hover:bg-[#38BDF8] hover:text-[#0C1A2E] transition-colors disabled:opacity-50">
              {submitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
