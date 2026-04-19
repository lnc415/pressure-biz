import { isAuthenticated } from '@/lib/admin-auth'
import { readData, writeData, readOne, writeOne } from '@/lib/data'
import { getBrand, saveBrand } from '@/lib/brand'

const INITIAL_SERVICES = [
  { id: '1', name: 'Driveway & Concrete Cleaning', description: 'Blast away oil stains, grime, and discoloration from concrete driveways, sidewalks, and patios.', priceRange: '$75 – $200', icon: '🏠' },
  { id: '2', name: 'House Softwash', description: 'Low-pressure softwash treatment that safely removes mold, mildew, algae, and dirt from siding without damage.', priceRange: '$150 – $400', icon: '🧹' },
  { id: '3', name: 'Deck & Fence Cleaning', description: 'Restore the natural beauty of wood, composite, or vinyl decks and fences — prepped and ready for staining.', priceRange: '$100 – $300', icon: '🪵' },
  { id: '4', name: 'Roof Softwash', description: 'Safe low-pressure roof cleaning that eliminates black streaks, moss, and algae without voiding your warranty.', priceRange: '$200 – $500', icon: '🏡' },
]

export async function POST() {
  if (!await isAuthenticated()) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  // Only seed services if empty
  const existing = await readData('services')
  if (existing.length === 0) {
    await writeData('services', INITIAL_SERVICES)
  }

  // Brand seeds from default via getBrand (it returns DEFAULT_BRAND if not set)
  const brand = await getBrand()
  await saveBrand(brand)

  return Response.json({ ok: true, seeded: existing.length === 0 })
}
