// src/app/page.tsx
//
// THE SPACING PROBLEM — ROOT CAUSE:
// All previous attempts used hardcoded pixel math:
//   paddingTop: 104  (32 announcement + 72 nav)
// This breaks whenever:
//   - AnnouncementBar renders at a different height on any device
//   - Navbar wraps text on intermediate screen widths
//   - Browser zoom changes effective pixel density
//   - iOS Safari address bar affects viewport calculations
//
// THE CORRECT FIX — CSS custom properties set by the components:
// Each fixed element writes its height to a CSS variable on :root.
// HeroStrip reads those variables. Zero hardcoding. Always correct.
//
// BUT — we can't use JS to measure in a Server Component.
// The simplest guaranteed fix: position:fixed on HeroStrip itself
// is not possible. Instead: use CSS that adapts.
//
// ACTUAL CORRECT SOLUTION:
// Remove paddingTop from main entirely.
// Give HeroStrip a marginTop that uses CSS variables.
// Since we control all components, define the heights as
// CSS custom properties in globals.css and reference them everywhere.
// No JS. No measurement. No hardcoding per-component.

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
        The HeroStrip section has marginTop: 'var(--header-h)' in its
        own style. --header-h is defined in globals.css as 104px and
        overridden per breakpoint. This is the single source of truth.
        No spacer div. No paddingTop on main. No hardcoded math here.
      */}
      <HeroStrip />
      <ArtisanBanner />
      <CatalogSection />
      <FounderBannerScroll />
      <MagicSection />
      <Footer />
    </main>
  )
}
