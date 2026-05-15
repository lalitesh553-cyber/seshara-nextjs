# Seshara — Next.js Project

Slow fashion, handloom cotton. Built with **Next.js 14 + TypeScript**.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
seshara-nextjs/
├── public/                     # All images & assets
│   ├── hero-1.png … hero-6.png
│   ├── item-1.jpg … item-4.jpg
│   ├── 2nd-herobanner.jpg
│   ├── aboutposter.png
│   ├── prasanna.png
│   └── ...
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout + metadata
│   │   ├── page.tsx            # Home page (assembles all sections)
│   │   └── globals.css         # Design tokens, animations, global styles
│   └── components/
│       ├── AnnouncementBar.tsx # Scrolling top bar
│       ├── Navbar.tsx          # Fixed navigation
│       ├── HeroStrip.tsx       # Auto-scrolling hero cards (hero-1 to hero-6)
│       ├── SecondHeroBanner.tsx# Village/artisan hero with CTA
│       ├── CatalogSection.tsx  # Qahla-style product catalog
│       ├── ProcessSection.tsx  # Crafted the slow way — 4 steps
│       ├── FounderSection.tsx  # Prasanna founder story (white bg)
│       ├── MagicSection.tsx    # The magic behind our pieces
│       └── Footer.tsx          # Full footer with newsletter
```

## Sections (in order)

1. **Announcement Bar** — scrolling marquee, terra background
2. **Navbar** — fixed, transparent blur, SESHARA center logo
3. **Hero Strip** — auto-scrolling hero-1 through hero-6, no borders, seamless loop
4. **Second Hero Banner** — `2nd-herobanner.jpg`, cinematic overlay, big headline + CTA
5. **Catalog** — Qahla-style: offer banner, Spring Collection tag, 5-col grid, 4-col edit row, about poster
6. **Process** — Thread → Dye → Weave → Wear
7. **Founder** — Prasanna photo + story (white background, qahla format, 2 rows)
8. **Magic** — Intentional Production, Indian Bodies, Timeless Pieces
9. **Footer** — Newsletter, links, address

## Swapping Products

Edit `src/components/CatalogSection.tsx` — update the `springProducts` and `editProducts` arrays with real product data (name, price, image path in `/public`).

## Adding Pages

```bash
# e.g. shop page
src/app/shop/page.tsx
```

## Deploy

```bash
npm run build
npm run start
# or deploy to Vercel — just connect the repo
```
