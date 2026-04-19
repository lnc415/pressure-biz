'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      router.refresh()
    } else {
      setError('Incorrect password')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0C1A2E] flex items-center justify-center px-4">
      <form onSubmit={submit} className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-xl">
        <h1 className="text-2xl font-black text-[#0C1A2E] mb-6 text-center">Admin Login</h1>
        <input
          type="password"
          className="border rounded-xl px-4 py-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <button
          type="submit"
          disabled={loading || !password}
          className="w-full bg-[#38BDF8] text-[#0C1A2E] font-bold py-3 rounded-full hover:bg-[#00E5FF] transition-colors disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
    </div>
  )
}
