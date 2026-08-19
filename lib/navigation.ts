import type { LucideIcon } from "lucide-react";
import { Home, Leaf, UtensilsCrossed, Images, Quote, Phone } from "lucide-react";

export type NavItem = {
  name: string;
  href: string;
  /** Matches the `id` attribute of the corresponding <section>. Empty string = hero/top of page. */
  sectionId: string;
  icon: LucideIcon;
};

// Single source of truth for nav links — name, href, section id, AND icon.
// Desktop nav ignores `icon`; MobileMenu uses it. Adding "Testimonials" here
// is the only change needed for it to show up in both navbars.
export const navItems: NavItem[] = [
  { name: "Home", href: "#", sectionId: "", icon: Home },
  { name: "About", href: "#about", sectionId: "about", icon: Leaf },
  { name: "Menu", href: "#menu", sectionId: "menu", icon: UtensilsCrossed },
  { name: "Gallery", href: "#gallery", sectionId: "gallery", icon: Images },
  { name: "Testimonials", href: "#testimonials", sectionId: "testimonials", icon: Quote },
  { name: "Contact", href: "#contact", sectionId: "contact", icon: Phone },
];

// Fixed header heights, kept in one place so scroll-offset math can't drift
// from the actual Tailwind classes on the header.
export const NAV_HEIGHT_SCROLLED = 72;
export const NAV_HEIGHT_MOBILE_EXPANDED = 92;
export const NAV_HEIGHT_DESKTOP_EXPANDED = 104;

/**
 * Smooth-scrolls to a section, offsetting for the fixed navbar so the
 * section heading doesn't end up hidden underneath it.
 *
 * `sectionId === ""` means "Home" — scrolls to the very top. Handled
 * explicitly rather than relying on next/link's default behavior for an
 * href of "#", because Next.js intentionally does NOT scroll on a
 * hash-only Link click.
 */
export function scrollToSection(
  sectionId: string,
  navHeight: number,
  behavior: ScrollBehavior = "smooth"
) {
  if (!sectionId) {
    window.scrollTo({ top: 0, behavior });
    return;
  }

  const el = document.getElementById(sectionId);

  if (!el) {
    // Don't fail silently — fall back to a native hash jump so the click
    // still does *something*, and warn in dev so a missing/renamed
    // section id (e.g. "contact" vs "contact-us", or a section that
    // hasn't been built yet) is easy to spot in the console.
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[scrollToSection] No element with id="${sectionId}" was found on the page.`);
    }
    window.location.hash = sectionId;
    return;
  }

  const top = el.getBoundingClientRect().top + window.scrollY - navHeight - 16;
  window.scrollTo({ top, behavior });
}
