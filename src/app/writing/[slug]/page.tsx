import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createClient as createBrowserClient } from '@/lib/supabase/client'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { Metadata } from 'next'

export const revalidate = 3600

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: post } = await supabase
    .from('blog_posts')
    .select('title, excerpt')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (!post) return {}
  return { title: `${post.title} — Michel Moubarak`, description: post.excerpt ?? undefined }
}

// generateStaticParams runs at build time with no request scope,
// so we use the cookie-free browser client instead of the server client.
export async function generateStaticParams() {
  const supabase = createBrowserClient()
  const { data } = await supabase.from('blog_posts').select('slug').eq('published', true)
  return (data ?? []).map(({ slug }) => ({ slug }))
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (!post) notFound()

  return (
    <article className="px-14 py-12 max-w-2xl">
      {/* Header */}
      <div className="mb-10">
        {post.tags && post.tags.length > 0 && (
          <span className="block font-mono text-[10px] tracking-[0.14em] uppercase text-[#AAAAAA] mb-3">
            {post.tags[0]}
          </span>
        )}
        <h1 className="font-serif text-[clamp(28px,4vw,42px)] font-normal leading-tight tracking-tight text-[#111] mb-4">
          {post.title}
        </h1>
        {post.published_at && (
          <time className="font-mono text-[11px] text-[#AAAAAA]">
            {new Date(post.published_at).toLocaleDateString('en-US', {
              month: 'long', day: 'numeric', year: 'numeric',
            })}
          </time>
        )}
      </div>

      {/* Body */}
      {post.content && (
        <div className="prose prose-neutral max-w-none prose-p:font-light prose-p:text-[#444] prose-p:leading-[1.9] prose-headings:font-serif prose-headings:font-normal prose-a:text-[#111] prose-a:underline-offset-2">
          <MDXRemote source={post.content} />
        </div>
      )}
    </article>
  )
}
