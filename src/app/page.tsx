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
    <main style={{ margin: 0, padding: 0, paddingTop: 104 }}>
      {/*
        paddingTop:104 = 32px (AnnouncementBar) + 72px (Navbar).
        Using paddingTop on main instead of a separate spacer <div>
        eliminates the BFC boundary gap that appeared between the div
        and HeroStrip on all three platforms (desktop/iPad/mobile).
        padding is part of main's own box model — no sibling boundary.
      */}
      <Navbar />
      <HeroStrip />
      <ArtisanBanner />
      <CatalogSection />
      <FounderBannerScroll />
      <MagicSection />
      <Footer />
    </main>
  )
}
