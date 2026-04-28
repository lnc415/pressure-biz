import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'FAQ | Common Questions About Exterior Cleaning',
  description:
    'Answers to the most common questions about soft-wash cleaning — will it kill my plants, will it stain my surfaces, why do I smell bleach, and more. From Mist and Main in Jonesborough, TN.',
  keywords: [
    'will pressure washing kill my plants',
    'is bleach safe for house washing',
    'will soft wash stain my driveway',
    'can you remove black streaks roof',
    'pressure washing pets safe',
    'exterior cleaning FAQ Tennessee',
  ],
  alternates: { canonical: 'https://mistandmain.com/faq' },
}

interface FAQItem {
  question: string
  answer:   string
  category: string
}

const FAQS: FAQItem[] = [

  // ── Plants & Lawn ──────────────────────────────────────────────────────────
  {
    category: 'Plants & Lawn',
    question: 'Will it kill my plants?',
    answer: `Properly applied soft-wash will not kill established plants, shrubs, or grass — and protecting your vegetation is a standard part of our process, not an afterthought.

Before we begin, we thoroughly pre-wet all plant beds, shrubs, and lawn areas near the work zone. Wet foliage is far more resistant to chemical contact than dry. As we apply cleaning solution to each section of your home, we rinse the surrounding vegetation immediately. Once the job is complete, we do a final thorough rinse of all plant material.

The cleaning solution breaks down rapidly after it hits the ground — typically within 30–60 minutes in sunlight. At the diluted concentrations we use, brief contact with rinsed-off solution is not harmful to established plants.

If you have specific concerns — a vegetable garden, new transplants, or prized plantings — let us know before we start and we'll take additional precautions.`,
  },
  {
    category: 'Plants & Lawn',
    question: 'Will the chemicals harm my grass or lawn?',
    answer: `Established turf grass handles brief contact with diluted soft-wash solution well, particularly when properly rinsed. You may notice a temporary yellowing in heavily saturated spots, but this almost always recovers within a week or two as the grass grows through it.

We take care to rinse all lawn areas thoroughly after washing. If you have recently seeded areas or thin, stressed patches, point them out to us — we'll give those spots extra attention with the rinse.`,
  },
  {
    category: 'Plants & Lawn',
    question: 'Can you wash near my vegetable garden?',
    answer: `Yes, with extra care. We do not recommend soft-washing surfaces directly adjacent to an active vegetable garden during the growing season without a conversation first. We can schedule around your garden, create a barrier, or adjust our approach so that no solution contacts edible plants.

If the garden is nearby but not immediately adjacent to what we're washing, our standard rinse protocol is typically sufficient — but tell us it's there so we can take it into account.`,
  },

  // ── Chemicals & Safety ────────────────────────────────────────────────────
  {
    category: 'Chemicals & Safety',
    question: 'Why do I smell bleach?',
    answer: `The faint bleach smell during and shortly after a soft-wash is sodium hypochlorite — the same active ingredient in household bleach — doing its job. We use it because it's the most effective way to kill the organic growth (algae, mold, mildew, bacteria) that accumulates on exterior surfaces.

The smell dissipates quickly as the solution rinses off and breaks down in sunlight and air. It is not a sign that something went wrong — it's confirmation that the cleaning chemistry is working. Most customers notice the smell is completely gone within an hour or two after we finish.`,
  },
  {
    category: 'Chemicals & Safety',
    question: 'Is it safe for my pets?',
    answer: `Yes, once surfaces are dry. Keep pets indoors or away from the work area while we're actively applying and rinsing solution — both for their safety and so they're not underfoot during the job. Once we've finished and surfaces have dried (typically 30–60 minutes after we wrap up), it's safe for pets to return to the area normally.

If you have a pet that tends to lick wet surfaces, give it a little extra time. The solution itself is not acutely toxic at our working concentrations, but it's the same common sense as keeping pets away from any cleaning chemical until it's dry.`,
  },
  {
    category: 'Chemicals & Safety',
    question: 'Are the chemicals you use environmentally safe?',
    answer: `The sodium hypochlorite we use breaks down into salt and water after application — it does not persist in the environment or accumulate in soil at the quantities used in residential cleaning. The surfactants we add are biodegradable.

We are not a zero-chemical operation — effective exterior cleaning requires chemistry — but we use responsible concentrations, apply solution precisely to minimize overspray, and rinse thoroughly. We are not applying anything to your property that would raise concerns for the surrounding environment when used as directed.`,
  },
  {
    category: 'Chemicals & Safety',
    question: 'When can my family go back outside after a wash?',
    answer: `Once surfaces are dry and the area has been rinsed, it's generally safe for family members to return — usually 30–60 minutes after we finish. If you or a family member has chemical sensitivities or respiratory concerns, give it a bit more time for the residual smell to clear.

We're happy to give you a specific heads-up when we've completed the rinse if you want to time it precisely.`,
  },

  // ── Surfaces & Staining ───────────────────────────────────────────────────
  {
    category: 'Surfaces & Staining',
    question: 'Will it stain my concrete or driveway?',
    answer: `Soft-wash will not stain concrete — in fact, it does the opposite. The cleaning solution lifts algae, mold, and environmental staining from concrete surfaces. After a proper wash, driveways and walkways almost always appear lighter and cleaner than they have in years.

The one caveat: if your concrete has pre-existing cracks or damaged areas, moisture from the wash can temporarily highlight them. The concrete itself is not being stained — you're just seeing it wet. Once it dries, it will look the same as before (or better, once the surface grime is gone).`,
  },
  {
    category: 'Surfaces & Staining',
    question: 'Will it fade or damage my painted surfaces?',
    answer: `No, when applied at appropriate concentrations and rinsed properly. Soft-wash chemistry and low-pressure delivery are specifically chosen to be safe on painted siding, trim, and fences.

High-pressure washing is what damages paint — it physically strips paint off surfaces. We don't do that. If your paint is already peeling or failing, the wash may accelerate what was already going to happen; in that case we'll let you know what we observe.`,
  },
  {
    category: 'Surfaces & Staining',
    question: 'Will it damage my wood deck or fence?',
    answer: `No, done correctly. We use low pressure on wood surfaces and the appropriate chemical concentration to lift algae and mildew without raising the grain.

What damages wood is excessive pressure — the kind that leaves fuzzy, raised fibers. Our soft-wash approach cleans the wood without physically abrading it. In fact, washing before re-staining or sealing is the right way to prep a deck: you get a clean surface that holds the finish properly.`,
  },
  {
    category: 'Surfaces & Staining',
    question: 'I have brick from the 1800s. Is soft-washing safe for historic masonry?',
    answer: `Yes — and soft-wash is actually the recommended approach for historic masonry precisely because high pressure is not safe for it.

Older brick, particularly pre-1920s construction, was made with softer clay and set in lime-based mortar. Modern high-pressure washing erodes lime mortar out of the joints, which compromises both the appearance and structural integrity of the wall. Jonesborough has a significant amount of this type of historic construction, and we're experienced working with it.

Our soft-wash approach cleans the biological growth from the surface without applying the physical force that damages mortar. We assess older masonry carefully before starting and adjust our approach accordingly.`,
  },

  // ── Stain & Organic Removal ───────────────────────────────────────────────
  {
    category: 'What We Can Remove',
    question: 'Can you remove the black streaks from my roof?',
    answer: `Yes. Those black streaks are Gloeocapsa magma — a type of algae that feeds on the limestone filler in asphalt shingles. It's extremely common in East Tennessee's humid climate and spreads from shingle to shingle once established.

Soft-wash is the correct treatment: we apply a sodium hypochlorite solution at the right concentration, let it dwell, and rinse at low pressure. The organisms are killed and the streaks wash away. Pressure washing a roof to remove algae will strip the granules off your shingles and shorten the life of the roof — we don't do that.

Results are typically very visible within minutes of application. Some heavy staining may require a second treatment.`,
  },
  {
    category: 'What We Can Remove',
    question: 'Can you remove rust stains from my driveway or siding?',
    answer: `Rust is a different chemistry than organic growth, and sodium hypochlorite does not remove rust — it can actually set it further. Rust stains require a specialized oxalic acid or phosphoric acid treatment.

We can assess rust staining on your property and let you know whether it's within scope for a standard soft-wash, whether it needs a specialty treatment, or whether it's too deep in the substrate to remove without resurfacing. We'd rather tell you honestly than take your money for a result we can't deliver.`,
  },
  {
    category: 'What We Can Remove',
    question: 'Can you remove mold and mildew from my siding?',
    answer: `Yes — this is one of the most common things we treat. Mold and mildew on siding respond very well to soft-wash. The sodium hypochlorite in our cleaning solution kills mold at the root, not just on the surface, which is why results last considerably longer than scrubbing or rinsing alone.

For significant mold growth, particularly on north-facing walls or under eaves, we may recommend a follow-up treatment schedule to prevent rapid re-establishment.`,
  },
  {
    category: 'What We Can Remove',
    question: 'Can you remove oil stains from my driveway?',
    answer: `Old, deep oil stains are the hardest thing to remove from concrete and often can't be fully eliminated — the oil penetrates the porous surface over time and becomes permanent. Fresh oil is much more treatable.

A soft-wash treatment with our degreaser pre-treatment will significantly reduce the appearance of oil stains in most cases. For severe or long-set stains, we'll give you an honest assessment of how much improvement to expect so you can make an informed decision.`,
  },
  {
    category: 'What We Can Remove',
    question: 'Can you remove graffiti?',
    answer: `Paint-based graffiti on exterior surfaces typically requires specialty graffiti removal products rather than soft-wash chemistry. Depending on the surface and the type of paint, results vary.

We're not a dedicated graffiti removal service, but if you have graffiti on your property we're happy to assess it alongside any other cleaning work you need done and let you know what's realistic.`,
  },

  // ── Process & Expectations ────────────────────────────────────────────────
  {
    category: 'Process & Expectations',
    question: 'How long does a typical job take?',
    answer: `A full house wash on an average residential property takes 2–4 hours. Larger homes, properties with extensive flatwork, or jobs that include both the house exterior and a roof or deck will take longer — typically a half day.

We'll give you a more specific time estimate when we quote your job. You don't need to be home for the work, but we do ask that someone is reachable in case we have questions.`,
  },
  {
    category: 'Process & Expectations',
    question: 'Do I need to do anything before you arrive?',
    answer: `A few things help us get started quickly:

- Close all windows and doors before we arrive
- Move any vehicles out of the driveway if we're washing the driveway
- Point out any specific concerns — delicate plants, items to avoid, areas of particular concern
- If you have outdoor furniture on a deck or patio we're washing, we'll move it, but it saves time if it's already off the surface

That's it. We handle the rest.`,
  },
  {
    category: 'Process & Expectations',
    question: 'How long until my surfaces look clean? Is there a delay?',
    answer: `For siding and most surfaces, results are visible during the job and immediately after the rinse. The surface is noticeably cleaner within minutes of treatment.

For roofs with heavy algae, you'll see a significant improvement immediately, and the remaining discoloration often continues to fade over the next few weeks as the killed organisms weather away. This is normal — the biological material has been killed and is now just weathering off. You don't need a second treatment if the result looks good the day of the job but improves further over the following weeks.`,
  },
  {
    category: 'Process & Expectations',
    question: 'What if I\'m not happy with the results?',
    answer: `We stand behind our work. If you're not satisfied with the results of any service we've performed, contact us and we'll come back to address it.

Our goal is that every job results in a property that visibly looks better and a customer who would confidently recommend us to a neighbor. If that's not the outcome, we want to know about it.`,
  },
]

