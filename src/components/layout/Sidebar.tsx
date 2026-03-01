'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import type { Database } from '@/types/database.types'

type SocialLink = Database['public']['Tables']['social_links']['Row']

const BLUE = '#4B7BEC'

function IconHome() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
      <path d="M9 21V12h6v9"/>
    </svg>
  )
}

function IconPen() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9"/>
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
    </svg>
  )
}

function IconPerson() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    </svg>
  )
}

function IconArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"/>
      <path d="M13 6l6 6-6 6"/>
    </svg>
  )
}

function IconMusic() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13"/>
      <circle cx="6" cy="18" r="3"/>
      <circle cx="18" cy="16" r="3"/>
    </svg>
  )
}

function IconMail() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="M2 7l10 7 10-7"/>
    </svg>
  )
}

const navItems = [
  { label: 'Home',    href: '/',         num: '1', Icon: IconHome   },
  { label: 'Writing', href: '/writing',  num: '2', Icon: IconPen    },
  { label: 'About',   href: '/about',    num: '3', Icon: IconPerson },
  { label: 'Now',     href: '/now',      num: '4', Icon: IconArrow  },
]

const exploreItems = [
  { label: 'Playlists', href: '/playlists', num: '5', Icon: IconMusic },
]

const touchItems = [
  { label: 'Newsletter', href: '/newsletter', Icon: IconMail },
]

export default function Sidebar({ socialLinks }: { socialLinks: SocialLink[] }) {
  const pathname = usePathname()

  return (
    <aside
      className="fixed top-0 left-0 bottom-0 z-50 flex flex-col"
      style={{
        width: 196,
        background: 'var(--sidebar, #F7F7F7)',
        borderRight: '1px solid var(--rule, #E8E8E8)',
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        className="block px-5 pt-7 pb-5 font-mono text-[13px] font-normal text-[#111] tracking-tight border-b border-[#E8E8E8] hover:opacity-70 transition-opacity"
      >
        // MM
      </Link>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">

        {/* Primary */}
        <div className="mb-5">
          {navItems.map((item) => {
            const active = item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center justify-between px-5 py-[5px] text-[12px] font-light text-[#111] transition-colors hover:bg-[#EFEFEF]',
                  active && 'bg-[#EFEFEF]'
                )}
              >
                <span className="flex items-center gap-[10px]">
                  <item.Icon />
                  <span>{item.label}</span>
                </span>
                <span className="font-mono text-[10px] text-[#AAAAAA]">{item.num}</span>
              </Link>
            )
          })}
        </div>

        {/* Explore */}
        <div className="mb-5">
          <span className="block px-5 pb-2 text-[9px] font-normal tracking-[0.18em] uppercase text-[#AAAAAA]">
            Explore
          </span>
          {exploreItems.map((item) => {
            const active = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center justify-between px-5 py-[5px] text-[12px] font-light text-[#111] transition-colors hover:bg-[#EFEFEF]',
                  active && 'bg-[#EFEFEF]'
                )}
              >
                <span className="flex items-center gap-[10px]">
                  <item.Icon />
                  <span>{item.label}</span>
                </span>
                <span className="font-mono text-[10px] text-[#AAAAAA]">{item.num}</span>
              </Link>
            )
          })}
        </div>

        {/* Stay in touch */}
        <div className="mb-5">
          <span className="block px-5 pb-2 text-[9px] font-normal tracking-[0.18em] uppercase text-[#AAAAAA]">
            Stay in touch
          </span>
          {touchItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-[10px] px-5 py-[5px] text-[12px] font-light text-[#111] transition-colors hover:bg-[#EFEFEF]',
                pathname.startsWith(item.href) && 'bg-[#EFEFEF]'
              )}
            >
              <item.Icon />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

      </nav>

      {/* Social Links */}
      <div className="px-5 py-5 border-t border-[#E8E8E8] flex flex-col gap-1">
        {socialLinks.length > 0
          ? socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-light text-[#AAAAAA] hover:text-[#111] transition-colors"
              >
                {link.platform}
              </a>
            ))
          : ['Twitter', 'Instagram', 'LinkedIn'].map((p) => (
              <a key={p} href="#" className="text-[11px] font-light text-[#AAAAAA] hover:text-[#111] transition-colors">
                {p}
              </a>
            ))
        }
      </div>
    </aside>
  )
}
