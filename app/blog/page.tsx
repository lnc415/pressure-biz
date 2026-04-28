import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/blog-posts'

export const metadata: Metadata = {
  title: 'Blog | Exterior Cleaning Tips & Guides',
  description:
    'Expert guides on soft-wash cleaning, chemical safety, surface care, and home maintenance from Mist and Main — serving Jonesborough and the Tri-Cities, TN.',
  keywords: [
    'soft wash exterior cleaning',
    'pressure washing chemicals safe',
    'how often wash house exterior',
    'roof cleaning Jonesborough TN',
    'algae mold siding removal',
    'exterior cleaning tips Tennessee',
  ],
  alternates: { canonical: 'https://mistandmain.com/blog' },
  openGraph: {
    title: 'Mist and Main Blog — Exterior Cleaning Guides',
    description: 'Reassuring, expert-written guides on soft-wash cleaning, chemical safety, and home maintenance from East Tennessee\'s exterior cleaning professionals.',
  },
}

const CATEGORY_COLORS: Record<string, string> = {
  'Soft-Wash Method':   'text-[#2D4A2D] border-[#2D4A2D]/30 bg-[#2D4A2D]/5',
  'Chemical Safety':    'text-[#9B7A2F] border-[#9B7A2F]/30 bg-[#9B7A2F]/5',
  'Surface Care':       'text-[#8B2E16] border-[#8B2E16]/30 bg-[#8B2E16]/5',
  'Maintenance Tips':   'text-[#5C6B5C] border-[#5C6B5C]/30 bg-[#5C6B5C]/8',
  'Industry Insights':  'text-[#1C1C1C] border-[#D4C9B8] bg-[#D4C9B8]/30',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

export default function BlogIndexPage() {
  const posts = getAllPosts()

  return (
    <div className="bg-[#F5F0E8] min-h-screen">

      {/* Header */}
      <section
        className="py-16 px-4 text-center"
        style={{ background: 'linear-gradient(160deg, #1A2E1A 0%, #2D4A2D 100%)' }}
      >
        <p className="text-[#9B7A2F] text-xs font-semibold tracking-[0.25em] uppercase mb-3">
          From the Field
        </p>
        <h1
          className="text-[#F5F0E8] mb-4"
          style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}
        >
          Knowledge & Guides
        </h1>
        <p className="text-[#F5F0E8]/60 max-w-xl mx-auto text-base leading-relaxed">
          Straightforward answers on soft-wash cleaning, the chemicals we use, and how to care for your property — written by the people doing the work.
        </p>
      </section>

      {/* Posts */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="space-y-6">
          {posts.map(post => {
            const colorClass = CATEGORY_COLORS[post.category] ?? CATEGORY_COLORS['Industry Insights']
            return (
              <article
                key={post.slug}
                className="bg-[#FDFAF6] border border-[#D4C9B8] p-7 heritage-card"
              >
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <span className={`text-[10px] px-2.5 py-0.5 border tracking-widest uppercase font-semibold ${colorClass}`}>
                    {post.category}
                  </span>
                  <time className="text-[#5C6B5C] text-xs" dateTime={post.date}>
                    {formatDate(post.date)}
                  </time>
                </div>
                <h2
                  className="text-[#1C1C1C] mb-2 leading-snug"
                  style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)' }}
                >
                  <Link href={`/blog/${post.slug}`} className="hover:text-[#2D4A2D] transition-colors">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-[#5C6B5C] text-sm leading-relaxed mb-4">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-[#9B7A2F] text-sm font-semibold hover:text-[#2D4A2D] transition-colors"
                  style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                >
                  Read Article →
                </Link>
              </article>
            )
          })}
        </div>

        {/* FAQ CTA */}
        <div className="mt-14 bg-[#2D4A2D] p-8 text-center">
          <p className="text-[#9B7A2F] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Quick Answers</p>
          <h2
            className="text-[#F5F0E8] mb-3"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '1.6rem' }}
          >
            Have a Specific Question?
          </h2>
          <p className="text-[#F5F0E8]/60 mb-6 max-w-md mx-auto text-sm">
            Our FAQ covers the most common concerns — plants, pets, staining, smells, and more.
          </p>
          <Link href="/faq" className="mm-btn mm-btn-brass">
            View FAQ
          </Link>
        </div>

        <div className="mt-10 flex justify-start">
          <Link href="/" className="mm-btn mm-btn-outline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
