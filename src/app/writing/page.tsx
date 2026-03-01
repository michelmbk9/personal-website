import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Writing — Michel Moubarak' }
export const revalidate = 3600

export default async function WritingPage() {
  const supabase = await createClient()
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, tags, published_at')
    .eq('published', true)
    .order('published_at', { ascending: false })

  return (
    <div className="px-14 py-12 max-w-3xl">
      <h1 className="font-serif text-[38px] font-normal tracking-tight text-[#111] mb-2">Writing</h1>
      <p className="text-[14px] font-light text-[#666] mb-10 leading-relaxed">
        Essays on identity, ambition, taste, leverage, and creative discipline.
      </p>

      <div>
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Link
              key={post.id}
              href={`/writing/${post.slug}`}
              className="group flex items-start justify-between gap-10 py-4 border-b border-[#E8E8E8] hover:bg-[#FAFAFA] -mx-2 px-2 transition-colors first:border-t"
            >
              <div>
                <h2 className="font-serif text-[20px] font-normal leading-snug text-[#111] mb-1.5">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="text-[13px] font-light text-[#666] leading-relaxed">{post.excerpt}</p>
                )}
              </div>
              <div className="text-right shrink-0 pt-1">
                {post.published_at && (
                  <span className="block font-mono text-[10px] text-[#AAAAAA] mb-1.5">
                    {new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                )}
                {post.tags?.map((tag) => (
                  <span key={tag} className="block text-[9px] font-light tracking-[0.1em] uppercase text-[#666]">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))
        ) : (
          <p className="py-12 text-[14px] font-light text-[#AAAAAA]">Essays coming soon.</p>
        )}
      </div>
    </div>
  )
}
