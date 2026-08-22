// Single source of truth for contact details — phone, WhatsApp, maps link,
// email, address. This used to live only inside Footer.tsx as a local
// CONTACT object, while Navbar.tsx and MobileMenu.tsx each hardcoded their
// own phone number and maps link separately. That's exactly how they ended
// up drifting apart (a digit different in the phone number, two different
// Google Maps shortlinks). Importing from here instead means there's only
// ever one number and one map link to update, in one place.
export const CONTACT = {
  email: "Vishnubhavan2023@gmail.com",
  phone: "+91 72044 88784",
  phoneHref: "tel:+917204488784",
  whatsappHref:
    "https://wa.me/917204488784?text=" +
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
