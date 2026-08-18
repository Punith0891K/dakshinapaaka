export type GalleryCategory = "Dishes" | "Exterior & Interior" | "Others";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: GalleryCategory;
}

export const galleryImages: GalleryImage[] = [
  {
    id: "mysore-masala-dosa",
    src: "/images/gallery/dishes-mysore-masala-dosa.jpg",
    alt: "Crisp Mysore masala dosa served with sambar and chutneys",
    title: "Mysore Masala Dosa",
    category: "Dishes",
  },
  {
    id: "andhra-meals",
    src: "/images/gallery/andra_meals.jpg",
    alt: "Traditional Andhra meals served on a banana leaf",
    title: "Andhra Meals",
    category: "Dishes",
  },
  {
    id: "medu-vada",
    src: "/images/gallery/dishes-medu-vada.jpg",
    alt: "Crispy medu vada with coconut chutney and sambar",
    title: "Crispy Vada",
    category: "Dishes",
  },
  {
    id: "filter-coffee",
    src: "/images/gallery/dishes-filter-coffee.jpg",
    alt: "South Indian filter coffee",
    title: "Filter Coffee",
    category: "Dishes",
  },
  {
    id: "soft-idli",
    src: "/images/gallery/dishes-soft-idli.jpg",
    alt: "Soft steamed idli with chutney and sambar",
    title: "Thatte Idli",
    category: "Dishes",
  },
  {
    id: "garlic-roti",
    src: "/images/gallery/garlic_roti.jpg",
    alt: "Butter garlic roti fresh off the tandoor",
    title: "Butter Garlic Roti",
    category: "Dishes",
  },
  {
    id: "exterior-storefront",
    src: "/images/gallery/exterior-storefront.jpg",
    alt: "Dakshinapaaka restaurant storefront",
    title: "Our Storefront",
    category: "Exterior & Interior",
  },
  {
    id: "exterior-signage",
    src: "/images/gallery/exterior-signage.jpg",
    alt: "Dakshinapaaka signage against the sky",
    title: "Signature Signage",
    category: "Exterior & Interior",
  },
  {
    id: "exterior-entrance",
    src: "/images/gallery/exterior-entrance.jpg",
    alt: "Dakshinapaaka restaurant entrance in the evening",
    title: "Evening Entrance",
    category: "Exterior & Interior",
  },
  {
    id: "chef-team",
    src: "/images/gallery/others-chef-team.jpg",
    alt: "The Dakshinapaaka chef team",
    title: "Meet Our Chefs",
    category: "Others",
  },

{
  id: "cash-counter",
  src: "/images/gallery/cash_counter.jpg",
  alt: "Dakshinapaaka cash counter and reception area",
  title: "Reception & Cash Counter",
  category: "Exterior & Interior",
},
{
  id: "traditional-kitchen-1",
  src: "/images/gallery/kitchen1.jpg",
  alt: "Traditional Dakshinapaaka kitchen preparation area",
  title: "Authentic Kitchen",
  category: "Others",
},

{
  id: "heritage-display",
  src: "/images/gallery/display.jpg",
  alt: "Traditional ingredients and heritage display wall",
  title: "Heritage Display",
  category: "Exterior & Interior",
},

{
  id: "ac-dining-hall-1",
  src: "/images/hero/interior1.jpeg",
  alt: "Spacious air-conditioned dining hall at Dakshinapaaka",
  title: "AC Dining Hall",
  category: "Exterior & Interior",
},
{
  id: "ac-dining-hall-3",
  src: "/images/hero/interior3.png",
  alt: "Elegant dining ambience at Dakshinapaaka",
  title: "Dining Ambience",
  category: "Exterior & Interior",
},
];
