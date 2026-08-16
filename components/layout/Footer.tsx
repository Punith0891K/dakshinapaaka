"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Star,
  ArrowUpRight,
  ArrowUp,
  Utensils,
  BookOpen,
  Camera,
  Sparkles,
  Copy,
  Check,
} from "lucide-react";

// lucide-react (installed version) doesn't export an Instagram icon, so we
// hand-draw one locally. Keeps stroke + size props identical to Lucide's API.
function InstagramIcon({ size = 16, strokeWidth = 1.8, className = "" }: {
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

// lucide-react doesn't export a WhatsApp glyph either — hand-drawn to match
// the InstagramIcon above (filled, single-color, same size API).
function WhatsAppIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.868-2.03-.967-.273-.099-.472-.148-.67.15-.198.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.001 2C6.478 2 2 6.478 2 12c0 1.94.55 3.75 1.5 5.29L2 22l4.86-1.47A9.95 9.95 0 0 0 12 22c5.523 0 10-4.478 10-10S17.523 2 12.001 2zm0 18.2a8.17 8.17 0 0 1-4.17-1.14l-.3-.18-3.09.94.95-3.01-.2-.31A8.19 8.19 0 1 1 20.2 12a8.2 8.2 0 0 1-8.2 8.2z" />
    </svg>
  );
}

const CONTACT = {
  email: "Vishnubhavan2023@gmail.com",
  phone: "+91 72044 88774",
  phoneHref: "tel:+917204488774",
  whatsappHref:
    "https://wa.me/917204488774?text=" +
    encodeURIComponent("Hi Dakshina Paaka! I'd like to know more."),
  location: "https://maps.app.goo.gl/Ti1EHVyQyUFZWZCM9",
  // Coordinates for the Google Maps embed. Sourced from the shared maps
  // shortlink; tuned for the Mysuru location.
  mapEmbed:
    "https://www.google.com/maps?q=Dakshina+Paaka+Mysuru&hl=en&z=15&output=embed",
  instagram: "https://www.instagram.com/dakshina_paaka/?hl=en",
  instagramHandle: "@dakshina_paaka",
  address: "Mysuru, Karnataka",
};

const QUICK_LINKS = [
  { label: "Signature Dishes", href: "#signature-dishes", icon: Utensils },
  { label: "Menu", href: "#menu", icon: BookOpen },
  { label: "Gallery", href: "#gallery", icon: Camera },
  { label: "Testimonials", href: "#testimonials", icon: Star },
];

const HOURS = [
  { day: "Mon – Fri", time: "7:30 AM – 10:30 PM" },
  { day: "Saturday", time: "7:30 AM – 11:00 PM" },
  { day: "Sunday", time: "7:00 AM – 11:00 PM" },
];

// ---- Live open/closed status, derived from HOURS above ----
// The "Open Now" badges used to be a hardcoded claim regardless of the
// actual time. This computes it for real, client-side, against today's
// slot, and is re-checked every minute.
type OpenStatus = { isOpen: boolean; label: string };

function parseClockToMinutes(clock: string): number {
  const match = clock.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return 0;
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const meridiem = match[3].toUpperCase();
  if (meridiem === "PM" && hours !== 12) hours += 12;
  if (meridiem === "AM" && hours === 12) hours = 0;
  return hours * 60 + minutes;
}

function minutesToClock12(total: number): string {
  const h = Math.floor(total / 60) % 24;
  const m = total % 60;
  const displayHour = ((h + 11) % 12) + 1;
  const meridiem = h >= 12 ? "PM" : "AM";
  return `${displayHour}:${m.toString().padStart(2, "0")} ${meridiem}`;
}

