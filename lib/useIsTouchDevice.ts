"use client";

import { useEffect, useState } from "react";

/**
 * Returns true if the primary input device is touch (i.e. no fine hover).
 * Used to skip mouse-only UX like auto-hide-on-idle and keyboard hints.
 */
export function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    const update = () => setIsTouch(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  return isTouch;
}
