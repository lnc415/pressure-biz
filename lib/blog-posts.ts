// ─────────────────────────────────────────────────────────────────────────────
//  lib/blog-posts.ts — Blog post registry for Mist and Main
//
//  HOW IT WORKS:
//  - Hand-crafted seed posts live in BLOG_POSTS below (permanent, high quality)
//  - Daily cron job (/api/cron/generate-post) generates new posts via Groq,
//    commits them to data/generated-posts.json → Vercel redeploys → live in ~30s
//  - getAllPosts() merges both sources, sorted newest-first
// ─────────────────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-require-imports
const _generated: BlogPost[] = (() => { try { return require('../data/generated-posts.json') } catch { return [] } })()

export interface BlogPost {
  slug:     string
  title:    string
  excerpt:  string
  content:  string  // Markdown
  date:     string  // ISO date YYYY-MM-DD
  category: string  // Soft-Wash Method | Chemical Safety | Surface Care | Maintenance Tips | Industry Insights
  tags:     string[]
}

export const BLOG_POSTS: BlogPost[] = [

  {
    slug:     'why-we-use-soft-wash-not-high-pressure',
    title:    'Why We Use Soft-Wash Instead of High-Pressure Washing',
    excerpt:  'High pressure looks impressive, but it can etch concrete, strip paint, and blast water behind your siding. Here\'s why soft-wash delivers a deeper clean with far less risk to your property.',
    date:     '2026-04-20',
    category: 'Soft-Wash Method',
    tags:     ['soft wash', 'pressure washing', 'exterior cleaning', 'safe cleaning', 'Jonesborough TN'],
    content: `
## Pressure Does Not Equal Clean

There's a common assumption that more pressure means a better clean. It's understandable — a 3,000 PSI machine looks like it should be able to blast away anything. But pressure is a blunt instrument. It removes surface dirt physically, without addressing what caused that dirt or staining in the first place.

The black streaks on your roof aren't just grime — they're a living organism called *Gloeocapsa magma*, a type of cyanobacteria. The green fuzz on your siding is algae. The dark patches on your driveway are often a mix of mold, algae, and oxidized oil. High pressure can strip the surface appearance of these growths, but it leaves the root system behind. Within months, everything grows back.

Soft-wash uses a low-pressure water delivery — typically under 100 PSI at the nozzle — combined with a professional cleaning solution. The chemistry does the heavy lifting.

## What Soft-Wash Actually Does

The cleaning solution we apply is a mixture of sodium hypochlorite (the same active ingredient in household bleach, but at a controlled concentration), water, and a surfactant. Here's what each component does:

- **Sodium hypochlorite** kills organic growth at the cellular level — algae, mold, mildew, bacteria, and lichen all die on contact
- **Water** dilutes the solution to the appropriate strength for each surface type
- **Surfactant** reduces surface tension so the solution clings to vertical surfaces and penetrates into crevices rather than beading off

We apply the solution, let it dwell for the appropriate time, and then rinse at low pressure. The result isn't just a surface that *looks* clean — it's a surface that *is* clean, with organic growth eliminated rather than knocked off.

## What High Pressure Can Damage

We've seen the results of DIY pressure washing and under-equipped contractors on properties throughout the Tri-Cities area. Some common outcomes:

**Siding:** High pressure can force water behind vinyl siding panels, leading to moisture problems and mold growth inside the wall cavity — exactly the opposite of what you hired someone to prevent.

**Roof shingles:** Asphalt shingles have a granule coating that protects against UV and weathering. High-pressure washing strips those granules, shortening the life of the roof significantly. A roof that needed cleaning can end up needing replacement years early.

**Historic brick and mortar:** In Jonesborough and throughout the region, older masonry was built with softer lime-based mortar. Modern high-pressure equipment will erode this mortar out of the joints, compromising both the appearance and structural integrity of the wall.

**Wood:** Pressure washing wood grain raises the fibers, leaving a rough, fuzzy surface that stains unevenly and weathers poorly. It can also drive water deep into the wood, encouraging rot.

**Painted surfaces:** High pressure at close range strips paint — even exterior-grade paint that's otherwise in good condition.

## The Right Tool for Each Surface

Soft-wash isn't a single formula — it's an approach. We adjust chemical concentration, dwell time, and rinse pressure based on the specific surface:

- **Roofs** get the lowest pressure and the highest chemistry — rinse only, no scrubbing
- **Siding** gets a medium concentration with thorough rinsing from the bottom up
- **Driveways and flatwork** can tolerate more pressure but still benefit from a pre-treatment solution to break down oil and organic growth before the rinse

Every surface gets the method appropriate for that surface, not a one-size-fits-all blast.

If you're in the Jonesborough, Johnson City, Kingsport, or Bristol area and want to talk through the right approach for your property, [request a free quote](/quote) — we're happy to walk through what we'd recommend before you commit to anything.
    `.trim(),
  },

  {
    slug:     'chemicals-we-use-and-why-they-are-safe',
    title:    'The Chemicals We Use — And Why They\'re Safe When Applied Correctly',
    excerpt:  'When you smell something during a soft-wash, it\'s normal to have questions. Here\'s exactly what goes on your property, why we use it, and what happens after it rinses away.',
    date:     '2026-04-23',
    category: 'Chemical Safety',
    tags:     ['soft wash chemicals', 'sodium hypochlorite', 'bleach safety', 'eco-friendly cleaning', 'Jonesborough TN'],
    content: `
## You Might Smell Bleach — Here's Why

If you're home during a soft-wash service and catch a faint bleach smell from outside, that's the sodium hypochlorite in our cleaning solution doing exactly what it's supposed to do. It's the same active ingredient in the bleach you use on laundry or to sanitize a cutting board — just applied to your exterior surfaces at a controlled concentration.

We want you to understand exactly what we're using, why we're using it, and what happens to it after we're done.

## Sodium Hypochlorite (SH)

Sodium hypochlorite is the primary cleaning agent in professional soft-wash. It's not a mystery chemical — it's the same compound that municipal water treatment facilities use to disinfect drinking water, and that hospitals use to sterilize surfaces.

**What it does:** It kills organic growth — algae, mold, mildew, bacteria, and lichen — at the cellular level. This is why soft-wash results last much longer than pressure washing. The organism is dead, not just physically removed.

**What concentration we use:** Household bleach is typically 3–6% sodium hypochlorite. We work with a professional-grade solution that we dilute on-site to the appropriate concentration for each surface — typically 1–3% on most exterior surfaces. Roofs, where the growth tends to be more established, may get up to 4–6% concentration with a thorough rinse afterward.

**What it breaks down into:** After sodium hypochlorite is applied and rinsed, it rapidly breaks down into salt and water. It does not persist in the environment. Sunlight and organic matter both accelerate this decomposition.

## Surfactants

We add a surfactant to every mix. A surfactant is a surface-active agent — it lowers the surface tension of water so our solution spreads evenly and clings to vertical surfaces instead of running straight off.

The surfactants we use are biodegradable. Many share chemistry with common dish soap. They help the cleaning solution work more efficiently so we can use a lower concentration of sodium hypochlorite to achieve the same result.

## What About My Plants?

This is the question we hear most often, and it's the right question to ask.

Undiluted sodium hypochlorite at professional concentrations will damage plant tissue if it contacts leaves for an extended period. This is why plant protection is a standard part of every job we do — not an afterthought.

**Our plant protection protocol:**
1. Pre-wet all vegetation near the work area before we begin — wet leaves are more resistant to chemical contact than dry leaves
2. Apply our cleaning solution with careful aim, avoiding direct contact with plant material where possible
3. Rinse all nearby vegetation immediately after applying the solution to each section
4. Do a final thorough rinse of all plant beds, lawn edges, and vegetation after the job is complete

In practice, the brief contact time and thorough rinsing mean that established plants, shrubs, and grass experience no lasting effect. We've completed hundreds of washes in the Tri-Cities area without plant damage when this protocol is followed correctly.

If you have particularly delicate or irreplaceable plantings — heritage roses, new transplants, vegetable gardens — let us know before we start. We'll take additional precautions or adjust our application approach.

## After the Rinse

Once we've rinsed the surface and surrounding vegetation, the diluted sodium hypochlorite on the ground breaks down rapidly — typically within 30 minutes to a few hours depending on sunlight and soil conditions. It does not accumulate in soil or groundwater at the concentrations and quantities used in residential exterior cleaning.

Pets and children can return to the area once surfaces are dry — generally within 30–60 minutes after we finish. If you have questions about timing for your specific situation, just ask us.

Ready to schedule or want to ask more questions first? [Request a free quote](/quote) and we'll answer anything you'd like to know about our process.
    `.trim(),
  },

  {
    slug:     'how-often-should-you-wash-your-house-exterior',
    title:    'How Often Should You Have Your House Exterior Washed?',
    excerpt:  'The answer depends on your surface type, tree cover, and local climate — but most East Tennessee homeowners should be scheduling a wash every 1 to 2 years. Here\'s how to know what\'s right for your property.',
    date:     '2026-04-26',
    category: 'Maintenance Tips',
    tags:     ['exterior cleaning schedule', 'house washing frequency', 'home maintenance', 'Tennessee climate', 'Jonesborough TN'],
    content: `
## Why East Tennessee Properties Need Regular Washing

The Tri-Cities region has a climate that's ideal for organic growth on exterior surfaces: warm, humid summers, moderate rainfall, and plenty of tree cover in most neighborhoods. Algae, mold, and mildew don't need much encouragement to establish themselves on siding, roofs, driveways, and decks.

Left untreated, this growth isn't just cosmetic. Algae and mold hold moisture against surfaces, accelerating weathering on wood, staining concrete, and shortening the life of roof shingles. What looks like a dirty roof can actually be an early-stage problem that a simple cleaning would have prevented.

## General Guidelines by Surface

There's no single answer that works for every property — the right frequency depends on your specific situation. Here's how we think about it:

### Siding (Vinyl, Wood, Fiber Cement)

**Recommended frequency: Every 1–2 years**

Vinyl siding shows algae as a green or black tint — often most visible on north-facing walls that get less direct sun. Wood and fiber cement siding are more susceptible to moisture retention and benefit from annual cleaning in shaded areas. A yearly wash removes the growth before it can establish a foothold.

### Roof

**Recommended frequency: Every 2–3 years, or when black streaks appear**

The black streaks you see on roofs throughout the area are *Gloeocapsa magma* — a type of algae that feeds on the limestone filler in asphalt shingles. Once established, it spreads. Cleaning at the first sign of streaking prevents a small problem from becoming a large one. Some homeowners in heavily shaded lots may need cleaning every 1–2 years.

### Driveways and Flatwork

**Recommended frequency: Every 1–2 years**

Concrete is porous and absorbs oil, algae, and environmental pollutants. In shaded areas, green algae makes surfaces slippery — a safety issue as much as an aesthetic one. Regular cleaning prevents deep staining that becomes much harder to remove over time.

### Decks and Fences

**Recommended frequency: Annually, before re-staining or sealing**

Wood decks and fences should be cleaned before any protective coating is applied. A dirty surface won't hold stain properly — you're just sealing in the dirt and growth. An annual cleaning also lets you inspect for rot, loose boards, and hardware issues before they become structural problems.

## Signs You're Overdue

You don't always have to track dates. These are the visual cues that tell you it's time:

- **Green or black tint** on any surface (north-facing walls and shaded areas show this first)
- **Dark streaking on the roof** running down from above
- **Slippery concrete or deck** — wet-looking growth that reduces traction
- **Faded or dingy appearance** that doesn't improve with rain

## The Cost of Waiting

The most common thing we hear from customers who've let it go too long: "I didn't realize how bad it was until I saw the difference." Growth that's been established for 3–5 years takes more time and solution to remove — and in some cases, staining has become permanent in the surface. Consistent maintenance costs less over time than remediation.

## A Note on Jonesborough Specifically

Jonesborough's historic district has a high density of mature trees, which means more shade and more organic debris on roofs and siding. Properties near the creek corridors see more moisture and tend to need more frequent attention. If your home is in a heavily shaded lot or backs up to a wooded area, we'd lean toward annual service.

We're happy to walk your property and give you an honest recommendation — not the most frequent schedule, just the right one. [Request a free quote](/quote) and we'll take a look.
    `.trim(),
  },

]

// ── Helpers ───────────────────────────────────────────────────────────────────

const _allPosts: BlogPost[] = [...BLOG_POSTS, ..._generated].sort(
  (a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0)
)

export function getAllPosts(): BlogPost[] {
  return _allPosts
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return _allPosts.find(p => p.slug === slug)
}

export function getAllSlugs(): string[] {
  return _allPosts.map(p => p.slug)
}
