// src/app/page.tsx
// Homepage. Server Component — no 'use client'.
//
// Spacer height = 32px (AnnouncementBar) + 72px (Navbar) = 104px.
// Previous version used 98px — causing 6px overlap on all screens.

import Navbar from '@/components/Navbar'
import HeroStrip from '@/components/HeroStrip'
import ArtisanBanner from '@/components/ArtisanBanner'
import CatalogSection from '@/components/CatalogSection'
import FounderBannerScroll from '@/components/FounderBannerScroll'
import MagicSection from '@/components/MagicSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main style={{ margin: 0, padding: 0 }}>
      <Navbar />
      {/* 32px announcement bar + 72px nav = 104px total fixed header */}
      <div style={{ height: 104 }} />
      <HeroStrip />
      <ArtisanBanner />
      <CatalogSection />
      <FounderBannerScroll />
      <MagicSection />
      <Footer />
    </main>
  )
}
