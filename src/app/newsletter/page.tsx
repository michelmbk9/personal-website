import type { Metadata } from 'next'
import NewsletterForm from '@/components/newsletter/NewsletterForm'

export const metadata: Metadata = { title: 'Newsletter — Michel Moubarak' }

export default function NewsletterPage() {
  return (
    <div className="px-14 py-12 max-w-xl">
      <h1 className="font-serif text-[clamp(32px,4.5vw,46px)] font-normal leading-tight tracking-tight text-[#111] mb-4">
        Thinking worth<br />
        <em className="font-serif italic text-[#666]">returning to.</em>
      </h1>
      <p className="text-[14px] font-light text-[#666] leading-relaxed mb-8 max-w-sm">
        Occasional notes on what I&apos;m reading, building, and noticing.
        No frequency promises. Only substance.
      </p>
      <NewsletterForm />
    </div>
  )
}