const CATEGORIES = [...new Set(FAQS.map(f => f.category))]

const CATEGORY_ICONS: Record<string, string> = {
  'Plants & Lawn':        '🌿',
  'Chemicals & Safety':   '🧪',
  'Surfaces & Staining':  '🧱',
  'What We Can Remove':   '✦',
  'Process & Expectations': '📋',
}

export default function FAQPage() {
  return (
    <div className="bg-[#F5F0E8] min-h-screen">

      {/* Hero */}
      <section
        className="py-16 px-4 text-center"
        style={{ background: 'linear-gradient(160deg, #1A2E1A 0%, #2D4A2D 100%)' }}
      >
        <p className="text-[#9B7A2F] text-xs font-semibold tracking-[0.25em] uppercase mb-3">
          Your Questions, Answered
        </p>
        <h1
          className="text-[#F5F0E8] mb-4"
          style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}
        >
          Frequently Asked Questions
        </h1>
        <p className="text-[#F5F0E8]/60 max-w-xl mx-auto text-base leading-relaxed">
          Honest answers about our chemicals, process, and what to expect — so you can feel confident before we show up.
        </p>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-16">

        {/* Category jump links */}
        <div className="flex flex-wrap gap-3 mb-14 justify-center">
          {CATEGORIES.map(cat => (
            <a
              key={cat}
              href={`#${cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              className="mm-btn mm-btn-outline text-sm"
            >
              {CATEGORY_ICONS[cat] ?? '✦'} {cat}
            </a>
          ))}
        </div>

        {/* FAQ sections by category */}
        {CATEGORIES.map(cat => {
          const items = FAQS.filter(f => f.category === cat)
          const anchorId = cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')
          return (
            <section key={cat} id={anchorId} className="mb-16 scroll-mt-24">
              <div className="ornament-divider mb-8">
                <span>{CATEGORY_ICONS[cat] ?? '✦'}</span>
              </div>
              <h2
                className="text-[#1C1C1C] text-center mb-8"
                style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}
              >
                {cat}
              </h2>

              <div className="space-y-5">
                {items.map((item, i) => (
                  <details
                    key={i}
                    className="bg-[#FDFAF6] border border-[#D4C9B8] group"
                  >
                    <summary
                      className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none select-none"
                    >
                      <span
                        className="text-[#1C1C1C] font-semibold leading-snug"
                        style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '1rem' }}
                      >
                        {item.question}
                      </span>
                      <span className="text-[#9B7A2F] shrink-0 text-lg font-light transition-transform duration-200 group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <div className="px-6 pb-6 pt-0 border-t border-[#D4C9B8]">
                      {item.answer.split('\n\n').map((para, j) => (
                        <p key={j} className="text-[#5C6B5C] text-sm leading-relaxed mt-4">
                          {para}
                        </p>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )
        })}

        {/* Still have questions CTA */}
        <div className="bg-[#2D4A2D] p-10 text-center mt-8">
          <div className="ornament-divider mb-6 max-w-xs mx-auto">
            <span>✦</span>
          </div>
          <h2
            className="text-[#F5F0E8] mb-3"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif', fontSize: '1.8rem' }}
          >
            Still Have Questions?
          </h2>
          <p className="text-[#F5F0E8]/60 mb-8 max-w-md mx-auto text-sm leading-relaxed">
            We're happy to walk through your specific situation before you book. No pressure, no sales pitch — just straight answers.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/quote" className="mm-btn mm-btn-brass">
              Request a Free Quote
            </Link>
            <Link href="/contact" className="mm-btn mm-btn-outline-light">
              Send Us a Message
            </Link>
          </div>
        </div>

        {/* Blog link */}
        <div className="mt-8 border border-[#D4C9B8] bg-[#FDFAF6] p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div>
            <p className="text-[#1C1C1C] font-semibold" style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}>
              Want to go deeper?
            </p>
            <p className="text-[#5C6B5C] text-sm">Our blog covers chemicals, surface care, and what to expect in detail.</p>
          </div>
          <Link href="/blog" className="mm-btn mm-btn-outline shrink-0">
            Read the Blog →
          </Link>
        </div>

        <div className="mt-8">
          <Link href="/" className="mm-btn mm-btn-outline">← Back to Home</Link>
        </div>
      </div>
    </div>
  )
}
