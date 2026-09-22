import { CONTACT } from "@/lib/contact";

export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",

    "@id": "https://dakshinapaakamysuru.in/#restaurant",

    name: "Dakshinapaaka",
    alternateName: "Dakshina Paaka",

    url: "https://dakshinapaakamysuru.in/",

    telephone: CONTACT.phone,

    email: CONTACT.email,

    image: [
      "https://dakshinapaakamysuru.in/images/og-image.jpg",
    ],

    description:
      "Dakshinapaaka is a South Indian vegetarian restaurant in Mysuru serving authentic South Indian and Karnataka cuisine.",

    servesCuisine: [
      "South Indian",
      "Karnataka",
      "Vegetarian",
    ],

    priceRange: "₹₹",

    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Residency Road, near Mini Vidhana Soudha, Nazarbad",
      addressLocality: "Mysuru",
      addressRegion: "Karnataka",
      postalCode: "570010",
      addressCountry: "IN",
    },

    geo: {
      "@type": "GeoCoordinates",
      latitude: 12.3111457,
      longitude: 76.6629423,
    },

    hasMap: CONTACT.location,

    sameAs: [
      CONTACT.instagram,
    ],

    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "07:00",
        closes: "22:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "07:00",
        closes: "23:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "07:00",
        closes: "23:00",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}