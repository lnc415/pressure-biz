import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostBySlug, getAllSlugs, getAllPosts } from '@/lib/blog-posts'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title} | Mist and Main`,
    description: post.excerpt,
    keywords: post.tags,
    alternates: { canonical: `https://mistandmain.com/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: ['Mist and Main'],
      tags: post.tags,
    },
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

function renderMarkdown(md: string): string {
  return md
    // h2
    .replace(/^## (.+)$/gm, '<h2 class="text-[#2D4A2D] mt-10 mb-4" style="font-family:var(--font-playfair),Georgia,serif;font-size:1.5rem;font-weight:700">$1</h2>')
    // h3
    .replace(/^### (.+)$/gm, '<h3 class="text-[#1C1C1C] mt-6 mb-3" style="font-family:var(--font-playfair),Georgia,serif;font-size:1.15rem;font-weight:700">$1</h3>')
    // Bold
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-[#1C1C1C] font-semibold">$1</strong>')
    // Italic
    .replace(/\*([^*]+)\*/g, '<em class="text-[#5C6B5C] italic">$1</em>')
    // Tables
    .replace(/^\|(.+)\|$/gm, (line) => {
      if (/^[\s|:-]+$/.test(line)) return ''
      const cells = line.split('|').slice(1, -1).map(c => c.trim())
      return `<tr>${cells.map(c => `<td class="border border-[#D4C9B8] px-3 py-2 text-sm text-[#5C6B5C]">${c}</td>`).join('')}</tr>`
    })
    .replace(/(<tr>[\s\S]*?<\/tr>(\n<tr>[\s\S]*?<\/tr>)*)/g,
      '<div class="overflow-x-auto my-6"><table class="w-full border-collapse text-sm">$1</table></div>')
    // Unordered lists
    .replace(/^- (.+)$/gm, '<li class="text-[#5C6B5C] text-base leading-relaxed">$1</li>')
    .replace(/(<li[\s\S]*?<\/li>\n?)+/g, '<ul class="list-disc pl-6 space-y-2 my-4">$&</ul>')
    // Ordered lists
    .replace(/^\d+\. (.+)$/gm, '<li class="text-[#5C6B5C] text-base leading-relaxed">$1</li>')
    // Internal links
    .replace(/\[([^\]]+)\]\(\/([^)]+)\)/g, '<a href="/$2" class="text-[#9B7A2F] hover:text-[#2D4A2D] underline underline-offset-2 transition-colors font-semibold">$1</a>')
    // External links
    .replace(/\[([^\]]+)\]\(https?:\/\/([^)]+)\)/g, '<a href="https://$2" class="text-[#9B7A2F] hover:text-[#2D4A2D] underline underline-offset-2 transition-colors" target="_blank" rel="noopener noreferrer">$1</a>')
    // Paragraphs
    .replace(/\n\n(?!<)/g, '</p><p class="text-[#5C6B5C] text-base leading-relaxed my-4">')
    .replace(/^(?!<)/, '<p class="text-[#5C6B5C] text-base leading-relaxed my-4">')
    .replace(/(?<!>)$/, '</p>')
}