function minutesToClock24(total: number): string {
  const h = Math.floor(total / 60) % 24;
  const m = total % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

function getOpenStatus(now: Date): OpenStatus {
  const day = now.getDay(); // 0 = Sunday … 6 = Saturday
  const todayHours =
    day === 0
      ? HOURS.find((h) => h.day === "Sunday")
      : day === 6
      ? HOURS.find((h) => h.day === "Saturday")
      : HOURS.find((h) => h.day === "Mon – Fri");

  if (!todayHours) return { isOpen: false, label: "See Hours" };

  const [openStr, closeStr] = todayHours.time.split("–").map((s) => s.trim());
  const openMin = parseClockToMinutes(openStr);
  const closeMin = parseClockToMinutes(closeStr);
  const nowMin = now.getHours() * 60 + now.getMinutes();

  if (nowMin < openMin) {
    return { isOpen: false, label: `Opens ${minutesToClock12(openMin)}` };
  }
  if (nowMin >= closeMin) {
    return { isOpen: false, label: "Closed Now" };
  }
  if (closeMin - nowMin <= 30) {
    return { isOpen: true, label: "Closing Soon" };
  }
  return { isOpen: true, label: "Open Now" };
}

export default function Footer() {
  const reduceMotion = useReducedMotion();
  const year = new Date().getFullYear();

  const [status, setStatus] = useState<OpenStatus | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Recompute the real open/closed status on mount and every minute.
  useEffect(() => {
    const update = () => setStatus(getOpenStatus(new Date()));
    update();
    const t = setInterval(update, 60000);
    return () => clearInterval(t);
  }, []);

  // Reveal the back-to-top button once the visitor has scrolled a screen
  // or so down the page.
  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleCopy = useCallback(async (field: string, value: string) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
        setCopiedField(field);
        setTimeout(() => setCopiedField((f) => (f === field ? null : f)), 1800);
      }
    } catch {
      // Clipboard permission denied or unavailable — fail quietly.
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }, [reduceMotion]);

  // Restaurant structured data — reuses the same address, hours and rating
  // already shown on the page, so search engines can surface it directly.
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Dakshina Paaka",
    servesCuisine: "South Indian",
    telephone: CONTACT.phone,
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mysuru",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.2,
      reviewCount: 1717,
    },
    openingHoursSpecification: HOURS.map((h) => {
      const [openStr, closeStr] = h.time.split("–").map((s) => s.trim());
      const dayOfWeek =
        h.day === "Mon – Fri"
          ? ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
          : [h.day];
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek,
        opens: minutesToClock24(parseClockToMinutes(openStr)),
        closes: minutesToClock24(parseClockToMinutes(closeStr)),
      };
    }),
    sameAs: [CONTACT.instagram, CONTACT.location],
  };

  return (
    <footer
      id="footer"
      data-testid="footer"
      className="relative isolate overflow-hidden bg-[#050E0A] pt-16 pb-8 text-[#EFE5CB] sm:pt-20"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ================== BACKGROUND ================== */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Base */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F17] via-[#050E0A] to-[#020604]" />

        {/* Emerald spotlight top */}
        <motion.div
          className="absolute -top-40 left-1/2 h-[720px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(15,91,67,0.42)_0%,rgba(15,91,67,0)_60%)] will-change-[opacity] [transform:translateZ(0)]"
          animate={reduceMotion ? undefined : { opacity: [0.6, 0.85, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Warm gold pool bottom-left */}
        <div className="absolute -bottom-32 -left-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(200,164,77,0.22)_0%,transparent_60%)]" />
        <div className="absolute -bottom-32 -right-32 h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,rgba(226,196,110,0.16)_0%,transparent_65%)]" />

        {/* Gold rings */}
        <div className="absolute -left-40 top-20 hidden h-[520px] w-[520px] rounded-full border border-[#C8A44D]/12 sm:block" />
        <div className="absolute -left-24 top-40 hidden h-[380px] w-[380px] rounded-full border border-[#C8A44D]/08 sm:block" />
        <div className="absolute -right-40 bottom-24 hidden h-[520px] w-[520px] rounded-full border border-[#C8A44D]/12 sm:block" />

        {/* Temple silhouette (CSS-drawn — a stylised triple peak) */}
        <svg
          aria-hidden
          viewBox="0 0 1440 240"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-16 h-[240px] w-full text-[#0A1F16]/80"
        >
          <defs>
            <linearGradient id="temple-fade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0A1F16" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#0A1F16" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 240 L0 200 L120 200 L140 170 L180 200 L200 130 L220 170 L240 200 L360 200 L390 160 L420 200 L440 90 L460 200 L580 200 L620 150 L650 200 L680 60 L710 200 L830 200 L860 150 L890 200 L920 100 L950 200 L1070 200 L1090 165 L1120 200 L1160 130 L1200 200 L1300 200 L1330 165 L1360 200 L1440 200 L1440 240 Z"
            fill="url(#temple-fade)"
          />
          {/* Kalasha finials */}
          {[
            [200, 128],
            [440, 88],
            [680, 58],
            [920, 98],
            [1160, 128],
          ].map(([x, y]) => (
            <g key={`${x}-${y}`} fill="#C8A44D" opacity="0.55">
              <circle cx={x} cy={y - 6} r="2.5" />
              <path d={`M${x - 3} ${y - 2} L${x + 3} ${y - 2} L${x} ${y - 10} Z`} />
            </g>
          ))}
        </svg>

        {/* Temple pillar seams */}
        <div className="absolute inset-y-0 left-[8%] hidden w-px bg-gradient-to-b from-transparent via-[#C8A44D]/18 to-transparent sm:block" />
        <div className="absolute inset-y-0 right-[8%] hidden w-px bg-gradient-to-b from-transparent via-[#C8A44D]/18 to-transparent sm:block" />

        {/* Paper grain */}
        <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay [background-image:radial-gradient(circle_at_22%_25%,rgba(240,220,170,0.65)_1px,transparent_1.6px),radial-gradient(circle_at_74%_46%,rgba(240,220,170,0.5)_1px,transparent_1.6px),radial-gradient(circle_at_42%_82%,rgba(240,220,170,0.55)_1px,transparent_1.6px)] [background-size:32px_32px]" />

        {/* Top blend from testimonials */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0B1F17] to-transparent" />
      </div>

      {/* ================== TOP ORNAMENTAL DIVIDER ================== */}
      <div className="relative z-10 mx-auto mb-14 flex max-w-[1400px] items-center justify-center gap-5 px-5 sm:mb-20 sm:px-8">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#C8A44D]/60" />
        <div className="relative">
          <motion.span
            aria-hidden
            className="absolute inset-0 -m-3 rounded-full border border-[#C8A44D]/40"
            animate={reduceMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          />
          <span className="relative inline-flex items-center justify-center rounded-full border border-[#C8A44D]/50 bg-[#0B1F17] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.4em] text-[#E9CE85]">
            <Sparkles size={12} className="mr-2 text-[#E9CE85]" />
            Come Dine With Us
          </span>
        </div>
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#C8A44D]/60" />
      </div>

      {/* ================== QUICK TRUST STRIP ================== */}
      {/* Sits in what used to be a dead stretch of background between the
          divider and the map card — gives that space a job instead of
          leaving it empty, and doubles as another honest, correctly-sourced
          nudge toward calling in. */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        data-testid="footer-trust-strip"
        className="relative z-10 mx-auto mb-16 flex max-w-[1400px] flex-wrap items-center justify-center gap-x-8 gap-y-4 px-5 text-center sm:mb-20 sm:gap-x-12 sm:px-8 lg:px-12"
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[0, 1, 2, 3].map((i) => (
              <Star key={i} size={14} className="fill-[#E9CE85] text-[#E9CE85]" strokeWidth={1.5} />
            ))}
            <div className="relative">
              <Star size={14} className="text-white/20" strokeWidth={1.5} />
              <span className="absolute inset-0 overflow-hidden" style={{ width: "20%" }}>
                <Star size={14} className="fill-[#E9CE85] text-[#E9CE85]" strokeWidth={1.5} />
              </span>
            </div>
          </div>
          <span className="text-[12px] tracking-wide text-[#D4CFB8]/85">
            <strong className="font-serif text-[#F5EFDE]">4.2</strong> on Google
          </span>
        </div>

        <span className="hidden h-4 w-px bg-[#C8A44D]/25 sm:block" />

        <span className="text-[12px] tracking-wide text-[#D4CFB8]/85">
          <strong className="font-serif text-[#F5EFDE]">1,700+</strong> Google reviews
        </span>

        <span className="hidden h-4 w-px bg-[#C8A44D]/25 sm:block" />

        <a
          href={CONTACT.phoneHref}
          data-testid="footer-trust-strip-call"
          className="group inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#E9CE85] transition-colors duration-300 hover:text-[#F4D06F]"
        >
          <Phone size={13} strokeWidth={1.8} />
          Call Now
          <ArrowUpRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5" />
        </a>
      </motion.div>

      {/* ================== LIVE MAP PREVIEW ================== */}
      <div className="relative z-10 mx-auto mb-16 max-w-[1400px] px-5 sm:mb-20 sm:px-8 lg:px-12">
        <motion.a
          href={CONTACT.location}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="footer-map-card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          whileHover={reduceMotion ? undefined : { y: -3 }}
          className="group relative block overflow-hidden rounded-[26px] border border-[#C8A44D]/30 bg-[#0A1712]/85 shadow-[0_28px_70px_rgba(0,0,0,0.45)] backdrop-blur-md sm:rounded-[32px]"
        >
          {/* Map iframe — non-interactive so the outer anchor stays clickable */}
          <div className="relative h-[240px] w-full sm:h-[300px] lg:h-[340px]">
            <iframe
              title="Dakshina Paaka on Google Maps"
              src={CONTACT.mapEmbed}
              className="pointer-events-none absolute inset-0 h-full w-full grayscale-[.35] contrast-[1.05] saturate-[1.15] transition-all duration-700 group-hover:grayscale-0 group-hover:contrast-100"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              aria-hidden
            />

            {/* Overlay veil to keep the map on-brand + readable */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A1712]/85 via-[#0A1712]/15 to-transparent" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0A1712]/70 via-transparent to-transparent sm:via-[#0A1712]/0 sm:to-transparent" />

            {/* Pin animation */}
            <motion.div
              className="pointer-events-none absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2"
              animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="relative flex h-14 w-14 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C8A44D]/40" />
                <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#E9CE85] bg-[#0A1712] text-[#E9CE85] shadow-[0_10px_28px_rgba(200,164,77,0.45)]">
                  <MapPin size={20} strokeWidth={2.2} />
                </span>
              </span>
              <span
                aria-hidden
                className="mx-auto mt-1 block h-1.5 w-1.5 rounded-full bg-[#C8A44D]/80 shadow-[0_0_10px_rgba(200,164,77,0.7)]"
              />
            </motion.div>

            {/* Copy */}
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-7 sm:py-6 lg:px-9 lg:py-8">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#E9CE85]">
                  Find Us Here
                </p>
                <h4 className="mt-1.5 font-serif text-[22px] leading-tight text-[#F5EFDE] sm:text-[26px] lg:text-[30px]">
                  Dakshina Paaka, Mysuru
                </h4>
                <p className="mt-1 text-[12px] text-[#D4CFB8]/75 sm:text-[13px]">
                  Karnataka, India · {status?.label ?? "Open Now"}
                </p>
              </div>

              <span className="inline-flex w-max items-center gap-2 rounded-full border border-[#C8A44D]/50 bg-[#0F5B43]/45 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#F4D06F] backdrop-blur-md transition-all duration-300 group-hover:-translate-y-[1px] group-hover:border-[#C8A44D] group-hover:bg-[#0F5B43]/80">
                Open in Google Maps
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </span>
            </div>

            {/* Gold hairline frame */}
            <div className="pointer-events-none absolute inset-2 rounded-[22px] ring-1 ring-inset ring-[#C8A44D]/25 sm:inset-3 sm:rounded-[28px]" />
          </div>
        </motion.a>
      </div>

      {/* ================== CONTENT GRID ================== */}
      <div className="relative z-10 mx-auto grid max-w-[1400px] gap-14 px-5 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-12 lg:px-12">
        {/* ------ BRAND ------ */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.42em] text-[#E9CE85]">
              Est. 2024 · Mysuru
            </p>
            <h3 className="font-serif text-[38px] leading-[0.95] tracking-[-0.02em] text-[#F5EFDE] sm:text-[46px]">
              Dakshina
              <br />
              <span className="italic text-[#E9CE85]">Paaka</span>
            </h3>

            <div className="mt-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[#C8A44D]" />
              <span className="text-[10px] uppercase tracking-[0.32em] text-[#D4CFB8]/70">
                Authentic South Indian Cuisine
              </span>
            </div>

            <p className="mt-6 max-w-md text-[14.5px] leading-7 text-[#D4CFB8]/85">
              A love letter to the flavours of the South — served in a warm, elegant
              space where every plate honours tradition and every guest feels at home.
            </p>

            {/* Rating pill */}
            <a
              href={CONTACT.location}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-google-rating"
              className="group mt-7 inline-flex items-center gap-3 rounded-full border border-[#C8A44D]/40 bg-[#0F5B43]/25 px-5 py-2.5 backdrop-blur-md transition-all duration-300 hover:-translate-y-[1px] hover:border-[#C8A44D] hover:bg-[#0F5B43]/40"
            >
              <div className="flex items-center gap-0.5">
                {[0, 1, 2, 3].map((i) => (
                  <Star
                    key={i}
                    size={13}
                    className="fill-[#E9CE85] text-[#E9CE85]"
                    strokeWidth={1.5}
                  />
                ))}
                <div className="relative">
                  <Star size={13} className="text-white/25" strokeWidth={1.5} />
                  <span className="absolute inset-0 overflow-hidden" style={{ width: "20%" }}>
                    <Star size={13} className="fill-[#E9CE85] text-[#E9CE85]" strokeWidth={1.5} />
                  </span>
                </div>
              </div>
              <span className="font-serif text-sm text-[#F5EFDE]">4.2</span>
              <span className="text-[10px] uppercase tracking-[0.28em] text-[#D4CFB8]/70">
                on Google
              </span>
              <ArrowUpRight
                size={14}
                className="text-[#E9CE85] opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
              />
            </a>
          </motion.div>
        </div>

        {/* ------ QUICK LINKS ------ */}
        <div>
          <FooterHeading>Explore</FooterHeading>
          <ul className="mt-6 space-y-3.5">
            {QUICK_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  data-testid={`footer-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className="group inline-flex items-center gap-3 text-sm text-[#D4CFB8]/85 transition-colors duration-300 hover:text-[#F5EFDE]"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#C8A44D]/25 bg-white/[0.03] text-[#E9CE85] transition-all duration-300 group-hover:border-[#C8A44D]/60 group-hover:bg-[#0F5B43]/25 group-hover:text-[#F4D06F]">
                    <link.icon size={13} strokeWidth={1.8} />
                  </span>
                  <span className="border-b border-transparent transition-all duration-300 group-hover:border-[#C8A44D]/40">
                    {link.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ------ OPENING HOURS ------ */}
        <div>
          <FooterHeading>Opening Hours</FooterHeading>
          <div className="mt-6 space-y-3">
            {HOURS.map((h) => (
              <div
                key={h.day}
                className="flex items-center justify-between gap-2 border-b border-dashed border-[#C8A44D]/15 pb-2.5 text-sm last:border-0"
              >
                <span className="text-[#D4CFB8]/75">{h.day}</span>
                <span className="font-mono text-[12px] tracking-tight text-[#F5EFDE]">
                  {h.time}
                </span>
              </div>
            ))}
          </div>

          <div
            data-testid="footer-open-status"
            className={`mt-6 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 ${
              status?.isOpen
                ? "border-[#C8A44D]/30 bg-[#C8A44D]/8"
                : "border-white/15 bg-white/[0.03]"
            }`}
          >
            <Clock size={12} className={status?.isOpen ? "text-[#E9CE85]" : "text-[#D4CFB8]/60"} />
            <span
              className={`text-[10px] font-semibold uppercase tracking-[0.28em] ${
                status?.isOpen ? "text-[#E9CE85]" : "text-[#D4CFB8]/70"
              }`}
            >
              {status?.label ?? "Open Now"}
            </span>
            <span className="relative flex h-1.5 w-1.5">
              {status?.isOpen && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7BE087] opacity-75" />
              )}
              <span
                className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
                  status?.isOpen ? "bg-[#7BE087]" : "bg-[#D4CFB8]/50"
                }`}
              />
            </span>
          </div>
        </div>

        {/* ------ CONTACT ------ */}
        <div>
          <FooterHeading>Get in Touch</FooterHeading>
          <div className="mt-6 space-y-3">
            <ContactRow
              icon={<MapPin size={15} strokeWidth={1.8} />}
              label="Visit us"
              value={CONTACT.address}
              href={CONTACT.location}
              testId="footer-contact-location"
              external
            />
            <ContactRow
              icon={<Phone size={15} strokeWidth={1.8} />}
              label="Call Us"
              value={CONTACT.phone}
              href={CONTACT.phoneHref}
              testId="footer-contact-phone"
              copyValue={CONTACT.phone}
              copied={copiedField === "phone"}
              onCopy={() => handleCopy("phone", CONTACT.phone)}
            />
            <ContactRow
              icon={<WhatsAppIcon size={15} />}
              label="WhatsApp"
              value="Chat with us"
              href={CONTACT.whatsappHref}
              testId="footer-contact-whatsapp"
              external
            />
            <ContactRow
              icon={<Mail size={15} strokeWidth={1.8} />}
              label="Email"
              value={CONTACT.email}
              href={`mailto:${CONTACT.email}`}
              testId="footer-contact-email"
              copyValue={CONTACT.email}
              copied={copiedField === "email"}
              onCopy={() => handleCopy("email", CONTACT.email)}
            />
            <ContactRow
              icon={<InstagramIcon size={15} strokeWidth={1.8} />}
              label="Instagram"
              value={CONTACT.instagramHandle}
              href={CONTACT.instagram}
              testId="footer-contact-instagram"
              external
            />
          </div>

          {/* Call + WhatsApp CTAs */}
          <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
            <a
              href={CONTACT.phoneHref}
              data-testid="footer-reserve-btn"
              className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[#E9CE85] bg-[#C8A44D] px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#0A1712] shadow-[0_16px_35px_rgba(200,164,77,0.28)] transition-all duration-300 hover:-translate-y-[1px] hover:bg-[#E9CE85] hover:shadow-[0_22px_45px_rgba(200,164,77,0.4)]"
            >
              <Phone size={14} strokeWidth={2} />
              Call Now
            </a>
            <a
              href={CONTACT.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="footer-whatsapp-btn"
              className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[#25D366]/50 bg-[#25D366]/10 px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7BE087] transition-all duration-300 hover:-translate-y-[1px] hover:bg-[#25D366] hover:text-[#04240F]"
            >
              <WhatsAppIcon size={14} />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* ================== BOTTOM BAR ================== */}
      <div className="relative z-10 mx-auto mt-20 max-w-[1400px] px-5 sm:mt-24 sm:px-8 lg:px-12">
        <div className="mb-6 flex items-center gap-4">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C8A44D]/25 to-transparent" />
          <span className="text-[#C8A44D]/70">✦</span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[#C8A44D]/25 to-transparent" />
        </div>

        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="text-[11px] tracking-wide text-[#D4CFB8]/60">
            © {year} Dakshina Paaka. All rights reserved.
          </p>
          <p className="flex items-center gap-2 text-[11px] tracking-wide text-[#D4CFB8]/60">
            Crafted with
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#C8A44D]/20 text-[#E9CE85]">
              ❤
            </span>
            in Mysuru
          </p>
          <div className="flex items-center gap-3">
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              data-testid="footer-social-instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C8A44D]/30 bg-white/[0.03] text-[#E9CE85] transition-all duration-300 hover:-translate-y-[1px] hover:border-[#C8A44D] hover:bg-[#C8A44D] hover:text-[#0A1712]"
            >
              <InstagramIcon size={14} />
            </a>
            <a
              href={CONTACT.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              data-testid="footer-social-whatsapp"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C8A44D]/30 bg-white/[0.03] text-[#E9CE85] transition-all duration-300 hover:-translate-y-[1px] hover:border-[#25D366] hover:bg-[#25D366] hover:text-[#04240F]"
            >
              <WhatsAppIcon size={14} />
            </a>
            <a
              href={CONTACT.location}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Google Maps"
              data-testid="footer-social-maps"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C8A44D]/30 bg-white/[0.03] text-[#E9CE85] transition-all duration-300 hover:-translate-y-[1px] hover:border-[#C8A44D] hover:bg-[#C8A44D] hover:text-[#0A1712]"
            >
              <MapPin size={14} />
            </a>
            <a
              href={CONTACT.phoneHref}
              aria-label="Call"
              data-testid="footer-social-phone"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C8A44D]/30 bg-white/[0.03] text-[#E9CE85] transition-all duration-300 hover:-translate-y-[1px] hover:border-[#C8A44D] hover:bg-[#C8A44D] hover:text-[#0A1712]"
            >
              <Phone size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Big brand watermark */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 -bottom-24 z-0 select-none text-center">
        <p className="whitespace-nowrap font-serif text-[clamp(6rem,18vw,16rem)] leading-none tracking-tight text-[#C8A44D]/[0.04]">
          Dakshina Paaka
        </p>
      </div>

      {/* ================== BACK TO TOP ================== */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            data-testid="footer-back-to-top"
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.9 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            whileHover={reduceMotion ? undefined : { y: -3 }}
            className="fixed bottom-6 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-[#C8A44D]/50 bg-[#0A1712]/95 text-[#E9CE85] shadow-[0_16px_36px_rgba(0,0,0,0.45)] backdrop-blur-md transition-colors duration-300 hover:border-[#C8A44D] hover:bg-[#C8A44D] hover:text-[#0A1712] sm:bottom-8 sm:right-8"
          >
            <ArrowUp size={18} strokeWidth={2.2} />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}

/* -------------------------------------------------------------------- */

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-1 w-1 rotate-45 bg-[#C8A44D]" />
      <h4 className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#E9CE85]">
        {children}
      </h4>
      <span className="h-px flex-1 bg-gradient-to-r from-[#C8A44D]/40 to-transparent" />
    </div>
  );
}

interface ContactRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  testId?: string;
  external?: boolean;
  /** When set, renders a separate copy button beside the link (kept out of
   *  the <a> itself — nesting a <button> inside an <a> is invalid HTML). */
  copyValue?: string;
  copied?: boolean;
  onCopy?: () => void;
}

function ContactRow({
  icon,
  label,
  value,
  href,
  testId,
  external,
  copyValue,
  copied,
  onCopy,
}: ContactRowProps) {
  return (
    <div className="group flex items-start gap-1 rounded-xl border border-transparent transition-all duration-300 hover:border-[#C8A44D]/25 hover:bg-white/[0.03]">
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        data-testid={testId}
        className="flex min-w-0 flex-1 items-start gap-3.5 p-2"
      >
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#C8A44D]/30 bg-[#0F5B43]/20 text-[#E9CE85] transition-all duration-300 group-hover:border-[#C8A44D] group-hover:bg-[#0F5B43]/45 group-hover:text-[#F4D06F]">
          {icon}
        </span>
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#D4CFB8]/60">
            {label}
          </span>
          <span className="mt-0.5 truncate text-[13px] text-[#F5EFDE] group-hover:text-[#F4D06F]">
            {value}
          </span>
        </div>
        {!copyValue && (
          <ArrowUpRight
            size={14}
            className="mt-2 shrink-0 text-[#E9CE85]/40 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
          />
        )}
      </a>
      {copyValue && onCopy && (
        <button
          type="button"
          onClick={onCopy}
          aria-label={copied ? `${label} copied` : `Copy ${label.toLowerCase()}`}
          data-testid={testId ? `${testId}-copy` : undefined}
          className="mr-1 mt-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#E9CE85]/40 opacity-0 transition-all duration-300 hover:text-[#F4D06F] group-hover:opacity-100"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
        </button>
      )}
    </div>
  );
}