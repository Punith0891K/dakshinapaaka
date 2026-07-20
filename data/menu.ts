export interface MenuPage {
  id: number;
  title: string;
  image: string;
}

export const menuPages: MenuPage[] = [
  {
    id: 1,
    title: "Cover",
    image: "/menu/cover.png",
  },
  {
    id: 2,
    title: "Breakfast & Sweets",
    image: "/menu/page2.png",
  },
  {
    id: 3,
    title: "Meals & Beverages",
    image: "/menu/page3.png",
  },
  {
    id: 4,
    title: "Dosa & Desserts",
    image: "/menu/page4.png",
  },
  {
    id: 5,
    title: "Juices & Evening Specials",
    image: "/menu/page5.png",
  },
  {
    id: 6,
    title: "Chinese & Starters",
    image: "/menu/page6.png",
  },
  {
    id: 7,
    title: "Rice, Biryani & Indian Breads",
    image: "/menu/page7.png",
  },
];