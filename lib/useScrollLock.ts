"use client";

import { useEffect } from "react";

/**
 * Module-level, reference-counted lock shared by every consumer of this hook.
 *
 * ROOT CAUSE OF THE FREEZE:
 * SignatureDishes.tsx and SignatureCollectionMobile.tsx each ran their OWN
 * independent "capture body.style.overflow, set to hidden, restore on
 * cleanup" effect. When both are active at once (opening the mobile sheet
 * triggers both), whichever effect's cleanup runs LAST captured "hidden"
 * as its "previous" value (because the other effect had already locked the
 * body before it ran) and then restored the body to "hidden" on close —
 * permanently freezing scroll instead of releasing it. This is a classic
 * race condition with duplicate lock/unlock pairs, not a one-off typo.
 *
 * FIX: a single shared counter. Only the first lock call in the whole app
 * records the true original value; only the last matching unlock restores
 * it. Any number of components (mobile sheet, desktop modal, dish detail
 * sheet, a "belt & braces" parent lock, etc.) can now call this safely,
 * in any mount/unmount order, without ever stomping on each other.
 */
let lockCount = 0;
let originalOverflow = "";
let originalPaddingRight = "";

function lockScroll() {
  if (lockCount === 0) {
    originalOverflow = document.body.style.overflow;
    originalPaddingRight = document.body.style.paddingRight;

    // Compensate for the scrollbar disappearing (desktop) so the page
    // doesn't visibly shift width when it's hidden. No-op on mobile,
    // which has no reserved scrollbar gutter — no visual change there.
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
  }
  lockCount += 1;
}

function unlockScroll() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = originalOverflow;
    document.body.style.paddingRight = originalPaddingRight;
  }
}

/**
 * Locks page scroll while `active` is true. Safe to call from several
 * overlays/components at once — locks are reference-counted, so scroll is
 * only released once every caller that locked it has also released it.
 */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    lockScroll();
    return unlockScroll;
  }, [active]);
}
