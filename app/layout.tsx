import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dakshinapaakamysuru.in"),

  title: {
    default: "Dakshinapaaka Mysuru | Authentic South Indian Restaurant",
    template: "%s | Dakshinapaaka Mysuru",
  },

  description:
    "Dakshinapaaka is a South Indian vegetarian restaurant in Mysuru serving authentic dosas, idli, vada, traditional Karnataka dishes, meals, filter coffee and more.",

  keywords: [
    "Dakshinapaaka Mysuru",
    "Dakshina Paaka Mysuru",
    "South Indian restaurant in Mysuru",
    "South Indian food Mysuru",
    "vegetarian restaurant Mysuru",
    "restaurant in Nazarbad Mysuru",
    "Mysore masala dosa",
    "South Indian breakfast Mysuru",
    "Karnataka food Mysuru",
    "authentic South Indian restaurant Mysore",
  ],

  alternates: {
    canonical: "https://dakshinapaakamysuru.in/",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://dakshinapaakamysuru.in/",
    siteName: "Dakshinapaaka",
    title: "Dakshinapaaka Mysuru | Authentic South Indian Restaurant",
    description:
      "Authentic South Indian cuisine in Mysuru — traditional breakfasts, dosas, meals, filter coffee and more.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dakshinapaaka South Indian Restaurant in Mysuru",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Dakshinapaaka Mysuru | Authentic South Indian Restaurant",
    description:
      "Authentic South Indian cuisine in Mysuru — traditional flavours served with warmth.",
    images: ["/images/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};