# Dakshinapaaka — Product Requirements Document

## Latest Problem Statement
"add footer, beautiful bg matching website, contact info: email Vishnubhavan2023@gmail.com, phone 7204488774, google-maps location, instagram @dakshina_paaka"

## Stack
Next.js 16.2.10 (Turbopack, React Compiler on), React 19, Tailwind CSS 4, Framer Motion 12, lucide-react.

## Page structure (final)
Navbar → Hero → About → SignatureDishes → Menu → Gallery → Testimonials → FloatingMenuButton → **Footer (NEW)**

## What's Been Implemented — 2026-01-08 (iteration 7)

### Footer — grand finale of the site
- Deep emerald canvas (`#0B1F17` → `#050E0A` → `#020604`) blending seamlessly with Testimonials
- Layered atmospherics: pulsing emerald spotlight, warm gold pools, gold rings, temple pillar seams, paper grain, a **hand-drawn SVG temple silhouette with 5 golden kalasha finials**, and a giant faint "Dakshina Paaka" watermark below
- **"Come Dine With Us"** ornate pill with rotating gold ring at the top
- **Brand block**: "Dakshina Paaka" 46px serif with italic gold "Paaka", eyebrow "Est. 2024 · Mysuru", tagline, and a "5.0 on Google" pill (opens Maps)
- **Explore** quick links: Signature Dishes / Menu / Gallery / Testimonials — each with a lucide icon in a gold-ring chip
- **Opening Hours** grid with dashed dividers + monospaced times, plus an "Open Now" chip with a pulsing green dot
- **Get in Touch** contact cards (each an anchor):
  - Location → `https://maps.app.goo.gl/Ti1EHVyQyUFZWZCM9`
  - Reservations → `tel:+917204488774` (displayed as +91 72044 88774)
  - Email → `mailto:Vishnubhavan2023@gmail.com`
  - Instagram → `https://www.instagram.com/dakshina_paaka/?hl=en` (custom SVG icon since lucide-react in this repo doesn't export Instagram)
- **Reserve a Table** primary gold CTA (calls the reservation number)
- **Bottom bar**: © 2026 Dakshina Paaka + "Crafted with ❤ in Mysuru" + social icons (Instagram / Maps / Phone)
- Fully responsive: 4-column grid on desktop (`lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]`), single-column stack on mobile with generous touch targets

### data-testids
`footer`, `footer-google-rating`, `footer-link-signature-dishes`, `footer-link-menu`, `footer-link-gallery`, `footer-link-testimonials`, `footer-contact-location`, `footer-contact-phone`, `footer-contact-email`, `footer-contact-instagram`, `footer-reserve-btn`, `footer-social-instagram`, `footer-social-maps`, `footer-social-phone`

## Files Modified
- **NEW / REWRITTEN** `components/layout/Footer.tsx`
- `app/page.tsx` — wired Footer at the bottom (outside `<main>`)

## Prior iterations still live
- Testimonials (iteration 4)
- Signature dishes + DishDetailSheet enhancement (iteration 5-6)
- Menu modal fixes (iteration 3)
- Next.js `allowedDevOrigins` config (iteration 6, restoring hydration in preview)

## Prioritized Backlog
- P1: Newsletter subscription capture
- P1: Google Map embed thumbnail in Footer
- P2: Instagram feed row (live embeds)
- P2: Language toggle (English / Kannada)
- P2: PDF export of the menu

## Testing Notes
Static Next.js frontend. Screenshot-verified on 1440x900 and 390x844. Full testing agent verification below.
