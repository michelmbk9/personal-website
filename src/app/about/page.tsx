import type { Metadata } from 'next'
import NewsletterForm from '@/components/newsletter/NewsletterForm'

export const metadata: Metadata = { title: 'About — Michel Moubarak' }

export default function AboutPage() {
  return (
    <div className="px-14 py-12 max-w-2xl">

      <h1 className="font-serif text-[clamp(36px,5vw,52px)] font-normal leading-[1.1] tracking-tight text-[#111] mb-12">
        I started in art.<br />
        Then I learned to{' '}
        <em className="font-serif italic text-[#666]">build things.</em><br />
        Now I refuse<br />
        to separate them.
      </h1>

      <div className="space-y-5 mb-10">
        <p className="text-[15px] font-light text-[#666] leading-[1.9]">
          I grew up between cultures. That kind of in-between teaches you that
          most assumptions are constructed — which gives you a strange freedom
          to decide what you actually believe.
        </p>
        <p className="text-[15px] font-light text-[#666] leading-[1.9]">
          For a period I moved away from the creative life. I told myself it was
          impractical. I was wrong — not about the economics, but about the cost.
          Without a creative practice, I was faster but less honest. I came back
          to making things not for output, but for the clarity only that kind of
          work provides.
        </p>
      </div>

      <div className="w-8 h-[2px] bg-[#111] mb-10" />

      <blockquote className="border-l-2 border-[#111] pl-6 mb-10">
        <p className="font-serif text-[20px] font-normal italic text-[#111] leading-relaxed">
          &ldquo;I am interested in depth over noise, in the things that compound
          quietly over decades rather than spike once and disappear.&rdquo;
        </p>
      </blockquote>

      <div className="space-y-5 mb-12">
        <p className="text-[15px] font-light text-[#666] leading-[1.9]">
          I think the most interesting people take multiple domains seriously —
          they don&apos;t choose between being a thinker and a doer, between
          having taste and being effective. I am trying to be one of those people.
        </p>
        <p className="text-[15px] font-light text-[#666] leading-[1.9]">
          I live and work in Canada. I&apos;m open to conversations with people
          who think carefully and build seriously.
        </p>
      </div>

      <div className="flex gap-3 mb-16">
        <a
          href="mailto:hello@michelmoubarak.com"
          className="inline-flex items-center border border-[#E8E8E8] text-[#666] text-[11px] font-normal tracking-[0.1em] uppercase px-5 py-2.5 hover:border-[#111] hover:text-[#111] transition-colors"
        >
          Write to me
        </a>
      </div>

      <div className="border-t border-[#E8E8E8] pt-10">
        <h3 className="font-serif text-[20px] font-normal text-[#111] mb-2">Subscribe to the notes</h3>
        <p className="text-[13px] font-light text-[#666] mb-5">
          Occasional, infrequent, worth it.
        </p>
        <NewsletterForm />
      </div>

    </div>
  )
}
