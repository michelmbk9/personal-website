import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import NewsletterForm from '@/components/newsletter/NewsletterForm'
import SpotifyEmbed from '@/components/ui/SpotifyEmbed'
import Greeting from '@/components/ui/Greeting'

export default async function HomePage() {
  const supabase = await createClient()

  const [{ data: posts }, { data: playlists }] = await Promise.all([
    supabase
      .from('blog_posts')
      .select('id, title, slug, excerpt, tags, published_at')
      .eq('published', true)
      .order('published_at', { ascending: false })
      .limit(4),
    supabase
      .from('spotify_playlists')
      .select('*')
      .order('display_order')
      .limit(2),
  ])

  return (
    <div className="px-14 py-12 max-w-3xl">

      {/* GREETING */}
      <Greeting />
      <p className="mt-4 text-[14px] font-light text-[#666] leading-relaxed max-w-[480px] mb-10">
        I think about how people build things that last — companies, creative
        practices, communities. I write to understand, and I share what I find
        worth keeping.
      </p>
      <div className="flex gap-3 mb-14">
        <Link
          href="/newsletter"
          className="inline-flex items-center bg-[#111] text-white text-[11px] font-normal tracking-[0.1em] uppercase px-5 py-2.5 hover:opacity-75 transition-opacity"
        >
          Subscribe to notes
        </Link>
        <a
          href="mailto:hello@michelmoubarak.com"
          className="inline-flex items-center border border-[#E8E8E8] text-[#666] text-[11px] font-normal tracking-[0.1em] uppercase px-5 py-2.5 hover:border-[#111] hover:text-[#111] transition-colors"
        >
          Reach out
        </a>
      </div>

      {/* WRITING */}
      <div className="mb-12">
        <div className="flex items-center justify-between pb-2.5 border-b border-[#E8E8E8]">
          <span className="text-[11px] font-normal tracking-[0.14em] uppercase text-[#666]">Latest Writing</span>
          <Link href="/writing" className="text-[11px] font-light text-[#AAAAAA] hover:text-[#111] transition-colors">
            View all →
          </Link>
        </div>
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Link
              key={post.id}
              href={`/writing/${post.slug}`}
              className="group flex items-start justify-between gap-10 py-3.5 border-b border-[#E8E8E8] hover:bg-[#FAFAFA] -mx-2 px-2 transition-colors"
            >
              <div>
                <h3 className="font-serif text-[18px] font-normal leading-snug text-[#111] mb-1">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-[12px] font-light text-[#666] leading-relaxed">{post.excerpt}</p>
                )}
              </div>
              <div className="text-right shrink-0 pt-0.5">
                {post.published_at && (
                  <span className="block font-mono text-[10px] text-[#AAAAAA] mb-1">
                    {new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                )}
                {post.tags && post.tags[0] && (
                  <span className="text-[9px] font-light tracking-[0.1em] uppercase text-[#666]">
                    {post.tags[0]}
                  </span>
                )}
              </div>
            </Link>
          ))
        ) : (
          <div className="py-8 text-[13px] font-light text-[#AAAAAA]">
            Essays coming soon.
          </div>
        )}
      </div>

      {/* NOW + PLAYLISTS */}
      <div className="grid grid-cols-2 border border-[#E8E8E8] mb-12">
        {/* NOW */}
        <div className="border-r border-[#E8E8E8]">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#E8E8E8]">
            <span className="text-[11px] font-normal tracking-[0.14em] uppercase text-[#666]">Now</span>
            <span className="font-mono text-[10px] text-[#AAAAAA]">March 2026 · Montréal</span>
          </div>
          <div className="px-4 py-1 divide-y divide-[#E8E8E8]">
            {[
              { key: 'building', val: 'A project at the intersection of community + creative practice' },
              { key: 'reading',  val: 'René Girard, Simone Weil, history of craft' },
              { key: 'writing',  val: 'Essay on discipline and freedom' },
              { key: 'thinking', val: 'What compounding means at the level of identity' },
            ].map(({ key, val }) => (
              <div key={key} className="flex gap-3 py-3 items-baseline">
                <span className="font-mono text-[10px] text-[#AAAAAA] w-[60px] shrink-0">{key}</span>
                <span className="text-[13px] font-light text-[#666] leading-relaxed">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* PLAYLISTS */}
        <div>
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#E8E8E8]">
            <span className="text-[11px] font-normal tracking-[0.14em] uppercase text-[#666]">Listening</span>
            <Link href="/playlists" className="text-[11px] font-light text-[#AAAAAA] hover:text-[#111] transition-colors">
              All →
            </Link>
          </div>
          <div className="p-4 flex flex-col gap-4">
            {playlists && playlists.length > 0 ? (
              playlists.map((pl) => (
                <div key={pl.id}>
                  <SpotifyEmbed playlistId={pl.playlist_id} />
                  {pl.description && (
                    <p className="mt-1.5 text-[11px] font-light text-[#666]">{pl.description}</p>
                  )}
                </div>
              ))
            ) : (
              <div className="text-[12px] font-light text-[#AAAAAA] py-6 px-1">Playlists coming soon.</div>
            )}
          </div>
        </div>
      </div>

      {/* SUBSCRIBE */}
      <div className="bg-[#F7F7F7] border border-[#E8E8E8] p-8">
        <h3 className="font-serif text-[22px] font-normal text-[#111] mb-2">
          Thinking worth returning to.
        </h3>
        <p className="text-[13px] font-light text-[#666] leading-relaxed mb-5 max-w-sm">
          Occasional notes on what I&apos;m reading, building, and noticing.
          No frequency promises. Only substance.
        </p>
        <NewsletterForm />
      </div>

    </div>
  )
}
