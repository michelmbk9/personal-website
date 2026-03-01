import type { Metadata } from 'next'
import { EB_Garamond, Jost, DM_Mono } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/layout/Sidebar'
import { createClient } from '@/lib/supabase/server'

const garamond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Michel Moubarak',
  description: 'Notes on art, building, and the long view.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: socialLinks } = await supabase
    .from('social_links')
    .select('*')
    .order('display_order')

  return (
    <html
      lang="en"
      className={`${garamond.variable} ${jost.variable} ${dmMono.variable}`}
    >
      <body className="font-sans font-light antialiased bg-white text-[#111]">
        <div className="flex min-h-screen">
          <Sidebar socialLinks={socialLinks ?? []} />
          <main className="ml-[196px] flex-1 min-h-screen">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
