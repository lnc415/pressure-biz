import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import SplashIntro from '@/components/SplashIntro'
import PageTransition from '@/components/PageTransition'
import { getBrand } from '@/lib/brand'

export async function generateMetadata(): Promise<Metadata> {
  const brand = await getBrand()
  return {
    title: { default: brand.name, template: `%s | ${brand.name}` },
    description: brand.tagline,
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const brand = await getBrand()
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        <SplashIntro brandName={brand.name} />
        <Nav brandName={brand.name} />
        <PageTransition>
          <main className="flex-1">{children}</main>
        </PageTransition>
        <Footer brandName={brand.name} phone={brand.phone} email1={brand.email1} />
      </body>
    </html>
  )
}
