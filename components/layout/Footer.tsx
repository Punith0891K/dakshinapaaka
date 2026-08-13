"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Star,
  ArrowUpRight,
  Utensils,
  BookOpen,
  Camera,
  Sparkles,
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

const CONTACT = {
  email: "Vishnubhavan2023@gmail.com",
  phone: "+91 72044 88774",
  phoneHref: "tel:+917204488774",
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

export default function Footer() {
  const reduceMotion = useReducedMotion();
  const year = new Date().getFullYear();

  return (
    <footer
      id="footer"
      data-testid="footer"
      className="relative isolate overflow-hidden bg-[#050E0A] pt-24 pb-8 text-[#EFE5CB] sm:pt-28"
    >
      {/* ================== BACKGROUND ================== */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Base */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F17] via-[#050E0A] to-[#020604]" />

        {/* Emerald spotlight top */}
        <motion.div
          className="absolute -top-40 left-1/2 h-[720px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(15,91,67,0.42)_0%,rgba(15,91,67,0)_60%)]"
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
                  Karnataka, India · Open Now
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
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star
                    key={i}
                    size={13}
                    className="fill-[#E9CE85] text-[#E9CE85]"
                    strokeWidth={1.5}
                  />
                ))}
              </div>
              <span className="font-serif text-sm text-[#F5EFDE]">5.0</span>
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

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#C8A44D]/30 bg-[#C8A44D]/8 px-3 py-1.5">
            <Clock size={12} className="text-[#E9CE85]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#E9CE85]">
              Open Now
            </span>
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7BE087] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#7BE087]" />
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
              label="Reservations"
              value={CONTACT.phone}
              href={CONTACT.phoneHref}
              testId="footer-contact-phone"
            />
            <ContactRow
              icon={<Mail size={15} strokeWidth={1.8} />}
              label="Email"
              value={CONTACT.email}
              href={`mailto:${CONTACT.email}`}
              testId="footer-contact-email"
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

          {/* Reservation CTA */}
          <a
            href={CONTACT.phoneHref}
            data-testid="footer-reserve-btn"
            className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#E9CE85] bg-[#C8A44D] px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#0A1712] shadow-[0_16px_35px_rgba(200,164,77,0.28)] transition-all duration-300 hover:-translate-y-[1px] hover:bg-[#E9CE85] hover:shadow-[0_22px_45px_rgba(200,164,77,0.4)]"
          >
            Reserve a Table
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </a>
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
}

function ContactRow({
  icon,
  label,
  value,
  href,
  testId,
  external,
}: ContactRowProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      data-testid={testId}
      className="group flex items-start gap-3.5 rounded-xl border border-transparent p-2 transition-all duration-300 hover:-translate-y-[1px] hover:border-[#C8A44D]/25 hover:bg-white/[0.03]"
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
      <ArrowUpRight
        size={14}
        className="mt-2 shrink-0 text-[#E9CE85]/40 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
      />
    </a>
  );
}