const CATEGORY_COLORS: Record<string, string> = {
  'Soft-Wash Method':   'text-[#2D4A2D] border-[#2D4A2D]/30',
  'Chemical Safety':    'text-[#9B7A2F] border-[#9B7A2F]/30',
  'Surface Care':       'text-[#8B2E16] border-[#8B2E16]/30',
  'Maintenance Tips':   'text-[#5C6B5C] border-[#5C6B5C]/30',
  'Industry Insights':  'text-[#1C1C1C] border-[#D4C9B8]',
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const relatedPosts = getAllPosts().filter(p => p.slug !== post.slug).slice(0, 3)
  const catColor = CATEGORY_COLORS[post.category] ?? CATEGORY_COLORS['Industry Insights']

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: 'Mist and Main',
      url: 'https://mistandmain.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Mist and Main',
      url: 'https://mistandmain.com',
      logo: { '@type': 'ImageObject', url: 'https://mistandmain.com/logo.png' },
    },
    url: `https://mistandmain.com/blog/${post.slug}`,
    keywords: post.tags.join(', '),
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://mistandmain.com/blog/${post.slug}` },
  }

  return (
    <div className="bg-[#F5F0E8] min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* Hero strip */}
      <div
        className="py-10 px-4"
        style={{ background: 'linear-gradient(160deg, #1A2E1A 0%, #2D4A2D 100%)' }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-[#F5F0E8]/40 text-xs tracking-wide mb-4 flex items-center gap-2">
            <Link href="/" className="hover:text-[#F5F0E8] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-[#F5F0E8] transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-[#F5F0E8]/60">{post.category}</span>
          </div>
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className={`text-[10px] border px-2.5 py-0.5 tracking-widest uppercase font-semibold ${catColor}`}>
              {post.category}
            </span>
            <time className="text-[#F5F0E8]/40 text-xs" dateTime={post.date}>
              {formatDate(post.date)}
            </time>
          </div>
          <h1
            className="text-[#F5F0E8] leading-tight mb-4"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: 'clamp(1.6rem, 4vw, 2.4rem)' }}
          >
            {post.title}
          </h1>
          <p className="text-[#F5F0E8]/60 text-base leading-relaxed max-w-2xl">{post.excerpt}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map(tag => (
              <span key={tag} className="text-[10px] text-[#5C6B5C] border border-[#D4C9B8] px-2 py-0.5 tracking-wide">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Article body */}
        <article
          className="prose-mm"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
        />

        {/* CTA box */}
        <div className="mt-12 bg-[#2D4A2D] p-7">
          <p className="text-[#9B7A2F] text-xs font-semibold tracking-[0.2em] uppercase mb-2">Ready to Get Started?</p>
          <p
            className="text-[#F5F0E8] mb-2"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '1.3rem' }}
          >
            Mist and Main serves Jonesborough and the Tri-Cities area.
          </p>
          <p className="text-[#F5F0E8]/60 text-sm mb-5">
            Free estimates, satisfaction guaranteed on every job.
          </p>
          <Link href="/quote" className="mm-btn mm-btn-brass">
            Request a Free Quote
          </Link>
        </div>

        {/* FAQ CTA */}
        <div className="mt-6 border border-[#D4C9B8] bg-[#FDFAF6] p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div>
            <p className="text-[#1C1C1C] font-semibold text-sm" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
              Still have questions?
            </p>
            <p className="text-[#5C6B5C] text-sm">Our FAQ covers plants, pets, staining, smell, and more.</p>
          </div>
          <Link href="/faq" className="mm-btn mm-btn-outline shrink-0">
            View FAQ
          </Link>
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-14">
            <div className="ornament-divider mb-8">
              <span>✦</span>
            </div>
            <h2
              className="text-[#1C1C1C] mb-6 text-center"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '1.3rem' }}
            >
              More Articles
            </h2>
            <div className="space-y-4">
              {relatedPosts.map(p => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="bg-[#FDFAF6] border border-[#D4C9B8] p-5 block heritage-card group"
                >
                  <div
                    className="text-[#1C1C1C] font-semibold group-hover:text-[#2D4A2D] transition-colors mb-1"
                    style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                  >
                    {p.title}
                  </div>
                  <p className="text-[#5C6B5C] text-sm leading-relaxed line-clamp-2">{p.excerpt}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back nav */}
        <div className="mt-10 pt-6 border-t border-[#D4C9B8] flex gap-4 flex-wrap">
          <Link href="/blog" className="mm-btn mm-btn-outline">← All Articles</Link>
          <Link href="/" className="mm-btn mm-btn-outline">← Home</Link>
        </div>
      </div>
    </div>
  )
}
