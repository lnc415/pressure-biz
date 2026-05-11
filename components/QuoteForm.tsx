'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

interface Service {
  id: string
  name: string
}

const inputClass = `
  border border-[#D4C9B8] bg-[#FDFAF6] px-4 py-3 w-full text-[#1C1C1C]
  focus:outline-none focus:border-[#2D4A2D] focus:ring-1 focus:ring-[#2D4A2D]
  placeholder:text-[#5C6B5C]/50 text-sm transition-colors
`.trim()

const btnPrimary = `
  flex-1 bg-[#2D4A2D] text-[#F5F0E8] font-semibold py-3 px-6
  hover:bg-[#1A2E1A] transition-colors disabled:opacity-40 disabled:cursor-not-allowed
  font-serif text-sm tracking-wide
`.trim()

const btnOutline = `
  flex-1 border border-[#2D4A2D] text-[#2D4A2D] font-semibold py-3 px-6
  hover:bg-[#2D4A2D] hover:text-[#F5F0E8] transition-colors
  font-serif text-sm tracking-wide
`.trim()

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
      setError('Something went wrong. Please try again or call us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div className="text-center py-16 border border-[#D4C9B8] bg-[#FDFAF6] px-8">
        <div className="text-[#9B7A2F] text-4xl mb-4">✦</div>
        <h2
          className="text-[#1C1C1C] mb-2"
          style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '1.6rem' }}
        >
          Request Received
        </h2>
        <p className="text-[#5C6B5C] text-sm">We&apos;ll be in touch within 24 hours.</p>
      </div>
    )
  }

  const stepLabel = ['Contact Info', 'Service & Location', 'Job Details', 'Review']

  return (
    <div>
      {/* Progress */}
      <div className="flex gap-1.5 mb-8">
        {stepLabel.map((label, i) => (
          <div key={i} className="flex-1">
            <div className={`h-0.5 mb-1.5 ${i + 1 <= step ? 'bg-[#9B7A2F]' : 'bg-[#D4C9B8]'}`} />
            <span className={`text-[10px] tracking-wide uppercase ${i + 1 === step ? 'text-[#9B7A2F] font-semibold' : 'text-[#5C6B5C]/50'}`}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="flex flex-col gap-4">
          <h2
            className="text-[#1C1C1C] mb-1"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '1.3rem' }}
          >
            Your Contact Info
          </h2>
          <input className={inputClass} placeholder="Full Name" value={form.name} onChange={e => set('name', e.target.value)} />
          <input className={inputClass} placeholder="Email Address" type="email" value={form.email} onChange={e => set('email', e.target.value)} />
          <input className={inputClass} placeholder="Phone Number" type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} />
          <button
            disabled={!form.name || !form.email || !form.phone}
            onClick={nextStep}
            className={btnPrimary}
          >
            Next →
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-4">
          <h2
            className="text-[#1C1C1C] mb-1"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '1.3rem' }}
          >
            Service & Location
          </h2>
          <select
            className={inputClass}
            value={form.service}
            onChange={e => set('service', e.target.value)}
          >
            <option value="">Select a service...</option>
            {services.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
          </select>
          <input className={inputClass} placeholder="Property Address" value={form.address} onChange={e => set('address', e.target.value)} />
          <div className="flex gap-3">
            <button onClick={prevStep} className={btnOutline}>← Back</button>
            <button disabled={!form.service || !form.address} onClick={nextStep} className={btnPrimary}>Next →</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col gap-4">
          <h2
            className="text-[#1C1C1C] mb-1"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '1.3rem' }}
          >
            Job Details
          </h2>
          <textarea
            className={inputClass}
            rows={4}
            placeholder="Describe the job — surface type, size, conditions, anything we should know..."
            value={form.details}
            onChange={e => set('details', e.target.value)}
            style={{ resize: 'none' }}
          />
          <div>
            <p className="text-[#5C6B5C] text-xs mb-2">Photos — optional, up to 5</p>
            <label className="inline-block border border-[#D4C9B8] bg-[#FDFAF6] px-4 py-2 text-sm text-[#5C6B5C] cursor-pointer hover:border-[#2D4A2D] hover:text-[#2D4A2D] transition-colors">
              Choose Photos
              <input type="file" accept="image/*" multiple onChange={handlePhotos} className="hidden" />
            </label>
            {form.photos.length > 0 && (
              <p className="text-xs text-[#9B7A2F] mt-2">{form.photos.length} photo{form.photos.length > 1 ? 's' : ''} selected</p>
            )}
          </div>
          <div className="flex gap-3">
            <button onClick={prevStep} className={btnOutline}>← Back</button>
            <button onClick={nextStep} className={btnPrimary}>Next →</button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="flex flex-col gap-4">
          <h2
            className="text-[#1C1C1C] mb-1"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '1.3rem' }}
          >
            Review & Submit
          </h2>
          <div className="border border-[#D4C9B8] bg-[#FDFAF6] p-5 flex flex-col gap-2 text-sm text-[#5C6B5C]">
            <p><span className="font-semibold text-[#1C1C1C]">Name:</span> {form.name}</p>
            <p><span className="font-semibold text-[#1C1C1C]">Email:</span> {form.email}</p>
            <p><span className="font-semibold text-[#1C1C1C]">Phone:</span> {form.phone}</p>
            <p><span className="font-semibold text-[#1C1C1C]">Service:</span> {form.service}</p>
            <p><span className="font-semibold text-[#1C1C1C]">Address:</span> {form.address}</p>
            {form.details && <p><span className="font-semibold text-[#1C1C1C]">Details:</span> {form.details}</p>}
            {form.photos.length > 0 && <p><span className="font-semibold text-[#1C1C1C]">Photos:</span> {form.photos.length} attached</p>}
          </div>
          {error && <p className="text-[#8B2E16] text-sm">{error}</p>}
          <div className="flex gap-3">
            <button onClick={prevStep} className={btnOutline}>← Back</button>
            <button onClick={submit} disabled={submitting} className={btnPrimary}>
              {submitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
