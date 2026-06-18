// src/app/page.tsx
// Homepage — Server Component.
//
// Spacer = 32px (AnnouncementBar fixed) + 72px (Navbar fixed) = 104px.
// Previous code had 98px — caused 6px overlap on all screens.

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
      {/*
        Fixed header stack:
          AnnouncementBar: position:fixed top:0    height:32px
          Navbar:          position:fixed top:32px height:72px
          Total:           104px
        This spacer prevents HeroStrip from sitting under the header.
      */}
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
