'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import QuotesTab from './tabs/QuotesTab'
import CustomersTab from './tabs/CustomersTab'
import GalleryTab from './tabs/GalleryTab'
import ServicesTab from './tabs/ServicesTab'
import BrandTab from './tabs/BrandTab'

const TABS = ['Quotes', 'Customers', 'Gallery', 'Services', 'Brand Settings']

export default function AdminPanel() {
  const [tab, setTab] = useState('Quotes')
  const router = useRouter()

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#0C1A2E] text-white px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-black text-[#38BDF8]">Admin Panel</h1>
        <button onClick={logout} className="text-sm text-white/60 hover:text-white transition-colors">Log out</button>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b px-4 flex gap-1 overflow-x-auto">
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
              tab === t ? 'border-[#38BDF8] text-[#0C1A2E]' : 'border-transparent text-[#64748B] hover:text-[#0C1A2E]'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {tab === 'Quotes' && <QuotesTab />}
        {tab === 'Customers' && <CustomersTab />}
        {tab === 'Gallery' && <GalleryTab />}
        {tab === 'Services' && <ServicesTab />}
        {tab === 'Brand Settings' && <BrandTab />}
      </div>
    </div>
  )
}
