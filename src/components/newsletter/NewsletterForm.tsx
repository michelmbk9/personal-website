'use client'

import { useState } from 'react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'duplicate'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.status === 409) { setStatus('duplicate'); return }
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <p className="text-[13px] font-light text-[#666]">
        You&apos;re in. Notes will find you when there&apos;s something worth sharing.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex border border-[#E8E8E8]">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 px-4 py-3 text-[13px] font-light text-[#111] bg-white placeholder-[#AAAAAA] outline-none"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-5 py-3 bg-[#111] text-white text-[10px] font-normal tracking-[0.14em] uppercase disabled:opacity-50 hover:opacity-80 transition-opacity"
        >
          {status === 'loading' ? '...' : 'Subscribe'}
        </button>
      </div>
      {status === 'duplicate' && (
        <p className="mt-2 text-[11px] text-[#AAAAAA]">Already subscribed.</p>
      )}
      {status === 'error' && (
        <p className="mt-2 text-[11px] text-red-500">Something went wrong. Try again.</p>
      )}
      <p className="mt-2 text-[11px] text-[#AAAAAA]">Infrequent. Unsubscribe anytime.</p>
    </form>
  )
}
