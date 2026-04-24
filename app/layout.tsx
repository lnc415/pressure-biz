import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import SplashIntro from '@/components/SplashIntro'
import PageTransition from '@/components/PageTransition'
import { getBrand } from '@/lib/brand'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

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
    <html lang="en" className={`h-full ${playfair.variable} ${inter.variable}`}>
      <body className="min-h-full flex flex-col antialiased bg-cream">
        <SplashIntro brandName={brand.name} logoSrc="/logo.png" />
        <Nav brandName={brand.name} />
        <PageTransition>
          <main className="flex-1">{children}</main>
        </PageTransition>
        <Footer brandName={brand.name} phone={brand.phone} email1={brand.email1} />
      </body>
    </html>
  )
}
