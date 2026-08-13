# Dakshinapaaka — Product Requirements Document

## Latest Problem Statement
"add a new section after gallery, Testimonials — beautiful bg matching website theme, beautifully created section using provided reviews, luxury features, optimized for pc and mobile, use creative mind and innovate"

## Stack
Next.js 16.2.10 (Turbopack, React Compiler on), React 19, Tailwind CSS 4, Framer Motion 12, lucide-react. Static content site.

## Sections (order)
Hero → About → SignatureDishes → Menu → Gallery → **Testimonials (NEW)** → FloatingMenuButton

## What's Been Implemented — 2026-01-08 (iteration 3)

### Testimonials section — luxury Google-reviews showcase
- Deep-emerald canvas (#0A1F16 → #071812) layered with two radial spotlights (emerald + gold), asymmetric concentric gold rings, vertical "temple pillar" seams and paper grain
- Header: eyebrow "Voices of Our Guests" + big serif "Stories From / Our Table" (gold italic) + ornate divider + subtitle
- **Rating strip**: Google logo + 5 stars + 5.0 rating + total guests + BadgeCheck "5-Star Experience". Pill on desktop, stacked card on mobile.
- **Featured carousel card** with:
  - Corner flourishes (SVG ornate ligature in 4 corners)
  - Animated star row (staggered spring-in)
  - Editorial serif blockquote with gold curly-quote marks
  - Avatar with gradient accent + BadgeCheck ring
  - Local Guide badge, review count, photo count
  - Google 'G' logo pill on the right
  - Autoplay progress bar (6.5s cadence) that pauses on hover
  - Desktop pill arrows floating on either side
  - Mobile compact prev/next + counter row
  - Dots pagination
- **Marquee band** — all 5 testimonials duplicated and continuously scrolling left in a 48s loop. Pauses on hover, respects `prefers-reduced-motion`. Each mini-card is clickable → jumps the featured to that testimonial.
- **CTA footer**: "Review Us on Google" pill with Google glyph, opens Google search in new tab

### Testimonials data (from user's screenshots)
- Chandrika Dinni (Local Guide · 22 reviews · 16 photos · 2mo)
- Savi Raj Shetty (1 review · 2 photos · 5mo)
- Murali Ram (Local Guide · 14 reviews · 2 photos · 2mo)
- Surya V (Local Guide · 10 reviews · 8 photos · 4mo)
- Rahul Chiplunkar (Local Guide · 12 reviews · 18 photos · 5mo)

### data-testids
`testimonials-section`, `testimonials-eyebrow`, `testimonials-stats`, `featured-testimonial-{id}`, `testimonial-autoplay-progress`, `testimonial-prev-btn`, `testimonial-next-btn`, `testimonial-mobile-prev-btn`, `testimonial-mobile-next-btn`, `testimonial-dot-{i}`, `testimonial-marquee`, `testimonial-mini-{i}`, `review-us-google-btn`

## Files Added / Modified
- **NEW** `components/sections/Testimonials.tsx`
- **NEW** `data/testimonials.ts`
- `app/page.tsx` — wired Testimonials after Gallery

## Prior work (iteration 2 — Menu section)
- Fixed layout shift, images fit landscape aspect, added autoplay slideshow, fullscreen, cinematic mode
- html + body overflow lock, Escape key capture-phase listener, fullscreen hidden on mobile

## Prioritized Backlog
- P1: Optional landscape-lock prompt on mobile for menu
- P1: Menu — real dish list view with search + filters
- P2: Testimonials — Instagram embed row / video testimonials
- P2: PDF export of menu
- P2: Kannada / English language toggle

## Testing Notes
Frontend-only static Next.js app. Menu iteration 2 fixes previously verified. Testimonials to be verified by testing agent.
