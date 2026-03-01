import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Now — Michel Moubarak' }

const nowItems = [
  { key: 'building',  val: 'A new project at the intersection of community and creative practice.' },
  { key: 'reading',   val: 'René Girard, Simone Weil, and anything on the history of craft.' },
  { key: 'writing',   val: 'A longer essay on the relationship between discipline and freedom.' },
  { key: 'thinking',  val: 'What compounding really means at the level of identity, not just capital.' },
  { key: 'listening', val: 'Late Night Focus — deep work sessions, no lyrics, just flow.' },
]

export default function NowPage() {
  return (
    <div className="px-14 py-12 max-w-2xl">
      <div className="flex items-baseline gap-4 mb-10">
        <h1 className="font-serif text-[38px] font-normal tracking-tight text-[#111]">Now</h1>
        <span className="font-mono text-[11px] text-[#AAAAAA] tracking-wide">March 2026 · Montréal</span>
      </div>

      <p className="text-[14px] font-light text-[#666] leading-relaxed mb-10 max-w-md">
        A simple snapshot of what I&apos;m focused on right now. Updated when things change.
      </p>

      <div className="divide-y divide-[#E8E8E8] border-t border-[#E8E8E8]">
        {nowItems.map(({ key, val }) => (
          <div key={key} className="flex gap-6 py-5 items-baseline">
            <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-[#AAAAAA] w-[80px] shrink-0">
              {key}
            </span>
            <p className="text-[15px] font-light text-[#444] leading-relaxed">{val}</p>
          </div>
        ))}
      </div>

      <p className="mt-10 text-[11px] font-light text-[#AAAAAA]">
        Inspired by{' '}
        <a href="https://nownownow.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[#111] transition-colors">
          nownownow.com
        </a>
      </p>
    </div>
  )
}
