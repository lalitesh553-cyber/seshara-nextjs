import AnnouncementBar from '@/components/AnnouncementBar'
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
      <AnnouncementBar />
      <Navbar />
      <div style={{ height: 98 }} />
      <HeroStrip />
      <ArtisanBanner />
      <CatalogSection />
      <FounderBannerScroll />
      <MagicSection />
      <Footer />
    </main>
  )
}
