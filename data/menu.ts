export interface MenuPage {
  id: number;
  title: string;
  image: string;
  category: string;
  highlights?: string[];
}

export const menuPages: MenuPage[] = [
  {
    id: 1,
    title: "Cover",
    image: "/menu/cover.png",
    category: "Welcome",
    highlights: ["Since 2024", "Authentic South Indian"],
  },
  {
    id: 2,
    title: "Breakfast & Sweets",
    image: "/menu/page2.png",
    category: "Breakfast",
    highlights: ["Idli", "Vada", "Traditional Sweets"],
  },
  {
    id: 3,
    title: "Meals & Beverages",
    image: "/menu/page3.png",
    category: "Meals",
    highlights: ["Andhra Thali", "Filter Coffee"],
  },
  {
    id: 4,
    title: "Dosa & Desserts",
    image: "/menu/page4.png",
    category: "Dosa",
    highlights: ["Mysore Masala", "House Desserts"],
  },
  {
    id: 5,
    title: "Juices & Evening Specials",
    image: "/menu/page5.png",
    category: "Juices",
    highlights: ["Fresh Juices", "Evening Snacks"],
  },
  {
    id: 6,
    title: "Chinese & Starters",
    image: "/menu/page6.png",
    category: "Chinese",
    highlights: ["Indo-Chinese", "Starters"],
  },
  {
    id: 7,
    title: "Rice, Biryani & Indian Breads",
    image: "/menu/page7.png",
    category: "Mains",
    highlights: ["Biryani", "Naan", "Roti"],
  },
];

// Quick-jump categories for the modal header — one chip per themed page.
export interface MenuCategory {
  label: string;
  page: number; // index into menuPages
  icon: "leaf" | "flame" | "soup" | "cup" | "utensils" | "book";
}

export const menuCategories: MenuCategory[] = [
  { label: "Breakfast", page: 1, icon: "leaf" },
  { label: "Meals", page: 2, icon: "utensils" },
  { label: "Dosa", page: 3, icon: "flame" },
  { label: "Juices", page: 4, icon: "cup" },
  { label: "Chinese", page: 5, icon: "soup" },
  { label: "Mains", page: 6, icon: "book" },
];
