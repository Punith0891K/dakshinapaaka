# Dakshinapaaka — Product Requirements Document

## Problem Statement
"I wanna improve and refine also add new features to the menu section and fix the bugs and optimization issues and refine for mobile too with the features"

## Stack
Next.js 16.2.10 (Turbopack), React 19, Tailwind CSS 4, Framer Motion 12, yet-another-react-lightbox, lucide-react. Static content site (no backend used for this iteration).

## Core Requirements (Menu Section — Jan 2026)
- Preserve the emerald + gold luxury theme
- Elegant book-flip preview that opens into a lightbox-style browser
- Full mobile parity with big tap targets, safe-area padding, sticky nav
- Fast, smooth image transitions and instant navigation
- Shareable, downloadable, category-jumpable menu experience

## What's Been Implemented — 2026-01-08
### Bug fixes
- Fixed image invisible bug on page change (removed racy imgLoaded state; simplified to native next/image)
- Auto-hide controls no longer flickers on touch (kept pinned on touch, only auto-hides on desktop)
- Escape / arrow key nav uses stable handlers and always resets to cover on close
- Modal reset: page returns to 0 on close so re-open starts on cover
- Book flip respects `prefers-reduced-motion` (fast hand-off instead of stuck animation)

### New menu features
- Category quick-jump chips (Breakfast / Meals / Dosa / Juices / Chinese / Mains)
- Web Share API share button with clipboard fallback + Copied toast
- Per-page image download button (desktop + mobile sticky bar)
- Double-tap-to-zoom on touch; click-to-zoom on desktop with hint badges
- Adjacent-page preload for instant next/prev navigation
- Keyboard shortcut `Z` opens the zoom lightbox
- Sticky bottom navigation bar on mobile with big Prev / Download / Next targets
- New `useIsTouchDevice` hook for touch-aware behaviour across the menu

### Mobile & performance refinements
- `next/image` `sizes` prop on menu image & thumbnails (correct srcset served)
- Compact thumbnail bar on mobile (52×74 vs 78×110 on desktop)
- Safe-area insets (`env(safe-area-inset-*)`) on modal padding + sticky nav
- Horizontal-dominant swipe detection with velocity threshold (no accidental page turns while scrolling)
- Reduced control padding + font sizes at <sm; header text scales down cleanly
- `dp-thumb-scroller` inline scrollbar-hide (works without touching tailwind config)
- Keyboard hint hidden on touch devices; only desktop sees `← → Z Esc` legend
- Accessible book: `role=button`, `tabIndex=0`, Enter/Space open, visible focus ring

### data-testids added
`explore-menu-btn`, `open-full-menu-mobile-btn`, `menu-book-open`, `menu-modal`, `menu-modal-backdrop`, `menu-close-btn`, `share-menu-btn`, `download-menu-btn`, `mobile-prev-btn`, `mobile-next-btn`, `mobile-download-btn`, `category-quickjump`, `category-chip-{label}`, `menu-viewer`, `menu-image-zoom-button`, `viewer-prev-btn`, `viewer-next-btn`, `page-counter`, `menu-thumbnail-bar`, `thumbnail-{i}`

## Files Modified / Added
- `components/sections/Menu.tsx` — testid on desktop CTA
- `components/menu/MenuBook.tsx` — reduced-motion, a11y, focus ring
- `components/menu/MenuModal.tsx` — REWRITTEN: category chips, share, download, sticky mobile nav, safe-area, touch-aware controls
- `components/menu/MenuViewer.tsx` — REWRITTEN: preload adjacent pages, double-tap zoom, zoom badges, better swipe, mobile bottom bar
- `components/menu/MenuShowcase.tsx` — testid on mobile CTA
- `components/menu/ThumbnailBar.tsx` — REWRITTEN: compact mobile size, sizes prop, scrollbar-hide
- `data/menu.ts` — added `category`, `highlights`, and `menuCategories` quick-jump map
- `lib/useIsTouchDevice.ts` — NEW touch detection hook
- `frontend/package.json` — proxy to run `next dev` on /app under existing supervisor

## Prioritized Backlog
- P1: Real dish-level list view with search + filter (veg/spice/price) alongside the flip-book
- P1: Menu page zoom/pan gesture directly (without lightbox) for a native feel
- P2: PDF export of the full menu (all pages)
- P2: Favorites / "I want to try" list persisted to localStorage
- P2: Multi-language toggle (English / Kannada) for the site chrome

## Testing Notes
Static content site — no backend endpoints touched. All flows verified via screenshot testing on 1440×900 (desktop) and 390×844 (mobile):
- Menu section renders correctly (both breakpoints)
- Explore Menu / Open Full Menu opens modal
- Category quick-jump advances viewer to correct page
- Image zoom lightbox opens on click / double-tap
- Mobile sticky Prev / Next / Download works
- Thumbnails scroll horizontally with active auto-centering
- Share button falls back to clipboard when Web Share API unavailable
