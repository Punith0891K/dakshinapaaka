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

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Dakshinapaaka",
    title: "Dakshinapaaka Mysuru | Authentic South Indian Restaurant",
    description:
      "Authentic South Indian cuisine in Mysuru — traditional breakfasts, dosas, meals, filter coffee and more.",
    images: [
      {
        url: "/images/hero/hero-desktop.png",
        alt: "Dakshinapaaka South Indian Restaurant in Mysuru",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Dakshinapaaka Mysuru | Authentic South Indian Restaurant",
    description:
      "Authentic South Indian cuisine in Mysuru — traditional flavours served with warmth.",
    images: ["/images/hero/hero-desktop.png"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${poppins.variable} bg-[#FAF7F2] text-[#181818] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}