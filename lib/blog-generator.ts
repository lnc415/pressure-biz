// ─────────────────────────────────────────────────────────────────────────────
//  lib/blog-generator.ts — Shared blog generation logic for Mist and Main
//  Used by both /api/cron/generate-post (scheduled) and
//  /api/admin/generate-post (manual trigger from admin panel)
// ─────────────────────────────────────────────────────────────────────────────

const GROQ_URL  = 'https://api.groq.com/openai/v1/chat/completions'
const GH_API    = 'https://api.github.com'
const GH_OWNER  = 'lnc415'
const GH_REPO   = 'pressure-biz'
const FILE_PATH = 'data/generated-posts.json'

export interface GeneratedPost {
  slug:     string
  title:    string
  excerpt:  string
  content:  string
  date:     string
  category: string
  tags:     string[]
}

export interface GenerateResult {
  success:   boolean
  skipped?:  boolean
  reason?:   string
  slug?:     string
  title?:    string
  wordCount?: number
  error?:    string
}

// ── Groq: generate one new blog post ─────────────────────────────────────────
async function generatePost(
  apiKey: string,
  existingSlugs: string[],
  existingTitles: string[],
): Promise<GeneratedPost> {
  const today = new Date().toISOString().split('T')[0]

  const systemPrompt = `You are a blog content writer for Mist and Main (mistandmain.com), a professional exterior soft-wash cleaning company serving Jonesborough, Tennessee and the greater Tri-Cities area (Johnson City, Kingsport, Bristol, TN/VA/NC).

Generate ONE new blog post as a raw JSON object (no markdown wrapper, no explanation — ONLY the JSON).

Requirements:
- Topic must be about exterior cleaning: soft-wash method, pressure washing chemicals/safety, surface care, plant protection, mold/algae/mildew, roof cleaning, driveway cleaning, historic property care, or maintenance tips
- Topic must NOT overlap with any existing post listed by the user
- Write from the perspective of a knowledgeable, trustworthy professional — calm, factual, reassuring tone
- The audience is homeowners who may be nervous about chemicals or damage to their property — put their minds at ease with real facts
- Naturally mention Jonesborough, TN and the historic character of the region when appropriate
- End the content with a paragraph encouraging readers to contact Mist and Main for a free estimate — link using markdown: [request a free quote](/quote)
- Length: 450–650 words in the content field
- Use ## for h2 headings, ### for h3, **bold**, tables where helpful
- Newlines in the content field must be \\n (escaped for JSON)

JSON shape (return ONLY this object):
{
  "slug": "kebab-case-url-slug",
  "title": "Clear specific customer-friendly title (50-65 chars ideal)",
  "excerpt": "1-2 sentence hook that addresses a common homeowner concern",
  "content": "Full markdown content as a single JSON string with \\\\n for newlines",
  "date": "${today}",
  "category": "Soft-Wash Method | Chemical Safety | Surface Care | Maintenance Tips | Industry Insights",
  "tags": ["tag1", "tag2", "tag3", "Jonesborough TN"]
}`

  const userPrompt = `Today is ${today}.

EXISTING POST TOPICS — do NOT duplicate any of these:
${existingSlugs.map((s, i) => `- ${s}: ${existingTitles[i] ?? ''}`).join('\n')}

HIGH-VALUE TOPIC IDEAS — pick the most relevant that hasn't been covered:

SOFT-WASH METHOD (category: Soft-Wash Method):
- How soft-wash works vs. high-pressure washing — why lower pressure is safer
- What is a surfactant and why do we add it to cleaning solutions?
- How we adjust chemical ratios for different surfaces
- Why roof cleaning requires a completely different approach than driveway cleaning
- The difference between bleach-based and enzyme-based exterior cleaners
- How we prevent streaking on siding and stucco

CHEMICAL SAFETY (category: Chemical Safety):
- Sodium hypochlorite explained: what it is, what concentration we use, why it's safe
- How we protect your plants before, during, and after a wash
- Is bleach bad for concrete? The real answer
- What happens to cleaning chemicals after they rinse off — environmental impact
- Why "eco-friendly" pressure washing still uses chemicals (and that's okay)
- How long after a soft wash before pets and kids can go outside

SURFACE CARE (category: Surface Care):
- Will pressure washing damage my wood deck?
- How we clean historic brick without damaging the mortar
- Soft washing vinyl siding: what can go wrong and how we prevent it
- Can you soft-wash a metal roof?
- How we clean painted surfaces without peeling the paint
- Oxidized paint vs. mold: how to tell the difference (and what to do)

MAINTENANCE TIPS (category: Maintenance Tips):
- How often should you have your house washed? A seasonal guide for East Tennessee
- Signs your roof needs cleaning before it needs replacing
- What causes black streaks on roofs? (Gloeocapsa magma explained)
- How to prep your property before a professional wash
- The best time of year to schedule exterior cleaning in the Tri-Cities area

INDUSTRY INSIGHTS (category: Industry Insights):
- Why hiring insured professionals matters for exterior cleaning
- What to ask before hiring a pressure washing company
- DIY pressure washing: what homeowners get wrong most often
- Why Jonesborough's historic properties need special care when washing

Generate ONE new blog post as a JSON object now.`

  const res = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model:       'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user',   content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens:  2048,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Groq error ${res.status}: ${err}`)
  }

  const data = await res.json()
  const raw  = data?.choices?.[0]?.message?.content?.trim() ?? ''

  const jsonStr = raw
    .replace(/^```(?:json)?\n?/i, '')
    .replace(/\n?```$/i, '')
    .trim()

  let post: GeneratedPost
  try {
    post = JSON.parse(jsonStr)
  } catch (e) {
    throw new Error(`Failed to parse Groq JSON: ${e}\n\nRaw:\n${raw.slice(0, 500)}`)
  }

  const required = ['slug', 'title', 'excerpt', 'content', 'date', 'category', 'tags']
  for (const field of required) {
    if (!post[field as keyof GeneratedPost]) {
      throw new Error(`Generated post missing required field: ${field}`)
    }
  }

  return post
}

// ── GitHub helpers ────────────────────────────────────────────────────────────
async function ghGetFile(token: string): Promise<{ posts: GeneratedPost[]; sha: string }> {
  const url = `${GH_API}/repos/${GH_OWNER}/${GH_REPO}/contents/${FILE_PATH}?ref=master`
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`GitHub GET failed: ${res.status} — ${body}`)
  }
  const data = await res.json()
  const decoded = Buffer.from(data.content, 'base64').toString('utf-8')
  return { posts: JSON.parse(decoded), sha: data.sha }
}

async function ghCommitFile(
  token: string,
  posts: GeneratedPost[],
  sha: string,
  title: string,
): Promise<void> {
  const content = Buffer.from(JSON.stringify(posts, null, 2) + '\n').toString('base64')
  const res = await fetch(
    `${GH_API}/repos/${GH_OWNER}/${GH_REPO}/contents/${FILE_PATH}`,
    {
      method: 'PUT',
      headers: {
        Authorization:  `Bearer ${token}`,
        Accept:         'application/vnd.github+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message:   `content: daily blog post — ${title}`,
        content,
        sha,
        committer: { name: 'lnc415', email: 'lnc415@users.noreply.github.com' },
      }),
    },
  )
  if (!res.ok) throw new Error(`GitHub PUT failed: ${res.status} ${await res.text()}`)
}

// ── Main export ───────────────────────────────────────────────────────────────
export async function generateAndPublishPost(): Promise<GenerateResult> {
  const groqKey = process.env.GROQ_API_KEY
  const ghToken = process.env.GH_ACCESS_TOKEN

  if (!groqKey) return { success: false, error: 'GROQ_API_KEY not set' }
  if (!ghToken) return { success: false, error: 'GH_ACCESS_TOKEN not set' }

  const { posts, sha } = await ghGetFile(ghToken)

  const existingSlugs  = posts.map(p => p.slug)
  const existingTitles = posts.map(p => p.title)

  const newPost = await generatePost(groqKey, existingSlugs, existingTitles)

  if (existingSlugs.includes(newPost.slug)) {
    return { success: false, skipped: true, reason: 'Duplicate slug', slug: newPost.slug }
  }

  await ghCommitFile(ghToken, [...posts, newPost], sha, newPost.title)

  return {
    success:   true,
    slug:      newPost.slug,
    title:     newPost.title,
    wordCount: newPost.content.split(/\s+/).length,
  }
}
