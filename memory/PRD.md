# Dakshinapaaka — Product Requirements Document

## Latest Problem Statement (iteration 8)
"Live Map Preview: Show a small embedded Google Map thumbnail next to the address ; refine signature collection modal with added animation, improvement ; fix gallery with utmost mobile and pc improvements and bug fixes"

## Stack
Next.js 16.2.10 (Turbopack, React Compiler on), React 19, Tailwind CSS 4, Framer Motion 12, lucide-react.

## What's Been Implemented — 2026-01-08 (iteration 8)

### Footer — Live Map Preview
- Full-width embedded Google Maps iframe card above the content grid (`data-testid="footer-map-card"`)
- Custom veils (dark radial to keep the card on-brand) with grayscale filter that fades to full colour on hover
- Central animated **gold pin** with pinging ring + drop shadow
- Overlaid copy: "Find Us Here" eyebrow, big serif "Dakshina Paaka, Mysuru", subtitle "Karnataka, India · Open Now"
- "Open in Google Maps" pill CTA that lights up on hover
- Gold hairline inset frame

### Signature Collection Modal — refined
- **Cards are now fully clickable** and open the `DishDetailSheet` in-place via shared `layoutId` transitions
- **Proper stagger animation** on entry (`staggerChildren: 0.07`, `delayChildren: 0.05`)
- **Motion.button** wrappers with `whileHover={{ y: -6 }}` spring
- **Meta chips** at the top-right of every card (prep time + spice level with icon)
- **Highlight chips** below the description (mini pill row)
- **View Details footer bar** with animated arrow-up-right button (rotates 45° + colour flip on hover)
- **Sheen sweep** on hover
- `data-testid="sig-modal-card-{id}"` on every card
- Category chip and badge stayed on brand
- Direct DishDetailSheet mount at end of modal so tapping a card feels seamless

### Gallery — bug fixes + improvements
- **BUG FIX** — arrows previously used `translate-x-6` / `-translate-x-6` which pushed them OUTSIDE the section container, causing potential horizontal overflow on some desktop widths. Now positioned with `left-2 lg:left-4` inset — never overflow.
- **Autoplay pauses on touch too** (added `onTouchStart` / `onTouchEnd` listeners alongside mouse-hover listeners)
- Existing kinetic title reveal, filter pill layoutId, mask-image scroller, drag-swipe, dots, counter, autoplay progress and lightbox are all still intact

### data-testids added / verified
`footer-map-card`, `sig-modal-card-{id}`

## Files Modified
- `components/layout/Footer.tsx` — added Live Map Preview card, imports iframe with veils + pin
- `components/ui/SignatureCollectionModal.tsx` — cards now motion.button (clickable), staggered container, layoutId shared image, meta chips, highlight chips, sheet integration
- `components/sections/Gallery.tsx` — arrows moved inside container, added touch listeners for autoplay pause

## Prior iterations still live
- Testimonials (iteration 4)
- Signature dishes + DishDetailSheet (iteration 5-6)
- Menu modal fixes (iteration 3)
- Footer base (iteration 7)
- Next.js allowedDevOrigins config (iteration 6)

## Prioritized Backlog
- P1: Newsletter signup capture in the footer
- P1: Menu — real dish list with search + filters
- P2: Instagram feed row above the footer
- P2: Language toggle (English / Kannada)
- P2: PDF export of the full menu

## Testing Notes
Enhancements verified via screenshots — footer map renders and animates, sig-modal cards open DishDetailSheet cleanly, Gallery arrows stay inside container. Testing agent verification below.
