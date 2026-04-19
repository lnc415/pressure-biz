import { readOne, writeOne } from './data'

export interface Brand {
  name: string
  tagline: string
  logo: string
  aboutCopy: string
  serviceArea: string
  whyUs: string[]
  email1: string
  email2: string
  phone: string
}

const DEFAULT_BRAND: Brand = {
  name: 'CamSplash',
  tagline: 'We Make It Shine.',
  logo: '',
  aboutCopy: 'CamSplash is a family-run pressure washing and softwash business serving our local community.',
  serviceArea: 'Serving the greater local area and surrounding communities.',
  whyUs: ['Fully insured and licensed', 'Family-run', 'Eco-friendly solutions available', 'Satisfaction guaranteed'],
  email1: 'owner@camsplash.com',
  email2: '',
  phone: '(555) 000-0000',
}

export async function getBrand(): Promise<Brand> {
  return readOne<Brand>('brand', DEFAULT_BRAND)
}

export async function saveBrand(data: Brand): Promise<void> {
  await writeOne('brand', data)
}
