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
  name: 'Mist and Main',
  tagline: 'Old Towne Clean.',
  logo: '/logo.png',
  aboutCopy: 'Mist and Main is a professional exterior cleaning company rooted in Jonesborough — Tennessee\'s oldest town. We treat every property with the same care and respect this community has shown its historic architecture for generations.',
  serviceArea: 'Proudly serving Jonesborough, Johnson City, Kingsport, Bristol, and the greater Tri-Cities region.',
  whyUs: [
    'Fully insured and licensed',
    'Soft-wash technology that protects historic surfaces',
    'Eco-friendly cleaning solutions',
    'All-crew professionals — no day laborers',
    'Satisfaction guaranteed on every job',
  ],
  email1: 'hello@mistandmain.com',
  email2: '',
  phone: '(423) 000-0000',
}

export async function getBrand(): Promise<Brand> {
  return readOne<Brand>('brand', DEFAULT_BRAND)
}

export async function saveBrand(data: Brand): Promise<void> {
  await writeOne('brand', data)
}
